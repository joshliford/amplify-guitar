package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    List<Lesson> findAllByOrderByLessonNumberAsc();
}
