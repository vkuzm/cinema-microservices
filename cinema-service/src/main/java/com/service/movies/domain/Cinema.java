package com.service.movies.domain;

import java.time.LocalDate;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cinema")
public class Cinema {

  @Transient
  public static final String SEQUENCE_NAME = "cinema_sequence";

  @Id
  private String movieId;
  private String tmdbMovieId;
  private LocalDate dateStart;
  private LocalDate dateEnd;
  private boolean upcoming;
  private int watched;
}
