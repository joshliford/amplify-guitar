package com.github.joshliford.amplifyguitar.service;

import com.github.joshliford.amplifyguitar.dto.response.RewardResponseDTO;
import com.github.joshliford.amplifyguitar.model.Reward;
import com.github.joshliford.amplifyguitar.model.User;
import com.github.joshliford.amplifyguitar.model.UserReward;
import com.github.joshliford.amplifyguitar.repository.RewardRepository;
import com.github.joshliford.amplifyguitar.repository.UserRewardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/*
Core methods:
getEarnedRewards(User user)
getAllRewards()
checkAndAwardRewards(User user)
*/

@Service
public class RewardService {

    private final RewardRepository rewardRepository;
    private final UserRewardRepository userRewardRepository;

    public RewardService(RewardRepository rewardRepository, UserRewardRepository userRewardRepository) {
        this.rewardRepository = rewardRepository;
        this.userRewardRepository = userRewardRepository;
    }

    public List<RewardResponseDTO> getEarnedRewards(User user) {
        List<UserReward> userRewards = userRewardRepository.findByUserId(user.getId());
        return userRewards.stream()
                .map(userReward -> new RewardResponseDTO(
                        userReward.getReward().getDescription(),
                        userReward.getEarnedAt(),
                        userReward.getReward().getIcon(),
                        userReward.getReward().getId(),
                        userReward.getReward().getTitle()
                ))
                .toList();
    }

    public List<RewardResponseDTO> getAllRewards() {
        List<Reward> rewards = rewardRepository.findAll();
        return rewards.stream()
                .map(reward -> new RewardResponseDTO(
                        reward.getDescription(),
                        null, // make earnedAt null since we are just fetching all rewards for the frontend
                        reward.getIcon(),
                        reward.getId(),
                        reward.getTitle()
                ))
                .toList();
    }

    public List<RewardResponseDTO> checkAndAwardRewards(User user) {
        List<Reward> allRewards = rewardRepository.findAll();
        List<UserReward> userRewards = userRewardRepository.findByUserId(user.getId());
        // transform user earned rewards into a set of reward IDs
        Set<Integer> earnedRewardIds = userRewards.stream()
                .map(userReward -> userReward.getReward().getId())
                .collect(Collectors.toSet());
        List<RewardResponseDTO> newRewards = new ArrayList<>();
        for (Reward reward : allRewards) {
            // skips rewards the user already earned
            if (earnedRewardIds.contains(reward.getId())) continue;
            // checks if the user's stats meet requirements (reward condition)
            boolean earned = switch (reward.getRewardCondition()) {
                case LESSON_1 -> user.getLessonsCompleted() >= 1;
                case LESSON_5 -> user.getLessonsCompleted() >= 5;
                case LEVEL_2 -> user.getCurrentLevel() >= 2;
                case LEVEL_5 -> user.getCurrentLevel() >= 5;
                case LEVEL_10 -> user.getCurrentLevel() >= 10;
                case STREAK_3 -> user.getCurrentStreak() >= 3;
                case STREAK_5 -> user.getCurrentStreak() >= 5;
                case XP_100 -> user.getTotalXp() >= 100;
                case XP_500 -> user.getTotalXp() >= 500;
            };
            // if condition is met save earned reward to the user
            if (earned) {
                UserReward userReward = new UserReward(user, reward, LocalDateTime.now());
                userRewardRepository.save(userReward);

                RewardResponseDTO dto = new RewardResponseDTO(
                        userReward.getReward().getDescription(),
                        userReward.getEarnedAt(),
                        userReward.getReward().getIcon(),
                        userReward.getReward().getId(),
                        userReward.getReward().getTitle()
                );
                newRewards.add(dto);
            }
        }
        return newRewards;
    }

}
