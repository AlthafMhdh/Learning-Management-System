package com.example.LmsBackend.DTO.QueryInterface;

import java.util.Date;

public interface AssessmentView {

    int getAssignmentId();
    String getAssignmentName();
    Date getIssuedDate();
    Date getSubmissionDate();
    String getFilePath();

}
