package com.rizeup.backend.table;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import com.rizeup.backend.model.Message;

public class MessageTable {
    private final Connection connection;

    public MessageTable(Connection database) {
        this.connection = database;
    }

    //get all messages with trainer and member
    public List<Message> getMessages(String temail, String memail) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT * FROM MESSAGE WHERE trainer_email = ? AND member_email = ?")) {
            statement.setString(1, temail);
            statement.setString(2, memail);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    List<Message> result = new ArrayList<Message>();
                    do{
                        //String name, int length, float cost, int sec, String time, int day, int capacity, int room, String Fname, String Lname
                        result.add(new Message(resultSet.getString("sender_name"),resultSet.getString("receiver_name"),resultSet.getTimestamp("timestamp"), resultSet.getString("content"), resultSet.getString("trainer_email"), resultSet.getString("member_email")));
                    }while(resultSet.next());
                    return result;
                }
            }
        }
        return null; // return null if no member found with the given email and password
    }
    //add message with trainer and member
    public String addMessage(String temail, String memail, String content, String sender, String receiver) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO MESSAGE(sender_name, receiver_name, timestamp, content, trainer_email, member_email) VALUES (?,?,?,?,?,?)")) {
            statement.setString(1, sender);
            statement.setString(2, receiver);
            statement.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
            statement.setString(4, content);
            statement.setString(5, temail);
            statement.setString(6, memail);
            if (statement.executeUpdate() >0) {
                return "Message sent successfully";
            }
        }
        return "Could not send message"; 
    }
}
