package com.rizeup.backend.model;

import java.sql.Date;


public class Trainer {
    private String email;
    private Date birthDate;
    private int age;
    private char gender;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private int gymId;
    private String about_me;

    public Trainer(String email, Date birthDate, int age, char gender, String firstName, String lastName) {
        this.email = email;
        this.birthDate = birthDate;
        this.age = age;
        this.gender = gender;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    public Trainer(String email, Date birthDate, int age, char gender, String firstName, String middleName, String lastName, int gymId) {
        this.email = email;
        this.birthDate = birthDate;
        this.age = age;
        this.gender = gender;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.gymId = gymId;
    }
    public Trainer(String email, String about_me){
        this.email=email;
        this.about_me = about_me;
    }

    public void setAboutMe(String about){
        about_me = about;
    }

    public String getAboutMe(){
        return about_me;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getGymId() {
        return gymId;
    }

    public void setGymId(int gymId) {
        this.gymId = gymId;
    }

    // public static ResultSet getClassSchedule(String email) {
    //     ResultSet resultSet = TrainerTable.getClassesByTrainer(email);
    //     return resultSet;
    // }
}
