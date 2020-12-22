package com.service.movies.services;

import com.service.movies.domain.Cinema;
import com.service.movies.dto.CinemaDto;
import com.service.movies.repositories.CinemaRepository;
import com.vkuzmenko.tmdbapi.TmdbApi;
import com.vkuzmenko.tmdbapi.TmdbMovies;
import com.vkuzmenko.tmdbapi.models.Movie;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CinemaServiceImpl implements CinemaService {

  private final CinemaRepository cinemaRepository;
  private final TmdbApi tmdbApi;

  public CinemaServiceImpl(CinemaRepository cinemaRepository, TmdbApi tmdbApi) {
    this.cinemaRepository = cinemaRepository;
    this.tmdbApi = tmdbApi;
  }

  @Override
  public List<CinemaDto> getRentalMovies() {
    final List<Cinema> cinemaList = cinemaRepository.findAllByInRentalIsTrue();
    return convertToCinemaDtoList(cinemaList);
  }

  @Override
  public List<CinemaDto> getUpcomingMovies() {
    final List<Cinema> cinemaList = cinemaRepository.findAllByUpcomingIsTrue();
    return convertToCinemaDtoList(cinemaList);
  }

  @Override
  public List<CinemaDto> getTopMovies() {
    final List<Cinema> cinemaList = cinemaRepository.findAllByOrderByWatchedDesc(PageRequest.of(0,10));
    return convertToCinemaDtoList(cinemaList);
  }

  @Override
  public Optional<CinemaDto> getMovieById(String movieId) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final Optional<Cinema> cinema = cinemaRepository.findByMovieId(movieId);

    if (cinema.isPresent()) {
      final Movie movie = tmdbMovies.getMovie(cinema.get().getMovieId());
      return Optional.of(new CinemaDto(cinema.get(), movie));
    }
    return Optional.empty();
  }

  private List<CinemaDto> convertToCinemaDtoList(List<Cinema> cinemaList) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final List<CinemaDto> cinemaDtoList = new ArrayList<>();

    for (Cinema cinema : cinemaList) {
      final Movie movie = tmdbMovies.getMovie(cinema.getMovieId());
      cinemaDtoList.add(new CinemaDto(cinema, movie));
    }
    return cinemaDtoList;
  }
}