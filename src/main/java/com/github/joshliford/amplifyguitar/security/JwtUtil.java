package com.github.joshliford.amplifyguitar.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    // store converted key
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        // validate secret length (>= 32 bytes for HS256 algorithm)
        if (secret == null || secret.isEmpty() || secret.length() < 32) {
            throw new IllegalStateException("JWT secret must be at least 32 characters");
        }
        /*
           Convert secret string to SecretKey object for HMAC-SHA256 operations
           1. getBytes() converts String to byte array
           2. StandardCharsets.UTF_8 ensures consistent encoding
           3. Keys.hmacShaKeyFor() creates the cryptographic key and validates strength
        */
        secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey)
                .compact();
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, String email) {
        return extractEmail(token).equals(email) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return parseClaims(token).getExpiration().before(new Date());
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
