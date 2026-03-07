package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.exception.ResourceNotFoundException;
import com.github.joshliford.amplifyguitar.model.Difficulty;
import com.github.joshliford.amplifyguitar.model.Scale;
import com.github.joshliford.amplifyguitar.repository.ScaleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScaleService {

    private final ScaleRepository scaleRepository;

    public ScaleService(ScaleRepository scaleRepository) {
        this.scaleRepository = scaleRepository;
    }

    public List<Scale> getAllScales() {
        return scaleRepository.findAllByOrderByTitleAsc();
    }

    public List<Scale> getAllScalesByDifficulty(Difficulty difficulty) {
        return scaleRepository.findByDifficultyOrderByTitleAsc(difficulty);
    }

    public Scale getScaleById(Integer id) {
        return scaleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scale not found with id: " + id));
    }

    public Long getTotalScales() {
        return scaleRepository.count();
    }

}
