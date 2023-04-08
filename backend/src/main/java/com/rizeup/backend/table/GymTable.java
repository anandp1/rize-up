package com.rizeup.backend.table;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.rizeup.backend.model.Gym;
import java.util.ArrayList;

public class GymTable {
    private final Connection connection;

    public GymTable(Connection database) {
        this.connection = database;
    }

    //Get gym info
    public Gym getGym(int passcode) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM GYM WHERE GYM.passcode = ? ")) {
            statement.setInt(1, passcode);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Gym(resultSet.getInt("passcode"), resultSet.getString("phone"), resultSet.getString("hours"), resultSet.getString("address"), resultSet.getString("name"));
                }
            }
        }
        return null; //return null if gym not found
    }
    //Get all gyms info
    public ArrayList<Gym> getAllGym() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM GYM  ")) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<Gym> result = new ArrayList<Gym>();
                    do{
                        result.add(new Gym(resultSet.getInt("passcode"), resultSet.getString("phone"), resultSet.getString("hours"), resultSet.getString("address"), resultSet.getString("name")));
                    }while (resultSet.next());
                    return result;
                }
            }
        }
        return null; //return null if gym not found
    }

    //Add gym info
    public String addGym(int passcode, String phone, String gym_hours, String address, String name) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement (
            "INSERT INTO GYM (passcode, phone, gym_hours, address, name) VALUES (?,?,?,?,?)"
        )){
            statement.setInt(1, passcode);
            statement.setString(2, phone);
            statement.setString(3, gym_hours);
            statement.setString(4, address);
            statement.setString(5, name);
            if( statement.executeUpdate() >0){
                return "Gym added successful";
            }
        }
        return "Gym could not be added";
    }
}
