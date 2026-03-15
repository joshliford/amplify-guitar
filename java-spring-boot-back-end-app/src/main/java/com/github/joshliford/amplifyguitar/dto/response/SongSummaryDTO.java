package com.github.joshliford.amplifyguitar.dto.response;

// returns song summary for card view
public class SongSummaryDTO {

    private Integer id;

    private String title;

    private String artist;

    private String songKey;

    private String releaseDate;

    private String albumCoverUrl;

    public SongSummaryDTO(String albumCoverUrl, String artist, Integer id, String releaseDate, String songKey, String title) {
        this.albumCoverUrl = albumCoverUrl;
        this.artist = artist;
        this.id = id;
        this.releaseDate = releaseDate;
        this.songKey = songKey;
        this.title = title;
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

    public Integer getId() {
        return id;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getSongKey() {
        return songKey;
    }

    public void setSongKey(String songKey) {
        this.songKey = songKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
