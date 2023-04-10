package com.rizeup.backend.table;

import java.sql.*;
import java.util.ArrayList;

import com.rizeup.backend.model.FrontDesk;

public class FrontDeskTable {
    private final Connection connection;

    public FrontDeskTable(Connection database) {
        this.connection = database;
    }

    //verify Front desk staff for login
    public FrontDesk getFrontDesk(String email, String password) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM FRONT_DESK WHERE email = ? AND password = ?")) {
            statement.setString(1, email);
            statement.setString(2, password);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new FrontDesk(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                            resultSet.getString("last_name"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    public ArrayList<FrontDesk> getAllFrontDesk(int gymId) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM TRAINER WHERE gym_id = ? ")) {
            statement.setInt(1, gymId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<FrontDesk> result = new ArrayList<FrontDesk>();
                    do {
                        result.add(new FrontDesk(resultSet.getString("email"), resultSet.getDate("birth_date"),
                                resultSet.getInt("age"),
                                resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                                resultSet.getString("last_name")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null;
    }

    // Remove FrontDesk from table
    public String removeFrontDesk(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM FRONT_DESK WHERE email = ? ")) {
            statement.setString(1, email);
            if (statement.executeUpdate() > 0) {
                return "Front Desk Staff removed";
            }
        }
        return "Could not remove front desk staff";
    }

    // Insert a Front desk staff
    // email, birth_date, age, gender, password, first_name, middle_name, last_name,
    // date_joined, membership_name, gym_id
    public String addFrontDesk(String email, Date birth, int age, String gender, String password, String fname,
            String mname, String lname, int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO FRONT_DESK (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id) VALUES (?,?,?,?,?,?,?,?,?)")) {
            statement.setString(1, email);
            statement.setDate(2, birth);
            statement.setInt(3, age);
            statement.setString(4, gender);
            statement.setString(5, password);
            statement.setString(6, fname);
            statement.setString(7, mname);
            statement.setString(8, lname);
            statement.setInt(9, gym_id);

            if (statement.executeUpdate() > 0) {
                return "Front desk staff added successfully";
            }
        }
        return "Could not add front desk staff";
    }

    // update a front desk staff
    // email, birth_date, age, gender, password, first_name, middle_name, last_name,
    // membership_name, gym_id
    public String updateFrontDesk(String email, Date birth, int age, String gender, String password, String fname,
            String mname, String lname, int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE TRAINER SET email = ?, birth_date = ?, age = ?, gender = ?, password = ?, first_name = ?, middle_name = ?, last_name = ?, gym_id = ? WHERE email=?")) {
            statement.setString(1, email);
            statement.setDate(2, birth);
            statement.setInt(3, age);
            statement.setString(4, gender);
            statement.setString(5, password);
            statement.setString(6, fname);
            statement.setString(7, mname);
            statement.setString(8, lname);
            statement.setInt(9, gym_id);
            statement.setString(10, email);

            if (statement.executeUpdate() > 0) {
                return "Front desk updated successfully";
            }
        }
        return "Could not update front desk staff";
    }
}
