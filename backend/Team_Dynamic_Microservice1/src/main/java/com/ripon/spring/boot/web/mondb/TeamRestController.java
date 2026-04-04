package com.ripon.spring.boot.web.mondb;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 1: Reactive Ice Hockey Management Service (Spring Boot + WebFlux + MongoDB + Thymeleaf)
 * Rest Controller For microsrivece2 to get the information
 * Submission Date: Dec 4, 2025
 */

@RestController
@RequestMapping("/api/teams")
public class TeamRestController {

    private final TeamService teamService;
    private final PlayerService playerService;
    

    public TeamRestController(TeamService teamService, PlayerService playerService) {
        this.teamService = teamService;
        this.playerService=playerService;
    }

    @GetMapping
    public Flux<Team> getAllTeams() {
        return teamService.getTeams();
    }

    @GetMapping("/{id}")
    public Mono<Team> getTeam(@PathVariable int id) {
        return teamService.getTeam(id);
    }
    
    @GetMapping("/{id}/player")
    public Flux<Player> getPlayersByTeam(@PathVariable int id) {
        return playerService.getPlayersByTeam(id);
    }

    @PostMapping
    public Mono<Team> addTeam(@RequestBody Team team) {
        return teamService.addTeam(team);
    }

    @PutMapping("/{id}")
    public Mono<Team> updateTeam(@PathVariable int id, @RequestBody Team team) {
        team.setTeamId(id);
        return teamService.updateTeam(team);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteTeam(@PathVariable int id) {
        return teamService.deleteTeam(id);
    }
    
   
}
