package com.rizeup.backend;


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
import com.rizeup.backend.model.Report;
import com.rizeup.backend.table.FrontDeskTable;
import com.rizeup.backend.table.ManagerTable;
import com.rizeup.backend.table.MemberTable;
import com.rizeup.backend.table.TrainerTable;
import com.rizeup.backend.table.ClassTable;

public class App {

	public static void main(String[] args) throws SQLException {
		Dotenv environment = Dotenv.load();
        Database database = new Database(environment.get("DB_URL"), environment.get("DB_USER"),
                    environment.get("DB_PASS"));
        Connection connectdb = database.connect();

        TrainerTable trainerTable = new TrainerTable(connectdb);
        System.out.println(trainerTable.getClassesByTrainer("test@trainer.com"));

        //ClassTable classTable = new ClassTable(connectdb);
        //System.out.println(classTable.registerMemberForSection("test@member.com", "Zoomba", 1));
        ManagerTable managerTable = new ManagerTable(connectdb);
        Report report = managerTable.addReport("test@manager.com");
        System.out.println(report.getEmail());  
        System.out.println(report.getMembers()+"   "+report.getNewMembers()); 
        System.out.println(report.getTimestamp()); 
        
        System.out.println(report.getSecCount().get(0).getName());    
        System.out.println(report.getSecCount().get(0).getJoined());         

	}

}