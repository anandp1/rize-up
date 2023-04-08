package com.rizeup.backend.model;

import java.sql.*;
import java.util.ArrayList;
import com.rizeup.backend.model.Class;

public class Report {
    private Timestamp timestamp;
    private int members;
    private int newMembers;
    private String email;
    private ArrayList<Class> secCount;

    public Report(Timestamp timestamp, int members, int newMembers, String email, ArrayList<Class> secCount){
        this.timestamp = timestamp;
        this.members = members;
        this.newMembers= newMembers;
        this.email=email;
        this.secCount = secCount;
    }
    public Report(Timestamp timestamp, int members, int newMembers, String email){
        this.timestamp = timestamp;
        this.members = members;
        this.newMembers= newMembers;
        this.email=email;
    }

    public Timestamp getTimestamp(){
        return timestamp;
    }

    public int getMembers(){
        return members;
    }

    public int getNewMembers(){
        return newMembers;
    }

    public String getEmail(){
        return email;
    }

    public ArrayList<Class> getSecCount(){
        return secCount;
    }

    public void setSecCount(ArrayList<Class> sec){
        this.secCount = new ArrayList<Class>(sec);
    }

    

    
}
