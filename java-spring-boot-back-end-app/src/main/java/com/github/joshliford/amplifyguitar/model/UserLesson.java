package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_lessons")
public class UserLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    // default to true since record is created on completion
    private boolean completed = true;

    private LocalDateTime completedAt;

    private Integer xpEarned = 0;

    public Lesson getLesson() {
        return lesson;
    }

    public UserLesson() {

    }

    public UserLesson(boolean completed, LocalDateTime completedAt, Lesson lesson, User user, Integer xpEarned) {
        this.completed = completed;
        this.completedAt = completedAt;
        this.lesson = lesson;
        this.user = user;
        this.xpEarned = xpEarned;
    }

    public Integer getId() {
        return id;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Integer getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(Integer xpEarned) {
        this.xpEarned = xpEarned;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
