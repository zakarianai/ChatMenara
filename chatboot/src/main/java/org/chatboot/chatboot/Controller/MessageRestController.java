package org.chatboot.chatboot.Controller;

import org.chatboot.chatboot.Respositories.MessageRepositories;
import org.chatboot.chatboot.Service.ChatBotService;
import org.chatboot.chatboot.Service.MessageService;
import org.chatboot.chatboot.Service.NLPservice;
import org.chatboot.chatboot.entities.ChatBot;
import org.chatboot.chatboot.entities.Message;
import org.chatboot.chatboot.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
@CrossOrigin(origins = "http://localhost:8081")
@RestController

public class MessageRestController {
    private MessageService messageService;
    @Autowired
    private NLPservice nlPservice;
    @Autowired
    private ChatBotService chatBotService;

    public MessageRestController(MessageService messageService) {
        this.messageService = messageService;
    }
    @GetMapping("/messages")
    public List<Message> Listemessage(){return messageService.Listemessage();}

    @PostMapping("/message/{id}")
    public Message SaveMessage(@RequestBody Message message,@PathVariable Long id){
        Message message1= new Message();
        try{
            ChatBot chatBot = chatBotService.findBotByid(id);
            if (chatBot !=null){
           Message messagea= new Message();
           messagea = messageService.SaveMessage(message);
           String msg = nlPservice.extractInfo(message.getMessage(),id);
           message1.setReservername(chatBot.getNomBot());
           message1.setSenderId(chatBot.getNomBot());
           message1.setMessage(msg);}
        } catch (Exception e){
            System.out.println("errors"+e.getMessage());
        }
          return messageService.SaveMessage(message1);
    }
}
