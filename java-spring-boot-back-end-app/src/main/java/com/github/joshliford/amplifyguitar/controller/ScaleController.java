package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.model.Difficulty;
import com.github.joshliford.amplifyguitar.model.Scale;
import com.github.joshliford.amplifyguitar.service.ScaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
3 endpoints:
GET /api/scales (get all scales)
GET /api/scales/difficulty/{difficulty} (get all filtered by difficulty)
GET /api/scales/{id} (get scale by ID for jam room detail view)
*/

@RestController
@RequestMapping("/api/scales")
public class ScaleController {

    private final ScaleService scaleService;

    public ScaleController(ScaleService scaleService) {
        this.scaleService = scaleService;
    }

    @GetMapping("")
    public ResponseEntity<List<Scale>> getAllScales() {
        List<Scale> response = scaleService.getAllScales();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Scale>> getScalesByDifficulty(@PathVariable Difficulty difficulty) {
        List<Scale> response = scaleService.getAllScalesByDifficulty(difficulty);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scale> getScaleById(@PathVariable Integer id) {
        Scale response = scaleService.getScaleById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
