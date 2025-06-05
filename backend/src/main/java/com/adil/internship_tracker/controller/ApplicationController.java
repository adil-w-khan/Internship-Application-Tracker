package com.adil.internship_tracker.controller;

import com.adil.internship_tracker.dto.ApplicationResponse;
import com.adil.internship_tracker.dto.ApplicationRequest;
import com.adil.internship_tracker.model.InternshipApplication;
import com.adil.internship_tracker.model.InternshipApplication.ApplicationStatus;
import com.adil.internship_tracker.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/applications")
@PreAuthorize("isAuthenticated()")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Get all applications for current user
    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {
        try {
            List<InternshipApplication> applications = applicationService.getAllApplications();
            List<ApplicationResponse> response = applications.stream()
                    .map(ApplicationResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getApplicationById(@PathVariable Long id) {
        try {
            InternshipApplication application = applicationService.getApplicationById(id);
            return ResponseEntity.ok(new ApplicationResponse(application));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Create new application
    @PostMapping
    public ResponseEntity<ApplicationResponse> createApplication(@Valid @RequestBody ApplicationRequest request) {
        try {
            InternshipApplication application = new InternshipApplication();
            application.setCompanyName(request.getCompanyName());
            application.setPositionTitle(request.getPositionTitle());
            application.setApplicationDate(request.getApplicationDate());
            application.setStatus(request.getStatus() != null ? request.getStatus() : ApplicationStatus.APPLIED);
            application.setLocation(request.getLocation());
            application.setDescription(request.getDescription());
            application.setSalaryRange(request.getSalaryRange());
            application.setNotes(request.getNotes());

            InternshipApplication savedApplication = applicationService.createApplication(application);
            return ResponseEntity.ok(new ApplicationResponse(savedApplication));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update application
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationResponse> updateApplication(@PathVariable Long id,
                                                                 @Valid @RequestBody ApplicationRequest request) {
        try {
            InternshipApplication application = new InternshipApplication();
            application.setCompanyName(request.getCompanyName());
            application.setPositionTitle(request.getPositionTitle());
            application.setApplicationDate(request.getApplicationDate());
            application.setStatus(request.getStatus());
            application.setLocation(request.getLocation());
            application.setDescription(request.getDescription());
            application.setSalaryRange(request.getSalaryRange());
            application.setNotes(request.getNotes());

            InternshipApplication updatedApplication = applicationService.updateApplication(id, application);
            return ResponseEntity.ok(new ApplicationResponse(updatedApplication));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.ok("{\"message\": \"Application deleted successfully\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get applications by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByStatus(@PathVariable ApplicationStatus status) {
        try {
            List<InternshipApplication> applications = applicationService.getApplicationsByStatus(status);
            List<ApplicationResponse> response = applications.stream()
                    .map(ApplicationResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Search applications by company name
    @GetMapping("/search")
    public ResponseEntity<List<ApplicationResponse>> searchApplications(@RequestParam String company) {
        try {
            List<InternshipApplication> applications = applicationService.searchApplicationsByCompany(company);
            List<ApplicationResponse> response = applications.stream()
                    .map(ApplicationResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get application statistics
    @GetMapping("/stats")
    public ResponseEntity<ApplicationService.ApplicationStats> getApplicationStats() {
        try {
            ApplicationService.ApplicationStats stats = applicationService.getApplicationStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}