package com.rizeup.backend.model;

import java.sql.*;
import java.util.ArrayList;
import com.rizeup.backend.model.ClassSection;

public class Report {
    private Timestamp timestamp;
    private int members;
    private int newMembers;
    private String email;
    private ArrayList<ClassSection> secCount;

    public Report(Timestamp timestamp, int members, int newMembers, String email, ArrayList<ClassSection> secCount) {
        this.timestamp = timestamp;
        this.members = members;
        this.newMembers = newMembers;
        this.email = email;
        this.secCount = secCount;
    }

    public Report(Timestamp timestamp, int members, int newMembers, String email) {
        this.timestamp = timestamp;
        this.members = members;
        this.newMembers = newMembers;
        this.email = email;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public int getMembers() {
        return members;
    }

    public int getNewMembers() {
        return newMembers;
    }

    public String getEmail() {
        return email;
    }

    public ArrayList<ClassSection> getSecCount() {
        return secCount;
    }

    public void setSecCount(ArrayList<ClassSection> sec) {
        this.secCount = new ArrayList<ClassSection>(sec);
    }

}
