package com.service.movies.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ScheduleMovieDto {

  private String movieId;
  private String image;
  private String name;
  private double rating;
  private List<SessionDto> sessions = new ArrayList<>();
}
