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
                            resultSet.getString("last_name"));
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }

}
