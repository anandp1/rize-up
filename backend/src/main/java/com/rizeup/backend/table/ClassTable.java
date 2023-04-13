package com.rizeup.backend.table;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.rizeup.backend.model.ClassSection;

public class ClassTable {
    private final Connection connection;

    public ClassTable(Connection database) {
        this.connection = database;
    }

    // retrieve list of registered members for specific sections of classes
    public ArrayList<String> getSectionList(String Cname, int Sec_no) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT M.first_name, M.last_name FROM MEMBER AS M, JOINS AS J WHERE J.Sec_no = ? AND J.name = ? AND J.member_email = M.email")) {
            statement.setInt(1, Sec_no);
            statement.setString(2, Cname);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<String> result = new ArrayList<String>();
                    do {
                        result.add(resultSet.getString("M.first_name") + " " + resultSet.getString("M.last_name"));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if section not found
    }

    // retrieve Trainer for specific sections of classe
    public ArrayList<String> getSectionTrainer(String Cname, int Sec_no) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT T.first_name, T.last_name FROM TRAINER AS T, TEACHES AS X WHERE X.Sec_no = ? AND X.class_name = ? AND X.trainer_email = T.email")) {
            statement.setInt(1, Sec_no);
            statement.setString(1, Cname);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<String> result = new ArrayList<String>();
                    do {
                        result.add(resultSet.getString("T.fisrt_name") + " " + resultSet.getString("T.last_name"));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if section not found
    }

    // view schedule for all classes and sections for a specific gym
    public ArrayList<ClassSection> getClassScheduleByGym(int gymId) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT C.*, S.*, T.first_name, T.last_name FROM CLASS AS C, SECTION AS S, CLASSES_OFFERED AS O, TEACHES AS X, TRAINER AS T WHERE S.class_name = C.name AND O.class_name = C.name AND O.passcode = ? AND X.Sec_no = S.Sec_no AND C.name = X.class_name AND T.email = X.trainer_email")) {
            statement.setInt(1, gymId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<ClassSection> result = new ArrayList<ClassSection>();
                    do {
                        // String name, int sec, String time, int day, int room, String Fname, String
                        // Lname
                        result.add(new ClassSection(resultSet.getString("C.name"), resultSet.getInt("C.length"),
                                resultSet.getFloat("C.cost"), resultSet.getInt("S.Sec_no"),
                                resultSet.getString("S.time"), resultSet.getInt("S.day_of_week"),
                                resultSet.getInt("S.capacity"),
                                resultSet.getInt("S.Room_number"), resultSet.getString("T.first_name"),
                                resultSet.getString("T.last_name")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no classes found for given gymId
    }

    // view schedule for all classes and sections
    public ArrayList<ClassSection> getClassScheduleAll() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT C.*, S.*, T.first_name, T.last_name " +
                        "FROM CLASS AS C " +
                        "LEFT JOIN SECTION AS S ON S.class_name = C.name " +
                        "LEFT JOIN TEACHES AS X ON X.class_name = C.name AND X.Sec_no = S.Sec_no " +
                        "LEFT JOIN TRAINER AS T ON T.email = X.trainer_email")) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<ClassSection> result = new ArrayList<ClassSection>();
                    do {
                        // String name, int sec, String time, int day, int room, String Fname, String
                        // Lname
                        result.add(new ClassSection(resultSet.getString("C.name"), resultSet.getInt("C.length"),
                                resultSet.getFloat("C.cost"), resultSet.getInt("S.Sec_no"),
                                resultSet.getString("S.time"), resultSet.getInt("S.day_of_week"),
                                resultSet.getInt("S.capacity"),
                                resultSet.getInt("S.Room_number"), resultSet.getString("T.first_name"),
                                resultSet.getString("T.last_name")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }

        return null; // return null if no classes found
    }

    // Add member to a class
    public String registerMemberForSection(String email, String cname, int Sec) throws SQLException {
        int count = getSectionCount(cname, Sec);
        int capacity = getClassCapacity(cname, Sec);
        if (capacity < count + 1) {
            return "Unsuccesful registration. Section at capacity.";
        } else if (count >= 0) {
            try (PreparedStatement statement = connection.prepareStatement(
                    "INSERT INTO JOINS (member_email, name, Sec_no) VALUES (?,?,?)")) {
                statement.setString(1, email);
                statement.setString(2, cname);
                statement.setInt(3, Sec);
                if (statement.executeUpdate() > 0) {
                    return "Registration successful";
                }
            }
        }
        return "Registration unsuccessful";
    }

    // Add Section to a class
    public String addSectionToClass(String cname, String time, int day, int capacity, int room, int Sec)
            throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO SECTION (Sec_no, time, day_of_week, capacity, Room_number, class_name) VALUES (?,?,?,?,?,?)")) {
            statement.setInt(1, Sec);
            statement.setString(2, time);
            statement.setInt(3, day);
            statement.setInt(4, capacity);
            statement.setInt(5, room);
            statement.setString(6, cname);
            if (statement.executeUpdate() > 0) {
                return "Section added successful";
            }
        }
        return "Section could not be added";
    }

    // Update Section of a class
    public String updateSection(String cname, String time, String day, int capacity, int room, int Sec)
            throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE SECTION SET Sec_no = ?, time = ?, day_of_week = ?, capacity = ?, Room_number = ?, class_name = ? WHERE Sec_no = ? AND class_name =?")) {
            statement.setInt(1, Sec);
            statement.setString(2, time);
            statement.setString(3, day);
            statement.setInt(4, capacity);
            statement.setInt(5, room);
            statement.setString(6, cname);
            statement.setInt(7, Sec);
            statement.setString(8, cname);
            if (statement.executeUpdate() > 0) {
                return "Section updated successful";
            }
        }
        return "Section could not be updated";
    }

    // Add a class
    public String addClass(String cname, int length, float cost) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO CLASS (name, length, cost) VALUES (?,?,?)")) {
            statement.setString(1, cname);
            statement.setInt(2, length);
            statement.setFloat(3, cost);
            if (statement.executeUpdate() > 0) {
                return "ClassSection added successful";
            }
        }

        return "ClassSection could not be added";
    }

    // update a class
    public String updateClass(String cname, int length, float cost) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE CLASS SET name = ?, length = ?, cost =? WHERE name = ?")) {
            statement.setString(1, cname);
            statement.setInt(2, length);
            statement.setFloat(3, cost);
            statement.setString(4, cname);
            if (statement.executeUpdate() > 0) {
                return "ClassSection updated successful";
            }
        }
        return "ClassSection could not be updated";
    }

    // delete a section
    public String removeSection(String cname, int sec) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM SECTION WHERE Sec_no = ? AND class_name = ?")) {
            statement.setInt(1, sec);
            statement.setString(2, cname);
            if (statement.executeUpdate() > 0) {

                return "Section deleted succesfully";
            }
        }
        return "Could not delete section";
    }

    // Remove a student from a class
    public String removeStudentFromClass(String cname, int sec, String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM JOINS WHERE Sec_no = ? AND name = ? AND member_email = ?")) {
            statement.setInt(1, sec);
            statement.setString(2, cname);
            statement.setString(3, email);
            if (statement.executeUpdate() > 0) {

                return "Student removed from class";
            }
        }
        return "Could not remove student";
    }

    // delete a class
    public String removeClass(String cname) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM CLASS WHERE name = ?")) {
            statement.setString(1, cname);
            if (statement.executeUpdate() > 0) {

                return "ClassSection deleted succesfully";
            }
        }
        return "Could not delete class";
    }

    // Get count of members in a section
    public int getSectionCount(String Cname, int Sec_no) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT COUNT(J.member_email) AS count FROM JOINS AS J WHERE J.Sec_no = ? AND J.name = ? ")) {
            statement.setInt(1, Sec_no);
            statement.setString(2, Cname);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt("count");
                }
            }
        }
        return -1;
    }

    // get capacity of a section
    public int getClassCapacity(String Cname, int Sec_no) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT S.capacity FROM SECTION AS S WHERE S.Sec_no = ? AND S.class_name = ? ")) {
            statement.setInt(1, Sec_no);
            statement.setString(2, Cname);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt("S.capacity");
                }
            }
        }
        return -1;
    }

    // Get count of members in all sections
    public ArrayList<ClassSection> getSectionCountAll() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT COUNT(J.member_email) AS count, J.Sec_no, J.name FROM JOINS AS J GROUP BY J.name, J.Sec_no ")) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<ClassSection> result = new ArrayList<ClassSection>();
                    do {

                        result.add(new ClassSection(resultSet.getString("J.name"), resultSet.getInt("J.Sec_no"),
                                resultSet.getInt("count")));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return new ArrayList<ClassSection>();
    }
}
