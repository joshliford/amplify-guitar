package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.response.RewardResponseDTO;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.service.RewardService;
import com.github.joshliford.amplifyguitar.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
3 endpoints:
GET /api/rewards - fetch all rewards the user has earned
GET /api/rewards/all - fetch all rewards
POST /api/rewards/check - checks rewards the user has and awards new ones
*/

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardService rewardService;
    private final UserService userService;

    public RewardController(RewardService rewardService, UserService userService) {
        this.rewardService = rewardService;
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<RewardResponseDTO>> getEarnedRewards(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User currentUser = userService.findByEmail(email);
        List<RewardResponseDTO> response = rewardService.getEarnedRewards(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<RewardResponseDTO>> getAllRewards() {
        List<RewardResponseDTO> response = rewardService.getAllRewards();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/check")
    public ResponseEntity<List<RewardResponseDTO>> checkAndAwardRewards(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User currentUser = userService.findByEmail(email);
        List<RewardResponseDTO> response = rewardService.checkAndAwardRewards(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
