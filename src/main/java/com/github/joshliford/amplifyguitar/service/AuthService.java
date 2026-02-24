package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.request.LoginRequestDTO;
import com.github.joshliford.amplifyguitar.dto.request.RegisterRequestDTO;
import com.github.joshliford.amplifyguitar.dto.response.AuthResponseDTO;
import com.github.joshliford.amplifyguitar.exception.EmailAlreadyExistsException;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.UserRepository;
import com.github.joshliford.amplifyguitar.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        String email = registerRequestDTO.getEmail();

        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email already in use. Please try a different email.");
        }

        String hashedPassword = passwordEncoder.encode(registerRequestDTO.getPassword());

        User newUser = new User(
                email,
                hashedPassword,
                registerRequestDTO.getFirstName(),
                registerRequestDTO.getLastName(),
                registerRequestDTO.getDisplayName()
        );

        User savedUser = userRepository.save(newUser);

        String token = jwtUtil.generateToken(savedUser.getEmail());

        return new AuthResponseDTO(savedUser.getEmail(), token);
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getEmail(),
                        loginRequestDTO.getPassword()
                )
        );

        User authenticatedUser = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found after authentication."));

        String token = jwtUtil.generateToken(authenticatedUser.getEmail());

        return new AuthResponseDTO(authenticatedUser.getEmail(), token);
    }

}
