package com.service.movies.domain;

import com.service.movies.enums.MovieFormat;
import java.time.LocalDate;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cinema")
public class Cinema {

  @Id
  private String id;
  private String movieId;
  private MovieFormat format;
  private LocalDate dateStart;
  private LocalDate dateEnd;
  private boolean upcoming;
  private int watched;
}
