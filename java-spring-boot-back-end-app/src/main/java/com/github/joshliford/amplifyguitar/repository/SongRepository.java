package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Integer> {
}
