package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.response.PracticeGoalResponseDTO;
import com.github.joshliford.amplifyguitar.repository.PracticeGoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/*
Core method:
getAllGoals()
*/

@Service
public class PracticeGoalService {

    private final PracticeGoalRepository practiceGoalRepository;

    public PracticeGoalService(PracticeGoalRepository practiceGoalRepository) {
        this.practiceGoalRepository = practiceGoalRepository;
    }

    public List<PracticeGoalResponseDTO> getAllGoals() {
        return practiceGoalRepository.findAll()
                .stream()
                .map(practiceGoal -> new PracticeGoalResponseDTO(
                        practiceGoal.getDurationInMinutes(),
                        practiceGoal.getId(),
                        practiceGoal.getTitle(),
                        practiceGoal.getXpReward()
                ))
                .collect(Collectors.toList());
    }

}
