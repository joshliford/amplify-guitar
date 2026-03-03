package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.model.Chord;
import com.github.joshliford.amplifyguitar.model.Difficulty;
import com.github.joshliford.amplifyguitar.service.ChordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
3 endpoints:
GET /api/chords (get all chords)
GET /api/chords/difficulty/{difficulty} (get all filtered by difficulty)
GET /api/chords/{id} (get chord by ID for jam room detail view)
*/

@RestController
@RequestMapping("/api/chords")
public class ChordController {

    private final ChordService chordService;

    public ChordController(ChordService chordService) {
        this.chordService = chordService;
    }

    @GetMapping("")
    public ResponseEntity<List<Chord>> getAllChords() {
        List<Chord> response = chordService.getAllChords();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Chord>> getChordsByDifficulty(@PathVariable Difficulty difficulty) {
        List<Chord> response = chordService.getAllChordsByDifficulty(difficulty);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chord> getChordById(@PathVariable Integer id) {
        Chord response = chordService.getChordById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
