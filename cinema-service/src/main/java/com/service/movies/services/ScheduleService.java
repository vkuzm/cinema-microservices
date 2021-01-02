package com.service.movies.services;

import com.service.movies.dto.ScheduleDto;
import java.util.List;

public interface ScheduleService {

  List<ScheduleDto> getSessions();
}
