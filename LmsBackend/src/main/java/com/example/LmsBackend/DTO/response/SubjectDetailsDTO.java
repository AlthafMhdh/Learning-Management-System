package com.example.LmsBackend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubjectDetailsDTO {

    private int subjectId;
    private String subjectName;
    private String subjectCode;
    private String credit;
   // private String courseName;
  //  private String level;
}
