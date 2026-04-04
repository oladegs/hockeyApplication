package com.ripon.spring.boot.web.mondb;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 1: Reactive Ice Hockey Management Service (Spring Boot + WebFlux + MongoDB + Thymeleaf)
 * repoitory class
 * Submission Date: Dec 4, 2025
 */
@Repository
public interface PlayerRepository  extends ReactiveMongoRepository<Player, Integer> {
	
	//Get all players of the team
	
	Flux<Player> findByTeamId(int teamId);

}
