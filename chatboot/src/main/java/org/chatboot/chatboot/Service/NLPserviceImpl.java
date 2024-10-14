package org.chatboot.chatboot.Service;

import org.chatboot.chatboot.Exception.ExceptionBotNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.*;

@Service
public class NLPserviceImpl implements NLPservice{
    @Autowired
    private ChatBotService chatBotService;
    @Override
    public String extractInfo(String msg, Long id) {
        try {
            String prmpt = (chatBotService.findBotByid(id)).getPrompt();
            System.out.println(prmpt);
            // Command to execute the Python script
            //String command = "python C:\\Users\\zakar\\PycharmProjects\\pythonProject\\main.py "+ msg;"\" \"" + prmpt +
            String command = "python C:\\Users\\zakar\\PycharmProjects\\pythonProject\\main.py \"" + msg +"\" \"" + prmpt + "\"";
            // Start the process
            ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", command);
            Process process = pb.start();

            // Capture the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Wait for the process to complete
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                String var = output.toString();
                System.out.println(var);
                return executeQuery(var);

            } else {
                return "Error: Python script exited with code " + exitCode;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public static String executeQuery(String sqlQuery) {
        // URL de connexion à la base de données MySQL
        String url = "jdbc:mysql://localhost:3306/menara1";
        // Nom d'utilisateur de la base de données
        String username = "root";
        // Mot de passe de la base de données
        String password = "";

        StringBuilder result = new StringBuilder();

        // Charger le driver JDBC
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "Error: Driver not found.";
        }

        // Se connecter à la base de données et exécuter la requête
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sqlQuery);
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            // Ajouter les noms de colonnes
            for (int i = 1; i <= columnCount; i++) {
                result.append(metaData.getColumnName(i)).append("\t");
            }
            result.append("\n");

            // Parcourir les résultats
            while (resultSet.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    result.append(resultSet.getString(i)).append("\t");
                }
                result.append("\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
            //return "Error: " + e.getMessage();
            return "j'ai aucune droit pour utiliser les tables que vous demandez";
        }

        return result.toString();
    }

}
