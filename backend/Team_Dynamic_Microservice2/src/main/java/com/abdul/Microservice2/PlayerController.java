package com.abdul.Microservice2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 2: REST API Gateway for React Client (Spring Boot REST + MongoDB + WebFlux + REST Client) 
 * Rest Controller for Microservice 2
 * Submission Date: Dec 4, 2025
 */

//this a rest controller identified by the annotation below 
@RestController
@RequestMapping("/players")
@CrossOrigin(origins = "http://localhost:3000") // Required for React
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping
    public Flux<Player> getAllPlayers() {
        return playerService.getPlayers();
    }

    @GetMapping("/{id}")
    public Mono<Player> getPlayer(@PathVariable int id) {
        return playerService.getPlayer(id);
    }

    @PostMapping ("/add")
    public Mono<Player> addPlayer(@RequestBody Player player) {
        return playerService.addPlayer(player);
    }

    @PutMapping("/{id}")
    public Mono<Player> updatePlayer(@PathVariable int id, @RequestBody Player player) {
        return playerService.updatePlayer(id, player);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deletePlayer(@PathVariable int id) {
        return playerService.deletePlayer(id);
    }
}
