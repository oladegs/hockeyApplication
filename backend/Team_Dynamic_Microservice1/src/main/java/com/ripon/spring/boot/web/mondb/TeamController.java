package com.ripon.spring.boot.web.mondb;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 1: Reactive Ice Hockey Management Service (Spring Boot + WebFlux + MongoDB + Thymeleaf)
 * Controller For Thymleaf View
 * Submission Date: Dec 4, 2025
 */
@Controller
public class TeamController {

    private final TeamService service;

    public TeamController(TeamService service) {
        this.service = service;
    }

   //Home page
    @GetMapping("/")
    public Mono<String> home() {
      return Mono.just("index");
    }

    
    //Show the team list
   
    @GetMapping("/team")
    public Mono<String> listTeams(Model model) {
        return service.getTeams()
                .collectList()
                .doOnNext(teams -> model.addAttribute("team", teams))
                .thenReturn("view_team");
    }

    
    // Add new team
    @GetMapping("/team/new")
    public Mono<String> newTeamForm(Model model) {
        model.addAttribute("team", new Team());
        return Mono.just("new_team");
    }
 
    @PostMapping("/team")
    public Mono<String> createTeam(@ModelAttribute Team team) {
        return service.addTeam(team)
                .thenReturn("redirect:/team");
    }

    //Edit team by id
    @GetMapping("/team/edit/{id}")
    public Mono<String> editTeamForm(@PathVariable int id, Model model) {
        return service.getTeam(id)
                .doOnNext(t -> model.addAttribute("team", t))
                .thenReturn("edit_team");
    }

    
    //update team by id
 
    @PostMapping("/team/update/{id}")
    public Mono<String> updateTeam(@PathVariable int id, @ModelAttribute Team team) {
        team.setTeamId(id);
        return service.updateTeam(team)
                .thenReturn("redirect:/team");
    }

    //Delete team
    @GetMapping("/team/delete/{id}")
    public Mono<String> deleteTeam(@PathVariable int id) {
        return service.deleteTeam(id)
                .thenReturn("redirect:/team");
    }

    //show player by team
    @GetMapping("/team/{id}")
    public Mono<String> viewTeam(@PathVariable int id, Model model) {

        Mono<Team> teamMono = service.getTeam(id);
        Flux<Player> playersFlux = service.getPlayersByTeam(id);

        return teamMono
                .zipWith(playersFlux.collectList())
                .map(tuple -> {
                    Team team = tuple.getT1();
                    List<Player> players = tuple.getT2();
                    model.addAttribute("team", team);
                    model.addAttribute("players", players);
                    return "show_team_player";
                })
                .switchIfEmpty(
                        Mono.fromRunnable(() -> {
                            model.addAttribute("error", "Team not found!");
                            model.addAttribute("players", List.of());
                        }).thenReturn("show_team_player")
                );
    }
}
