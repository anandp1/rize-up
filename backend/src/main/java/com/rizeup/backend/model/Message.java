package com.rizeup.backend.model;
import java.sql.*;

public class Message {
    private String sender;
    private String receiver;
    private Timestamp time;
    private String content;
    private String tEmail;
    private String mEmail;

    public Message(String sender, String receiver, Timestamp time, String content, String tEmail, String mEmail){
        this.sender = sender;
        this.receiver = receiver;
        this.time = time;
        this.content = content;
        this.tEmail = tEmail;
        this.mEmail=mEmail;
    }

    public String getSender(){
        return sender;
    }

    public String getReceiver(){
        return receiver;
    }
    public Timestamp getTime(){
        return time;
    }
    public String getContent(){
        return content;
    }
    public String getTemail(){
        return tEmail;
    }
    public String getMemail(){
        return mEmail;
    }
    
}
