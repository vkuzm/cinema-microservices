package com.service.movies.repositories;

import com.service.movies.domain.Schedule;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ScheduleRepository extends CrudRepository<Schedule, String> {

  List<Schedule> findAll();
}
