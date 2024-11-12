package com.example.LmsBackend.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class LecturerEmail {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendStudentRegistrationEmail(String to, String username, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Registration Confirmation");
        message.setText("Dear " + username + ",\n\n"
                + "Thank you for joining with our as your Education partner.\n\n"
                + "Your login details for Our LMS:\n"
                + "Username: " + to + "\n"
                + "Password: " + password + "\n\n"
                + "Best regards,\n Team EduMatrix Institute - Kurunegala.");

        javaMailSender.send(message);
    }

}
