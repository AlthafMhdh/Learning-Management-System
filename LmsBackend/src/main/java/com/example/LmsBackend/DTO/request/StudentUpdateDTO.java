package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentUpdateDTO {
  //  private String title;
    private String studentName;
    private String nic;
    private String email;
    private String address;
    private Date dob;
    private String phoneNumber;
}
