package com.example.LmsBackend.DTO.QueryInterface;

import java.util.Date;

public interface AssignmentInLessons {

    int getAssignmentId();
    String getAssignmentName();
    Date getIssuedDate();
    Date getSubmissionDate();
    String getFilePath();
    int getSubmitAssignmentId();
    boolean getSubmitState();
    Date getSubmitDate();


}
