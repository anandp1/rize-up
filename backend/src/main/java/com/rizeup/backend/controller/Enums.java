package com.rizeup.backend.controller;

enum SignIn {
    MANAGER("Manager"),
    MEMBER("Member"),
    FRONT_DESK("Front Desk"),
    TRAINER("Trainer");

    private final String role;

    private SignIn(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
