package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.request.EndSessionRequestDTO;
import com.github.joshliford.amplifyguitar.dto.request.StartSessionRequestDTO;
import com.github.joshliford.amplifyguitar.dto.response.PracticeSessionResponseDTO;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.service.PracticeSessionService;
import com.github.joshliford.amplifyguitar.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
4 endpoints:
GET /api/practice-sessions
GET /api/practice-sessions/total-time
POST /api/practice-sessions
PATCH /api/practice-sessions/{sessionId}
- Note: PATCH not PUT — partially updates an existing session with endedAt, duration, xpEarned, and completed status
*/

@RestController
@RequestMapping("/api/practice-sessions")
public class PracticeSessionController {

    private final PracticeSessionService practiceSessionService;
    private final UserService userService;

    public PracticeSessionController(PracticeSessionService practiceSessionService, UserService userService) {
        this.practiceSessionService = practiceSessionService;
        this.userService = userService;
    }

    // @AuthenticationPrincipal injects the currently authenticated users UserDetails (set by JwtAuthenticationFilter)
    // directly into the method
    // user.getUsername() returns their email, which is then used to look up the full User entity
    @GetMapping("")
    public ResponseEntity<List<PracticeSessionResponseDTO>> getPracticeSessions(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        List<PracticeSessionResponseDTO> response = practiceSessionService.getPracticeSessions(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/total-time")
    public ResponseEntity<Integer> getTotalPracticeTime(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        Integer response = practiceSessionService.getTotalPracticeTime(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("")
    public ResponseEntity<PracticeSessionResponseDTO> createPracticeSession(@AuthenticationPrincipal UserDetails user, @RequestBody StartSessionRequestDTO startSessionRequestDTO) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        Integer goalId = startSessionRequestDTO.getGoalId();
        PracticeSessionResponseDTO response = practiceSessionService.startPracticeSession(currentUser, goalId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{sessionId}")
    public ResponseEntity<PracticeSessionResponseDTO> endPracticeSession(@AuthenticationPrincipal UserDetails user, @PathVariable Integer sessionId, @RequestBody EndSessionRequestDTO endSessionRequestDTO) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        PracticeSessionResponseDTO response = practiceSessionService.endPracticeSession(currentUser, sessionId, endSessionRequestDTO.getNotes());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
