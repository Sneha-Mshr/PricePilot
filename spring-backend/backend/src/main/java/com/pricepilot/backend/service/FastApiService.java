package com.pricepilot.backend.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

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

    public String search(String query) {

        return client.post()
                .uri("/api/v2/search")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("query", query))
                .retrieve()
                .bodyToMono(String.class)
                .block();

    }

}