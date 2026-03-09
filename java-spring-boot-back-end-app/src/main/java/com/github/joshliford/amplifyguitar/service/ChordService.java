package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.Chord;
import com.github.joshliford.amplifyguitar.model.Difficulty;
import com.github.joshliford.amplifyguitar.repository.ChordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/*
Core methods:
getAllChords()
getAllChordsByDifficulty(Difficulty difficulty)
getChordById(Integer id)
getTotalChords()
*/

@Service
public class ChordService {

    private final ChordRepository chordRepository;

    public ChordService(ChordRepository chordRepository) {
        this.chordRepository = chordRepository;
    }

    public List<Chord> getAllChords() {
        return chordRepository.findAllByOrderByTitleAsc();
    }

    public List<Chord> getAllChordsByDifficulty(Difficulty difficulty) {
        return chordRepository.findByDifficultyOrderByTitleAsc(difficulty);
    }

    public Chord getChordById(Integer id) {
        return chordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chord not found with id: " + id));
    }

    public Long getTotalChords() {
        return chordRepository.count();
    }

}
