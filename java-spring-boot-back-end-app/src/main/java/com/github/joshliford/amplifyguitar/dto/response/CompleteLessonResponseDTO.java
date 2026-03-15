package com.github.joshliford.amplifyguitar.dto.response;

import java.util.List;

public class CompleteLessonResponseDTO {

    // xp earned for the specific lesson
    private Integer xpEarned;

    // updated lifetime total xp
    private Integer newTotalXp;

    private Integer newLevel;

    private boolean leveledUp;

    private List<RewardResponseDTO> newRewards;

    public CompleteLessonResponseDTO(boolean leveledUp, Integer newLevel, List<RewardResponseDTO> newRewards, Integer newTotalXp, Integer xpEarned) {
        this.leveledUp = leveledUp;
        this.newLevel = newLevel;
        this.newRewards = newRewards;
        this.newTotalXp = newTotalXp;
        this.xpEarned = xpEarned;
    }

    public boolean isLeveledUp() {
        return leveledUp;
    }

    public void setLeveledUp(boolean leveledUp) {
        this.leveledUp = leveledUp;
    }

    public Integer getNewLevel() {
        return newLevel;
    }

    public void setNewLevel(Integer newLevel) {
        this.newLevel = newLevel;
    }

    public List<RewardResponseDTO> getNewRewards() {
        return newRewards;
    }

    public void setNewRewards(List<RewardResponseDTO> newRewards) {
        this.newRewards = newRewards;
    }

    public Integer getNewTotalXp() {
        return newTotalXp;
    }

    public void setNewTotalXp(Integer newTotalXp) {
        this.newTotalXp = newTotalXp;
    }

    public Integer getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(Integer xpEarned) {
        this.xpEarned = xpEarned;
    }
}
