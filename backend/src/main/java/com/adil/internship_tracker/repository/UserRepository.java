package com.adil.internship_tracker.repository;

import com.adil.internship_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    // Custom method to find user by email
    Optional<User> findByEmail(String email);

    // Custom method to check if email already exists
    boolean existsByEmail(String email);
}
