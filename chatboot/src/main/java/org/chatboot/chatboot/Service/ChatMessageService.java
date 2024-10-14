package org.chatboot.chatboot.Service;

import org.chatboot.chatboot.entities.ChatMessage;

import java.util.List;

public interface ChatMessageService {
    ChatMessage save(ChatMessage chatMessage);
    List<ChatMessage> findChatMessages(String senderId,String recipientId);
}
