package com.abdul.Microservice2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 2: REST API Gateway for React Client (Spring Boot REST + MongoDB + WebFlux + REST Client) 
 * Service controller that change the json format we get from Microservice 1
 * Submission Date: Dec 4, 2025
 */
@Service
public class TeamService {

    private final WebClient webClient;

    //We get the java configured WebClient Builder (java already have it)
        public TeamService(WebClient.Builder webClientBuilder,
                                             @Value("${microservice1.base-url:http://microservice1}") String microservice1BaseUrl) {
		//we use the exact name from Microservice 1 properties
	    		this.webClient = webClientBuilder.baseUrl(microservice1BaseUrl).build();
    }
    //get all teams using Flux
    public Flux<Team> getTeams() {
        return webClient.get().uri("/api/teams").retrieve().bodyToFlux(Team.class);
    }
    //get single team using Mono
    public Mono<Team> getTeam(int id) {
        return webClient.get().uri("/api/teams/{id}", id).retrieve().bodyToMono(Team.class);
    }
    // Sends a post request to microservice 1 to add a team
    public Mono<Team> addTeam(Team team) {
        return webClient.post().uri("/api/teams").bodyValue(team).retrieve().bodyToMono(Team.class);
    }
    // Sends a PUT request to microservice 1 to update a team
    public Mono<Team> updateTeam(int id, Team team) {
        return webClient.put().uri("/api/teams/{id}", id).bodyValue(team).retrieve().bodyToMono(Team.class);
    }
    // Sends a delete request to microservice 1 to update a team
    public Mono<Void> deleteTeam(int id) {
        return webClient.delete().uri("/api/teams/{id}", id).retrieve().bodyToMono(Void.class);
    }
    // Sends a get all request to microservice 1 to players
    public Flux<Player> getPlayersByTeam(int id) {
        return webClient.get().uri("/api/teams/{id}/player", id).retrieve().bodyToFlux(Player.class);
    }
}
