package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String icon;

    @Enumerated(EnumType.STRING)
    private RewardCondition rewardCondition;

    private Integer xpBonus;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Reward() {

    }

    public Reward(LocalDateTime createdAt, String description, String icon, RewardCondition rewardCondition, String title, Integer xpBonus) {
        this.createdAt = createdAt;
        this.description = description;
        this.icon = icon;
        this.rewardCondition = rewardCondition;
        this.title = title;
        this.xpBonus = xpBonus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getId() {
        return id;
    }

    public RewardCondition getRewardCondition() {
        return rewardCondition;
    }

    public void setRewardCondition(RewardCondition rewardCondition) {
        this.rewardCondition = rewardCondition;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getXpBonus() {
        return xpBonus;
    }

    public void setXpBonus(Integer xpBonus) {
        this.xpBonus = xpBonus;
    }
}
