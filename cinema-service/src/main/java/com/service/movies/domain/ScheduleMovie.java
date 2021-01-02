package com.service.movies.domain;

import com.service.movies.enums.MovieFormat;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ScheduleMovie {

  private String movieId;
  private MovieFormat format;
  private List<Session> sessions = new ArrayList<>();
}
