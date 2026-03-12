package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.response.CompleteLessonResponseDTO;
import com.github.joshliford.amplifyguitar.dto.response.LessonResponseDTO;
import com.github.joshliford.amplifyguitar.dto.response.RewardResponseDTO;
import com.github.joshliford.amplifyguitar.exception.LessonAlreadyCompleteException;
import com.github.joshliford.amplifyguitar.exception.LessonLockedException;
import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.Lesson;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.model.UserLesson;
import com.github.joshliford.amplifyguitar.repository.LessonRepository;
import com.github.joshliford.amplifyguitar.repository.UserLessonRepository;
import com.github.joshliford.amplifyguitar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/*
Core methods:
getLessons(User user) - return list of lessons with custom LessonResponseDTO
completeLesson(User user, Integer lessonId) - creates a UserLesson record and awards XP
getLessonById(Integer id) - get lesson by ID for jam room detail view
buildLessonResponse(Lesson lesson, Set<Integer> completedLessonIds, User user) - helper method to build a single LessonResponseDTO from a lesson and user context
*/

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final UserLessonRepository userLessonRepository;
    private final ProgressService progressService;
    private final UserRepository userRepository;
    private final RewardService rewardService;

    public LessonService(LessonRepository lessonRepository, UserLessonRepository userLessonRepository, ProgressService progressService, UserRepository userRepository, RewardService rewardService) {
        this.lessonRepository = lessonRepository;
        this.userLessonRepository = userLessonRepository;
        this.progressService = progressService;
        this.userRepository = userRepository;
        this.rewardService = rewardService;
    }

    public List<LessonResponseDTO> getLessons(User user) {
        List<Lesson> lessons = lessonRepository.findAllByOrderByLessonNumberAsc();
        List<UserLesson> userCompletedLessonList = userLessonRepository.findByUserOrderByCompletedAtDesc(user);

        // extract lesson ids from completed list into a Set
        Set<Integer> completedLessonIds = userCompletedLessonList.stream()
                .map(userLesson -> userLesson.getLesson().getId())
                .collect(Collectors.toSet());

        // transform each Lesson into a LessonResponseDTO with completed and locked status
        return lessons.stream()
                .map(lesson -> buildLessonResponse(lesson, completedLessonIds, user))
                .collect(Collectors.toList());
    }

    public CompleteLessonResponseDTO completeLesson(User user, Integer lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + lessonId));

        boolean completed = userLessonRepository.existsByUserAndLesson(user, lesson);
        boolean locked = lesson.getRequiredLevel() > user.getCurrentLevel();
        int previousLevel = user.getCurrentLevel();

        if (completed) {
            throw new LessonAlreadyCompleteException("You've already completed this lesson");
        }

        if (locked) {
            // throws 403 forbidden rather than 401 unauthorized
            throw new LessonLockedException("You don't have permission to access this lesson yet");
        }

        // create new record
        UserLesson lessonComplete = new UserLesson();
        lessonComplete.setCompleted(true);
        lessonComplete.setCompletedAt(LocalDateTime.now());
        lessonComplete.setUser(user);
        lessonComplete.setXpEarned(lesson.getXpReward());
        lessonComplete.setLesson(lesson);

        // award XP to user & increment completedLessons by 1
        Integer userCompletedLessons = user.getLessonsCompleted();
        user.setLessonsCompleted(userCompletedLessons + 1);
        userRepository.save(user);
        User updatedUser = progressService.addXp(user.getId(), lesson.getXpReward());

        boolean leveledUp = updatedUser.getCurrentLevel() > previousLevel;

        // check if the user has earned any rewards based on lesson completion
        List<RewardResponseDTO> newRewards = rewardService.checkAndAwardRewards(updatedUser);

        userLessonRepository.save(lessonComplete);

        // used for modal after lesson completion
        return new CompleteLessonResponseDTO(
                leveledUp,
                updatedUser.getCurrentLevel(),
                newRewards,
                updatedUser.getTotalXp(),
                lesson.getXpReward()
        );
    }

    public LessonResponseDTO getLessonById(Integer id, User user) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));

        List<UserLesson> userCompletedLessonList = userLessonRepository.findByUserOrderByCompletedAtDesc(user);
        Set<Integer> completedLessonIds = userCompletedLessonList.stream()
                .map(userLesson -> userLesson.getLesson().getId())
                .collect(Collectors.toSet());

        return buildLessonResponse(lesson, completedLessonIds, user);
    }

    // helper method to build a single LessonResponseDTO from a lesson and user context
    private LessonResponseDTO buildLessonResponse(Lesson lesson, Set<Integer> completedLessonIds, User user) {
        boolean completed = completedLessonIds.contains(lesson.getId());
        boolean locked = lesson.getRequiredLevel() > user.getCurrentLevel();

        return new LessonResponseDTO(
                lesson.getId(),
                completed,
                lesson.getDifficulty(),
                lesson.getContent(),
                lesson.getDescription(),
                lesson.getLessonNumber(),
                locked,
                lesson.getRequiredLevel(),
                lesson.getTitle(),
                lesson.getVideoUrl(),
                lesson.getXpReward()
        );
    }

}
