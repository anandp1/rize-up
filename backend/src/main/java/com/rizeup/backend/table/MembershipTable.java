package com.rizeup.backend.table;

import com.rizeup.backend.model.Membership;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MembershipTable {
    private final Connection connection;

    public MembershipTable(Connection database) {
        this.connection = database;
    }

    // get all memberships
    public ArrayList<Membership> getAllMemberships() throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT M.*, P.perk FROM MEMBERSHIP_PLANS AS M, MEMBERSHIP_PERKS AS P WHERE M.membership_name = P.membership_name ")) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    ArrayList<Membership> result = new ArrayList<Membership>();
                    while (!resultSet.isAfterLast()) {
                        Membership temp = new Membership(resultSet.getString("M.membership_name"),
                                resultSet.getInt("M.duration"), resultSet.getFloat("M.price"));
                        ArrayList<String> perks = new ArrayList<String>();
                        for (String membership = resultSet.getString("M.membership_name"); membership == resultSet
                                .getString("M.membership_name") && !resultSet.isAfterLast(); resultSet.next()) {
                            perks.add(resultSet.getString("P.perk"));
                        }
                        temp.setPerks(perks);
                        result.add(temp);
                    }
                    return result;
                }
            }
        }
        return null;
    }

    // get memberships for specific gym
    public ArrayList<Membership> getMembershipsByGym(int passcode) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT M.*, P.perk FROM GYM_PLANS AS G, MEMBERSHIP_PLANS AS M, MEMBERSHIP_PERKS AS P WHERE M.membership_name = P.membership_name AND G.membership_name = M.membership_name AND G.passcode = ?")) {
            statement.setInt(1, passcode);
            try (ResultSet resultSet = statement.executeQuery()) {
                ArrayList<Membership> result = new ArrayList<Membership>();
                Map<String, Membership> membershipsMap = new HashMap<String, Membership>();
                while (resultSet.next()) {
                    String membershipName = resultSet.getString("M.membership_name");
                    Membership temp;
                    if (!membershipsMap.containsKey(membershipName)) {
                        temp = new Membership(membershipName, resultSet.getInt("M.duration"),
                                resultSet.getFloat("M.price"));
                        membershipsMap.put(membershipName, temp);
                        result.add(temp);
                    } else {
                        temp = membershipsMap.get(membershipName);
                    }
                    temp.getPerks().add(resultSet.getString("P.perk"));
                }
                return result;
            }
        }
    }

    // get one membership
    public Membership getMembership(String name) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "SELECT M.*, P.perk FROM MEMBERSHIP_PLANS AS M, MEMBERSHIP_PERKS AS P WHERE M.membership_name = P.membership_name AND M.membership_name = ?")) {
            statement.setString(1, name);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    Membership result = new Membership(resultSet.getString("M.membership_name"),
                            resultSet.getInt("M.duration"), resultSet.getFloat("M.price"));
                    ArrayList<String> perks = new ArrayList<String>();
                    do {
                        perks.add(resultSet.getString("P.perk"));

                    } while (resultSet.next());
                    result.setPerks(perks);
                    return result;
                }
            }
        }
        return null;
    }

    // add a membership
    public String addMembership(String name, int duration, float price) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO MEMBERSHIP_PLANS(membership_name, duration, price) VALUE (?,?,?)")) {
            statement.setString(1, name);
            statement.setInt(2, duration);
            statement.setFloat(3, price);
            if (statement.executeUpdate() > 0) {
                return "Sucessfully added membership perk";
            }
        }
        return "Could not add membership perk";
    }

    // add a membership perk
    public String addMembership(String name, String perk) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO MEMBERSHIP_PERKSS(membership_name, perk) VALUE (?,?)")) {
            statement.setString(1, name);
            statement.setString(2, perk);
            if (statement.executeUpdate() > 0) {
                return "Sucessfully added membership";
            }
        }
        return "Could not add membership";
    }

    // delete a membership
    public String deleteMembership(String name) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(
                "DELETE FROM MEMBERSHIP_PLANS as M WHERE M.membership_name = ?")) {
            statement.setString(1, name);
            if (statement.executeUpdate() > 0) {
                return "Sucessfully deleted membership";
            }
        }
        return "Could not delete membership";
    }

}
