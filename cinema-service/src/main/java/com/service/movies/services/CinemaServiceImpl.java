package com.service.movies.services;

import com.service.movies.ImageConstants;
import com.service.movies.domain.Cinema;
import com.service.movies.dto.CinemaDto;
import com.service.movies.dto.UpcomingCinemaDto;
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
import java.util.Map.Entry;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CinemaServiceImpl implements CinemaService {

  private static final DateTimeFormatter dayFormat = DateTimeFormatter.ofPattern("dd MMMM");
  private static final DateTimeFormatter weekDayFormat = DateTimeFormatter.ofPattern("EEEE");

  private final CinemaRepository cinemaRepository;
  private final TmdbApi tmdbApi;

  public CinemaServiceImpl(CinemaRepository cinemaRepository, TmdbApi tmdbApi) {
    this.cinemaRepository = cinemaRepository;
    this.tmdbApi = tmdbApi;
  }

  @Override
  public List<UpcomingCinemaDto> getUpcomingMovies() {
    final List<Cinema> upcomingCinemaList = cinemaRepository.findAllByUpcomingIsTrue();
    upcomingCinemaList.sort(Comparator.comparing(Cinema::getDateStart));

    final Map<LocalDate, List<Cinema>> upcomingCinemaMap = getUpcomingCinemaMap(upcomingCinemaList);
    final List<UpcomingCinemaDto> upcomingCinemaDtoList = new ArrayList<>();

    for (Entry<LocalDate, List<Cinema>> entry : upcomingCinemaMap.entrySet()) {
      final UpcomingCinemaDto upcomingCinema = new UpcomingCinemaDto();
      final LocalDate key = entry.getKey();
      upcomingCinema.setDay(key.format(dayFormat));
      upcomingCinema.setWeekday(key.format(weekDayFormat));
      upcomingCinema.setMovies(convertToCinemaDtoList(entry.getValue(), true));
      upcomingCinemaDtoList.add(upcomingCinema);
    }
    return upcomingCinemaDtoList;
  }

  @Override
  public List<CinemaDto> getTopMovies() {
    final List<Cinema> cinemaList = cinemaRepository
        .findAllByUpcomingIsFalseOrderByWatchedDesc(PageRequest.of(0, 20));
    return convertToCinemaDtoList(cinemaList, true);
  }

  @Override
  public List<CinemaDto> getTopCarouselMovies() {
    final List<Cinema> cinemaList = cinemaRepository
        .findAllByUpcomingIsFalseOrderByWatchedDesc(PageRequest.of(0, 5));
    return convertToCinemaDtoList(cinemaList, false);
  }

  @Override
  public Optional<CinemaDto> getMovieById(String movieId) {
    final TmdbMovies tmdbMovies = tmdbApi.getMovies();
    final Optional<Cinema> cinema = cinemaRepository.findByMovieId(movieId);

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

    for (Cinema cinema : cinemaList) {
      final Movie movie = tmdbMovies.getMovie(cinema.getMovieId());
      final CinemaDto cinemaDto = convertToCinemaDto(cinema, movie, isPoster);
      cinemaDtoList.add(cinemaDto);
    }
    return cinemaDtoList;
  }

  private CinemaDto convertToCinemaDto(Cinema cinema, Movie movie, boolean isPoster) {
    final CinemaDto cinemaDto = new CinemaDto();
    cinemaDto.setMovieId(cinema.getId());

    if (isPoster) {
      cinemaDto.setImage(ImageConstants.POSTER_IMAGE_URL + movie.getPosterPath());
    } else {
      cinemaDto.setImage(ImageConstants.MEDIUM_IMAGE_URL + movie.getBackdropPath());
    }

    cinemaDto.setName(movie.getTitle());
    cinemaDto.setRating(movie.getVoteAverage());
    //cinemaDto.setRestriction(movie.isAdult() ? "18+" : "10+");
    cinemaDto.setDescription(movie.getOverview());
    cinemaDto.setDateStart(cinema.getDateStart());
    cinemaDto.setDateEnd(cinema.getDateEnd());
    cinemaDto.setWatched(cinema.getWatched());
    return cinemaDto;
  }

  private Map<LocalDate, List<Cinema>> getUpcomingCinemaMap(List<Cinema> upcomingCinemaList) {
    final Map<LocalDate, List<Cinema>> cinemaMap = new LinkedHashMap<>();
    for (Cinema cinema : upcomingCinemaList) {
      final LocalDate key = cinema.getDateStart();
      if (!cinemaMap.containsKey(key)) {
        cinemaMap.put(key, new ArrayList<>());
      }
      cinemaMap.get(key).add(cinema);
    }
    return cinemaMap;
  }
}