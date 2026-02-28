package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/*
2 methods:
addXp(Integer id, Integer xpAmount)
updateStreak(User user)
*/

@Service
public class ProgressService {

    private final UserRepository userRepository;

    public ProgressService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addXp(Integer id, Integer xpAmount) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (xpAmount <= 0) {
            throw new IllegalArgumentException("XP amount must be positive");
        }

        // get current values
        Integer currentXp = user.getCurrentXp() != null ? user.getCurrentXp() : 0;
        Integer currentTotalXp = user.getTotalXp() != null ? user.getTotalXp() : 0;
        Integer currentLevel = user.getCurrentLevel() != null ? user.getCurrentLevel() : 1;

        // add xp amount to both totals
        user.setTotalXp(currentTotalXp + xpAmount);
        Integer newCurrentXp = currentXp + xpAmount;

        // check for user level up
        Integer xpNeededForNextLevel = calculateXpNeededForLevel(currentLevel + 1);

        while (newCurrentXp >= xpNeededForNextLevel ) {
            currentLevel++;
            newCurrentXp -= xpNeededForNextLevel;
            xpNeededForNextLevel = calculateXpNeededForLevel(currentLevel + 1);
        }

        user.setCurrentXp(newCurrentXp);
        user.setCurrentLevel(currentLevel);
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public User updateStreak(User user) {

        LocalDate today = LocalDate.now();
        LocalDate lastLoginDate = user.getLastLoginDate();
        Integer currentStreak = user.getCurrentStreak() != null ? user.getCurrentStreak() : 0;

        // user first login
        if (lastLoginDate == null) {
            user.setLastLoginDate(today);
            user.setCurrentStreak(1);
            user.setLongestStreak(1);
            user.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(user);
        }

        // streak logic:
        // null: first login = set to 1
        // 0 days: same day = no change
        // 1 day: consecutive login = increment
        // 2+ days: streak broken = reset to 1

        // calculate days between last login and today to determine streak
        long daysSinceLastLogin = ChronoUnit.DAYS.between(lastLoginDate, today);

        if (daysSinceLastLogin == 1) {
            user.setCurrentStreak(currentStreak + 1);
            user.setLastLoginDate(today);
        } else if (daysSinceLastLogin >= 2) {
            user.setCurrentStreak(1);
            user.setLastLoginDate(today);
        } // daysSinceLastLogin == 0 (today so no change in streak)

        // set longest streak (if current streak > longest streak)
        if (user.getCurrentStreak() > user.getLongestStreak()) {
            user.setLongestStreak(user.getCurrentStreak());
        }

        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    private Integer calculateXpNeededForLevel(Integer level) {
        // use simple increment for xp (i.e. level 1 = 50XP, level 2 = 100XP, level 3 = 150XP, etc.)
        return 50 + (level * 50);
    }

}
