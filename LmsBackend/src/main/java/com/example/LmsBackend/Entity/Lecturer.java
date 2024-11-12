package com.example.LmsBackend.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "lecturer")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Lecturer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lecturer_seq_generator")
    @SequenceGenerator(name = "lecturer_seq_generator", sequenceName = "lecturer_sequence", initialValue = 1)
    @Column(name = "lecturer_id", nullable = false, length = 20)
    private int lecturerId;

    @Column(name = "title", nullable = false, length = 10)
    private String title;

    @Column(name = "lecturer_name", nullable = false, length = 100)
    private String lecturerName;

    @Column(name = "nic", nullable = false, length = 12)
    private String nic;

    @Column(name = "email", nullable = false, length = 30)
    private String email;

    @Column(name = "address", nullable = false, length = 100)
    private String address;

    @Column(name = "dateofbirth", columnDefinition = "DATE")
    private Date dob;

    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "qualification", nullable = false, length = 100)
    private String qualification;

    @Column(name = "experience", length = 100)
    private String experience;

    @Column(name = "register_date", columnDefinition = "DATE")
    private Date registredDate;

    @Lob
    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @Column(name = "Lecid", length = 5)
    private String lecId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username")
    private String userName;

    @ManyToMany(mappedBy = "lecturers")
    private List<Subject> subjects = new ArrayList<>();

    @ManyToMany(mappedBy = "lecturer")
    private List<Batch> batches = new ArrayList<>();

    @PrePersist
    public void generateIdAndPassword() {
     // Generate password (for example, a random 8-character alphanumeric password)
        this.password = generateRandomPassword();
    }

    // Method to generate a random password
    private String generateRandomPassword() {
        // Generate a random alphanumeric password of length 8
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * characters.length());
            password.append(characters.charAt(index));
        }
        return password.toString();
    }

}
