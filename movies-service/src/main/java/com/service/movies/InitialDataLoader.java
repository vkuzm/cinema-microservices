package com.service.movies;

import com.service.movies.domain.Cinema;
import com.service.movies.repositories.CinemaRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class InitialDataLoader implements CommandLineRunner {

  private final CinemaRepository cinemaRepository;

  public InitialDataLoader(CinemaRepository cinemaRepository) {
    this.cinemaRepository = cinemaRepository;
  }

  @Override
  public void run(String... args) {
    cinemaRepository.deleteAll();

    Cinema cinema1 = new Cinema();
    cinema1.setMovieId("284053");
    cinema1.setDateStart(LocalDate.now());
    cinema1.setDateEnd(LocalDate.now().plusDays(30));
    cinema1.setBasicPrice(new BigDecimal(100));
    cinema1.setKidsPrice(new BigDecimal(60));
    cinema1.setInRental(true);
    cinema1.setUpcoming(true);
    cinema1.setEvents(Arrays.asList(
        LocalDateTime.now().plusDays(1),
        LocalDateTime.now().plusDays(3),
        LocalDateTime.now().plusDays(5),
        LocalDateTime.now().plusDays(8)
    ));

    Cinema cinema2 = new Cinema();
    cinema2.setMovieId("315635");
    cinema2.setDateStart(LocalDate.now());
    cinema2.setDateEnd(LocalDate.now().plusDays(30));
    cinema2.setBasicPrice(new BigDecimal(90));
    cinema2.setKidsPrice(new BigDecimal(60));
    cinema2.setInRental(true);
    cinema2.setUpcoming(true);
    cinema2.setEvents(Arrays.asList(
        LocalDateTime.now().plusDays(2),
        LocalDateTime.now().plusDays(3),
        LocalDateTime.now().plusDays(8)
    ));

    Cinema cinema3 = new Cinema();
    cinema3.setMovieId("283995");
    cinema3.setDateStart(LocalDate.now());
    cinema3.setDateEnd(LocalDate.now().plusDays(20));
    cinema3.setBasicPrice(new BigDecimal(110));
    cinema3.setKidsPrice(new BigDecimal(60));
    cinema3.setInRental(true);
    cinema3.setUpcoming(false);
    cinema3.setWatched(5);
    cinema3.setEvents(Arrays.asList(
        LocalDateTime.now().plusDays(3),
        LocalDateTime.now().plusDays(5),
        LocalDateTime.now().plusDays(8),
        LocalDateTime.now().plusDays(10)
    ));

    Cinema cinema4 = new Cinema();
    cinema4.setMovieId("263115");
    cinema4.setDateStart(LocalDate.now());
    cinema4.setDateEnd(LocalDate.now().plusDays(30));
    cinema4.setBasicPrice(new BigDecimal(70));
    cinema4.setKidsPrice(new BigDecimal(40));
    cinema4.setInRental(false);
    cinema4.setUpcoming(false);
    cinema4.setWatched(10);
    cinema4.setEvents(Arrays.asList(
        LocalDateTime.now().plusDays(1),
        LocalDateTime.now().plusDays(2),
        LocalDateTime.now().plusDays(3),
        LocalDateTime.now().plusDays(4)
    ));

    cinemaRepository.save(cinema1);
    cinemaRepository.save(cinema2);
    cinemaRepository.save(cinema3);
    cinemaRepository.save(cinema4);
  }
}
