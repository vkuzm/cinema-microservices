package com.service.movies.controllers;

import com.service.movies.dto.CinemaDto;
import com.service.movies.services.CinemaService;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MoviesController {

  private final CinemaService moviesService;

  public MoviesController(CinemaService moviesService) {
    this.moviesService = moviesService;
  }

  @GetMapping("/{movieId}")
  public ResponseEntity<CinemaDto> getMovieById(@PathVariable String movieId) {
    final Optional<CinemaDto> cinemaDto = moviesService.getMovieById(movieId);

    if (cinemaDto.isPresent()) {
      return ResponseEntity.ok(cinemaDto.get());
    }
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/upcoming")
  public ResponseEntity<List<CinemaDto>> getUpcomingMovies() {
    return ResponseEntity.ok(moviesService.getUpcomingMovies());
  }

  @GetMapping("/top")
  public ResponseEntity<List<CinemaDto>> getTopMovies() {
    return ResponseEntity.ok(moviesService.getTopMovies());
  }
}
