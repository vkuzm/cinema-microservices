package com.service.movies.services;

import com.service.movies.domain.Scheduler;
import com.service.movies.domain.SchedulerMovie;
import com.service.movies.dto.SchedulerDto;
import com.service.movies.dto.SchedulerMovieDto;
import com.service.movies.repositories.SchedulerRepository;
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
public class SchedulerServiceImpl implements SchedulerService {

  private final TmdbApi tmdbApi;
  private final ModelMapper modelMapper;
  private final SchedulerRepository schedulerRepo;

  public SchedulerServiceImpl(TmdbApi tmdbApi, ModelMapper modelMapper,
      SchedulerRepository schedulerRepo) {
    this.tmdbApi = tmdbApi;
    this.modelMapper = modelMapper;
    this.schedulerRepo = schedulerRepo;
  }

  @Override
  public List<SchedulerDto> getSessions() {
    final List<Scheduler> schedulerList = schedulerRepo.findAll();
    final List<SchedulerDto> schedulerDtoList = new ArrayList<>();
    final Map<String, Movie> moviesMap = getDataMovies(schedulerList);

    schedulerList.forEach(scheduler
        -> schedulerDtoList.add(modelMapper.map(scheduler, SchedulerDto.class)));

    for (SchedulerDto scheduler : schedulerDtoList) {
      for (SchedulerMovieDto schedulerMovie : scheduler.getMovies()) {
        if (moviesMap.containsKey(schedulerMovie.getMovieId())) {
          Movie movie = moviesMap.get(schedulerMovie.getMovieId());
          schedulerMovie.setMovieId(String.valueOf(movie.getId()));
          schedulerMovie.setTitle(movie.getTitle());
          schedulerMovie.setDescription(movie.getOverview());
        }
      }
    }
    return schedulerDtoList;
  }

  private Map<String, Movie> getDataMovies(List<Scheduler> schedulerList) {
    final Map<String, Movie> movies = new HashMap<>();
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();

    for (Scheduler scheduler : schedulerList) {
      for (SchedulerMovie schedulerMovie : scheduler.getMovies()) {
        if (!movies.containsKey(schedulerMovie.getMovieId())) {
          Movie movie = tmdbMovies.getMovie(schedulerMovie.getMovieId());
          movies.put(schedulerMovie.getMovieId(), movie);
        }
      }
    }
    return movies;
  }
}
