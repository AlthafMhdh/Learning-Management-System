package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student_BatchDetailsDTO {

    private int batchId;
    private String batchName;
    private String batchCode;
    private String startDate;
    private String endDate;
    private int courseId;
    private String courseLevel;
    private String courseName;

}
