package com.github.joshliford.amplifyguitar.dto.response;

public class AuthResponseDTO {

    // token should be sent as Authorization: Bearer <token>
    private String token;
    private String email;

    public AuthResponseDTO(String email, String token) {
        this.email = email;
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
