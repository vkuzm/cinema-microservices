package com.service.movies;

import com.service.movies.domain.Cinema;
import com.service.movies.domain.Schedule;
import com.service.movies.domain.ScheduleMovie;
import com.service.movies.domain.Session;
import com.service.movies.repositories.CinemaRepository;
import com.service.movies.repositories.ScheduleRepository;
import com.service.movies.services.SequenceGeneratorService;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class InitialDataLoader implements CommandLineRunner {

    private final CinemaRepository cinemaRepository;
    private final ScheduleRepository scheduleRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    private String movieId1;
    private String movieId2;
    private String movieId3;
    private String movieId4;
    private String movieId5;
    private String movieId6;
    private String movieId7;
    private String movieId8;
    private String movieId9;
    private String movieId10;
    private String movieId11;
    private String movieId12;
    private String movieId13;
    private String movieId14;

    public InitialDataLoader(CinemaRepository cinemaRepository, ScheduleRepository scheduleRepository,
                             SequenceGeneratorService sequenceGeneratorService) {
        this.cinemaRepository = cinemaRepository;
        this.scheduleRepository = scheduleRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    @Override
    public void run(String... args) {
        sequenceGeneratorService.resetSequence(Cinema.SEQUENCE_NAME);
        initSequences();
        initSchedule();
        initTopWatchedCinema();
        initUpcomingCinema();
    }

    private void initSequences() {
        movieId1 = generateCinemaSequence();
        movieId2 = generateCinemaSequence();
        movieId3 = generateCinemaSequence();
        movieId4 = generateCinemaSequence();
        movieId5 = generateCinemaSequence();
        movieId6 = generateCinemaSequence();
        movieId7 = generateCinemaSequence();
        movieId8 = generateCinemaSequence();
        movieId9 = generateCinemaSequence();
        movieId10 = generateCinemaSequence();
        movieId11 = generateCinemaSequence();
        movieId12 = generateCinemaSequence();
        movieId13 = generateCinemaSequence();
        movieId14 = generateCinemaSequence();
    }

    private void initSchedule() {
        scheduleRepository.deleteAll();

        ScheduleMovie movie1 = new ScheduleMovie();
        movie1.setMovieId(movieId1);
        movie1.getSessions().add(createSession("09:00"));
        movie1.getSessions().add(createSession("16:20"));
        movie1.getSessions().add(createSession("22:10"));

        ScheduleMovie movie11 = new ScheduleMovie();
        movie11.setMovieId(movieId1);
        movie11.getSessions().add(createSession("08:00"));
        movie11.getSessions().add(createSession("20:20"));

        ScheduleMovie movie2 = new ScheduleMovie();
        movie2.setMovieId(movieId2);
        movie2.getSessions().add(createSession("11:00"));
        movie2.getSessions().add(createSession("18:30"));
        movie2.getSessions().add(createSession("00:00"));

        ScheduleMovie movie3 = new ScheduleMovie();
        movie3.setMovieId(movieId3);
        movie3.getSessions().add(createSession("10:10"));
        movie3.getSessions().add(createSession("20:00"));

        ScheduleMovie movie4 = new ScheduleMovie();
        movie4.setMovieId(movieId4);
        movie4.getSessions().add(createSession("12:00"));
        movie4.getSessions().add(createSession("21:00"));

        ScheduleMovie movie5 = new ScheduleMovie();
        movie5.setMovieId(movieId5);
        movie5.getSessions().add(createSession("13:30"));
        movie5.getSessions().add(createSession("17:00"));

        ScheduleMovie movie6 = new ScheduleMovie();
        movie6.setMovieId(movieId6);
        movie6.getSessions().add(createSession("12:00"));
        movie6.getSessions().add(createSession("21:00"));

        ScheduleMovie movie7 = new ScheduleMovie();
        movie7.setMovieId(movieId7);
        movie7.getSessions().add(createSession("10:10"));
        movie7.getSessions().add(createSession("23:00"));

        ScheduleMovie movie8 = new ScheduleMovie();
        movie8.setMovieId(movieId8);
        movie8.getSessions().add(createSession("15:00"));
        movie8.getSessions().add(createSession("09:00"));

        Schedule schedule1 = new Schedule();
        schedule1.setDate(LocalDate.now().plusDays(0));
        schedule1.getMovies().add(movie1);
        schedule1.getMovies().add(movie2);
        schedule1.getMovies().add(movie3);
        schedule1.getMovies().add(movie4);
        schedule1.getMovies().add(movie5);
        schedule1.getMovies().add(movie6);
        schedule1.getMovies().add(movie7);
        schedule1.getMovies().add(movie8);

        Schedule schedule2 = new Schedule();
        schedule2.setDate(LocalDate.now().plusDays(1));
        schedule2.getMovies().add(movie2);
        schedule2.getMovies().add(movie3);
        schedule2.getMovies().add(movie6);
        schedule2.getMovies().add(movie7);
        schedule2.getMovies().add(movie8);

        Schedule schedule3 = new Schedule();
        schedule3.setDate(LocalDate.now().plusDays(2));
        schedule3.getMovies().add(movie2);
        schedule3.getMovies().add(movie3);
        schedule3.getMovies().add(movie4);
        schedule3.getMovies().add(movie5);
        schedule3.getMovies().add(movie6);
        schedule3.getMovies().add(movie7);

        Schedule schedule4 = new Schedule();
        schedule4.setDate(LocalDate.now().plusDays(3));
        schedule4.getMovies().add(movie11);
        schedule4.getMovies().add(movie4);
        schedule4.getMovies().add(movie2);
        schedule4.getMovies().add(movie3);
        schedule4.getMovies().add(movie6);
        schedule4.getMovies().add(movie7);
        schedule4.getMovies().add(movie8);

        Schedule schedule5 = new Schedule();
        schedule5.setDate(LocalDate.now().plusDays(4));
        schedule5.getMovies().add(movie1);
        schedule5.getMovies().add(movie2);
        schedule5.getMovies().add(movie3);
        schedule5.getMovies().add(movie4);
        schedule5.getMovies().add(movie5);
        schedule5.getMovies().add(movie6);
        schedule5.getMovies().add(movie7);

        Schedule schedule6 = new Schedule();
        schedule6.setDate(LocalDate.now().plusDays(5));
        schedule6.getMovies().add(movie2);
        schedule6.getMovies().add(movie3);
        schedule6.getMovies().add(movie4);
        schedule6.getMovies().add(movie5);
        schedule6.getMovies().add(movie6);
        schedule6.getMovies().add(movie7);
        schedule6.getMovies().add(movie8);

        Schedule schedule7 = new Schedule();
        schedule7.setDate(LocalDate.now().plusDays(6));
        schedule7.getMovies().add(movie1);
        schedule7.getMovies().add(movie2);
        schedule7.getMovies().add(movie3);

        scheduleRepository.save(schedule1);
        scheduleRepository.save(schedule2);
        scheduleRepository.save(schedule3);
        scheduleRepository.save(schedule4);
        scheduleRepository.save(schedule5);
        scheduleRepository.save(schedule6);
        scheduleRepository.save(schedule7);
    }

    private void initTopWatchedCinema() {
        cinemaRepository.deleteAll();

        Cinema cinema1 = new Cinema();
        cinema1.setMovieId(movieId1);
        cinema1.setTmdbMovieId("284053");
        cinema1.setWatched(5);

        Cinema cinema2 = new Cinema();
        cinema2.setMovieId(movieId2);
        cinema2.setTmdbMovieId("315635");
        cinema2.setWatched(1);

        Cinema cinema3 = new Cinema();
        cinema3.setMovieId(movieId3);
        cinema3.setTmdbMovieId("283995");
        cinema3.setWatched(5);

        Cinema cinema4 = new Cinema();
        cinema4.setMovieId(movieId4);
        cinema4.setTmdbMovieId("263115");
        cinema4.setWatched(8);

        Cinema cinema5 = new Cinema();
        cinema5.setMovieId(movieId5);
        cinema5.setTmdbMovieId("271110");
        cinema5.setWatched(56);

        Cinema cinema6 = new Cinema();
        cinema6.setMovieId(movieId6);
        cinema6.setTmdbMovieId("293660");
        cinema6.setWatched(33);

        Cinema cinema7 = new Cinema();
        cinema7.setMovieId(movieId7);
        cinema7.setTmdbMovieId("166424");
        cinema7.setWatched(80);

        cinemaRepository.save(cinema1);
        cinemaRepository.save(cinema2);
        cinemaRepository.save(cinema3);
        cinemaRepository.save(cinema4);
        cinemaRepository.save(cinema5);
        cinemaRepository.save(cinema6);
        cinemaRepository.save(cinema7);
    }

    private void initUpcomingCinema() {
        Cinema cinema7 = new Cinema();
        cinema7.setMovieId(movieId7);
        cinema7.setTmdbMovieId("49026");
        cinema7.setDateStart(LocalDate.now());
        cinema7.setDateEnd(LocalDate.now().plusDays(30));
        cinema7.setUpcoming(true);

        Cinema cinema8 = new Cinema();
        cinema8.setMovieId(movieId8);
        cinema8.setTmdbMovieId("464052");
        cinema8.setDateStart(LocalDate.now());
        cinema8.setDateEnd(LocalDate.now().plusDays(30));
        cinema8.setUpcoming(true);

        Cinema cinema9 = new Cinema();
        cinema9.setMovieId(movieId9);
        cinema9.setTmdbMovieId("287947");
        cinema9.setDateStart(LocalDate.now());
        cinema9.setDateEnd(LocalDate.now().plusDays(30));
        cinema9.setUpcoming(true);

        Cinema cinema10 = new Cinema();
        cinema10.setMovieId(movieId10);
        cinema10.setTmdbMovieId("297802");
        cinema10.setDateStart(LocalDate.now());
        cinema10.setDateEnd(LocalDate.now().plusDays(30));
        cinema10.setUpcoming(true);

        Cinema cinema11 = new Cinema();
        cinema11.setMovieId(movieId11);
        cinema11.setTmdbMovieId("141052");
        cinema11.setDateStart(LocalDate.now().plusDays(1));
        cinema11.setDateEnd(LocalDate.now().plusDays(30));
        cinema11.setUpcoming(true);

        Cinema cinema12 = new Cinema();
        cinema12.setMovieId(movieId12);
        cinema12.setTmdbMovieId("297761");
        cinema12.setDateStart(LocalDate.now().plusDays(1));
        cinema12.setDateEnd(LocalDate.now().plusDays(30));
        cinema12.setUpcoming(true);

        Cinema cinema13 = new Cinema();
        cinema13.setMovieId(movieId13);
        cinema13.setTmdbMovieId("209112");
        cinema13.setDateStart(LocalDate.now().plusDays(2));
        cinema13.setDateEnd(LocalDate.now().plusDays(30));
        cinema13.setUpcoming(true);

        Cinema cinema14 = new Cinema();
        cinema14.setMovieId(movieId14);
        cinema14.setTmdbMovieId("57212");
        cinema14.setDateStart(LocalDate.now().plusDays(2));
        cinema14.setDateEnd(LocalDate.now().plusDays(30));
        cinema14.setUpcoming(true);

        cinemaRepository.save(cinema7);
        cinemaRepository.save(cinema8);
        cinemaRepository.save(cinema9);
        cinemaRepository.save(cinema10);
        cinemaRepository.save(cinema11);
        cinemaRepository.save(cinema12);
        cinemaRepository.save(cinema13);
        cinemaRepository.save(cinema14);
    }

    private Session createSession(String startTime) {
        Session session = new Session();
        session.setStartTime(startTime);
        return session;
    }

    private String generateCinemaSequence() {
        return sequenceGeneratorService.generateSequence(Cinema.SEQUENCE_NAME);
    }
}
