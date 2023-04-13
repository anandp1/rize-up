package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

import com.rizeup.backend.Database;
import com.rizeup.backend.model.Gym;
import com.rizeup.backend.model.Member;
import com.rizeup.backend.model.Membership;
import com.rizeup.backend.table.GymTable;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.MembershipTable;

@RestController
@CrossOrigin
@RequestMapping("/frontdesk")
public class FrontDeskRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private GymTable gymTable;
    private MembershipTable membershipTable;

    public FrontDeskRESTManager() {
        try {
            Dotenv environment = Dotenv.load();
            database = new Database(environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
            Connection dbConnect = database.connect();

            this.memberTable = new MemberTable(dbConnect);
            this.gymTable = new GymTable(dbConnect);
            this.membershipTable = new MembershipTable(dbConnect);

        } catch (DotenvException e) {
            System.err.println("Could not load .env file in root folder!");
            System.err.println("Create or move .env file with DB_URL, DB_USER, DB_PASS");
            System.exit(1);
        } catch (SQLException e) {
            System.err.println("Error connecting to database!");
            System.exit(1);
        } catch (Exception e) {
            System.err.println("Unknown RESTManager error");
            e.printStackTrace();
        }
    }

    @GetMapping("/test")
    public String home() {
        return "Hello Front Desk!";
    }

    @GetMapping("/gyminfo/{gymId}")
    @ResponseStatus(HttpStatus.OK)
    public Gym getGymInfo(@PathVariable int gymId) {
        try {
            return gymTable.getGym(gymId);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error getting gym info");
        }
    }

    @GetMapping("/memberships/{gymId}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<Membership> getMemberships(@PathVariable int gymId) {
        try {
            ArrayList<Membership> response = membershipTable.getMembershipsByGym(gymId);

            if (response == null) {
                return new ArrayList<Membership>();
            }

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error getting memberships");
        }
    }

    @GetMapping("/members/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Member> getAllMembers() {
        try {
            List<Member> response = memberTable.getAllMembers();

            if (response == null) {
                return new ArrayList<Member>();
            }

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error getting all members");
        }
    }

}
