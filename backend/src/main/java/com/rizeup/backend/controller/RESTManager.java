package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

import com.rizeup.backend.Database;
import com.rizeup.backend.model.FrontDesk;
import com.rizeup.backend.model.Manager;
import com.rizeup.backend.model.Member;
import com.rizeup.backend.model.Trainer;
import com.rizeup.backend.table.FrontDeskTable;
import com.rizeup.backend.table.ManagerTable;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.TrainerTable;

@RestController
@CrossOrigin
public class RESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private ManagerTable managerTable;
    private FrontDeskTable frontDeskTable;

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
            this.managerTable = new ManagerTable(dbConnect);
            this.frontDeskTable = new FrontDeskTable(dbConnect);
            this.trainerTable = new TrainerTable(dbConnect);

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

    // @GetMapping("/sign-in")
    // public Member signIn(@RequestParam String email, @RequestParam String
    // password) throws SQLException {
    // return memberTable.getMember(email, password);
    // }

    @PostMapping("/sign-in")
    @ResponseStatus(HttpStatus.OK)
    public Object signIn(@RequestBody SignInCredentials credentials) throws SQLException {
        String email = credentials.getEmail();
        String password = credentials.getPassword();
        String role = credentials.getRole();

        if (email == null || password == null || role == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email, password, or role is null");
        }

        if (role.equals(SignIn.MEMBER.getRole())) {
            Member member = memberTable.getMember(email, password);
            if (member == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found");
            }
            return member;
        } else if (role.equals(SignIn.TRAINER.getRole())) {
            Trainer trainer = trainerTable.getTrainer(email, password);
            if (trainer == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found");
            }
            return trainer;
        } else if (role.equals(SignIn.FRONT_DESK.getRole())) {
            FrontDesk frontDesk = frontDeskTable.getFrontDesk(email, password);
            if (frontDesk == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Front desk staff not found");
            }
            return frontDesk;
        } else if (role.equals(SignIn.MANAGER.getRole())) {
            Manager manager = managerTable.getManager(email, password);
            if (manager == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found");
            }
            return manager;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");
        }
    }
}
