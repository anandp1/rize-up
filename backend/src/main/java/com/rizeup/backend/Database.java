package com.rizeup.backend;

import java.sql.*;
import java.util.ArrayList;

public class Database {
    public final String DBURL;
    public final String USERNAME;
    public final String PASSWORD;

    private Connection dbConnect;

    /**
     * constructor fo the database class
     * 
     * @param DBURL    url of the database
     * @param USERNAME username for access to the database
     * @param PASSWORD password for access to the database
     */
    public Database(String DBURL, String USERNAME, String PASSWORD) {
        this.DBURL = DBURL;
        this.USERNAME = USERNAME;
        this.PASSWORD = PASSWORD;
    }

    /**
     * a method to connect to the database
     */
    public void connect() throws SQLException {
        DriverManager.setLoginTimeout(5);
        dbConnect = DriverManager.getConnection(DBURL, USERNAME, PASSWORD);
    }

    /**
     * a method to disconnect from the database by closing the connection
     */
    public void disconnect() {
        try {
            dbConnect.close();
        } catch (Exception e) {
            System.err.println("Could not disconnect from database!!");
            e.printStackTrace();
        }
    }
}
