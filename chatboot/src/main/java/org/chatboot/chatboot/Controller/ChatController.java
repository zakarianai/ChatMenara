package org.chatboot.chatboot.Controller;


import lombok.RequiredArgsConstructor;
import org.chatboot.chatboot.Service.ChatMessageService;
import org.chatboot.chatboot.Service.UserService;
import org.chatboot.chatboot.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.chatboot.chatboot.entities.ChatNotification;
import org.chatboot.chatboot.entities.ChatMessage;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8081")
@Controller
@RequiredArgsConstructor
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private  UserService userService;


    /*@MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        ChatMessage savedMsg = chatMessageService.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/queue/messages",
                new ChatNotification(
                        savedMsg.getId(),
                        savedMsg.getSenderId(),
                        savedMsg.getRecipientId(),
                        savedMsg.getContent()
                )
        );
    }*/
    @MessageMapping("/chat")
    @SendToUser("/queue/messages")
    public void processMessage(@Payload ChatMessage chatMessage) {
        ChatMessage savedMsg = chatMessageService.save(chatMessage);
        System.out.println("Sending message to user " + chatMessage.getRecipientId());
        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/queue/messages",
                new ChatNotification(
                        savedMsg.getId(),
                        savedMsg.getSenderId(),
                        savedMsg.getRecipientId(),
                        savedMsg.getContent()
                )
        );
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>> findChatMessages(@PathVariable String senderId,
                                                              @PathVariable String recipientId) {
        System.out.println("/messages/{senderId}/{recipientId}");
        List<ChatMessage> messages = chatMessageService.findChatMessages(senderId, recipientId);
        return ResponseEntity
                .ok(messages);
    }
    // Gestion des messages publics
    @MessageMapping("/public")
    @SendTo("/topic/public")
    public String broadcastMessage(String message) {
        // Logique pour gérer les messages publics
        System.out.println("Message public");
        return "Message public: " + message;
    }
    @MessageMapping("/user.addUser")
    @SendTo("/topic/public")
    public User addUser(
            @Payload User user
    ) {
        System.out.println("/user.addUser");
        userService.addUser(user);
        System.out.println("/topic/public");
        messagingTemplate.convertAndSend("/topic/public", userService.getConnectedUsers(user.getId()));
        return user;
    }

    // Gestion des messages privés
    @MessageMapping("/private-message")
    @SendToUser("/queue/messages")
    public String sendPrivateMessage(@Payload ChatMessage chatMessage) {
        ChatMessage savedMsg = chatMessageService.save(chatMessage);
        System.out.println("Sending message to user " + chatMessage.getRecipientId());
        messagingTemplate.convertAndSendToUser(
                chatMessage.getRecipientId(), "/queue/messages",
                new ChatNotification(
                        savedMsg.getId(),
                        savedMsg.getSenderId(),
                        savedMsg.getRecipientId(),
                        savedMsg.getContent()
                )
        );
        // Logique pour gérer les messages privés
        System.out.println("Message privé:");
        return "Message privé: " + chatMessage.getContent();
    }
    // Méthode pour envoyer un message privé via SimpMessagingTemplate
    public void sendDirectMessage(String username, String message) {
        messagingTemplate.convertAndSendToUser(username, "/queue/messages", message);
    }
}
