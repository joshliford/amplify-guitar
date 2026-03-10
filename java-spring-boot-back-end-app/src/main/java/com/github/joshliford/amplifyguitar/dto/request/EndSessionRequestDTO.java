package com.github.joshliford.amplifyguitar.dto.request;

public class EndSessionRequestDTO {

    private String notes;

    public EndSessionRequestDTO() {

    }

    public EndSessionRequestDTO(String notes) {
        this.notes = notes;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
