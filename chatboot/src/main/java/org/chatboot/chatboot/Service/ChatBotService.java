package org.chatboot.chatboot.Service;

import org.chatboot.chatboot.Exception.ExceptionBotNotFound;
import org.chatboot.chatboot.entities.ChatBot;

import java.util.List;

public interface ChatBotService {
    ChatBot saveBot (ChatBot chatBot);
    List<ChatBot> listeBot ();
    ChatBot findBotByid(Long id)throws ExceptionBotNotFound;
    String removeBot(Long id)throws ExceptionBotNotFound;

    ChatBot findByservice(String service)throws ExceptionBotNotFound;
    ChatBot updateBot (Long id ,ChatBot chatBot)throws ExceptionBotNotFound;
}
