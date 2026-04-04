package com.ripon.spring.boot.web.mondb;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 1: Reactive Ice Hockey Management Service (Spring Boot + WebFlux + MongoDB + Thymeleaf)
 * repository class
 * Submission Date: Dec 4, 2025
 */
@Repository
public interface TeamRepository  extends ReactiveMongoRepository<Team, Integer>{

}