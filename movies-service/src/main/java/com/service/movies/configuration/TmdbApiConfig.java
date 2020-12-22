package com.service.movies.configuration;

import com.vkuzmenko.tmdbapi.TmdbApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class TmdbApiConfig {

  @Bean
  public TmdbApi tmdbApi() {
    return new TmdbApi("0e3a0b2d5d7e580f9cc771bea41da413");
  }
}