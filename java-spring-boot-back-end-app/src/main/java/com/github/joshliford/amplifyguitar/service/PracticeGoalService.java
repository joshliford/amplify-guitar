package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.model.PracticeGoal;
import com.github.joshliford.amplifyguitar.repository.PracticeGoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<PracticeGoal> getAllGoals() {
        return practiceGoalRepository.findAll();
    }

}
