package com.pricepilot.backend.service;

import java.util.Optional;

import com.pricepilot.backend.dto.AuthResponse;
import com.pricepilot.backend.dto.LoginRequest;
import com.pricepilot.backend.dto.RegisterRequest;
import com.pricepilot.backend.dto.UserResponse;
import com.pricepilot.backend.exception.ApiException;
import com.pricepilot.backend.model.User;
import com.pricepilot.backend.repository.UserRepository;
import com.pricepilot.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository repository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {

        String name = trimmed(request.name());
        String email = normalisedEmail(request.email());
        String password = request.password();

        if (name.isEmpty() || email.isEmpty() || password == null || password.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Name, email and password are required");
        }

        if (password.length() < 6) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters");
        }

        if (repository.existsByEmail(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "An account with this email already exists");
        }

        User saved = repository.save(
                new User(name, email, passwordEncoder.encode(password))
        );

        return new AuthResponse(
                jwtUtil.generateToken(saved.getEmail()),
                UserResponse.from(saved)
        );
    }

    public AuthResponse login(LoginRequest request) {

        String email = normalisedEmail(request.email());
        String password = request.password();

        if (email.isEmpty() || password == null || password.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }

        Optional<User> optionalUser = repository.findByEmail(email);

        // Same message for an unknown email and a wrong password, so the
        // endpoint can't be used to discover which emails are registered.
        if (optionalUser.isEmpty()
                || !passwordEncoder.matches(password, optionalUser.get().getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        User user = optionalUser.get();

        return new AuthResponse(
                jwtUtil.generateToken(user.getEmail()),
                UserResponse.from(user)
        );
    }

    private String trimmed(String value) {
        return value == null ? "" : value.trim();
    }

    private String normalisedEmail(String email) {
        return trimmed(email).toLowerCase();
    }
}
