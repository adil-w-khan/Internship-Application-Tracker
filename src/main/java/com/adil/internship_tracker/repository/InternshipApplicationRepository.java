package com.adil.internship_tracker.repository;

import com.adil.internship_tracker.model.InternshipApplication;
import com.adil.internship_tracker.model.InternshipApplication.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InternshipApplicationRepository extends JpaRepository<InternshipApplication, Long> {

    // Find all applications for a specific user
    List<InternshipApplication> findByUserId(Long userId);

    // Find applications by status for a specific user
    List<InternshipApplication> findByUserIdAndStatus(Long userId, ApplicationStatus status);

    // Find applications by company name for a specific user (case-insensitive)
    List<InternshipApplication> findByUserIdAndCompanyNameContainingIgnoreCase(Long userId, String companyName);

    // Count total applications for a user
    long countByUserId(Long userId);

    // Count applications by status for a user
    long countByUserIdAndStatus(Long userId, ApplicationStatus status);
}