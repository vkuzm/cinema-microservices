package com.service.movies.services;

import com.service.movies.ImageConstants;
import com.service.movies.domain.Cinema;
import com.service.movies.dto.CinemaDto;
import com.service.movies.dto.UpcomingDto;
import com.service.movies.repositories.CinemaRepository;
import com.vkuzmenko.tmdbapi.TmdbApi;
import com.vkuzmenko.tmdbapi.TmdbMovies;
import com.vkuzmenko.tmdbapi.models.Movie;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CinemaServiceImpl implements CinemaService {

  private static final int TOP_LIMIT = 20;
  private static final int TOP_CAROUSEL_LIMIT = 5;
  private static final DateTimeFormatter dayFormat = DateTimeFormatter.ofPattern("dd MMMM");
  private static final DateTimeFormatter weekDayFormat = DateTimeFormatter.ofPattern("EEEE");

  private final CinemaRepository cinemaRepository;
  private final TmdbApi tmdbApi;

  public CinemaServiceImpl(CinemaRepository cinemaRepository, TmdbApi tmdbApi) {
    this.cinemaRepository = cinemaRepository;
    this.tmdbApi = tmdbApi;
  }

  @Override
  public List<UpcomingDto> getUpcoming() {
    final List<Cinema> upcomingList = cinemaRepository.findAllByUpcomingIsTrue();
    upcomingList.sort(Comparator.comparing(Cinema::getDateStart));

    final Map<LocalDate, List<Cinema>> upcomingMap = getUpcomingMap(upcomingList);
    final List<UpcomingDto> upcomingDtoList = new ArrayList<>();

    upcomingMap.forEach((startDate, movie) -> {
      final UpcomingDto upcomingCinema = new UpcomingDto();
      upcomingCinema.setDay(startDate.format(dayFormat));
      upcomingCinema.setWeekday(startDate.format(weekDayFormat));
      upcomingCinema.setMovies(convertToCinemaDtoList(movie, true));
      upcomingDtoList.add(upcomingCinema);
    });
    return upcomingDtoList;
  }

  @Override
  public List<CinemaDto> getTop() {
    final List<Cinema> cinemaList = cinemaRepository
        .findAllByUpcomingIsFalseOrderByVisitedDesc(PageRequest.of(0, TOP_LIMIT));
    return convertToCinemaDtoList(cinemaList, true);
  }

  @Override
  public List<CinemaDto> getTopCarousel() {
    final List<Cinema> cinemaList = cinemaRepository
        .findAllByUpcomingIsFalseOrderByVisitedDesc(PageRequest.of(0, TOP_CAROUSEL_LIMIT));
    return convertToCinemaDtoList(cinemaList, false);
  }

  @Override
  public Optional<CinemaDto> getById(String id) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final Optional<Cinema> cinema = cinemaRepository.findById(id);

    if (cinema.isPresent()) {
      final Movie movie = tmdbMovies.getMovie(cinema.get().getMovieId());
      final CinemaDto cinemaDto = convertToCinemaDto(cinema.get(), movie, false);
      return Optional.of(cinemaDto);
    }
    return Optional.empty();
  }

  private List<CinemaDto> convertToCinemaDtoList(List<Cinema> cinemaList, boolean isPoster) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final List<CinemaDto> cinemaDtoList = new ArrayList<>();

    cinemaList.forEach(cinema -> {
      final Movie movie = tmdbMovies.getMovie(cinema.getMovieId());
      final CinemaDto cinemaDto = convertToCinemaDto(cinema, movie, isPoster);
      cinemaDtoList.add(cinemaDto);
    });
    return cinemaDtoList;
  }

  private CinemaDto convertToCinemaDto(Cinema cinema, Movie movie, boolean isPoster) {
    final CinemaDto cinemaDto = new CinemaDto();
    cinemaDto.setMovieId(cinema.getMovieId());
    cinemaDto.setName(movie.getTitle());
    cinemaDto.setRating(movie.getVoteAverage());
    cinemaDto.setDescription(movie.getOverview());
    cinemaDto.setDateStart(cinema.getDateStart());
    cinemaDto.setDateEnd(cinema.getDateEnd());
    cinemaDto.setImage(isPoster ? ImageConstants.POSTER_IMAGE_URL + movie.getPosterPath()
        : ImageConstants.MEDIUM_IMAGE_URL + movie.getBackdropPath());
    return cinemaDto;
  }

  private Map<LocalDate, List<Cinema>> getUpcomingMap(List<Cinema> upcomingCinemaList) {
    final Map<LocalDate, List<Cinema>> upcomingMap = new LinkedHashMap<>();
    upcomingCinemaList.forEach(cinema -> {
      final LocalDate startDate = cinema.getDateStart();
      upcomingMap.putIfAbsent(startDate, new ArrayList<>());
      upcomingMap.get(startDate).add(cinema);
    });
    return upcomingMap;
  }
}