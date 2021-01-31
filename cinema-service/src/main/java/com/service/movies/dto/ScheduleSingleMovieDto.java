package com.service.movies.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ScheduleSingleMovieDto {
    private String day;
    private List<SessionDto> sessions = new ArrayList<>();
}
