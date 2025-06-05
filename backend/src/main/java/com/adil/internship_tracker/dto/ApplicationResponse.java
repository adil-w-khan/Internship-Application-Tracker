package com.adil.internship_tracker.dto;

import com.adil.internship_tracker.model.InternshipApplication;
import com.adil.internship_tracker.model.InternshipApplication.ApplicationStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ApplicationResponse {
    private Long id;
    private String companyName;
    private String positionTitle;
    private LocalDate applicationDate;
    private ApplicationStatus status;
    private String location;
    private String description;
    private String salaryRange;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor from InternshipApplication entity
    public ApplicationResponse(InternshipApplication application) {
        this.id = application.getId();
        this.companyName = application.getCompanyName();
        this.positionTitle = application.getPositionTitle();
        this.applicationDate = application.getApplicationDate();
        this.status = application.getStatus();
        this.location = application.getLocation();
        this.description = application.getDescription();
        this.salaryRange = application.getSalaryRange();
        this.notes = application.getNotes();
        this.createdAt = application.getCreatedAt();
        this.updatedAt = application.getUpdatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPositionTitle() {
        return positionTitle;
    }

    public void setPositionTitle(String positionTitle) {
        this.positionTitle = positionTitle;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
