package com.abdul.Microservice2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 2: REST API Gateway for React Client (Spring Boot REST + MongoDB + WebFlux + REST Client) 
 * Submission Date: Dec 4, 2025
 */

@EnableDiscoveryClient
@SpringBootApplication
public class TeamDynamicMicroservice2Application {

	public static void main(String[] args) {
		SpringApplication.run(TeamDynamicMicroservice2Application.class, args);
		
		//System.setProperty("spring.config.name", "Team-Dynamic-Microservice2");
		
		System.out.println("Microservice 2 Started on Port 8084...");
    }

    @Bean
    @LoadBalanced
    WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
