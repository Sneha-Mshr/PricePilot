package com.pricepilot.backend.dto;

import com.pricepilot.backend.model.User;

/**
 * What we send back about a user. Deliberately has no password field so the
 * BCrypt hash can never leak into an API response.
 */
public record UserResponse(String id, String name, String email) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
