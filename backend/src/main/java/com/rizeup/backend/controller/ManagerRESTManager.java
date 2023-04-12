package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

import com.rizeup.backend.Database;
import com.rizeup.backend.model.ClassSection;
import com.rizeup.backend.model.FrontDesk;
import com.rizeup.backend.model.Trainer;
import com.rizeup.backend.table.ClassTable;
import com.rizeup.backend.table.FrontDeskTable;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.TrainerTable;

@RestController
@CrossOrigin
@RequestMapping("/manager")
public class ManagerRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private FrontDeskTable frontDeskTable;
    private ClassTable classTable;

    public ManagerRESTManager() {
        try {
            Dotenv environment = Dotenv.load();
            database = new Database(environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
            Connection dbConnect = database.connect();

            this.memberTable = new MemberTable(dbConnect);
            this.frontDeskTable = new FrontDeskTable(dbConnect);
            this.trainerTable = new TrainerTable(dbConnect);
            this.classTable = new ClassTable(dbConnect);

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
        return "Hello Manager!";
    }

    @GetMapping("/report")
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, Object> getReport() {
        try {
            HashMap<String, Object> response = new HashMap<>();
            response.put("activeMembers", memberTable.getMemberCount());
            response.put("classAttendance", classTable.getSectionCountAll());
            response.put("newMembers", memberTable.getNewMemberCount());

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error getting report", e);
        }
    }

    @PostMapping("member/delete/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteMember(@PathVariable String memberEmail) {
        try {
            memberTable.removeMember(memberEmail);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "deleteMember - Error deleting member",
                    e);
        }
    }

    @PostMapping("/member/update/{memberEmail}/{membership}")
    @ResponseStatus(HttpStatus.OK)
    public String updateAccount(@PathVariable String memberEmail, @PathVariable String membership) {
        try {
            String response = memberTable.updateMember(memberEmail, membership);
            if (response.equals("Member updated successfully")) {
                return "Account Updated";
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "updateAccount - Could not update account");
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "updateAccount - Error updating account");
        }
    }

    @PostMapping("class/delete/{className}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteClass(@PathVariable String className) {
        try {
            classTable.removeClass(className);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "deleteClass - Error deleting class",
                    e);
        }
    }

    @GetMapping("/class/all/{gymId}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<ClassSection> getAllClasses(@PathVariable String gymId) {
        try {
            int gymIdNum = Integer.parseInt(gymId);

            ArrayList<ClassSection> response = classTable.getClassScheduleAll();

            if (response == null) {
                return new ArrayList<ClassSection>();
            }

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting all classes");
        }
    }

    @PostMapping("/class/add/{className}/{length}/{cost}")
    @ResponseStatus(HttpStatus.OK)
    public void addClass(@PathVariable String className, @PathVariable String length, @PathVariable String cost) {
        try {
            int lengthInt = Integer.parseInt(length);
            float costFloat = Float.parseFloat(cost);

            classTable.addClass(className, lengthInt, costFloat);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error adding class");
        }
    }

    @PostMapping("/class/add/{className}/{time}/{day}/{capacity}/{room}/{section}")
    @ResponseStatus(HttpStatus.OK)
    public void addClassSection(@PathVariable String className, @PathVariable String time, @PathVariable String day,
            @PathVariable String capacity, @PathVariable String room, @PathVariable String section) {
        try {
            int capacityInt = Integer.parseInt(capacity);
            int roomInt = Integer.parseInt(room);
            int sectionInt = Integer.parseInt(section);
            int dayInt = Integer.parseInt(day);

            classTable.addSectionToClass(className, time, dayInt, capacityInt, roomInt, sectionInt);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error adding class section");
        }
    }

    @GetMapping("/employee/all/{gymId}")
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, Object> getAllEmployees(@PathVariable String gymId) {
        try {
            int gymIdNum = Integer.parseInt(gymId);
            ArrayList<Trainer> trainers = trainerTable.getAllTrainers(gymIdNum);
            ArrayList<FrontDesk> frontDesks = frontDeskTable.getAllFrontDesk(gymIdNum);

            HashMap<String, Object> response = new HashMap<>();
            response.put("trainer", trainers);
            response.put("frontDesk", frontDesks);

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting all employees");
        }
    }

    @PostMapping("employee/delete/{employeeEmail}/{employeeType}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteEmployee(@PathVariable String employeeEmail, @PathVariable String employeeType) {
        try {
            if (employeeType.equals("trainer")) {
                trainerTable.removeTrainer(employeeEmail);
            } else if (employeeType.equals("frontdesk")) {
                frontDeskTable.removeFrontDesk(employeeEmail);
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "deleteEmployee - Invalid employee type");
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "deleteEmployee - Error deleting employee",
                    e);
        }
    }
}
