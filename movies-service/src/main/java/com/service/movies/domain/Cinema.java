package com.service.movies.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cinema")
public class Cinema {

  @Id
  private String id;
  private String movieId;
  private LocalDate dateStart;
  private LocalDate dateEnd;
  private BigDecimal basicPrice;
  private BigDecimal kidsPrice;
  private boolean inRental;
  private boolean upcoming;
  private int watched;
  private List<LocalDateTime> events = new ArrayList<>();
}
