package com.rizeup.backend.table;

import java.sql.*;
import java.util.ArrayList;
import com.rizeup.backend.model.Class;

import com.rizeup.backend.model.Trainer;
import com.rizeup.backend.model.TrainerExperience;

public class TrainerTable {
    private final Connection connection;

    public TrainerTable(Connection database) {
        this.connection = database;
    }

    //find trainer info for login 
    public Trainer getTrainer(String email, String password) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM TRAINER WHERE email = ? AND password = ?")) {
            statement.setString(1, email);
            statement.setString(2, password);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Trainer(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                            resultSet.getString("last_name"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    //get all Trainers personal info for viewing/editing purposes
    public Trainer getTrainer(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM TRAINER WHERE email = ? ")) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Trainer(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),resultSet.getString("middle_name"),
                            resultSet.getString("last_name"), resultSet.getInt("gymId"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    //find all classes and sections taught by a specific trainer
    public ArrayList<Class> getClassesByTrainer(String Temail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT C.*, S.* FROM CLASS AS C, SECTION AS S, TEACHES AS T WHERE S.class_name = C.name AND T.Sec_no = S.Sec_no AND T.class_name = C.name AND T.trainer_email = ?")) {
            statement.setString(1, Temail);

            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<Class> result = new ArrayList<Class>();
                    do{
                        //String name, int length, float cost, int sec, String time, int day, int capacity, int room, String Fname, String Lname
                        result.add(new Class(resultSet.getString("C.name"),resultSet.getInt("C.length"),resultSet.getFloat("C.cost"), resultSet.getInt("S.Sec_no"), resultSet.getString("S.time"), resultSet.getInt("S.day_of_week"), resultSet.getInt("S.capacity"),resultSet.getInt("S.Room_number")));
                    }while(resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no classes found for given email
    }

    //Remove Trainer from table
    public String removeTrainer(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM TRAINER WHERE email = ? ")) {
            statement.setString(1, email);
            if (statement.executeUpdate() > 0) {
                return "Trainer removed";
            }
        }
        return "Could not remove trainer"; 
    }

    //add a trainer
    //email, birth_date, age, gender, password, first_name, middle_name, last_name, membership_name, gym_id
    public String addTrainer(String email, Date birth, int age, String gender, String password, String fname, String mname, String lname, int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO TRAINER (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id) VALUES (?,?,?,?,?,?,?,?,?)")) {
            statement.setString(1, email);
            statement.setDate(2, birth);
            statement.setInt(3, age);
            statement.setString(4, gender);
            statement.setString(5, password);
            statement.setString(6, fname);
            statement.setString(7, mname);
            statement.setString(8, lname);
            statement.setInt(9, gym_id);

            if (statement.executeUpdate() >0) {
                return "Trainer added successfully";
            }
        }
        return "Could not add trainer"; // return null if no member found with the given email and password
    }

    //update a trainer
    //email, birth_date, age, gender, password, first_name, middle_name, last_name, membership_name, gym_id
    public String updateTrainer(String email, Date birth, int age, String gender, String password, String fname, String mname, String lname, int gym_id) throws SQLException {
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

            if (statement.executeUpdate() >0) {
                return "Trainer updated successfully";
            }
        }
        return "Could not update trainer"; // return null if no member found with the given email and password
    }

}
