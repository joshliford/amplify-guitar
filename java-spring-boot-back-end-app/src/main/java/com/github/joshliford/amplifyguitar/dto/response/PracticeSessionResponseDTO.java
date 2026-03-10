package com.github.joshliford.amplifyguitar.dto.response;

import java.time.LocalDateTime;

public class PracticeSessionResponseDTO {

    private Integer id;

    private LocalDateTime startedAt;

    private LocalDateTime endedAt;

    private Integer xpEarned;

    private Integer durationInSeconds;

    private boolean completed;

    private String notes;

    private String goalTitle;

    private Integer goalXpReward;

    public PracticeSessionResponseDTO(Integer durationInSeconds, boolean completed, LocalDateTime endedAt, String goalTitle, Integer goalXpReward, Integer id, String notes, LocalDateTime startedAt, Integer xpEarned) {
        this.durationInSeconds = durationInSeconds;
        this.completed = completed;
        this.endedAt = endedAt;
        this.goalTitle = goalTitle;
        this.goalXpReward = goalXpReward;
        this.id = id;
        this.notes = notes;
        this.startedAt = startedAt;
        this.xpEarned = xpEarned;
    }

    public Integer getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(Integer durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public String getGoalTitle() {
        return goalTitle;
    }

    public void setGoalTitle(String goalTitle) {
        this.goalTitle = goalTitle;
    }

    public Integer getGoalXpReward() {
        return goalXpReward;
    }

    public void setGoalXpReward(Integer goalXpReward) {
        this.goalXpReward = goalXpReward;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public Integer getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(Integer xpEarned) {
        this.xpEarned = xpEarned;
    }
}
