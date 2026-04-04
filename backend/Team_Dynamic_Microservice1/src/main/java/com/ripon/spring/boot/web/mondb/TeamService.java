package com.ripon.spring.boot.web.mondb;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 1: Reactive Ice Hockey Management Service (Spring Boot + WebFlux + MongoDB + Thymeleaf)
 * Service class to difine the our methods
 * Submission Date: Dec 4, 2025
 */

@Service
public class TeamService {

    private final TeamRepository teamRepo;
    private final PlayerRepository playerRepo;

    public TeamService(TeamRepository teamRepo, PlayerRepository playerRepo) {
        this.teamRepo = teamRepo;
        this.playerRepo=playerRepo;
    }

    // Get all teams
    public Flux<Team> getTeams() {
        return teamRepo.findAll();
    }

    // Get team by ID
    public Mono<Team> getTeam(int teamId) {
        return teamRepo.findById(teamId);
    }

    // Add team with duplicate ID validation
    public Mono<Team> addTeam(Team team) {
        return teamRepo.existsById(team.getTeamId())
                .flatMap(exists -> {
                    if (exists) {
                        return Mono.error(new Exception("Team ID already exists."));
                    }
                    return teamRepo.save(team);
                });
    }

    // Update team with existence check
    public Mono<Team> updateTeam(Team team) {
        return teamRepo.existsById(team.getTeamId())
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.error(new Exception("Team ID not found."));
                    }
                    return teamRepo.save(team);
                });
    }

    //  Delete team by ID
    public Mono<Void> deleteTeam(int teamId) {
        return teamRepo.deleteById(teamId);
    }
    
    //Get all players by team
    public Flux<Player> getPlayersByTeam(int teamId) {
        return playerRepo.findByTeamId(teamId);
    }

    public Mono<Player> savePlayer(Player player) {
        return playerRepo.save(player);
    }

}
