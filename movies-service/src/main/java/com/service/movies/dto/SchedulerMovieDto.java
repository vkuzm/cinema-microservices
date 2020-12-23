package com.service.movies.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class SchedulerMovieDto {

  private String movieId;
  private String title;
  private String description;
  private List<SessionDto> sessions = new ArrayList<>();
}
