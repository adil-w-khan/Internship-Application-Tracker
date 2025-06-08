package com.adil.internship_tracker.config;

import com.adil.internship_tracker.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class SchedulingConfig {

    @Autowired
    private PasswordService passwordService;

    // Run every hour to clean up expired tokens
    @Scheduled(fixedRate = 3600000)
    public void cleanupExpiredTokens() {
        passwordService.cleanupExpiredTokens();
    }
}
