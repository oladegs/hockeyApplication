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
public class PlayerService {

    private final WebClient webClient;

    //We get the java configured WebClient Builder (java already have it)
    public PlayerService(WebClient.Builder webClientBuilder,
                         @Value("${microservice1.base-url:http://microservice1}") String microservice1BaseUrl) {
    		//we use the exact name from Microservice 1 properties
		this.webClient = webClientBuilder.baseUrl(microservice1BaseUrl).build();
    	}
    
    //get all players using Flux
    public Flux<Player> getPlayers() {
        return webClient.get().uri("/api/players").retrieve().bodyToFlux(Player.class);
    }

    //a single players using Mono
    public Mono<Player> getPlayer(int id) {
        return webClient.get().uri("/api/players/{id}", id).retrieve().bodyToMono(Player.class);
    }

    // Sends a post request to microservice 1 to add a player
    public Mono<Player> addPlayer(Player player) {
        return webClient.post().uri("/api/players").bodyValue(player).retrieve().bodyToMono(Player.class);
    }

    // Sends a PUT request to microservice 1 to update a player
    public Mono<Player> updatePlayer(int id, Player player) {
        return webClient.put().uri("/api/players/{id}", id).bodyValue(player).retrieve().bodyToMono(Player.class);
    }
    // Sends a delete request to microservice 1 to delete a player
    public Mono<Void> deletePlayer(int id) {
        return webClient.delete().uri("/api/players/{id}", id).retrieve().bodyToMono(Void.class);
    }
}
