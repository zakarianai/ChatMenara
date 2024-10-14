package org.chatboot.chatboot.Respositories;

import org.chatboot.chatboot.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepositories extends JpaRepository<Message,Long> {
}
