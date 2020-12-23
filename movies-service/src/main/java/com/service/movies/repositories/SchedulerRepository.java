package com.service.movies.repositories;

import com.service.movies.domain.Scheduler;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface SchedulerRepository extends CrudRepository<Scheduler, String> {

  List<Scheduler> findAll();
}
