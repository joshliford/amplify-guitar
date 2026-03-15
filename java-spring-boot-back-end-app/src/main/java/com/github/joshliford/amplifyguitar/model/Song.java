package com.github.joshliford.amplifyguitar.model;

import jakarta.persistence.*;

@Entity
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String artist;

    private String songKey;

    private String releaseDate;

    private String albumCoverUrl;

    @Column(columnDefinition = "TEXT")
    private String details;

    private String videoUrl;

    private String tabUrl;

    private String chordsUsed;

    private String scalesUsed;

    public Song() {

    }

    public Song(String albumCoverUrl, String artist, String chordsUsed, String details, Integer id, String releaseDate, String scalesUsed, String songKey, String tabUrl, String title, String videoUrl) {
        this.albumCoverUrl = albumCoverUrl;
        this.artist = artist;
        this.chordsUsed = chordsUsed;
        this.details = details;
        this.id = id;
        this.releaseDate = releaseDate;
        this.scalesUsed = scalesUsed;
        this.songKey = songKey;
        this.tabUrl = tabUrl;
        this.title = title;
        this.videoUrl = videoUrl;
    }

    public String getAlbumCoverUrl() {
        return albumCoverUrl;
    }

    public void setAlbumCoverUrl(String albumCoverUrl) {
        this.albumCoverUrl = albumCoverUrl;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getChordsUsed() {
        return chordsUsed;
    }

    public void setChordsUsed(String chordsUsed) {
        this.chordsUsed = chordsUsed;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Integer getId() {
        return id;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getScalesUsed() {
        return scalesUsed;
    }

    public void setScalesUsed(String scalesUsed) {
        this.scalesUsed = scalesUsed;
    }

    public String getSongKey() {
        return songKey;
    }

    public void setSongKey(String songKey) {
        this.songKey = songKey;
    }

    public String getTabUrl() {
        return tabUrl;
    }

    public void setTabUrl(String tabUrl) {
        this.tabUrl = tabUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
