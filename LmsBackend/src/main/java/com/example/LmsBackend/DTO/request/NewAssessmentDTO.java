package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewAssessmentDTO {

    private int batchId;
    private int courseId;
    private int subjectId;
    private String assessmentName;
    private String filePath;
}
