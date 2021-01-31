package com.service.movies.services;

import com.service.movies.dto.CinemaDetailsDto;
import com.service.movies.dto.CinemaDto;
import com.service.movies.dto.UpcomingDto;
import java.util.List;
import java.util.Optional;

public interface CinemaService {

  List<UpcomingDto> getUpcoming();

  List<CinemaDto> getTop();

  List<CinemaDto> getTopCarousel();

  Optional<CinemaDetailsDto> getByMovieId(String movieId);

  List<CinemaDto> getAllMovies();
}
