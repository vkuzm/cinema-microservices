package com.service.movies.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class ScheduleMovie {

  private String movieId;
  private List<Session> sessions = new ArrayList<>();
}
