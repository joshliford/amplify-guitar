package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.response.UserResponseDTO;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getUser(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        User currentUser = userService.findByEmail(email);
        UserResponseDTO response = new UserResponseDTO(
                currentUser.getCurrentLevel(),
                currentUser.getCurrentStreak(),
                currentUser.getCurrentTitle(),
                currentUser.getCurrentXp(),
                currentUser.getDisplayName(),
                currentUser.getLastLoginDate(),
                currentUser.getLessonsCompleted(),
                currentUser.getLongestStreak(),
                currentUser.getTotalXp()
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User currentUser = userService.findByEmail(email);
        userService.deleteUser(currentUser.getId());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
