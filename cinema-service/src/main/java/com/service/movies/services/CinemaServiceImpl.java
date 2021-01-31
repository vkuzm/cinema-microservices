package com.service.movies.services;

import com.service.movies.ImageConstants;
import com.service.movies.domain.Cinema;
import com.service.movies.dto.CinemaDetailsDto;
import com.service.movies.dto.CinemaDto;
import com.service.movies.dto.ScheduleSingleMovieDto;
import com.service.movies.dto.UpcomingDto;
import com.service.movies.repositories.CinemaRepository;
import com.vkuzmenko.tmdbapi.TmdbApi;
import com.vkuzmenko.tmdbapi.TmdbMovies;
import com.vkuzmenko.tmdbapi.models.Genre;
import com.vkuzmenko.tmdbapi.models.Movie;
import com.vkuzmenko.tmdbapi.models.ProductionCompany;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CinemaServiceImpl implements CinemaService {

  private static final int TOP_LIMIT = 20;
  private static final int TOP_CAROUSEL_LIMIT = 5;
  private static final int RECOMMENDED_LIMIT = 5;
  private static final DateTimeFormatter dayFormat = DateTimeFormatter.ofPattern("dd MMMM");
  private static final DateTimeFormatter weekDayFormat = DateTimeFormatter.ofPattern("EEEE");

  private final CinemaRepository cinemaRepository;
  private final ScheduleService scheduleService;
  private final TmdbApi tmdbApi;

  public CinemaServiceImpl(CinemaRepository cinemaRepository, ScheduleService scheduleService, TmdbApi tmdbApi) {
    this.cinemaRepository = cinemaRepository;
    this.scheduleService = scheduleService;
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
        .findAllByUpcomingIsFalseOrderByWatchedDesc(PageRequest.of(0, TOP_LIMIT));
    return convertToCinemaDtoList(cinemaList, true);
  }

  @Override
  public List<CinemaDto> getTopCarousel() {
    final List<Cinema> cinemaList = cinemaRepository
        .findAllByUpcomingIsFalseOrderByWatchedDesc(PageRequest.of(0, TOP_CAROUSEL_LIMIT));
    return convertToCinemaDtoList(cinemaList, false);
  }

  @Override
  public Optional<CinemaDetailsDto> getByMovieId(String movieId) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final Optional<Cinema> cinema = cinemaRepository.findByMovieId(movieId);

    if (cinema.isPresent()) {
      final Movie movie = tmdbMovies.getMovie(cinema.get().getTmdbMovieId());
      final CinemaDetailsDto cinemaDto = new CinemaDetailsDto();
      final List<String> genres = getGenres(movie.getGenres());
      final String productionCompanies = getProductionCompanies(movie.getProductionCompanies());
      final List<Cinema> cinemaList = cinemaRepository.findByMovieIdNotContaining(cinema.get().getMovieId(), PageRequest.of(0, RECOMMENDED_LIMIT));
      final List<CinemaDto> recommendations = convertToCinemaDtoList(cinemaList, true);
      final List<ScheduleSingleMovieDto> schedules = scheduleService.getSessionByMovieId(movieId);

      cinemaDto.setMovieId(cinema.get().getMovieId());
      cinemaDto.setName(movie.getTitle());
      cinemaDto.setRating(movie.getVoteAverage());
      cinemaDto.setDescription(movie.getOverview());
      cinemaDto.setDuration(String.valueOf(movie.getRuntime()));
      cinemaDto.setLanguage(movie.getOriginalLanguage());
      cinemaDto.setGenres(genres);
      cinemaDto.setProduction(productionCompanies);
      cinemaDto.setRelease(movie.getReleaseDate());
      cinemaDto.setWatched(cinema.get().getWatched());
      cinemaDto.setImage(ImageConstants.POSTER_IMAGE_URL + movie.getPosterPath());
      cinemaDto.setSchedule(schedules);
      cinemaDto.setRecommendations(recommendations);
      return Optional.of(cinemaDto);
    }
    return Optional.empty();
  }

  public List<String> getGenres(List<Genre> genres) {
    return genres.stream()
        .map(Genre::getName)
        .collect(Collectors.toList());
  }

  private String getProductionCompanies(List<ProductionCompany> productionCompanies) {
    return productionCompanies.stream()
        .map(ProductionCompany::getName)
        .collect(Collectors.joining(", "));
  }

  @Override
  public List<CinemaDto> getAllMovies() {
    final List<Cinema> cinemaList = cinemaRepository.findAll();
    return convertToCinemaDtoList(cinemaList, false);
  }

  private List<CinemaDto> convertToCinemaDtoList(List<Cinema> cinemaList, boolean isPoster) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final List<CinemaDto> cinemaDtoList = new ArrayList<>();

    cinemaList.forEach(cinema -> {
      final Movie movie = tmdbMovies.getMovie(cinema.getTmdbMovieId());
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