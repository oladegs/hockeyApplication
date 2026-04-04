package com.abdul.Microservice2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class RootController {

    @GetMapping("/")
    public Mono<String> root() {
        return Mono.just("Microservice2 is running. Use /players or /teams to fetch data via Microservice1.");
    }
}
