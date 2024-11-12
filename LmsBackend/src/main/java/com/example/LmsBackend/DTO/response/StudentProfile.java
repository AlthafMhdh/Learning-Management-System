package com.example.LmsBackend.DTO.response;

import com.example.LmsBackend.Entity.Assignment;
import com.example.LmsBackend.Entity.Batch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentProfile {

    private int studentId;
    private String Sid;
    private String title;
    private String studentName;
    private String nic;
    private String email;
    private String address;
    private Date dob;
    private String phoneNumber;
    private Date registredDate;
    private String profileImage;
    private String password;
    private String userName;

}
