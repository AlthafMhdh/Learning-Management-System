package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MyBatchesLecturerDTO {

    private int batchId;
    private String batchName;
    private String batchCode;
    private int courseId;
    private String level;
    private String courseName;
    private int subjectId;
    private String subjectName;
    private String subjectCode;
}
