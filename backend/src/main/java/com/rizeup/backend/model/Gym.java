package com.rizeup.backend.model;

public class Gym {
    private int passcode;
    private String phone;
    private String hours;
    private String address;
    private String name;

    public Gym(int passcode, String phone, String hours, String address, String name){
        this.passcode = passcode;
        this.phone = phone;
        this.hours = hours;
        this.address = address;
        this.name = name;
    }

    public int getPasscode(){
        return passcode;
    }

    public String getPhone(){
        return phone;
    }

    public String getHours(){
        return hours;
    }

    public String getAddress(){
        return address;
    }

    public String getName(){
        return name;
    }
}
