package com.service.movies.controllers;

import com.service.movies.dto.CinemaDto;
import com.service.movies.dto.UpcomingDto;
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
public class CinemaController {

  private final CinemaService cinemaService;

  public CinemaController(CinemaService moviesService) {
    this.cinemaService = moviesService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<CinemaDto> getMovieById(@PathVariable String id) {
    final Optional<CinemaDto> cinemaDto = cinemaService.getById(id);

    if (cinemaDto.isPresent()) {
      return ResponseEntity.ok(cinemaDto.get());
    }
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/upcoming")
  public ResponseEntity<List<UpcomingDto>> getUpcomingMovies() {
    return ResponseEntity.ok(cinemaService.getUpcoming());
  }

  @GetMapping("/top")
  public ResponseEntity<List<CinemaDto>> getTopMovies() {
    return ResponseEntity.ok(cinemaService.getTop());
  }

  @GetMapping("/top-carousel")
  public ResponseEntity<List<CinemaDto>> getTopCarouselMovies() {
    return ResponseEntity.ok(cinemaService.getTopCarousel());
  }
}
