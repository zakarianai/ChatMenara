package org.chatboot.chatboot.Respositories;

import org.chatboot.chatboot.Num.Status;
import org.chatboot.chatboot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepositories extends JpaRepository<User,Long> {
    List<User> findAllByStatus(Status status);

    User findByNickName(String nickName);
}
