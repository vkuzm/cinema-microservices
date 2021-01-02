package com.service.movies.repositories;

import com.service.movies.domain.Cinema;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface CinemaRepository extends CrudRepository<Cinema, String> {

  List<Cinema> findAllByUpcomingIsTrue();

  List<Cinema> findAllByUpcomingIsFalseOrderByWatchedDesc(Pageable pageable);

  Optional<Cinema> findByMovieId(String movieId);
}
