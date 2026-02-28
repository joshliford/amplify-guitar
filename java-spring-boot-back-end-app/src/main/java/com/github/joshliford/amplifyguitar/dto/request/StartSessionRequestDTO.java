package com.github.joshliford.amplifyguitar.dto.request;

import jakarta.annotation.Nullable;

public class StartSessionRequestDTO {

    @Nullable // set to be nullable if a user does not choose a goal
    private Integer goalId;

    public StartSessionRequestDTO() {

    }

    public StartSessionRequestDTO(Integer goalId) {
        this.goalId = goalId;
    }

    public Integer getGoalId() {
        return goalId;
    }

    public void setGoalId(Integer goalId) {
        this.goalId = goalId;
    }
}
