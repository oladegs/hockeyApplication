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
@RequestMapping("/api/players")
public class PlayerRestController {

    private final PlayerService playerService;

    public PlayerRestController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public Flux<Player> getAllPlayers() {
        return playerService.getPlayers();
    }

    @GetMapping("/{id}")
    public Mono<Player> getPlayer(@PathVariable int id) {
        return playerService.getPlayer(id);
    }

    @PostMapping
    public Mono<Player> addPlayer(@RequestBody Player player) {
        return playerService.addPlayer(player);
    }

    @PutMapping("/{id}")
    public Mono<Player> updatePlayer(@PathVariable int id, @RequestBody Player player) {
        player.setPlayerId(id);
        return playerService.updatePlayer(player);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deletePlayer(@PathVariable int id) {
        return playerService.deletePlayer(id);
    }
}