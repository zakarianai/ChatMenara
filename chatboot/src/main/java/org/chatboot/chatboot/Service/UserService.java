package org.chatboot.chatboot.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.chatboot.chatboot.Num.Status;
import org.chatboot.chatboot.Respositories.UserRepositories;
import org.chatboot.chatboot.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepositories repository;

    // modifie status users
    public void saveUser(User user) {
        Optional<User> existingUser = repository.findById(user.getId());

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setStatus(Status.ONLINE);
            repository.save(userToUpdate);
        } else {
            throw new EntityNotFoundException("User not found with id: " + user.getId());
        }
    }
    public void saveUser1(User user) {
        repository.save(user);
    }


    public void disconnect(User user) {
        var storedUser = repository.findById(user.getId()).orElse(null);
        if (storedUser != null) {
            storedUser.setStatus(Status.OFFLINE);
            repository.save(storedUser);
        }
    }

    public List<User> findConnectedUsers() {
        return repository.findAllByStatus(Status.ONLINE);
    }
    public List<User> allUssers(){
        return repository.findAll();
    }

    @Transactional
    public void addUser(User user) {
        // Vérifier si l'utilisateur existe déjà
        User existingUser = repository.findByNickName(user.getNickName());
        if (existingUser != null) {
            existingUser.setStatus(user.getStatus());
            repository.save(existingUser);
        } else {
            repository.save(user);
        }
    }

    @Transactional
    public void removeUser(User user) {
        repository.deleteById(user.getId());
    }

    public List<User> getConnectedUsers(Long id ) {
        List <User> liste = repository.findAllByStatus(Status.valueOf("ONLINE"));
        List<User> filteredList = liste.stream()
                .filter(user -> user.getId() != id)
                .collect(Collectors.toList());
        return filteredList;
    }
}
