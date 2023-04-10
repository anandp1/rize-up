package com.rizeup.backend.model;

public class Class {
    private String name;
    private int length;
    private float cost;
    private int sec;
    private String time;
    private int day;
    private int capacity;
    private int room;
    private String tFname;
    private String tLname;
    private int joined;

    public Class(String name, int length, float cost, int sec, String time, int day, int capacity, int room, String Fname, String Lname){
        this.name = name;
        this.length = length;
        this.cost = cost;
        this.sec = sec;
        this.time = time;
        this.day = day;
        this.capacity = capacity;
        this.room = room;
        this.tFname = Fname;
        this.tLname = Lname;
    }
    public Class(String name, int length, float cost, int sec, String time, int day, int capacity, int room){
        this.name = name;
        this.length = length;
        this.cost = cost;
        this.sec = sec;
        this.time = time;
        this.day = day;
        this.capacity = capacity;
        this.room = room;
    }

    public Class(String name, int sec, String time, int day, int room, String Fname, String Lname){
        this.name = name;
        this.sec = sec;
        this.time = time;
        this.day = day;
        this.room = room;
        this.tFname = Fname;
        this.tLname = Lname;
    }
    public Class(String name, int sec, String time, int day, int room, int capacity){
        this.name = name;
        this.sec = sec;
        this.time = time;
        this.day = day;
        this.room = room;
        this.capacity = capacity;
    }

    public Class(String name, int length, float cost){
        this.name = name;
        this.length = length;
        this.cost = cost;
    }
    public Class(String name, int sec, int joined){
        this.name = name;
        this.sec=sec;
        this.joined=joined;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name=name;
    }
    
    public String getTrainer(){
        return tFname + " " + tLname;
    }
    public void setTrainer(String tFname, String tLname){
        this.tFname = tFname;
        this.tLname = tLname;
    }

    public int getRoom(){
        return room;
    }
    public void setRoom(int room){
        this.room = room;
    }
    
    public int getCapacity(){
        return capacity;
    }
    public void setCapacity(int capacity){
        this.capacity = capacity;
    }
    
    public int getDay(){
        return day;
    }
    public void setDay(int day){
        this.day = day;
    }
    
    public String getTime(){
        return time;
    }
    public void setTime(String time){
        this.time = time;
    }
    
    public int getSec(){
        return sec;
    }
    public void setSec(int sec){
        this.sec = sec;
    }
    
    public float getCost(){
        return cost;
    }

    public void setCost(float cost){
        this.cost = cost;
    }
    
    public int getLength(){
        return this.length;
    }

    public void setLength(int length){
        this.length = length;
    }
    public int getJoined(){
        return joined;
    }
}
