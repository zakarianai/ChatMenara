package org.chatboot.chatboot.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.chatboot.chatboot.Exception.ExceptionmessageNotFound;
import org.chatboot.chatboot.Respositories.MessageRepositories;
import org.chatboot.chatboot.entities.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@AllArgsConstructor
@NoArgsConstructor
@Service
public class MessageImplService implements MessageService{
    @Autowired
    private MessageRepositories messageRepositories;
    @Override
    public Message SaveMessage(Message message) {
        Message message1 = messageRepositories.save(message);
        return message1;
    }

    @Override
    public Message Updatemessage(Long id, Message message) throws ExceptionmessageNotFound {
        Message message1 = messageRepositories.findById(id).orElseThrow(()->new ExceptionmessageNotFound("message not found"));
        message1.setMessage(message.getMessage());
        message1.setDate(message1.getDate());
        return message1;
    }

    @Override
    public List<Message> Listemessage() {
        return messageRepositories.findAll();
    }

    @Override
    public void DeleteMessage(Long id) {
        messageRepositories.deleteById(id);
    }

    @Override
    public Message MessageById(Long id) throws ExceptionmessageNotFound {
        Message message1 = messageRepositories.findById(id).orElseThrow(()->new ExceptionmessageNotFound("message not found"));
        return message1;
    }
}
