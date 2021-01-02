package com.service.movies.dto;

import com.vkuzmenko.tmdbapi.models.Movie;
import java.time.LocalDate;
import lombok.Data;

@Data
public class CinemaDto {

  private String movieId;
  private String format;
  private LocalDate dateStart;
  private LocalDate dateEnd;
  private int watched;
  private Movie movie;
}
