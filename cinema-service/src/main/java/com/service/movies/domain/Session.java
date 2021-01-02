package com.service.movies.domain;

import java.util.UUID;
import lombok.Data;

@Data
public class Session {

  private String sessionId = UUID.randomUUID().toString();
  private String startTime;
  private String endTime;
}