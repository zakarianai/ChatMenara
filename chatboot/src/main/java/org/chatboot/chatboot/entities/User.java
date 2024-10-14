package org.chatboot.chatboot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.chatboot.chatboot.Num.Role;
import org.chatboot.chatboot.Num.Status;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nickName;
    private String fullName;
    private Status status;
    private String region;
    private Role role ;
    private String email;
    private String password;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Message> messages;
    public User (String name,String email,String password){
        this.fullName = name;
        this.email=email;
        this.password=password;
    }

    public User(String nickName, String fullName, Status status, String region, Role role, String email, String password) {
        this.nickName = nickName;
        this.fullName = fullName;
        this.status = status;
        this.region = region;
        this.role = role;
        this.email = email;
        this.password = password;
    }
}
