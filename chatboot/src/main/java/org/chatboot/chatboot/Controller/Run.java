package org.chatboot.chatboot.Controller;

import org.chatboot.chatboot.Service.NLPservice;
import org.chatboot.chatboot.entities.Message;
import org.chatboot.chatboot.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class Run {
    @Autowired
    private NLPservice nlPservice;

    @PostMapping("/run/{id}")
    public String runscript(@RequestBody Message message,@PathVariable Long id ){
        return nlPservice.extractInfo(message.getMessage(), id );
    }
}
