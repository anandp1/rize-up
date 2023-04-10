package com.rizeup.backend.model;

public class TrainerExperience {
    private String email;
    private String description;
    private int years;
    private String education;

    public TrainerExperience(String email, String description, int years, String education){
        this.email = email;
        this.description = description;
        this.years = years;
        this.education=education;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public int getYears(){
        return years;
    }

    public void setYears(int years){
        this.years=years;
    }
    public String getEducation(){
        return education;
    }
    public void setEduction(String education){
        this.education = education;
    }
}
