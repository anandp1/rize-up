package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequestMapping("/member")
public class MemberRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private ManagerTable managerTable;
    private FrontDeskTable frontDeskTable;

    public MemberRESTManager() {
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

    // cant get all trainer profiles, view trainer names, and then click on them to
    // get details

    // get all membership options and perks
    // add a trainer to a member

    @GetMapping("/test")
    public String home() {
        return "Hello Customer!";
    }

    @GetMapping("/trainer/assigned/{memberEmail}")
    public String getTrainersAssignedToMember(@PathVariable String memberEmail) {
        return "Trainers Assigned to Member";
    }

    @GetMapping("/trainer/chat/{trainerEmail}")
    public String getChatHistory(@PathVariable String trainerEmail) {
        return "Chat History";
    }

    @PostMapping("/trainer/remove/{trainerEmail}")
    public String deleteTrainer(@PathVariable String trainerEmail) {
        return "Trainer Deleted";
    }

    @GetMapping("/trainer/all")
    public String getAllTrainers() {
        return "All Trainers";
    }

    @PostMapping("/trainer/add/{trainerEmail}")
    public String addTrainer(@PathVariable String trainerEmail) {
        return "Trainer Added";
    }

    @GetMapping("/class/all")
    public String getAllClasses() {
        return "All Classes";
    }

    @PostMapping("/class/add/{className}")
    public String addClass(@PathVariable String className) {
        return "Class Added";
    }

    @GetMapping("/account/{memberEmail}")
    public String getAccountInformation(@PathVariable String memberEmail) {
        return "Account Information";
    }

    @PostMapping("/account/delete/{memberEmail}")
    public String deleteAccount(@PathVariable String memberEmail) {
        return "Account Deleted";
    }

    @PostMapping("/account/update/{memberEmail}")
    public String updateAccount(@PathVariable String memberEmail) {
        return "Account Updated";
    }
}