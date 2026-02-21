package com.github.joshliford.amplifyguitar.repository;

import com.github.joshliford.amplifyguitar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
