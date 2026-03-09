package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "chords")
public class Chord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String details;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String tips;

    private String imageUrl;

    private String fingerPositions;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Chord() {

    }

    public Chord(String description, String details, Difficulty difficulty, String fingerPositions, String imageUrl, String tips, String title) {
        this.description = description;
        this.details = details;
        this.difficulty = difficulty;
        this.fingerPositions = fingerPositions;
        this.imageUrl = imageUrl;
        this.tips = tips;
        this.title = title;
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

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String getFingerPositions() {
        return fingerPositions;
    }

    public void setFingerPositions(String fingerPositions) {
        this.fingerPositions = fingerPositions;
    }

    public Integer getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
