package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.PracticeGoal;
import com.github.joshliford.amplifyguitar.model.PracticeSession;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.PracticeGoalRepository;
import com.github.joshliford.amplifyguitar.repository.PracticeSessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

/*
3 methods:
startPracticeSession(User user, practiceGoal goal)
endPracticeSession(Integer sessionId)
getPracticeSessions(User user)
*/

@Service
public class PracticeSessionService {

    private final ProgressService progressService;
    private final PracticeGoalRepository practiceGoalRepository;
    private final PracticeSessionRepository practiceSessionRepository;

    public PracticeSessionService(PracticeSessionRepository practiceSessionRepository, PracticeGoalRepository practiceGoalRepository, ProgressService progressService) {
        this.practiceSessionRepository = practiceSessionRepository;
        this.practiceGoalRepository = practiceGoalRepository;
        this.progressService = progressService;
    }

    public PracticeSession startPracticeSession(User user, Integer goalId) {
        // create new instance of PracticeSession class to generate a new session
        PracticeSession newPracticeSession = new PracticeSession();
        newPracticeSession.setStartedAt(LocalDateTime.now());
        newPracticeSession.setXpEarned(0);
        newPracticeSession.setCompleted(false);
        newPracticeSession.setUser(user);

        if (goalId == null) {
            return practiceSessionRepository.save(newPracticeSession);
        }

        PracticeGoal goal = practiceGoalRepository.findById(goalId)
                .orElseThrow(() -> new ResourceNotFoundException("Practice goal not found with id: " + goalId));

        newPracticeSession.setGoal(goal);
        return practiceSessionRepository.save(newPracticeSession);
    }

    public PracticeSession endPracticeSession(Integer sessionId) {
        PracticeSession session = practiceSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Practice session not found with id: " + sessionId));

        session.setEndedAt(LocalDateTime.now());

        PracticeGoal sessionGoal = session.getGoal();
        long practiceSessionDuration = ChronoUnit.SECONDS.between(session.getStartedAt(), session.getEndedAt());

        // if user chooses a "freeform" practice (no goal), return early and do not award XP
        if (sessionGoal == null) {
            session.setXpEarned(0);
            session.setCompleted(true);
            // cast sessionDuration to int to match Entity data type
            session.setDurationInSeconds((int) practiceSessionDuration);
            return practiceSessionRepository.save(session);
        }

        int practiceGoalDurationInSeconds = session.getGoal().getDurationInMinutes() * 60;

        if (practiceSessionDuration < practiceGoalDurationInSeconds) {
            session.setXpEarned(0);
        } else if (practiceSessionDuration >= practiceGoalDurationInSeconds) {
            session.setXpEarned(sessionGoal.getXpReward());
            progressService.addXp(session.getUser().getId(), sessionGoal.getXpReward());
        }

        session.setDurationInSeconds((int) practiceSessionDuration);
        session.setCompleted(true);

        return practiceSessionRepository.save(session);
    }

    public List<PracticeSession> getPracticeSessions(User user) {
        // use custom query from PracticeSessionRepository
        return practiceSessionRepository.findByUserOrderByStartedAtDesc(user);
    }

}
