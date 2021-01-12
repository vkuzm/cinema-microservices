package com.service.movies.services;

import com.service.movies.ImageConstants;
import com.service.movies.domain.Schedule;
import com.service.movies.domain.ScheduleMovie;
import com.service.movies.dto.ScheduleDto;
import com.service.movies.dto.ScheduleMovieDto;
import com.service.movies.dto.SessionDto;
import com.service.movies.repositories.ScheduleRepository;
import com.vkuzmenko.tmdbapi.TmdbApi;
import com.vkuzmenko.tmdbapi.TmdbMovies;
import com.vkuzmenko.tmdbapi.models.Movie;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

  private static final DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm");
  private static final DateTimeFormatter dayFormat = DateTimeFormatter.ofPattern("dd MMMM, E");
  private static final LocalTime currentTime = LocalTime.now();

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
    final Map<String, Movie> moviesData = getDataMovies(scheduleList);
    final List<ScheduleDto> scheduleDtoList = new ArrayList<>();

    scheduleList.forEach(schedule -> {
      final ScheduleDto scheduleDto = modelMapper.map(schedule, ScheduleDto.class);
      scheduleDto.setDay(schedule.getDate().format(dayFormat));
      scheduleDtoList.add(scheduleDto);
    });

    for (ScheduleDto scheduleDto : scheduleDtoList) {
      for (ScheduleMovieDto scheduleMovieDto : scheduleDto.getMovies()) {
        final Movie movie = moviesData.get(scheduleMovieDto.getMovieId());

        if (Objects.nonNull(movie)) {
          scheduleMovieDto.setMovieId(String.valueOf(movie.getId()));
          scheduleMovieDto.setImage(ImageConstants.POSTER_IMAGE_URL + movie.getPosterPath());
          scheduleMovieDto.setName(movie.getTitle());
          scheduleMovieDto.setRating(movie.getVoteAverage());
        }

        // TODO IN BOOKING MICROSERVICE
        for (SessionDto session : scheduleMovieDto.getSessions()) {
          LocalTime sessionTime = LocalTime.from(timeFormat.parse(session.getStartTime()));
          session.setAvailable(currentTime.isBefore(sessionTime));
          session.setEndTime(currentTime.toString());
        }
      }
    }
    return scheduleDtoList;
  }

  private Map<String, Movie> getDataMovies(List<Schedule> schedulerList) {
    final Map<String, Movie> movies = new HashMap<>();
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();

    for (Schedule schedule : schedulerList) {
      for (ScheduleMovie scheduleMovie : schedule.getMovies()) {
        if (!movies.containsKey(scheduleMovie.getMovieId())) {
          final Movie movie = tmdbMovies.getMovie(scheduleMovie.getMovieId());
          movies.put(scheduleMovie.getMovieId(), movie);
        }
      }
    }
    return movies;
  }
}
