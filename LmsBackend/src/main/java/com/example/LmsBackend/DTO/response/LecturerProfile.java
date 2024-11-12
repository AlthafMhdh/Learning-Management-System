package com.example.LmsBackend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LecturerProfile {

    private String lecturerName;
    private String title;
    private String nic;
    private String email;
    private String address;
    private Date dob;
    private String phoneNumber;
    private String qualification;
    private String experience;
    private Date registredDate;
    private String profileImage;
    private String lecId;
    private String password;
    private String userName;

}
