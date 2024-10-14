package org.chatboot.chatboot.Service;

import org.chatboot.chatboot.Exception.ExceptionBotNotFound;
import org.chatboot.chatboot.Respositories.ChatBotRepository;
import org.chatboot.chatboot.entities.ChatBot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChatbotImplService implements ChatBotService{


    @Autowired
    private ChatBotRepository chatBotRepository;
    @Override
    public ChatBot saveBot(ChatBot chatBot) {
        return chatBotRepository.save(chatBot);
    }

    @Override
    public List<ChatBot> listeBot() {
        return chatBotRepository.findAll();
    }

    @Override
    public ChatBot findBotByid(Long id) throws ExceptionBotNotFound {
        ChatBot chat = chatBotRepository.findById(id).orElseThrow(()->new ExceptionBotNotFound("Bot Not Found"));
        return chat;
    }

    @Override
    public String removeBot(Long id)throws ExceptionBotNotFound {
        ChatBot chat = chatBotRepository.findById(id).orElseThrow(()->new ExceptionBotNotFound("Bot Not Found"));
        if (chat != null ){
            chatBotRepository.deleteById(id);
            return "delete succe";
        }
        return "Bot not found ";

    }

    @Override
    public ChatBot findByservice(String service) throws ExceptionBotNotFound {
        List<ChatBot> list = chatBotRepository.findAll();
        ChatBot chat = list.stream().filter(c->c.getService().equals(service)).findFirst().orElse(null);
        return chat ;
    }

    @Override
    public ChatBot updateBot(Long id, ChatBot chatBot) throws ExceptionBotNotFound {
        ChatBot chat = chatBotRepository.findById(id).orElseThrow(()-> new ExceptionBotNotFound("Bot not Found"));
        chat.setService(chatBot.getService());
        chat.setNomBot(chatBot.getService());
        chat.setRegion(chatBot.getRegion());
        chat.setPrompt(chatBot.getPrompt());
        chat.setTableBD(chatBot.getTableBD());
        return chatBotRepository.save(chat);
    }
}
