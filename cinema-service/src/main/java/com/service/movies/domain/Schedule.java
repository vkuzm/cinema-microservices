package com.service.movies.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "scheduler")
public class Schedule {

  @Id
  private String scheduleId;
  private LocalDate date;
  private List<ScheduleMovie> movies = new ArrayList<>();
}
