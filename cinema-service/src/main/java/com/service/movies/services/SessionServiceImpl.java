package com.service.movies.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.movies.domain.Schedule;
import com.service.movies.domain.ScheduleMovie;
import com.service.movies.domain.Session;
import com.service.movies.dto.SessionQueueDto;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    private final RabbitTemplate rabbitTemplate;
    private final Queue queue;
    private final ObjectMapper objectMapper;

    public SessionServiceImpl(RabbitTemplate rabbitTemplate, Queue queue, ObjectMapper objectMapper) {
        this.rabbitTemplate = rabbitTemplate;
        this.queue = queue;
        this.objectMapper = objectMapper;
    }

    @Override
    public void addSessions(Schedule... schedules) {
        for (Schedule schedule : schedules) {
            for (ScheduleMovie scheduleMovie : schedule.getMovies()) {
                for (Session session : scheduleMovie.getSessions()) {
                    final SessionQueueDto sessionQueueDto
                        = new SessionQueueDto(session.getSessionId(), scheduleMovie.getMovieId());
                    try {
                        rabbitTemplate.convertAndSend(queue.getName(), objectMapper.writeValueAsString(sessionQueueDto));
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
