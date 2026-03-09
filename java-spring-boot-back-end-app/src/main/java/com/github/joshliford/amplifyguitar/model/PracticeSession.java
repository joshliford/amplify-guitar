package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "practice_sessions")
public class PracticeSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Many practice sessions can belong to one user; foreign key stored in user_id column
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    // Many practice sessions can target the same goal; foreign key stored in goal_id column
    @ManyToOne
    @JoinColumn(name = "goal_id")
    private PracticeGoal goal;

    private LocalDateTime startedAt;

    private LocalDateTime endedAt;

    private Integer durationInSeconds;

    private Integer xpEarned;

    private boolean completed;

    private String notes;

    public PracticeSession() {

    }

    public PracticeSession(boolean completed, Integer durationInSeconds, LocalDateTime endedAt, PracticeGoal goal, String notes, LocalDateTime startedAt, User user, Integer xpEarned) {
        this.completed = completed;
        this.durationInSeconds = durationInSeconds;
        this.endedAt = endedAt;
        this.goal = goal;
        this.notes = notes;
        this.startedAt = startedAt;
        this.user = user;
        this.xpEarned = xpEarned;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Integer getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(Integer durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public Integer getId() {
        return id;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(Integer xpEarned) {
        this.xpEarned = xpEarned;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public PracticeGoal getGoal() {
        return goal;
    }

    public void setGoal(PracticeGoal goal) {
        this.goal = goal;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
