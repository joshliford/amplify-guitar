package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.PracticeSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Integer> {
    Optional<PracticeSession> findByUserOrderByStartedAtDesc(String email);
}
