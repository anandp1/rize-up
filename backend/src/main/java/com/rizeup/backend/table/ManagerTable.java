package com.rizeup.backend.table;

import java.sql.*;

import com.rizeup.backend.model.Manager;
import com.rizeup.backend.model.Report;
import com.rizeup.backend.model.Class;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.ClassTable;
import java.time.Instant;
import java.util.Iterator;
import java.util.ArrayList;

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

    //get manager info from email
    public Manager getManager(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM MANAGER WHERE email = ?")) {
            statement.setString(1, email);
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

    //Remove Manager from table
    public String removeManager(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM MANAGER WHERE email = ? ")) {
            statement.setString(1, email);
            if (statement.executeUpdate() > 0) {
                return "Manager removed";
            }
        }
        return "Could not remove manager"; 
    }

    //Insert a manager
    //email, birth_date, age, gender, password, first_name, middle_name, last_name, date_joined, membership_name, gym_id
    public String addManager(String email, Date birth, int age, String gender, String password, String fname, String mname, String lname, int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO MANAGER (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id) VALUES (?,?,?,?,?,?,?,?,?)")) {
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
                return "Manager added successfully";
            }
        }
        return "Could not add manager"; 
    }

    //update a manager
    //email, birth_date, age, gender, password, first_name, middle_name, last_name, membership_name, gym_id
    public String updateManager(String email, Date birth, int age, String gender, String password, String fname, String mname, String lname, int gym_id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "UPDATE MANAGER SET email = ?, birth_date = ?, age = ?, gender = ?, password = ?, first_name = ?, middle_name = ?, last_name = ?, gym_id = ? WHERE email=?")) {
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
                return "Manager updated successfully";
            }
        }
        return "Could not update Manager"; 
    }

    //Generate report
    public Report addReport(String email) throws SQLException {
        MemberTable member = new MemberTable(connection);
        ClassTable sections = new ClassTable(connection);
        Timestamp time = Timestamp.from(Instant.now());
        Report report = new Report(time, member.getMemberCount(), member.getNewMemberCount(), email, sections.getSectionCountAll());
        
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO REPORT (timestamp, num_gym_members, new_member_count, manager_email) VALUES (?,?,?,?)")) {
            statement.setTimestamp(1, time);
            statement.setInt(2, report.getMembers());
            statement.setInt(3, report.getNewMembers());
            statement.setString(4, email);
            if (statement.executeUpdate() >0) {
                Iterator<Class> i = report.getSecCount().iterator();
                Class c;
                while(i.hasNext()){
                    c = i.next();
                    
                    try (PreparedStatement statement2 = connection.prepareStatement(
                            "INSERT INTO NO_REGISTERED (count, Sec_no, class_name, timestamp) VALUES (?,?,?,?)")) {
                        statement2.setInt(1, c.getJoined());
                        statement2.setInt(2, c.getSec());
                        statement2.setString(3, c.getName());
                        statement2.setTimestamp(4, time);
                        statement2.executeUpdate();
                    }
                }
                return report;
            }
        }
        return null; 
    }

    //Get all reports for a manager
    public ArrayList<Report> getReport(String email) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT R.*, N.* FROM REPORT AS R, NO_REGISTERD AS N WHERE R.manager_email = ? AND R.timestamp = N.timestamp GROUP BY R.manager_email")) {
            statement.setString(1, email);
            try (ResultSet resultSet = statement.executeQuery()) {
                if(resultSet.next()){
                    ArrayList<Report> result = new ArrayList<Report>();
                    while (!resultSet.isAfterLast()) {
                        Report temp = new Report(resultSet.getTimestamp("R.timestamp"), resultSet.getInt("R.num_gym_members"), resultSet.getInt("R.new_member_count"), resultSet.getString("email"));
                        ArrayList<Class> sections = new ArrayList<Class>();
                        for(String manager = resultSet.getString("R.email"); manager == resultSet.getString("R.email") && !resultSet.isAfterLast(); resultSet.next()){
                            sections.add(new Class(resultSet.getString("N.class_name"), resultSet.getInt("N.Sec_no"), resultSet.getInt("N.count")));
                        }
                        temp.setSecCount(sections);
                        result.add(temp);
                        
                    }
                    return result;
                }
            }
        }
        return null; 
    }

}
