package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
