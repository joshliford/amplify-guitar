package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.PracticeSession;
import com.github.joshliford.amplifyguitar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Integer> {
    List<PracticeSession> findByUserOrderByStartedAtDesc(User user);
}
