package org.chatboot.chatboot;

import org.chatboot.chatboot.Service.ChatBotService;
import org.chatboot.chatboot.Service.UserService;
import org.chatboot.chatboot.entities.ChatBot;
import org.chatboot.chatboot.entities.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static org.chatboot.chatboot.Num.Role.ADMIN;
import static org.chatboot.chatboot.Num.Role.SUPERADMIN;
import static org.chatboot.chatboot.Num.Status.OFFLINE;

@SpringBootApplication
public class ChatbootApplication {
    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, ChatBotService chatBotService) {
        return args -> {
        /*User us1 = new User("zakaria1", "naim@gmail.com", "zzz");
        User us2 = new User("zakaria2", "naim", "zzz");
        User us3 = new User("zakaria3", "naim", "zzz");*/
            User us1 = new User(
                    "zakaria1",
                    "Zakaria Naim",
                    OFFLINE,
                    "Marrakech",
                    SUPERADMIN,
                    "zaka@example.com",
                    "zaka"
            );

            User us2 = new User(
                    "zakaria2",
                    "Zakaria B",
                    OFFLINE,
                    "Marrakech",
                    ADMIN,
                    "zakaria2@example.com",
                    "password456"
            );

            User us3 = new User(
                    "zakaria3",
                    "Zakaria C",
                    OFFLINE,
                    "Marrakech",
                    SUPERADMIN,
                    "zakaria3@example.com",
                    "zaka"
            );
            ChatBot chat1 = new ChatBot("bot1","topclient , menara_casite , menara_casite2","service vendre","marrakech");
            ChatBot chat2 = new ChatBot("bot2","topclient et menara_casite et menara_casite2","service d'achat ","marrakech");
        chatBotService.saveBot(chat1);
        chatBotService.saveBot(chat2);
        userService.saveUser1(us1);
        userService.saveUser1(us2);
        userService.saveUser1(us3);

        };

    }

    public static void main(String[] args) {
        SpringApplication.run(ChatbootApplication.class, args);
    }

}
