package com.service.movies.services;

import com.service.movies.dto.SchedulerDto;
import java.util.List;

public interface SchedulerService {

  List<SchedulerDto> getSessions();
}
