package com.rizeup.backend.table;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.rizeup.backend.model.Manager;

public class ManagerTable {
    private final Connection connection;

    public ManagerTable(Connection database) {
        this.connection = database;
    }

    public Manager getManager(String email, String password) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM MANAGER WHERE email = ? AND password = ?")) {
            statement.setString(1, email);
            statement.setString(2, password);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Manager(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                            resultSet.getString("last_name"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }
}
