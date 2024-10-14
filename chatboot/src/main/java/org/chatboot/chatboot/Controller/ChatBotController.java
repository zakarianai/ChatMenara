package org.chatboot.chatboot.Controller;

import lombok.RequiredArgsConstructor;
import org.chatboot.chatboot.Exception.ExceptionBotNotFound;
import org.chatboot.chatboot.Service.ChatBotService;
import org.chatboot.chatboot.entities.ChatBot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequiredArgsConstructor
public class ChatBotController {
    @Autowired
    private ChatBotService chatBotService;

    @GetMapping("/bots")
    public List<ChatBot>list(){
        return chatBotService.listeBot();
    }
    @GetMapping("/bot/{id}")
    public ChatBot BotById(@PathVariable Long id) throws ExceptionBotNotFound {
        return chatBotService.findBotByid(id);
    }
    @PostMapping("/bot")
    public ChatBot savechatBot (@RequestBody ChatBot chatBot){
        ChatBot chat = new ChatBot(chatBot.getNomBot(),chatBot.getTableBD(),chatBot.getService(),chatBot.getRegion());
        return chatBotService.saveBot(chat);
    }
    @DeleteMapping("/bot/{id}")
    public String deleteBot(@PathVariable Long id ) throws ExceptionBotNotFound {
        return chatBotService.removeBot(id);
    }
    @GetMapping("/bot/service/{service}")
    public ChatBot BotByService(@PathVariable String service)throws ExceptionBotNotFound{
        return chatBotService.findByservice(service);
    }
}
