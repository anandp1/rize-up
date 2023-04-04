package com.rizeup.backend.table;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.rizeup.backend.model.Member;

public class MemberTable {
    private final Connection connection;

    public MemberTable(Connection database) {
        this.connection = database;
    }

    public List<Member> getAllMembers() throws SQLException {
        List<Member> members = new ArrayList<>();

        try (Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM MEMBER")) {
            while (resultSet.next()) {
                Member member = new Member(resultSet.getString("email"), resultSet.getDate("birth_date"),
                        resultSet.getInt("age"),
                        resultSet.getString("gender").charAt(0), resultSet.getString("first_name"),
                        resultSet.getString("last_name"));
                members.add(member);
            }
        }
        return members;
    }

    // public void addCustomer(Customer customer) throws SQLException {
    // try (PreparedStatement statement = connection
    // .prepareStatement("INSERT INTO CUSTOMERS (name, email) VALUES (?, ?)")) {
    // statement.setString(1, customer.getName());
    // statement.setString(2, customer.getEmail());
    // statement.executeUpdate();
    // }
    // }
}
