package com.service.movies.dto;

import lombok.Data;

@Data
public class SessionDto {

  private String sessionId;
  private String startTime;
  private String endTime;
}
