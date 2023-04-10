package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

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
@RequestMapping("/frontdesk")
public class ManagerRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private ManagerTable managerTable;
    private FrontDeskTable frontDeskTable;

    public ManagerRESTManager() {
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

    // - [ ] Report (number of active members at the gym, people attend for each
    // section at each class, how many new members joined past 30 days)
    // - [ ] Delete a member account
    // - [ ] Update member information
    // - [ ] Remove a class
    // - [ ] Get all available classes and sections
    // - [ ] Get all employees
    // - [ ] Delete a employee account

    @GetMapping("/test")
    public String home() {
        return "Hello Manager!";
    }

    @PostMapping("member/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteMember(@RequestBody Member member) {
        // try {
        // memberTable.deleteMember(member);
        // } catch (SQLException e) {
        // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error
        // deleting member", e);
        // }
    }

    @PostMapping("member/update")
    @ResponseStatus(HttpStatus.OK)
    public void updateMember(@RequestBody Member member) {
        // try {
        // memberTable.updateMember(member);
        // } catch (SQLException e) {
        // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error
        // updating member", e);
        // }
    }

    @PostMapping("class/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteClass(@RequestBody String classId) {
        // try {
        // trainerTable.deleteClass(classId);
        // } catch (SQLException e) {
        // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error
        // deleting class", e);
        // }
    }

    @GetMapping("class/all")
    @ResponseStatus(HttpStatus.OK)
    public void getAllClasses() {
        // try {
        // return trainerTable.getAllClasses();
        // } catch (SQLException e) {
        // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error
        // getting all classes", e);
        // }
    }

    @GetMapping("employee/all")
    @ResponseStatus(HttpStatus.OK)
    public void getAllEmployees() {
        // try {
        // return managerTable.getAllEmployees();
        // } catch (SQLException e) {
        // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error
        // getting all employees", e);
        // }
    }

    @PostMapping("employee/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteEmployee(@RequestBody String employeeId) {
        // try {
        // managerTable.deleteEmployee(employeeId);
        // } catch (SQLException e) {
        // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error
        // deleting employee", e);
        // }
    }

}
