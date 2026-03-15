package com.github.joshliford.amplifyguitar.controller;

import com.github.joshliford.amplifyguitar.dto.response.SongDetailDTO;
import com.github.joshliford.amplifyguitar.dto.response.SongSummaryDTO;
import com.github.joshliford.amplifyguitar.service.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
2 endpoints:
GET /api/songs (get all songs for card view)
GET /api/songs/{id} (get song details for detail view)
*/

@RestController
@RequestMapping("/api/songs")
public class SongController {

    final private SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("")
    public ResponseEntity<List<SongSummaryDTO>> getAllSongs() {
        List<SongSummaryDTO> response = songService.getAllSongs();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SongDetailDTO> getSongById(@PathVariable Integer id) {
        SongDetailDTO response = songService.getSongById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
