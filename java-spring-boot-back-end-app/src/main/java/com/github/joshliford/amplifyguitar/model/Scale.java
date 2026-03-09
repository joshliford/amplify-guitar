package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "scales")
public class Scale {

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

    private String tabUrl;

    private String position;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Scale() {

    }

    public Scale(String description, String details, Difficulty difficulty, String imageUrl, String position, String tabUrl, String tips, String title) {
        this.description = description;
        this.details = details;
        this.difficulty = difficulty;
        this.imageUrl = imageUrl;
        this.position = position;
        this.tabUrl = tabUrl;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTabUrl() {
        return tabUrl;
    }

    public void setTabUrl(String tabUrl) {
        this.tabUrl = tabUrl;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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

    public Integer getId() {
        return id;
    }
}
