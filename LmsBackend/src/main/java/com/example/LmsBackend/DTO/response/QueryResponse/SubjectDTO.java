package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubjectDTO {

    private int subjectId;
    private String subjectName;
    private String subjectCode;
    private String credit;
    private String courseName;
    private String level;
}
