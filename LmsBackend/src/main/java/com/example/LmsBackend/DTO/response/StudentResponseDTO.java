package com.example.LmsBackend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentResponseDTO {

    private int studentId;
    private String Sid;
    private String studentName;
    private String nic;
    private String email;
    private String address;
    private Date dob;
    private String phoneNumber;
    private Date registredDate;
}
