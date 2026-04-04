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
@RequestMapping("/teams")
@CrossOrigin(origins = "http://localhost:3000") // for react app localhost
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public Flux<Team> getAllTeams() {
        return teamService.getTeams();
    }

    @GetMapping("/{id}")
    public Mono<Team> getTeam(@PathVariable int id) {
        return teamService.getTeam(id);
    }

    @PostMapping ("/add")
    public Mono<Team> addTeam(@RequestBody Team team) {
        return teamService.addTeam(team);
    }

    @PutMapping("/{id}")
    public Mono<Team> updateTeam(@PathVariable int id, @RequestBody Team team) {
        return teamService.updateTeam(id, team);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteTeam(@PathVariable int id) {
        return teamService.deleteTeam(id);
    }
    
    @GetMapping("/{id}/player")
    public Flux<Player> getPlayersByTeam(@PathVariable int id) {
        return teamService.getPlayersByTeam(id);
    }
}
