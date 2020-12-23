package com.service.movies.domain;

import lombok.Data;

@Data
public class Session {

  private String sessionId;
  private String startTime;
  private String endTime;
}
