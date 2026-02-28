package com.github.joshliford.amplifyguitar.dto.response;

import com.github.joshliford.amplifyguitar.model.Difficulty;

public class LessonResponseDTO {

    private String title;

    private String description;

    private Integer xpReward;

    private Integer lessonNumber;

    private Integer requiredLevel;

    private Difficulty difficulty;

    private String content;

    private String videoUrl;

    private boolean completed;

    private boolean locked;

    public LessonResponseDTO(boolean completed, Difficulty difficulty, String content, String description, Integer lessonNumber, boolean locked, Integer requiredLevel, String title, String videoUrl, Integer xpReward) {
        this.completed = completed;
        this.difficulty = difficulty;
        this.content = content;
        this.description = description;
        this.lessonNumber = lessonNumber;
        this.locked = locked;
        this.requiredLevel = requiredLevel;
        this.title = title;
        this.videoUrl = videoUrl;
        this.xpReward = xpReward;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLessonNumber() {
        return lessonNumber;
    }

    public void setLessonNumber(Integer lessonNumber) {
        this.lessonNumber = lessonNumber;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Integer getRequiredLevel() {
        return requiredLevel;
    }

    public void setRequiredLevel(Integer requiredLevel) {
        this.requiredLevel = requiredLevel;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getXpReward() {
        return xpReward;
    }

    public void setXpReward(Integer xpReward) {
        this.xpReward = xpReward;
    }
}
