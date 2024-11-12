package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ToDoListDTO {

    private int studentAssignmentId;
    private int batchId;
    private String batchName;
    private int subjectId;
    private String subjectCode;
    private String subjectName;
    private int assignmentId;
    private String assignmentName;
    private Date issuedDate;
    private Date submissionDate;

}
