package com.service.movies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class SessionQueueDto implements Serializable {

    private String sessionId;
    private String movieId;
}
