package com.example.LmsBackend.DTO.QueryInterface;

import java.util.Date;

public interface SubjectTodo {

    int getStudentAssignmentId();
    Date getSubmitDate();
    int getSubmitState();
    String getMarks();
    int getBatchId();
    String getBatchName();
    String getSubjectCode();
    String getSubjectName();
    int getAssignmentId();
    String getAssignmentName();
    Date getIssuedDate();
    Date getSubmissionDate();
}
