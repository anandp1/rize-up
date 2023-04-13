package com.rizeup.backend.controller;

class SignInCredentials {
    private String email;
    private String password;
    private String role;

    public SignInCredentials(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }
}

class SignUpCredentials {
    private String email;
    private String password;
    private String gender;
    private String birthDate;
    private String firstName;
    private String lastName;

    public SignUpCredentials(String email, String password, String gender, String birthDate, String firstName,
            String lastName) {
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.birthDate = birthDate;
        this.firstName = firstName;
        this.lastName = lastName;

    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getGender() {
        return gender;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}

class ProfileBody {
    private String email;
    private String about_me;
    private String years;
    private String description;
    private String education;

    public ProfileBody(String email, String about_me, String years, String description, String education) {
        this.email = email;
        this.about_me = about_me;
        this.years = years;
        this.description = description;
        this.education = education;
    }

    public String getEmail() {
        return email;
    }

    public String getAbout_me() {
        return about_me;
    }

    public String getYears() {
        return years;
    }

    public String getDescription() {
        return description;
    }

    public String getEducation() {
        return education;
    }

}