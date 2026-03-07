package com.github.joshliford.amplifyguitar.dto.response;

import java.time.LocalDateTime;

public class RewardResponseDTO {

    private Integer rewardId;

    private String title;

    private String description;

    private String icon;

    private LocalDateTime earnedAt;

    public RewardResponseDTO(String description, LocalDateTime earnedAt, String icon, Integer rewardId, String title) {
        this.description = description;
        this.earnedAt = earnedAt;
        this.icon = icon;
        this.rewardId = rewardId;
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getEarnedAt() {
        return earnedAt;
    }

    public void setEarnedAt(LocalDateTime earnedAt) {
        this.earnedAt = earnedAt;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getRewardId() {
        return rewardId;
    }

    public void setRewardId(Integer rewardId) {
        this.rewardId = rewardId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
