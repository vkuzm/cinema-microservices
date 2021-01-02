package com.service.movies.services;

import com.service.movies.dto.CinemaDto;
import com.service.movies.dto.UpcomingCinemaDto;
import java.util.List;
import java.util.Optional;

public interface CinemaService {

  List<UpcomingCinemaDto> getUpcomingMovies();

  List<CinemaDto> getTopMovies();

  List<CinemaDto> getTopCarouselMovies();

  Optional<CinemaDto> getMovieById(String movieId);
}
