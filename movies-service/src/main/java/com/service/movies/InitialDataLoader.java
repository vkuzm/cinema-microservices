package com.service.movies;

import com.service.movies.domain.Cinema;
import com.service.movies.domain.Scheduler;
import com.service.movies.domain.SchedulerMovie;
import com.service.movies.domain.Session;
import com.service.movies.enums.MovieFormat;
import com.service.movies.repositories.CinemaRepository;
import com.service.movies.repositories.SchedulerRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class InitialDataLoader implements CommandLineRunner {

  private final CinemaRepository cinemaRepository;
  private final SchedulerRepository schedulerRepository;

  public InitialDataLoader(CinemaRepository cinemaRepository, SchedulerRepository schedulerRepository) {
    this.cinemaRepository = cinemaRepository;
    this.schedulerRepository = schedulerRepository;
  }

  @Override
  public void run(String... args) {
    initScheduler();
    initCinema();
  }

  private void initScheduler() {
    schedulerRepository.deleteAll();

    Session session1 = new Session();
    session1.setSessionId("111");
    session1.setStartTime("15:00");
    session1.setEndTime("17:00");

    Session session2 = new Session();
    session2.setSessionId("222");
    session2.setStartTime("17:00");
    session2.setEndTime("19:00");

    SchedulerMovie movie1 = new SchedulerMovie();
    movie1.setMovieId("284053");
    movie1.getSessions().add(session1);
    movie1.getSessions().add(session2);

    SchedulerMovie movie2 = new SchedulerMovie();
    movie2.setMovieId("315635");
    movie2.getSessions().add(session1);
    movie2.getSessions().add(session2);

    SchedulerMovie movie3 = new SchedulerMovie();
    movie3.setMovieId("283995");
    movie3.getSessions().add(session1);
    movie3.getSessions().add(session2);

    SchedulerMovie movie4 = new SchedulerMovie();
    movie4.setMovieId("263115");
    movie4.getSessions().add(session1);
    movie4.getSessions().add(session2);

    Scheduler scheduler = new Scheduler();
    scheduler.setDay("monday");
    scheduler.getMovies().add(movie1);
    scheduler.getMovies().add(movie2);

    Scheduler scheduler2 = new Scheduler();
    scheduler2.setDay("tuesday");
    scheduler2.getMovies().add(movie1);

    schedulerRepository.save(scheduler);
    schedulerRepository.save(scheduler2);
  }

  private void initCinema() {
    cinemaRepository.deleteAll();

    Cinema cinema1 = new Cinema();
    cinema1.setMovieId("284053");
    cinema1.setFormat(MovieFormat.FORMAT_2D);
    cinema1.setDateStart(LocalDate.now());
    cinema1.setDateEnd(LocalDate.now().plusDays(30));
    cinema1.setUpcoming(true);

    Cinema cinema2 = new Cinema();
    cinema2.setMovieId("315635");
    cinema2.setFormat(MovieFormat.FORMAT_2D);
    cinema2.setDateStart(LocalDate.now());
    cinema2.setDateEnd(LocalDate.now().plusDays(30));

    Cinema cinema3 = new Cinema();
    cinema3.setMovieId("283995");
    cinema3.setFormat(MovieFormat.FORMAT_2D);
    cinema3.setDateStart(LocalDate.now());
    cinema3.setDateEnd(LocalDate.now().plusDays(20));
    cinema3.setUpcoming(false);
    cinema3.setWatched(5);

    Cinema cinema4 = new Cinema();
    cinema4.setMovieId("263115");
    cinema4.setFormat(MovieFormat.FORMAT_3D);
    cinema4.setDateStart(LocalDate.now());
    cinema4.setDateEnd(LocalDate.now().plusDays(30));
    cinema4.setUpcoming(false);
    cinema4.setWatched(10);

    cinemaRepository.save(cinema1);
    cinemaRepository.save(cinema2);
    cinemaRepository.save(cinema3);
    cinemaRepository.save(cinema4);
  }
}
