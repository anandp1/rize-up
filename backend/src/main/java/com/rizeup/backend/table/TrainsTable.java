package com.rizeup.backend.table;

import java.sql.*;
import java.util.ArrayList;

public class TrainsTable {
    private final Connection connection;

    public TrainsTable(Connection database) {
        this.connection = database;
    }

    // add trainer to member
    public String addTrainerToMember(String temail, String memail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO TRAINS(trainer_email, member_email) VALUES (?,?)")) {
            statement.setString(1, temail);
            statement.setString(2, memail);

            if (statement.executeUpdate() > 0) {
                return "Trainer added to member successfully";
            }
        }
        return "Could not add trainer to member roster";
    }

    // remove trainer from member
    public String removeTrainerFromMember(String temail, String memail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM TRAINS WHERE trainer_email =? AND member_email = ?")) {
            statement.setString(1, temail);
            statement.setString(2, memail);
            if (statement.executeUpdate() > 0) {
                return "Trainer removed from member successfully";
            }
        }
        return "Could not remove member from trainer roster";
    }

    // get all members that trainer trains
    public ArrayList<String> getTrainerClients(String temail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT member_email FROM TRAINS WHERE trainer_email = ?")) {
            statement.setString(1, temail);
            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<String> result = new ArrayList<String>();
                    do {
                        result.add(resultSet.getString("member_email"));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null;
    }

    // get all trainers that train a member
    public ArrayList<String> getMembersTrainers(String memail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT trainer_email FROM TRAINS WHERE member_email = ?")) {
            statement.setString(1, memail);
            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<String> result = new ArrayList<String>();
                    do {
                        result.add(resultSet.getString("trainer_email"));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null;
    }
}
