package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.response.SongDetailDTO;
import com.github.joshliford.amplifyguitar.dto.response.SongSummaryDTO;
import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.Song;
import com.github.joshliford.amplifyguitar.repository.SongRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    private final SongRepository songRepository;

    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<SongSummaryDTO> getAllSongs() {
        // sort songs by how they're inserted via data.sql
        List<Song> songs = songRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return songs.stream()
                .map(song -> new SongSummaryDTO(
                        song.getAlbumCoverUrl(),
                        song.getArtist(),
                        song.getId(),
                        song.getReleaseDate(),
                        song.getSongKey(),
                        song.getTitle()
                ))
                .toList();
    }

    public SongDetailDTO getSongById(Integer id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Song not found with id: " + id));
        return new SongDetailDTO(
                song.getAlbumCoverUrl(),
                song.getArtist(),
                song.getChordsUsed(),
                song.getDetails(),
                song.getId(),
                song.getReleaseDate(),
                song.getScalesUsed(),
                song.getSongKey(),
                song.getTabUrl(),
                song.getTitle(),
                song.getVideoUrl()
        );

    }

}
