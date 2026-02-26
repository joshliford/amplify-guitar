package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class ProgressService {

    private final UserRepository userRepository;

    public ProgressService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

    public User updateStreak(Integer id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        LocalDate today = LocalDate.now();
        LocalDate lastLoginDate = existingUser.getLastLoginDate();
        Integer currentStreak = existingUser.getCurrentStreak() != null ? existingUser.getCurrentStreak() : 0;

        // user first login
        if (lastLoginDate == null) {
            existingUser.setLastLoginDate(today);
            existingUser.setCurrentStreak(1);
            existingUser.setLongestStreak(1);
            existingUser.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(existingUser);
        }

        // calculate days between last login and today to determine streak
        long daysSinceLastLogin = ChronoUnit.DAYS.between(lastLoginDate, today);

        if (daysSinceLastLogin == 1) {
            existingUser.setCurrentStreak(currentStreak + 1);
            existingUser.setLastLoginDate(today);
        } else if (daysSinceLastLogin >= 2) {
            existingUser.setCurrentStreak(1);
            existingUser.setLastLoginDate(today);
        } // daysSinceLastLogin == 0 (today so now change in streak)

        // set longest streak (if current streak > longest streak)
        if (existingUser.getCurrentStreak() > existingUser.getLongestStreak()) {
            existingUser.setLongestStreak(existingUser.getCurrentStreak());
        }

        existingUser.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(existingUser);
    }

    private Integer calculateXpNeededForLevel(Integer level) {
        // use simple increment for xp (i.e. level 1 = 50XP, level 2 = 100XP, level 3 = 150XP, etc.)
        return 50 + (level * 50);
    }

}
