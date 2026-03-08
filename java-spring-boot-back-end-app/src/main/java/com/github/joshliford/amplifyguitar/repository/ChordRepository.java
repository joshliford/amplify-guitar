package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.Chord;
import com.github.joshliford.amplifyguitar.model.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChordRepository extends JpaRepository<Chord, Integer> {
    List<Chord> findAllByOrderByTitleAsc();
    List<Chord> findByDifficultyOrderByTitleAsc(Difficulty difficulty);
}
