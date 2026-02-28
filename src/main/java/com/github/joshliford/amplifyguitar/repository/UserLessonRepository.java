package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.Lesson;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.model.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLessonRepository extends JpaRepository<UserLesson, Integer> {
    boolean existsByUserAndLesson(User user, Lesson lesson);
    List<UserLesson> findByUserOrderByCompletedAtDesc(User user);
}
