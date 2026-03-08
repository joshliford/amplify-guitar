package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.Difficulty;
import com.github.joshliford.amplifyguitar.model.Scale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScaleRepository extends JpaRepository<Scale, Integer> {
    List<Scale> findAllByOrderByTitleAsc();
    List<Scale> findByDifficultyOrderByTitleAsc(Difficulty difficulty);
}
