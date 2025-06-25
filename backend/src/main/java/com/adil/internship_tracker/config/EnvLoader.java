package com.adil.internship_tracker.config;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;

@Component
public class EnvLoader {

    @PostConstruct
    public void loadEnvironmentVariables() {
        String envFile = ".env";

        try (BufferedReader reader = new BufferedReader(new FileReader(envFile))) {
            String line;
            int count = 0;

            while ((line = reader.readLine()) != null) {
                line = line.trim();

                // Skip empty lines and comments
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }

                // Parse KEY=VALUE
                int equalIndex = line.indexOf('=');
                if (equalIndex > 0) {
                    String key = line.substring(0, equalIndex).trim();
                    String value = line.substring(equalIndex + 1).trim();

                    // Remove quotes if present
                    if ((value.startsWith("\"") && value.endsWith("\"")) ||
                            (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.substring(1, value.length() - 1);
                    }

                    System.setProperty(key, value);
                    count++;
                }
            }

            System.out.println("✅ Successfully loaded " + count + " environment variables from .env");
            System.out.println("📄 DATABASE_USERNAME: " + System.getProperty("DATABASE_USERNAME"));
            System.out.println("📄 DATABASE_PASSWORD: " + (System.getProperty("DATABASE_PASSWORD") != null ? "***" : "NOT SET"));

        } catch (IOException e) {
            System.err.println("❌ Could not read .env file: " + e.getMessage());
            System.err.println("📂 Looking for .env in: " + Paths.get(".env").toAbsolutePath());
        }
    }
}