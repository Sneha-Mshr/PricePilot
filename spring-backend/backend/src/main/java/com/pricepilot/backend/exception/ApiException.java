package com.pricepilot.backend.exception;

import org.springframework.http.HttpStatus;

/**
 * An error we want the client to see, with a real status code and message,
 * instead of a bare 500.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
