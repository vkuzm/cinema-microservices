package com.service.movies.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "scheduler")
public class Schedule {

  @Id
  private String id;
  private String day;
  private List<ScheduleMovie> movies = new ArrayList<>();
}
