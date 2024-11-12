package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubtectTodoList {

    private int studentAssignmentId;
    private Date submitDate;
    private String submitState;
    private String marks;
    private int batchId;
    private String batchName;
    private String subjectCode;
    private String subjectName;
    private int assignmentId;
    private String assignmentName;
    private Date issuedDate;
    private Date submissionDate;
}
