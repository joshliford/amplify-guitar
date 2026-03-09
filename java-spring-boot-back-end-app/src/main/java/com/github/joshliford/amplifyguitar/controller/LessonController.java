package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.response.CompleteLessonResponseDTO;
import com.github.joshliford.amplifyguitar.dto.response.LessonResponseDTO;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.service.LessonService;
import com.github.joshliford.amplifyguitar.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
3 endpoints:
GET /api/lessons - get all lessons
GET /api/lessons/{id} - get lesson by ID
POST /api/lessons/{lessonId}/complete - complete a lesson
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

    @GetMapping("/{id}")
    public ResponseEntity<LessonResponseDTO> getLessonById(@AuthenticationPrincipal UserDetails user, @PathVariable Integer id) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        LessonResponseDTO response = lessonService.getLessonById(id, currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/{lessonId}/complete")
    public ResponseEntity<CompleteLessonResponseDTO> completeLesson(@AuthenticationPrincipal UserDetails user, @PathVariable Integer lessonId) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        CompleteLessonResponseDTO response = lessonService.completeLesson(currentUser, lessonId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
