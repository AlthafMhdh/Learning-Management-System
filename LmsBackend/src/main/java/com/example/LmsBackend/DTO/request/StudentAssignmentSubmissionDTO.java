package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentAssignmentSubmissionDTO {

      private  int studentAssignmentId;
//    private int studentId;
//    private int assignmentId;
//    private int subjectId;
//    private int batchId;
    private String filePath;
}
