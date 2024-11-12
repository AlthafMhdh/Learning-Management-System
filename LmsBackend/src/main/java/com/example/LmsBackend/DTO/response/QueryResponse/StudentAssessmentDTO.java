package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentAssessmentDTO {
    private int studentId;
    private String sId;
    private String studentName;
    private int assessmentId;
    private String assessmentName;
    private String filePath;
    private String status;
    private String result;
}
