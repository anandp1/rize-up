package com.rizeup.backend.controller;

class SignInCredentials {
    private String email;
    private String password;
    private SignIn role;

    public SignInCredentials(String email, String password, SignIn role) {
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

    public SignIn getRole() {
        return role;
    }
}
