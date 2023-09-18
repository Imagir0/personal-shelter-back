package org.spring.personal.shelter.repository;

import org.spring.personal.shelter.model.Car;
import org.springframework.data.repository.CrudRepository;

public interface GarageRepository extends CrudRepository<Car, Long> {
}
