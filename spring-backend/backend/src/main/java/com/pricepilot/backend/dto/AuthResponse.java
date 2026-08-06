package com.pricepilot.backend.dto;

public record AuthResponse(String token, UserResponse user) {
}
