package com.rizeup.backend.table;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.rizeup.backend.model.ClassSection;
import java.time.LocalDate;

import com.rizeup.backend.model.Member;

public class MemberTable {
    private final Connection connection;

    public MemberTable(Connection database) {
        this.connection = database;
    }

    // get all members
    public List<Member> getAllMembers() throws SQLException {
        List<Member> members = new ArrayList<>();

        try (Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM MEMBER")) {
            while (resultSet.next()) {
                Member member = new Member(resultSet.getString("email"), resultSet.getDate("birth_date"),
                        resultSet.getInt("age"),
                        resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                        resultSet.getString("last_name"), resultSet.getDate("date_joined"),
                        resultSet.getString("membership_name"));
                members.add(member);
            }
        }
        return members;
    }

    // verify member for login
    public Member getMember(String email, String password) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM MEMBER WHERE email = ? AND password = ?")) {
            statement.setString(1, email);
            statement.setString(2, password);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Member(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                            resultSet.getString("last_name"), resultSet.getDate("date_joined"),
                            resultSet.getString("membership_name"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    // find all classes and sections member is registered for
    public ArrayList<ClassSection> getClassesByMember(String Memail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT C.*, S.* FROM CLASS AS C, SECTION AS S, JOINS AS T WHERE S.class_name = C.name AND T.Sec_no = S.Sec_no AND T.name = C.name AND T.member_email = ?")) {
            statement.setString(1, Memail);
            try (ResultSet resultSet = statement.executeQuery()) {

                if (resultSet.next()) {
                    ArrayList<ClassSection> result = new ArrayList<ClassSection>();
                    do {
                        // String name, int length, float cost, int sec, String time, int day, int
                        // capacity, int room, String Fname, String Lname
                        result.add(new ClassSection(resultSet.getString("C.name"), resultSet.getInt("C.length"),
                                resultSet.getFloat("C.cost"), resultSet.getInt("S.Sec_no"),
                                resultSet.getString("S.time"), resultSet.getInt("S.day_of_week"),
                                resultSet.getInt("S.capacity"), resultSet.getInt("S.Room_number"), null, null));
                    } while (resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no classes found for given email
    }

    // add a member
    // email, birth_date, age, gender, password, first_name, middle_name, last_name,
    // date_joined, membership_name, gym_id
    public String addMember(String email, Date birth, int age, String gender, String password, String fname,
            String lname, Date joined, String membership, int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO MEMBER (email, birth_date, age, gender, password, first_name, middle_name, last_name, date_joined, membership_name, gym_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)")) {
            statement.setString(1, email);
            statement.setDate(2, birth);
            statement.setInt(3, age);
            statement.setString(4, gender.substring(0, 1));
            statement.setString(5, password);
            statement.setString(6, fname);
            statement.setString(7, null);
            statement.setString(8, lname);
            statement.setDate(9, joined);
            statement.setString(10, membership);
            statement.setInt(11, gym_id);

            if (statement.executeUpdate() > 0) {
                return "Member added successfully";
            }
        }
        return "Could not add member"; // return null if no member found with the given email and password
    }

    // get a member
    public Member getMemberInfo(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM MEMBER WHERE email = ? ")) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Member(resultSet.getString("email"), resultSet.getDate("birth_date"),
                            resultSet.getInt("age"),
                            resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                            resultSet.getString("last_name"), resultSet.getDate("date_joined"),
                            resultSet.getString("membership_name"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

    // Remove Member from table
    public String removeMember(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM MEMBER WHERE email = ? ")) {
            statement.setString(1, email);
            if (statement.executeUpdate() > 0) {
                return "Member removed";
            }
        }
        return "Could not remove member";
    }

    // update a member
    // email, birth_date, age, gender, password, first_name, middle_name, last_name,
    // date_joined, membership_name, gym_id
    public String updateMember(String email, String membership) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE MEMBER SET email = ?, membership_name = ? WHERE email = ?")) {
            statement.setString(1, email);
            statement.setString(2, membership);
            statement.setString(3, email);

            if (statement.executeUpdate() > 0) {
                return "Member updated successfully";
            }
        }

        return "Could not update member"; // return null if no member found with the given email and password
    }

    public String updateMemberPassword(String email, String password) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE MEMBER SET password = ? WHERE email = ?")) {
            statement.setString(1, password);
            statement.setString(2, email);

            if (statement.executeUpdate() > 0) {
                return "Member updated successfully";
            }
        }

        return "Could not update member"; // return null if no member found with the given email and password
    }

    // Get count of all members
    public int getMemberCount() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT COUNT(email) AS count FROM MEMBER ")) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt("count");
                }
            }
        }
        return -1;
    }

    // Get count of all new members from last 30 days
    public int getNewMemberCount() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT COUNT(email) AS count FROM MEMBER WHERE date_joined >= ?")) {
            statement.setDate(1, Date.valueOf(LocalDate.now().minusDays(30)));
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt("count");
                }
            }
        }
        return 0;
    }
}
