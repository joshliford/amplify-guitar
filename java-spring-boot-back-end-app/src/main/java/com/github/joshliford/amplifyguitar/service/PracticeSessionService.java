package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.response.PracticeSessionResponseDTO;
import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.exception.UnauthorizedAccessException;
import com.github.joshliford.amplifyguitar.model.PracticeGoal;
import com.github.joshliford.amplifyguitar.model.PracticeSession;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.PracticeGoalRepository;
import com.github.joshliford.amplifyguitar.repository.PracticeSessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

/*
Core methods:
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

    public PracticeSessionResponseDTO startPracticeSession(User user, Integer goalId) {
        // create new instance of PracticeSession class to generate a new session
        PracticeSession newPracticeSession = new PracticeSession();
        newPracticeSession.setStartedAt(LocalDateTime.now());
        newPracticeSession.setXpEarned(0);
        newPracticeSession.setCompleted(false);
        newPracticeSession.setUser(user);

        if (goalId == null) {
            PracticeSession savedSession = practiceSessionRepository.save(newPracticeSession);
            return buildSessionResponse(savedSession);
        }

        PracticeGoal goal = practiceGoalRepository.findById(goalId)
                .orElseThrow(() -> new ResourceNotFoundException("Practice goal not found with id: " + goalId));

        newPracticeSession.setGoal(goal);
        practiceSessionRepository.save(newPracticeSession);

        return buildSessionResponse(newPracticeSession);
    }

    public PracticeSessionResponseDTO endPracticeSession(User user, Integer sessionId, String notes) {
        PracticeSession session = practiceSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Practice session not found with id: " + sessionId));


        if (!session.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("You do not have access to modify this record");
        }

        session.setEndedAt(LocalDateTime.now());

        PracticeGoal sessionGoal = session.getGoal();
        long practiceSessionDuration = ChronoUnit.SECONDS.between(session.getStartedAt(), session.getEndedAt());

        // if user chooses a "freeform" practice (no goal), return early and do not award XP
        if (sessionGoal == null) {
            session.setXpEarned(0);
            session.setCompleted(true);
            session.setNotes(notes);
            // cast sessionDuration to int to match Entity data type
            session.setDurationInSeconds((int) practiceSessionDuration);
            PracticeSession savedSession = practiceSessionRepository.save(session);
            return buildSessionResponse(savedSession);
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
        session.setNotes(notes);

        practiceSessionRepository.save(session);

        return buildSessionResponse(session);
    }

    public List<PracticeSessionResponseDTO> getPracticeSessions(User user) {
        // use custom query from PracticeSessionRepository
        List<PracticeSession> sessions = practiceSessionRepository.findByUserOrderByStartedAtDesc(user);
        return sessions.stream()
                .map(practiceSession -> buildSessionResponse(practiceSession))
                .collect(Collectors.toList());
    }

    public Integer getTotalPracticeTime(User user) {
        return getPracticeSessions(user).stream()
                .filter(session -> session.isCompleted())
                .mapToInt(session -> session.getDurationInSeconds() != null ? session.getDurationInSeconds() : 0)
                .sum();
    }

    private PracticeSessionResponseDTO buildSessionResponse(PracticeSession session) {
        String goalTitle = session.getGoal() != null ? session.getGoal().getTitle() : null;
        Integer goalXpReward = session.getGoal() != null ? session.getGoal().getXpReward() : null;
        return new PracticeSessionResponseDTO(
                session.getDurationInSeconds(),
                session.isCompleted(),
                session.getEndedAt(),
                goalTitle,
                goalXpReward,
                session.getId(),
                session.getNotes(),
                session.getStartedAt(),
                session.getXpEarned()
        );
    }
}
