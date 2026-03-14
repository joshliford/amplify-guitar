package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.request.LoginRequestDTO;
import com.github.joshliford.amplifyguitar.dto.request.RegisterRequestDTO;
import com.github.joshliford.amplifyguitar.dto.response.AuthResponseDTO;
import com.github.joshliford.amplifyguitar.exception.EmailAlreadyExistsException;
import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/*
Core methods:
register(RegisterRequestDTO registerRequestDTO)
login(LoginRequestDTO loginRequestDTO)
*/

@Service
public class AuthService {

    private final UserService userService;
    private final ProgressService progressService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserService userService, ProgressService progressService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.progressService = progressService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        String email = registerRequestDTO.getEmail();

        if (userService.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email already in use. Please try a different email.");
        }

        if (registerRequestDTO.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        String hashedPassword = passwordEncoder.encode(registerRequestDTO.getPassword());

        User newUser = new User(
                email,
                hashedPassword,
                registerRequestDTO.getFirstName(),
                registerRequestDTO.getLastName(),
                registerRequestDTO.getDisplayName()
        );

        User savedUser = userService.createUser(newUser);

        // token subject is the users email
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return new AuthResponseDTO(savedUser.getEmail(), token);
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getEmail(),
                            loginRequestDTO.getPassword()
                    )
            );
            // if credentials are invalid, Spring security throws below exception and returns 404
        } catch (BadCredentialsException exception) {
            throw new ResourceNotFoundException("Invalid credentials");
        }

        User authenticatedUser = userService.findByEmail(loginRequestDTO.getEmail());

        String token = jwtUtil.generateToken(authenticatedUser.getEmail());

        // update user streak upon login
        progressService.updateStreak(authenticatedUser);

        return new AuthResponseDTO(authenticatedUser.getEmail(), token);
    }

}
