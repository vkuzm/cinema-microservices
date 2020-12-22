package com.service.movies.dto;

import com.service.movies.domain.Cinema;
import com.vkuzmenko.tmdbapi.models.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CinemaDto {

  private Cinema cinema;
  private Movie movie;
}
