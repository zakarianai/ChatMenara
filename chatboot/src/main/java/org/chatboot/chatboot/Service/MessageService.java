package org.chatboot.chatboot.Service;

import org.chatboot.chatboot.Exception.ExceptionmessageNotFound;
import org.chatboot.chatboot.entities.Message;
import org.chatboot.chatboot.entities.User;

import java.util.List;

public interface MessageService {
    Message SaveMessage (Message message);
    Message Updatemessage (Long id,Message message) throws ExceptionmessageNotFound;
    List<Message> Listemessage();
    void DeleteMessage(Long id);
    Message MessageById(Long id) throws ExceptionmessageNotFound;
}
