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
import com.rizeup.backend.model.Trainer;
import com.rizeup.backend.table.ClassTable;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.MessageTable;
import com.rizeup.backend.table.TrainerTable;
import com.rizeup.backend.table.TrainsTable;

@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private TrainsTable trainsTable;
    private MessageTable messageTable;
    private ClassTable classTable;

    public MemberRESTManager() {
        try {
            Dotenv environment = Dotenv.load();
            database = new Database(environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
            Connection dbConnect = database.connect();

            this.memberTable = new MemberTable(dbConnect);
            this.trainerTable = new TrainerTable(dbConnect);
            this.trainsTable = new TrainsTable(dbConnect);
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
        return "Hello Customer!";
    }

    @GetMapping("/trainer/assigned/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<Trainer> getTrainersAssignedToMember(@PathVariable String memberEmail) {
        try {
            ArrayList<String> trainerEmails = trainsTable.getMembersTrainers(memberEmail);

            if (trainerEmails == null) {
                return new ArrayList<Trainer>();
            }

            // get all trainer profiles from emails
            ArrayList<Trainer> trainers = new ArrayList<Trainer>();
            for (String trainerEmail : trainerEmails) {
                Trainer trainer = trainerTable.getTrainer(trainerEmail);
                trainers.add(trainer);
            }

            return trainers;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting all trainers assigned to member");
        }
    }

    @GetMapping("/trainer/chat/history/{trainerEmail}/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public List<Message> getChatHistory(@PathVariable String trainerEmail, @PathVariable String memberEmail) {
        try {
            List<Message> response = messageTable.getMessages(trainerEmail, memberEmail);

            if (response == null) {
                return new ArrayList<Message>();
            }

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting chat history");
        }
    }

    @PostMapping("/trainer/chat/add")
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

    @PostMapping("/trainer/remove/{trainerEmail}/{memberEmail}")
    public String deleteTrainer(@PathVariable String trainerEmail, @PathVariable String memberEmail) {
        try {
            String response = trainsTable.removeTrainerFromMember(trainerEmail, memberEmail);
            if (response.equals("Trainer removed from member successfully")) {
                return "Trainer removed";
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "deleteTrainer - Could not remove trainer");
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error removing trainer");
        }
    }

    @GetMapping("/trainer/all/{gymId}")
    @ResponseStatus(HttpStatus.OK)
    public HashMap<String, HashMap<String, Object>> getAllTrainers(@PathVariable String gymId) {
        try {
            int gymIdInt = Integer.parseInt(gymId);

            return trainerTable.getAllTrainersInformation(gymIdInt);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting all trainers");
        }
    }

    @PostMapping("/trainer/add/{trainerEmail}/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public String addTrainer(@PathVariable String trainerEmail, @PathVariable String memberEmail) {
        try {
            String response = trainsTable.addTrainerToMember(trainerEmail, memberEmail);
            if (response.equals("Trainer added to member successfully")) {
                return "Trainer added";
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "addTrainer - Could not add trainer");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error adding trainer");
        }
    }

    @GetMapping("/class/all/{gymId}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<ClassSection> getAllClasses(@PathVariable String gymId) {
        try {
            int gymIdNum = Integer.parseInt(gymId);

            ArrayList<ClassSection> response = classTable.getClassScheduleByGym(gymIdNum);

            if (response == null) {
                return new ArrayList<ClassSection>();
            }

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting all classes");
        }
    }

    @PostMapping("/class/add/{className}/{email}/{sectionId}")
    @ResponseStatus(HttpStatus.OK)
    public String addClass(@PathVariable String className, @PathVariable String email,
            @PathVariable String sectionId) {
        try {
            int sectionIdNumber = Integer.parseInt(sectionId);

            String response = classTable.registerMemberForSection(email, className, sectionIdNumber);

            if (response.equals("Registration successful")) {
                return "Section added";
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "addClass - Could not add class");
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "addClass - Error adding class");
        }
    }

    @GetMapping("/schedule/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<ClassSection> getSchedule(@PathVariable String memberEmail) {
        try {
            ArrayList<ClassSection> response = memberTable.getClassesByMember(memberEmail);

            if (response == null) {
                return new ArrayList<ClassSection>();
            }

            return response;
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error getting trainer schedule");
        }
    }

    @GetMapping("/account/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public Member getAccountInformation(@PathVariable String memberEmail) {
        try {
            Member member = memberTable.getMemberInfo(memberEmail);
            if (member == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "getAccountInformation - Could not get account information");
            } else {
                return member;
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "getAccountInformation - Error getting account information");
        }
    }

    @PostMapping("/account/delete/{memberEmail}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteAccount(@PathVariable String memberEmail) {
        try {
            String response = memberTable.removeMember(memberEmail);
            if (response.equals("Member removed")) {
                return "Account Deleted";
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "deleteAccount - Could not delete account");
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "deleteAccount - Error deleting account");
        }
    }

    @PostMapping("/account/update/{memberEmail}/{membership}")
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

    @PostMapping("/account/update/password/{memberEmail}/{password}")
    @ResponseStatus(HttpStatus.OK)
    public String updatePassword(@PathVariable String memberEmail, @PathVariable String password) {
        try {
            String response = memberTable.updateMemberPassword(memberEmail, password);
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
}