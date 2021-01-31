package com.service.movies.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CinemaDto {

  private String movieId;
  private String image;
  private String name;
  private String description;
  private double rating;
  private LocalDate dateStart;
  private LocalDate dateEnd;
  private int watched;
}
