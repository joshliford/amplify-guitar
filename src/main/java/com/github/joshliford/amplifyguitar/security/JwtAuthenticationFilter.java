package com.github.joshliford.amplifyguitar.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        // extract Auth header from request
        String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwt;

        // check if header exists with Bearer token format
        if (authorizationHeader.startsWith("Bearer ")) {
            // extract token
            jwt = authorizationHeader.substring(7);

            try {
                email = jwtUtil.extractEmail(jwt);
            } catch (Exception exception) {

            }

            // validate token and set authentication if:
                // - Email was extracted successfully
                // - User is not already authenticated
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(email);
                if (jwtUtil.isTokenValid(jwt, email)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, // who is authenticated
                            null, // credentials not needed after authentication succeeds
                            userDetails.getAuthorities() // empty list since we are not using RBAC
                    );
                    // store authentication in SecurityContext (tells Spring Security "user is authenticated")
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    // pass the request to the next filter/controller (required to intercept every HTTP request)
                    filterChain.doFilter(request, response);
                }
            }
        }
    }

}
