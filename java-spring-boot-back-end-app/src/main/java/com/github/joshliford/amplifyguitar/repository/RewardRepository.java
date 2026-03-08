package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardRepository extends JpaRepository<Reward, Integer> {
}
