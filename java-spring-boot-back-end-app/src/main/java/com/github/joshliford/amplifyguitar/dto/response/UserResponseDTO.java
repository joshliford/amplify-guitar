package com.github.joshliford.amplifyguitar.dto.response;

import java.time.LocalDate;

public class UserResponseDTO {

    private String displayName;

    private Integer currentLevel;

    private Integer currentStreak;

    private Integer longestStreak;

    private String currentTitle;

    private Integer currentXp;

    private Integer totalXp;

    private Integer lessonsCompleted;

    private LocalDate lastLoginDate;

    public UserResponseDTO(Integer currentLevel, Integer currentStreak, String currentTitle, Integer currentXp, String displayName, LocalDate lastLoginDate, Integer lessonsCompleted, Integer longestStreak, Integer totalXp) {
        this.currentLevel = currentLevel;
        this.currentStreak = currentStreak;
        this.currentTitle = currentTitle;
        this.currentXp = currentXp;
        this.displayName = displayName;
        this.lastLoginDate = lastLoginDate;
        this.lessonsCompleted = lessonsCompleted;
        this.longestStreak = longestStreak;
        this.totalXp = totalXp;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Integer getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }

    public Integer getCurrentXp() {
        return currentXp;
    }

    public void setCurrentXp(Integer currentXp) {
        this.currentXp = currentXp;
    }

    public String getCurrentTitle() {
        return currentTitle;
    }

    public void setCurrentTitle(String currentTitle) {
        this.currentTitle = currentTitle;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public LocalDate getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(LocalDate lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public Integer getLessonsCompleted() {
        return lessonsCompleted;
    }

    public void setLessonsCompleted(Integer lessonsCompleted) {
        this.lessonsCompleted = lessonsCompleted;
    }

    public Integer getLongestStreak() {
        return longestStreak;
    }

    public void setLongestStreak(Integer longestStreak) {
        this.longestStreak = longestStreak;
    }

    public Integer getTotalXp() {
        return totalXp;
    }

    public void setTotalXp(Integer totalXp) {
        this.totalXp = totalXp;
    }
}
