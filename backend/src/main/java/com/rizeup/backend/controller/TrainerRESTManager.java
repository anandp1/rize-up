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
@RequestMapping("/trainer")
public class TrainerRESTManager {
    public Database database = null;
    private MemberTable memberTable;
    private TrainerTable trainerTable;
    private ManagerTable managerTable;
    private FrontDeskTable frontDeskTable;

    public TrainerRESTManager() {
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

    // - [ ] Clients assigned to a trainer
    // - [ ] Chat history with a client
    // - [ ] Get a specific trainer schedule
    // - [ ] Get a specific trainer profile (all their information such as general
    // experience, description, etc.)
    // - [ ] View class list for a section (I think this should be names of all
    // members in the section)

    @GetMapping("/test")
    public String home() {
        return "Hello Trainer!";
    }

    @GetMapping("/clients/{trainerEmail}")
    public String getClients() {
        return "Clients";
    }

    @GetMapping("/chat/{clientEmail}")
    public String getChat(@PathVariable String clientEmail) {
        return "Chat";
    }

    @GetMapping("/schedule/{clientEmail}")
    public String getSchedule(@PathVariable String clientEmail) {
        return "Schedule";
    }

    @GetMapping("/profile/{trainerEmail}")
    public String getProfile(@PathVariable String trainerEmail) {
        return "Profile";
    }

    @GetMapping("/classlist/{sectionName}")
    public String getClassList(@PathVariable String sectionName) {
        return "ClassSection List";
    }

}
