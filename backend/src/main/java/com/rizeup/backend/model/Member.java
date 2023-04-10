package com.rizeup.backend.model;

import java.sql.Date;

public class Member {
    private String email;
    private Date birthDate;
    private int age;
    private char gender;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private Date dateJoined;
    private String membershipName;
    private int gymId;

    public Member(String email, Date birthDate, int age, char gender, String password, String firstName,
            String middleName, String lastName, Date dateJoined, String membershipName, int gymId) {
        this.email = email;
        this.birthDate = birthDate;
        this.age = age;
        this.gender = gender;
        this.password = password;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.dateJoined = dateJoined;
        this.membershipName = membershipName;
        this.gymId = gymId;
    }

    public Member(String email, Date birthDate, int age, char gender, String firstName, String lastName, Date joined) {
        this.email = email;
        this.birthDate = birthDate;
        this.age = age;
        this.gender = gender;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateJoined = joined;

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

    public Date getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }

    public String getMembershipName() {
        return membershipName;
    }

    public void setMembershipName(String membershipName) {
        this.membershipName = membershipName;
    }

    public int getGymId() {
        return gymId;
    }

    public void setGymId(int gymId) {
        this.gymId = gymId;
    }
}
