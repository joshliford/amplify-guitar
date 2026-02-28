package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.request.StartSessionRequestDTO;
import com.github.joshliford.amplifyguitar.model.PracticeSession;
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
3 endpoints:
GET /api/practice-sessions
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
    public ResponseEntity<List<PracticeSession>> getPracticeSessions(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        List<PracticeSession> response = practiceSessionService.getPracticeSessions(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("")
    public ResponseEntity<PracticeSession> createPracticeSession(@AuthenticationPrincipal UserDetails user, @RequestBody StartSessionRequestDTO startSessionRequestDTO) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        Integer goalId = startSessionRequestDTO.getGoalId();
        PracticeSession response = practiceSessionService.startPracticeSession(currentUser, goalId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{sessionId}")
    public ResponseEntity<PracticeSession> endPracticeSession(@AuthenticationPrincipal UserDetails user, @PathVariable Integer sessionId) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        PracticeSession response = practiceSessionService.endPracticeSession(currentUser, sessionId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
