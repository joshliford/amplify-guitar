package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
public class UserReward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Many rewards can be earned by one user; establishes the owning side of the relationship
    @ManyToOne
    private User user;

    // Many user-reward records can reference the same reward; establishes the owning side of the relationship
    @ManyToOne
    private Reward reward;

    @CreationTimestamp
    private LocalDateTime earnedAt;

    public UserReward() {

    }

    public UserReward(User user, Reward reward) {
        this.user = user;
        this.reward = reward;
    }

    public LocalDateTime getEarnedAt() {
        return earnedAt;
    }

    public void setEarnedAt(LocalDateTime earnedAt) {
        this.earnedAt = earnedAt;
    }

    public Integer getId() {
        return id;
    }

    public Reward getReward() {
        return reward;
    }

    public void setReward(Reward reward) {
        this.reward = reward;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
