package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.UserRepository;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/*
Core operations:
getUserById(Integer id)
createUser(User user)
deleteUser(Integer id)

Profile Management:
updateUserProfile(Integer id, displayName, email)
updatePassword(Integer id, currentPassword, newPassword)

Gamification:
addXp(Integer Id, amount)
incrementStreak(Integer Id)
*/

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

//    public User updatePassword(Integer id, String currentPassword, String newPassword) {
//        User existingUser = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
//
//    }

    public User addXp(Integer id, Integer xpAmount) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (xpAmount <= 0) {
            throw new IllegalArgumentException("XP amount must be positive");
        }

        // get current values
        Integer currentXp = existingUser.getCurrentXp() != null ? existingUser.getCurrentXp() : 0;
        Integer currentTotalXp = existingUser.getTotalXp() != null ? existingUser.getTotalXp() : 0;
        Integer currentLevel = existingUser.getCurrentLevel() != null ? existingUser.getCurrentLevel() : 1;

        // add xp amount to both totals
        existingUser.setTotalXp(currentTotalXp + xpAmount);
        Integer newCurrentXp = currentXp + xpAmount;

        // check for user level up
        Integer xpNeededForNextLevel = calculateXpNeededForLevel(currentLevel + 1);

        while (newCurrentXp >= xpNeededForNextLevel ) {
            currentLevel++;
            newCurrentXp -= xpNeededForNextLevel;
            xpNeededForNextLevel = calculateXpNeededForLevel(currentLevel + 1);
        }

        existingUser.setCurrentXp(newCurrentXp);
        existingUser.setCurrentLevel(currentLevel);
        existingUser.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(existingUser);
    }

    public User incrementStreak(Integer id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        Integer currentStreak = existingUser.getCurrentStreak() != null ? existingUser.getCurrentStreak() : 0;

        if (currentStreak > existingUser.getLongestStreak()) {
            existingUser.setLongestStreak(currentStreak);
        }

        existingUser.setCurrentStreak(currentStreak + 1);
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

        user.setEmail(email);
    }
//
//    public void validatePassword(String password) {
//        if (password == null || password.trim().isEmpty()) {
//            throw new IllegalArgumentException("Password cannot be empty");
//        }
//
//        if (password.length() < 8) {
//            throw new IllegalArgumentException("Password must be at least 8 characters");
//        }
//
//
//    }

    // use commons-validator dependency to validate email format
    private boolean isValidEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }

    private Integer calculateXpNeededForLevel(Integer level) {
        // use simple increment for xp (i.e. level 1 = 50XP, level 2 = 100XP, level 3 = 150XP, etc.)
        return 50 + (level * 50);
    }

}
