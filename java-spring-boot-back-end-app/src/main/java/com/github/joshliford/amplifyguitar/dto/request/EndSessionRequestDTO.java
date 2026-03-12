package com.github.joshliford.amplifyguitar.dto.request;

public class EndSessionRequestDTO {

    private String notes;

    private Integer durationInSeconds;

    public EndSessionRequestDTO() {

    }

    public EndSessionRequestDTO(String notes, Integer durationInSeconds) {
        this.notes = notes;
        this.durationInSeconds = durationInSeconds;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getDurationInSeconds() {
        return durationInSeconds;
    }

    public void setDurationInSeconds(Integer durationInSeconds) {
        this.durationInSeconds = durationInSeconds;
    }
}
