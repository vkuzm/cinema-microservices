package com.service.movies.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class SchedulerDto {

  private String day;
  private List<SchedulerMovieDto> movies = new ArrayList<>();
}
