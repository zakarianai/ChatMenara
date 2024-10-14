package org.chatboot.chatboot.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "chatBot")
@Entity
public class ChatBot {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String nomBot;
    @Column(name = "PROMPT", length = 5000)
    private String prompt;
    private String tableBD;
    private String Service;
    private String region ;

    public ChatBot(String nomBot,String tableBD, String service, String region) {
        this.nomBot = nomBot;
        this.prompt = " - N'utilise pas les tables "+tableBD+" Ces tables ne doivent pas être consultées ni utilisées pour traiter les questions.";
        this.tableBD = tableBD;
        Service = service;
        this.region = region;
    }
}
