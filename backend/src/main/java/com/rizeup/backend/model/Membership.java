package com.rizeup.backend.model;
import java.util.ArrayList;

public class Membership {
    private String name;
    private int duration;
    private float price;
    private ArrayList<String> perks;

    public Membership(String name, int duration, float price, ArrayList<String> perks){
        this.name = name;
        this.duration = duration;
        this.price = price;
        this.perks = new ArrayList<String>(perks);
    }

    public Membership(String name, int duration, float price){
        this.name = name;
        this.duration = duration;
        this.price = price;
    }

    public void setPerks(ArrayList<String> perks){
        this.perks = new ArrayList<String>(perks);
    }
    public ArrayList<String> getPerks(){
        return perks;
    }
    public String getName(){
        return name;
    }
    public int getDuration(){
        return duration;
    }
    public float getPrice(){
        return price;
    }
}
