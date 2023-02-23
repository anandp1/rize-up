package com.rizeup.backend;

import java.sql.SQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

@RestController
@CrossOrigin
public class RESTManager {
    public Database database = null;

    /**
     * Constructor for RESTManager, connects to database
     */
    public RESTManager() {
        try {
            Dotenv environment = Dotenv.load();
            database = new Database("jdbc:mysql://" + environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
            database.connect();
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
}
