package org.spring.personal.shelter.controller;

import org.spring.personal.shelter.model.Car;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GarageController {

    @RequestMapping("/car")
    public Car getCar(){
        Car myCar = new Car("Picasso", "Citroen", 2004, Car.Color.RED);
        return myCar;
    }
}
