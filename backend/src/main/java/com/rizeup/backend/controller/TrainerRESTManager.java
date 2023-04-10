package com.rizeup.backend.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import com.rizeup.backend.model.Member;
import com.rizeup.backend.model.Message;
import com.rizeup.backend.table.ClassTable;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.MessageTable;
import com.rizeup.backend.table.TrainerTable;
import com.rizeup.backend.table.TrainsTable;

@RestController
@CrossOrigin
@RequestMapping("/trainer")
public class TrainerRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private TrainsTable trainsTable;
    private MessageTable messageTable;
    private ClassTable classTable;

    public TrainerRESTManager() {
        try {
            Dotenv environment = Dotenv.load();
            database = new Database(environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
            Connection dbConnect = database.connect();

            this.memberTable = new MemberTable(dbConnect);
            this.trainerTable = new TrainerTable(dbConnect);
            this.trainerTable = new TrainerTable(dbConnect);
            this.messageTable = new MessageTable(dbConnect);
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
        return "Hello Trainer!";
    }

    @GetMapping("/clients/{trainerEmail}")
    public ArrayList<Member> getClients(@PathVariable String trainerEmail) {
        try {
            ArrayList<String> memberEmails = trainsTable.getTrainerClients(trainerEmail);

            if (memberEmails == null) {
                return new ArrayList<Member>();
            }

            // get all member profiles from emails
            ArrayList<Member> members = new ArrayList<Member>();
            for (String memberEmail : memberEmails) {
                Member member = memberTable.getMemberInfo(memberEmail);
                members.add(member);
            }

            return members;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting all members assigned to trainer");
        }

    }

    @GetMapping("/client/chat/history/{trainerEmail}/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public List<Message> getChatHistory(@PathVariable String trainerEmail, @PathVariable String memberEmail) {
        try {
            return messageTable.getMessages(trainerEmail, memberEmail);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting chat history");
        }
    }

    @PostMapping("/client/chat/add")
    @ResponseStatus(HttpStatus.OK)
    public String getChatHistory(@RequestBody Message messageBody) {
        try {
            String response = messageTable.addMessage(messageBody.getTemail(), messageBody.getMemail(),
                    messageBody.getContent(),
                    messageBody.getSender(), messageBody.getReceiver());
            if (response.equals("Message sent successfully")) {
                return "Message added";
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "getChatHistory - Could not sent message");
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error sending message");
        }
    }

    @GetMapping("/schedule/{trainerEmail}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<ClassSection> getSchedule(@PathVariable String trainerEmail) {
        try {
            return trainerTable.getClassesByTrainer(trainerEmail);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting trainer schedule");
        }
    }

    @GetMapping("/profile/{trainerEmail}")
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, Object> getProfile(@PathVariable String trainerEmail) {
        try {
            return trainerTable.getTrainerFullProfile(trainerEmail);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "getProfile - Error getting trainer profile");
        }
    }

    @GetMapping("/classlist/{sectionNumber}/{className}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<String> getClassList(@PathVariable String sectionNumber, @PathVariable String className) {
        try {
            int sectionNumberInt = Integer.parseInt(sectionNumber);
            return classTable.getSectionList(className, sectionNumberInt);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "getClassList - Error getting class list");
        }
    }

}
