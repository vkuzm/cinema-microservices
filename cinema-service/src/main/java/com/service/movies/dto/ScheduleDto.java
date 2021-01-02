package com.service.movies.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ScheduleDto {

  private String day;
  private List<ScheduleMovieDto> movies = new ArrayList<>();
}
