package com.rizeup.backend.table;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

import com.rizeup.backend.model.ClassSection;

import com.rizeup.backend.model.Trainer;
import com.rizeup.backend.model.TrainerExperience;

public class TrainerTable {
    private final Connection connection;

    public TrainerTable(Connection database) {
        this.connection = database;
    }

    // find trainer info for login
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

    // get Trainers personal info for viewing/editing purposes
    public Trainer getTrainer(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM TRAINER WHERE email = ?")) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Trainer(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                            resultSet.getString("middle_name"),
                            resultSet.getString("last_name"), resultSet.getInt("gym_id"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    // get all Trainers
    public ArrayList<Trainer> getAllTrainers(int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM TRAINER WHERE gym_id = ? ")) {
            statement.setInt(1, gym_id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<Trainer> result = new ArrayList<Trainer>();
                    do {
                        result.add(new Trainer(resultSet.getString("email"), resultSet.getDate("birth_date"),
                                resultSet.getInt("age"),
                                resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                                resultSet.getString("middle_name"),
                                resultSet.getString("last_name"), resultSet.getInt("gymId")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    // find all classes and sections taught by a specific trainer
    public ArrayList<ClassSection> getClassesByTrainer(String Temail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT C.*, S.* FROM CLASS AS C, SECTION AS S, TEACHES AS T WHERE S.class_name = C.name AND T.Sec_no = S.Sec_no AND T.class_name = C.name AND T.trainer_email = ?")) {
            statement.setString(1, Temail);

            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<ClassSection> result = new ArrayList<ClassSection>();
                    do {
                        // String name, int length, float cost, int sec, String time, int day, int
                        // capacity, int room, String Fname, String Lname
                        result.add(new ClassSection(resultSet.getString("C.name"), resultSet.getInt("C.length"),
                                resultSet.getFloat("C.cost"), resultSet.getInt("S.Sec_no"),
                                resultSet.getString("S.time"), resultSet.getInt("S.day_of_week"),
                                resultSet.getInt("S.capacity"), resultSet.getInt("S.Room_number")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no classes found for given email
    }

    // Remove Trainer from table
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

    // add a trainer
    // email, birth_date, age, gender, password, first_name, middle_name, last_name,
    // membership_name, gym_id
    public String addTrainer(String email, Date birth, int age, String gender, String password, String fname,
            String mname, String lname, int gym_id) throws SQLException {
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

            if (statement.executeUpdate() > 0) {
                return "Trainer added successfully";
            }
        }
        return "Could not add trainer"; // return null if no member found with the given email and password
    }

    // update a trainer
    // email, birth_date, age, gender, password, first_name, middle_name, last_name,
    // membership_name, gym_id
    public String updateTrainer(String email, Date birth, int age, String gender, String password, String fname,
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
                return "Trainer updated successfully";
            }
        }
        return "Could not update trainer"; // return null if no member found with the given email and password
    }

    // Get Trainer profile BIO
    public String getTrainerProfile(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT about_me FROM PROFILE WHERE trainer_email = ? ")) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getString("about_me");
                }
            }
        }
        return ""; // return null if no member found with the given email and password
    }

    // Add trainer profile
    public String addTrainerProfile(String email, String about_me) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO PROFILE(about_me, trainer_email) VALUE (?,?)")) {
            statement.setString(1, about_me);
            statement.setString(2, email);
            if (statement.executeUpdate() > 0) {

                return "Succesfully added Trainer interest";
            }
        }
        return "Could not add trainer interest";
    }

    // delete trainer profile
    public String removeTrainerProfile(String email, String about_me) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM PROFILE WHERE about_me = ? AND trainer_email = ?")) {
            statement.setString(1, about_me);
            statement.setString(2, email);
            if (statement.executeUpdate() > 0) {

                return "Succesfully deleted Trainer profile";
            }
        }
        return "Could not delete trainer profile";
    }

    // Get trainer interests
    public ArrayList<String> getTrainerInterests(String Temail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT interest FROM TRAINER_INTERESTS WHERE trainer_email = ?")) {
            statement.setString(1, Temail);

            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<String> result = new ArrayList<String>();
                    do {
                        // String name, int length, float cost, int sec, String time, int day, int
                        // capacity, int room, String Fname, String Lname
                        result.add(resultSet.getString("interest"));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no classes found for given email
    }

    // Add trainer interest
    public String addTrainerInterest(String email, String interest) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO TRAINER_INTEREST(interest, trainer_email) VALUE (?,?)")) {
            statement.setString(1, interest);
            statement.setString(2, email);
            if (statement.executeUpdate() > 0) {

                return "Succesfully added Trainer interest";
            }
        }
        return "Could not add trainer interest";
    }

    // delete trainer interest
    public String removeTrainerInterest(String email, String interest) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM TRAINER_EXPERIENCE WHERE description = ? AND trainer_email = ?")) {
            statement.setString(1, interest);
            statement.setString(2, email);
            if (statement.executeUpdate() > 0) {

                return "Succesfully deleted Trainer interest";
            }
        }
        return "Could not delete trainer interest";
    }

    // Get trainer experience
    public ArrayList<TrainerExperience> getTrainerExperience(String Temail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM TRAINER_EXPERIENCE WHERE trainer_email = ?")) {
            statement.setString(1, Temail);

            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<TrainerExperience> result = new ArrayList<TrainerExperience>();
                    do {
                        // String name, int length, float cost, int sec, String time, int day, int
                        // capacity, int room, String Fname, String Lname
                        result.add(new TrainerExperience(resultSet.getString("trainer_email"),
                                resultSet.getString("description"), resultSet.getInt("years_of_experience"),
                                resultSet.getString("education")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no classes found for given email
    }

    // add trainer experience
    public String addTrainerExperience(String email, String description, int years, String education)
            throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO TRAINER_EXPERIENCE(description, years_of_experience, education, trainer_email) VALUES(?,?,?,?)")) {
            statement.setString(1, description);
            statement.setInt(2, years);
            statement.setString(3, education);
            statement.setString(4, email);
            if (statement.executeUpdate() > 0) {

                return "Succesfully added Trainer experience";
            }
        }
        return "Could not add trainer experience";
    }

    // delete trainer experience
    public String removeTrainerExperience(String email, String description) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM TRAINER_EXPERIENCE WHERE description = ? AND trainer_email = ?")) {
            statement.setString(1, description);
            statement.setString(2, email);
            if (statement.executeUpdate() > 0) {

                return "Succesfully deleted Trainer experience";
            }
        }
        return "Could not delete trainer experience";
    }

    public HashMap<String, HashMap<String, Object>> getAllTrainersInformation(int gymId) throws SQLException {
        ArrayList<Trainer> trainers = getAllTrainers(gymId);
        if (trainers == null) {
            return null;
        }

        HashMap<String, HashMap<String, Object>> result = new HashMap<String, HashMap<String, Object>>();
        for (Trainer trainer : trainers) {
            HashMap<String, Object> trainerInfo = new HashMap<String, Object>();
            trainerInfo.put("about_me", getTrainerProfile(trainer.getEmail()));
            trainerInfo.put("interests", getTrainerInterests(trainer.getEmail()));
            trainerInfo.put("experience", getTrainerExperience(trainer.getEmail()));
            trainerInfo.put("trainerInfo", trainer);
            result.put(trainer.getEmail(), trainerInfo);
        }

        return result;
    }

    public HashMap<String, Object> getTrainerFullProfile(String trainerEmail) throws SQLException {
        Trainer trainer = getTrainer(trainerEmail);
        if (trainer == null) {
            return null;
        }

        HashMap<String, Object> result = new HashMap<String, Object>();
        HashMap<String, Object> trainerInfo = new HashMap<String, Object>();
        trainerInfo.put("about_me", getTrainerProfile(trainer.getEmail()));
        trainerInfo.put("interests", getTrainerInterests(trainer.getEmail()));
        trainerInfo.put("experience", getTrainerExperience(trainer.getEmail()));
        trainerInfo.put("trainerInfo", trainer);
        result.put(trainer.getEmail(), trainerInfo);

        return result;
    }
}
