package org.chatboot.chatboot.Respositories;

import org.chatboot.chatboot.entities.ChatBot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatBotRepository extends JpaRepository<ChatBot,Long> {
}
