package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AssignmentsDTO {

    private int assignmentId;
    private String assignmentName;
    private int batchId;
    private String batchCode;
    private String batchName;
    private int courseId;
    private String courseCode;
    private String level;
    private String courseName;
    private int subjectId;
    private String subjectCode;
    private String subjectName;

    private LocalDateTime issuedDate;
    private LocalDateTime submissionDate;
}
