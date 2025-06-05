package com.adil.internship_tracker.service;

import com.adil.internship_tracker.model.InternshipApplication;
import com.adil.internship_tracker.model.InternshipApplication.ApplicationStatus;
import com.adil.internship_tracker.model.User;
import com.adil.internship_tracker.repository.InternshipApplicationRepository;
import com.adil.internship_tracker.repository.UserRepository;
import com.adil.internship_tracker.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private InternshipApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    // Get current authenticated user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get all applications for current user
    public List<InternshipApplication> getAllApplications() {
        User currentUser = getCurrentUser();
        return applicationRepository.findByUserId(currentUser.getId());
    }

    // Get application by ID (only if it belongs to current user)
    public InternshipApplication getApplicationById(Long id) {
        User currentUser = getCurrentUser();

        InternshipApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

        // Check if application belongs to current user
        if (!application.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied: Application does not belong to current user");
        }

        return application;
    }

    // Create new application
    public InternshipApplication createApplication(InternshipApplication application) {
        User currentUser = getCurrentUser();
        application.setUser(currentUser);
        return applicationRepository.save(application);
    }

    // Update existing application
    public InternshipApplication updateApplication(Long id, InternshipApplication updatedApplication) {
        InternshipApplication existingApplication = getApplicationById(id); // This checks ownership

        // Update fields
        existingApplication.setCompanyName(updatedApplication.getCompanyName());
        existingApplication.setPositionTitle(updatedApplication.getPositionTitle());
        existingApplication.setApplicationDate(updatedApplication.getApplicationDate());
        existingApplication.setStatus(updatedApplication.getStatus());
        existingApplication.setLocation(updatedApplication.getLocation());
        existingApplication.setDescription(updatedApplication.getDescription());
        existingApplication.setSalaryRange(updatedApplication.getSalaryRange());
        existingApplication.setNotes(updatedApplication.getNotes());

        return applicationRepository.save(existingApplication);
    }

    // Delete application
    public void deleteApplication(Long id) {
        InternshipApplication application = getApplicationById(id); // This checks ownership
        applicationRepository.delete(application);
    }

    // Get applications by status
    public List<InternshipApplication> getApplicationsByStatus(ApplicationStatus status) {
        User currentUser = getCurrentUser();
        return applicationRepository.findByUserIdAndStatus(currentUser.getId(), status);
    }

    // Search applications by company name
    public List<InternshipApplication> searchApplicationsByCompany(String companyName) {
        User currentUser = getCurrentUser();
        return applicationRepository.findByUserIdAndCompanyNameContainingIgnoreCase(currentUser.getId(), companyName);
    }

    // Get application statistics
    public ApplicationStats getApplicationStats() {
        User currentUser = getCurrentUser();
        Long userId = currentUser.getId();

        long totalApplications = applicationRepository.countByUserId(userId);
        long appliedCount = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.APPLIED);
        long interviewCount = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.INTERVIEW) +
                applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.PHONE_SCREEN) +
                applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.TECHNICAL_INTERVIEW) +
                applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.FINAL_INTERVIEW);
        long offerCount = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.OFFER);
        long rejectedCount = applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.REJECTED);

        return new ApplicationStats(totalApplications, appliedCount, interviewCount, offerCount, rejectedCount);
    }

    // Inner class for application statistics
    public static class ApplicationStats {
        private long totalApplications;
        private long appliedCount;
        private long interviewCount;
        private long offerCount;
        private long rejectedCount;

        public ApplicationStats(long totalApplications, long appliedCount, long interviewCount, long offerCount, long rejectedCount) {
            this.totalApplications = totalApplications;
            this.appliedCount = appliedCount;
            this.interviewCount = interviewCount;
            this.offerCount = offerCount;
            this.rejectedCount = rejectedCount;
        }

        // Getters
        public long getTotalApplications() { return totalApplications; }
        public long getAppliedCount() { return appliedCount; }
        public long getInterviewCount() { return interviewCount; }
        public long getOfferCount() { return offerCount; }
        public long getRejectedCount() { return rejectedCount; }
    }
}
