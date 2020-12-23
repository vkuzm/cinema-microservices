package com.service.movies.controllers;

import com.service.movies.dto.SchedulerDto;
import com.service.movies.services.SchedulerService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scheduler")
public class SchedulerController {

  private final SchedulerService schedulerService;

  public SchedulerController(SchedulerService schedulerService) {
    this.schedulerService = schedulerService;
  }

  @GetMapping
  public ResponseEntity<List<SchedulerDto>> getSessions() {
    return ResponseEntity.ok(schedulerService.getSessions());
  }
}
