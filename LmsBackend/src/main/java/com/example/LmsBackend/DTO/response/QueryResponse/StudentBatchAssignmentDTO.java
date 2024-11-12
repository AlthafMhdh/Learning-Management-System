package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentBatchAssignmentDTO {
    private int assessmentId;
    private String assessmentName;
    private String filePath;
    private Date issueDate;
    private Date submissionDate;
    private Date submitDate;
    private String status;
    private String result;
    private int subjectId;
    private String subjectCode;
    private String subjectName;
}
