package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_seq_generator")
  //  @SequenceGenerator(name = "student_seq_generator", sequenceName = "student_sequence", initialValue = 1)
    @Column(name = "student_id", nullable = false, length = 20)
    private int studentId;

    @Column(name = "title", nullable = false, length = 10)
    private String title;

    @Column(name = "student_name", nullable = false, length = 100)
    private String studentName;

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

    @Column(name = "register_date", columnDefinition = "DATE")
    private Date registredDate;

    @Lob
    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

//    @OneToMany(mappedBy = "student")
//    private Set<Batch> batches ;

    @ManyToMany(mappedBy = "students")
    private List<Batch> batches = new ArrayList<>();
 //   private Set<Batch> batches ;

    @OneToMany(mappedBy = "student")
    private Set<Assignment> assignments;

    @Column(name = "Sid", length = 5)
    private String Sid;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username")
    private String userName;

    @OneToMany(mappedBy = "st_student")
    private Set<StudentAssignment> studentAssignments;


    public Student(int studentId, String studentName, String nic, String email, String address, Date dob, String phoneNumber) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.nic = nic;
        this.email = email;
        this.address = address;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
    }

    public Student(int studentId, String profileImage) {
        this.studentId = studentId;
        this.profileImage = profileImage;
    }

    // Method to generate new ID and set password
    @PrePersist
    public void generateIdAndPassword() {
//        // Generate new ID based on studentId
//        this.Sid = "S" + String.format("%04d", this.studentId);

        // Generate password (for example, a random 8-character alphanumeric password)
        this.password = generateRandomPassword();
    }

    // Method to generate a random password
    private String generateRandomPassword() {
        // Logic to generate a random password (you can customize this as needed)
        // For example:
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
