package com.pricepilot.backend.controller;

import com.pricepilot.backend.dto.AuthResponse;
import com.pricepilot.backend.dto.LoginRequest;
import com.pricepilot.backend.dto.RegisterRequest;
import com.pricepilot.backend.service.FastApiService;
import com.pricepilot.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService service;
    private final FastApiService fastApiService;

    public AuthController(UserService service,
                          FastApiService fastApiService) {

        this.service = service;
        this.fastApiService = fastApiService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        return service.register(request);

    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        return service.login(request);

    }

    @GetMapping("/ai-health")
    public String aiHealth() {

        return fastApiService.health();

    }

    @PostMapping("/search")
    public String search(@RequestParam String query) {

        return fastApiService.search(query);

    }

}
