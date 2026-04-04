package com.abdul.Microservice2;

/*
 * Author: Md Ripon & Abdulrahman Hamid & Farouk Oladega
 * Assignment 4: Developing Spring Boot Micro services with MongoDB and React Integration
 * Microservice 2: REST API Gateway for React Client (Spring Boot REST + MongoDB + WebFlux + REST Client) 
 * Entity class for team
 * Submission Date: Dec 4, 2025
 */

public class Team {
    private int teamId;
    private String teamName;
    private String teamCity;
    private int teamFounded;
    private String coachName;

    // empty Constructor
    public Team() {
        super();
		// TODO Auto-generated constructor stub
    }

    // all fields Constructor 
    public Team(int teamId, String teamName, String teamCity, int teamFounded, String coachName) {
        super();
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamCity = teamCity;
        this.teamFounded = teamFounded;
        this.coachName = coachName;
    }

    // Getters and Setters
    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamCity() {
        return teamCity;
    }

    public void setTeamCity(String teamCity) {
        this.teamCity = teamCity;
    }

    public int getTeamFounded() {
        return teamFounded;
    }

    public void setTeamFounded(int teamFounded) {
        this.teamFounded = teamFounded;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }
}
