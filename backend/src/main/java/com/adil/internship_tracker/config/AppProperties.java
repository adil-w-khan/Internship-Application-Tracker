package com.adil.internship_tracker.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String baseUrl;
    private Jwt jwt = new Jwt();
    private Email email = new Email();
    private Cors cors = new Cors();

    // Getters and setters
    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }

    public Jwt getJwt() { return jwt; }
    public Email getEmail() { return email; }
    public Cors getCors() { return cors; }

    public static class Jwt {
        private String secret;
        private long expiration;

        // Getters and setters
        public String getSecret() { return secret; }
        public void setSecret(String secret) { this.secret = secret; }
        public long getExpiration() { return expiration; }
        public void setExpiration(long expiration) { this.expiration = expiration; }
    }

    public static class Email {
        private String host;
        private int port;
        private String username;
        private String password;

        // Getters and setters
        public String getHost() { return host; }
        public void setHost(String host) { this.host = host; }
        // ... other getters/setters
    }

    public static class Cors {
        private String allowedOrigins;

        public String getAllowedOrigins() { return allowedOrigins; }
        public void setAllowedOrigins(String allowedOrigins) { this.allowedOrigins = allowedOrigins; }
    }
}