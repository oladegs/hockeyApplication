package com.TeamDynamic.Server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Eureka server main program
 * Submission Date: Dec 4, 2025
 */

@EnableEurekaServer
@SpringBootApplication
public class TeamDynamicEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeamDynamicEurekaServerApplication.class, args);
        System.out.println("Eureka Server started.....");
	}

}
