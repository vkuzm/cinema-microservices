package com.service.movies.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CinemaDetailsDto {

    private String movieId;
    private String image;
    private String name;
    private String description;
    private String release;
    private double rating;
    private String language;
    private List<String> genres = new ArrayList<>();
    private String duration;
    private String production;
    private List<ScheduleSingleMovieDto> schedule = new ArrayList<>();
    private List<CinemaDto> recommendations = new ArrayList<>();
    private int watched;
}
