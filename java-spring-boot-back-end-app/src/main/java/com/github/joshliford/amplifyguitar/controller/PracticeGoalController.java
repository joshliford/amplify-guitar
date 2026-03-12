package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.response.PracticeGoalResponseDTO;
import com.github.joshliford.amplifyguitar.service.PracticeGoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
1 endpoint:
GET /api/goals (get all practice goals)
*/

@RestController
@RequestMapping("/api/goals")
public class PracticeGoalController {

    private final PracticeGoalService practiceGoalService;

    public PracticeGoalController(PracticeGoalService practiceGoalService) {
        this.practiceGoalService = practiceGoalService;
    }

    @GetMapping("")
    // ResponseEntity wraps the list to have control over HTTP status
    public ResponseEntity<List<PracticeGoalResponseDTO>> getAllGoals() {
        List<PracticeGoalResponseDTO> response = practiceGoalService.getAllGoals();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
