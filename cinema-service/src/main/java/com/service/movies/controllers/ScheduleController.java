package com.service.movies.controllers;

import com.service.movies.dto.ScheduleDto;
import com.service.movies.services.ScheduleService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/schedule")
public class ScheduleController {

  private final ScheduleService scheduleService;

  public ScheduleController(ScheduleService schedulerService) {
    this.scheduleService = schedulerService;
  }

  @GetMapping
  public ResponseEntity<List<ScheduleDto>> getSchedule() {
    return ResponseEntity.ok(scheduleService.getSessions());
  }
}
