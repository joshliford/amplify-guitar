package com.github.joshliford.amplifyguitar.dto.response;

public class PracticeGoalResponseDTO {

    private Integer id;

    private String title;

    private Integer xpReward;

    private Integer durationInMinutes;


    public PracticeGoalResponseDTO(Integer durationInMinutes, Integer id, String title, Integer xpReward) {
        this.durationInMinutes = durationInMinutes;
        this.id = id;
        this.title = title;
        this.xpReward = xpReward;
    }

    public Integer getDurationInMinutes() {
        return durationInMinutes;
    }

    public void setDurationInMinutes(Integer durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
