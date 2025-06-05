package com.adil.internship_tracker.dto;

import com.adil.internship_tracker.model.InternshipApplication.ApplicationStatus;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class ApplicationRequest {
    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Position title is required")
    private String positionTitle;

    private LocalDate applicationDate;
    private ApplicationStatus status;
    private String location;
    private String description;
    private String salaryRange;
    private String notes;

    // Constructors
    public ApplicationRequest() {}

    // Getters and Setters
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
}