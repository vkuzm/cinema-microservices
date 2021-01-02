package com.service.movies;

public class ImageConstants {

  private ImageConstants() {
  }

  private static final String BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
  public static final String POSTER_IMAGE_URL = BASE_IMAGE_URL + "w500";
  public static final String MEDIUM_IMAGE_URL = BASE_IMAGE_URL + "w780";
  public static final String LARGE_IMAGE_URL = BASE_IMAGE_URL + "w1280";
  public static final String ORIGINAL_IMAGE_URL = BASE_IMAGE_URL + "original";
}
