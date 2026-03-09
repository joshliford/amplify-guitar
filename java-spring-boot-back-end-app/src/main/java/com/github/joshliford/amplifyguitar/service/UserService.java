package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.UserRepository;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/*
Core methods:
getUserById(Integer id)
createUser(User user)
deleteUser(Integer id)
findByEmail(String email)
existsByEmail(String email)
updateUserProfile(Integer id, displayName, email)
updatePassword(Integer id, currentPassword, newPassword)
*/

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }

    public User createUser(User newUser) {
        newUser.setCreatedAt(LocalDateTime.now());
        return userRepository.save(newUser);
    }

    public void deleteUser(Integer id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        userRepository.deleteById(id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User updateUserProfile(Integer id, String displayName, String email) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (displayName != null) {
            validateAndSetDisplayName(existingUser, displayName);
        }

        if (email != null) {
            validateAndSetEmail(existingUser, email);
        }

        existingUser.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(existingUser);
    }

    public User updatePassword(Integer id, String currentPassword, String newPassword) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (!passwordEncoder.matches(currentPassword, existingUser.getPasswordHash())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        validatePassword(newPassword);

        existingUser.setPasswordHash(passwordEncoder.encode(newPassword));
        existingUser.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(existingUser);
    }

    // helper/validation  methods

    public void validateAndSetDisplayName(User user, String displayName) {
        String trimmedName = displayName.trim();

        if (trimmedName.isEmpty()) {
            throw new IllegalArgumentException("Display name cannot be empty");
        }

        if (trimmedName.length() > 20) {
            throw new IllegalArgumentException("Display name cannot exceed 20 characters");
        }

        user.setDisplayName(trimmedName);
    }

    public void validateAndSetEmail(User user, String email) {
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already in use");
        }

        user.setEmail(email);
    }

    public void validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
    }

    // use commons-validator dependency to validate email format
    private boolean isValidEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }

}
