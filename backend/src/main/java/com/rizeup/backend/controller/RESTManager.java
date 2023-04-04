package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

import com.rizeup.backend.Database;
import com.rizeup.backend.model.Member;
import com.rizeup.backend.table.MemberTable;

import java.util.List;

@RestController
@CrossOrigin
public class RESTManager {
    public Database database = null;
    private MemberTable memberTable;

    /**
     * Constructor for RESTManager, connects to database
     */
    public RESTManager() {
        try {
            Dotenv environment = Dotenv.load();
            database = new Database(environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
            Connection dbConnect = database.connect();

            this.memberTable = new MemberTable(dbConnect);

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


    @GetMapping("/")
    public String home() {
        return "Hello World!";
    }

    @GetMapping("/members")
    public List<Member> getAllMembers() throws SQLException {
        return memberTable.getAllMembers();
    }
}
