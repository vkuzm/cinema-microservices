package com.service.movies.repositories;

import com.service.movies.domain.Cinema;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CinemaRepository extends CrudRepository<Cinema, String> {

  List<Cinema> findAllByUpcomingIsTrue();

  List<Cinema> findAllByUpcomingIsFalseOrderByWatchedDesc(Pageable pageable);

  List<Cinema> findAll();

  Optional<Cinema> findByMovieId(String movieId);

  List<Cinema> findByMovieIdNotContaining(String movieId, Pageable pageable);
}
