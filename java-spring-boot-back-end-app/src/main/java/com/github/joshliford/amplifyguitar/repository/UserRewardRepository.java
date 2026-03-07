package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.UserReward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRewardRepository extends JpaRepository<UserReward, Integer> {
    List<UserReward> findByUserId(Integer userId);
}
