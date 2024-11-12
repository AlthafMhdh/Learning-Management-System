package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LecturerSaveDTO {

    private String title;
    private String lecturerName;
    private String nic;
    private String email;
    private String address;
    private Date dob;
    private String phoneNumber;
    private String qualification;
    private String experience;


}
