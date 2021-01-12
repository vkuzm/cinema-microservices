package com.service.movies.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class CinemaDto {

  private String movieId;
  private String image;
  private String name;
  private String description;
  private String restriction;
  private double rating;
  private LocalDate dateStart;
  private LocalDate dateEnd;
  private int visited;
}
