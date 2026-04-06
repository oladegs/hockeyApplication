package com.ripon.spring.boot.web.mondb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 1: Reactive Ice Hockey Management Service (Spring Boot + WebFlux + MongoDB + Thymeleaf)
 * Submission Date: Dec 4, 2025
 */
@EnableDiscoveryClient
@SpringBootApplication
public class TeamDynamicMicroservice1Application {

	public static void main(String[] args) {
		SpringApplication.run(TeamDynamicMicroservice1Application.class, args);
		// System.setProperty("spring.config.name", "Team-Dynamic-Microservice1");
			
		 System.out.println("Spring Boot application for Team Dynamic Microservice 1 has started successfully.");
	}

}
