package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.response.LessonResponseDTO;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.model.UserLesson;
import com.github.joshliford.amplifyguitar.service.LessonService;
import com.github.joshliford.amplifyguitar.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
2 endpoints:
GET /api/lessons
POST /api/lessons/{lessonId}/complete
*/

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService lessonService;
    private final UserService userService;

    public LessonController(LessonService lessonService, UserService userService) {
        this.lessonService = lessonService;
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<LessonResponseDTO>> getLessons(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        List<LessonResponseDTO> response = lessonService.getLessons(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/{lessonId}/complete")
    public ResponseEntity<UserLesson> completeLesson(@AuthenticationPrincipal UserDetails user, @PathVariable Integer lessonId) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        UserLesson response = lessonService.completeLesson(currentUser, lessonId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
