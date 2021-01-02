package com.service.movies.services;

import com.service.movies.domain.Schedule;
import com.service.movies.domain.ScheduleMovie;
import com.service.movies.dto.ScheduleDto;
import com.service.movies.dto.ScheduleMovieDto;
import com.service.movies.repositories.ScheduleRepository;
import com.vkuzmenko.tmdbapi.TmdbApi;
import com.vkuzmenko.tmdbapi.TmdbMovies;
import com.vkuzmenko.tmdbapi.models.Movie;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

  private final TmdbApi tmdbApi;
  private final ModelMapper modelMapper;
  private final ScheduleRepository scheduleRepo;

  public ScheduleServiceImpl(TmdbApi tmdbApi, ModelMapper modelMapper,
      ScheduleRepository scheduleRepo) {
    this.tmdbApi = tmdbApi;
    this.modelMapper = modelMapper;
    this.scheduleRepo = scheduleRepo;
  }

  @Override
  public List<ScheduleDto> getSessions() {
    final List<Schedule> scheduleList = scheduleRepo.findAll();
    final List<ScheduleDto> scheduleDtoList = new ArrayList<>();
    final Map<String, Movie> moviesMap = getDataMovies(scheduleList);

    scheduleList.forEach(scheduler
        -> scheduleDtoList.add(modelMapper.map(scheduler, ScheduleDto.class)));

    for (ScheduleDto schedule : scheduleDtoList) {
      for (ScheduleMovieDto scheduleMovie : schedule.getMovies()) {
        if (moviesMap.containsKey(scheduleMovie.getMovieId())) {
          Movie movie = moviesMap.get(scheduleMovie.getMovieId());
          scheduleMovie.setMovieId(String.valueOf(movie.getId()));
          scheduleMovie.setTitle(movie.getTitle());
          scheduleMovie.setDescription(movie.getOverview());
        }
      }
    }
    return scheduleDtoList;
  }

  private Map<String, Movie> getDataMovies(List<Schedule> schedulerList) {
    final Map<String, Movie> movies = new HashMap<>();
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();

    for (Schedule scheduler : schedulerList) {
      for (ScheduleMovie schedulerMovie : scheduler.getMovies()) {
        if (!movies.containsKey(schedulerMovie.getMovieId())) {
          Movie movie = tmdbMovies.getMovie(schedulerMovie.getMovieId());
          movies.put(schedulerMovie.getMovieId(), movie);
        }
      }
    }
    return movies;
  }
}
