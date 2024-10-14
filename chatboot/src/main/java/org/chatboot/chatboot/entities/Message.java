package org.chatboot.chatboot.entities;

import jakarta.persistence.*;
import lombok.*;
import org.chatboot.chatboot.Num.Typemessage;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"message\"")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String message;
    private Date date;
    private String senderId;
    private String reservername;
    @ManyToOne
    private User user;


}
