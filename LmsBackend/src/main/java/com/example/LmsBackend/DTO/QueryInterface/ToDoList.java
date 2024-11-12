package com.example.LmsBackend.DTO.QueryInterface;

import java.util.Date;

public interface ToDoList {

    int getStudentAssignmentId();
    int getBatchId();
    String getBatchName();
    int getSubjectId();
    String getSubjectCode();
    String getSubjectName();
    int getAssignmentId();
    String getAssignmentName();
    Date getIssuedDate();
    Date getSubmissionDate();
}
