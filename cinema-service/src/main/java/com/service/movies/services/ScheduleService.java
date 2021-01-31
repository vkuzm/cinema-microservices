package com.service.movies.services;

import com.service.movies.dto.ScheduleDto;
import com.service.movies.dto.ScheduleSingleMovieDto;

import java.util.List;

public interface ScheduleService {

  List<ScheduleDto> getSessions();

  List<ScheduleSingleMovieDto> getSessionByMovieId(String movieId);
}
