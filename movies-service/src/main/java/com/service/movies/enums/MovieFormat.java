package com.service.movies.enums;

public enum MovieFormat {
  FORMAT_2D("2D"),
  FORMAT_3D("3D");

  private String format;

  MovieFormat(String format) {
    this.format = format;
  }

  public String text() {
    return format;
  }
}
