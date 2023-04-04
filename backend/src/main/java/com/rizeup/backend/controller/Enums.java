package com.rizeup.backend.controller;

enum SignIn {
    MANAGER("manager"),
    MEMBER("member"),
    FRONT_DESK("front-desk"),
    TRAINER("trainer");

    private final String role;

    private SignIn(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
