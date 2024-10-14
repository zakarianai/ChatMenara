package org.chatboot.chatboot.Controller;

import lombok.RequiredArgsConstructor;
import org.chatboot.chatboot.Service.UserService;
import org.chatboot.chatboot.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8081")
@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;



    @MessageMapping("/user.disconnectUser")
    @SendTo("/topic/public")
    public User disconnectUser(
            @Payload User user
    ) {
        System.out.println("disconnectUser"+user.getFullName());
        userService.disconnect(user);
        return user;
    }
    @CrossOrigin(origins = "http://localhost:8081")
    @GetMapping("/userc")
    public ResponseEntity<List<User>> findConnectedUsers() {
        return ResponseEntity.ok(userService.findConnectedUsers());
    }
    @CrossOrigin(origins = "http://localhost:8081")
    @GetMapping("/users")
    public ResponseEntity<List<User>> finddUsers() {
        return ResponseEntity.ok(userService.allUssers());
    }

}