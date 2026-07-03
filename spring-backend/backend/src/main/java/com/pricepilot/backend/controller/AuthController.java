package com.pricepilot.backend.controller;

import com.pricepilot.backend.model.User;
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
    public User register(@RequestBody User user) {

        return service.register(user);

    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return service.login(
                user.getEmail(),
                user.getPassword()
        );

    }

    @GetMapping("/ai-health")
    public String aiHealth() {

        return fastApiService.health();

    }

}