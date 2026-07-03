package com.pricepilot.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class FastApiService {

    private final WebClient client;

    public FastApiService() {

        client = WebClient.builder()
                .baseUrl("http://localhost:8000")
                .build();

    }

    public String health() {

        return client.get()
                .uri("/")
                .retrieve()
                .bodyToMono(String.class)
                .block();

    }

}