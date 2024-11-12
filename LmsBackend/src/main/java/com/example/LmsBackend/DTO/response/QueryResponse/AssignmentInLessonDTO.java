package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AssignmentInLessonDTO {

    //assignment
    private int assignmentId;
    private String assignmentName;
    private Date issuedDate;
    private Date submissionDate;
    private String filePath;
    //studentAssignment
    private int submitAssignmentId;
    private boolean submitState;
    private Date submitDate;


}
