package com.service.movies.services;

import com.service.movies.dto.CinemaDto;
import java.util.List;
import java.util.Optional;

public interface CinemaService {

  List<CinemaDto> getRentalMovies();

  List<CinemaDto> getUpcomingMovies();

  List<CinemaDto> getTopMovies();

  Optional<CinemaDto> getMovieById(String movieId);
}
