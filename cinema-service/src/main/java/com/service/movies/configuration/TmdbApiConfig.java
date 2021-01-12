package com.service.movies.configuration;

import com.vkuzmenko.tmdbapi.TmdbApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class TmdbApiConfig {

  @Value("${API_KEY}")
  private String apiKey;

  @Bean
  public TmdbApi tmdbApi() {
    return new TmdbApi(apiKey);
  }
}