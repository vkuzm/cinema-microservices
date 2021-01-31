package com.service.movies.services;

import com.service.movies.domain.Schedule;

public interface SessionService {
    void addSessions(Schedule... schedule);
}
