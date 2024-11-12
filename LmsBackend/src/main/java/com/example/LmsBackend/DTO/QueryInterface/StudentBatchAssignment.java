package com.example.LmsBackend.DTO.QueryInterface;

import java.util.Date;

public interface StudentBatchAssignment {
    int getAssessmentId();
    String getAssessmentName();
    String getFilePath();
    Date getIssueDate();
    Date getSubmissionDate();
    Date getSubmitDate();
    int getStatus();
    String getResult();
    int getSubjectId();
    String getSubjectCode();
    String getSubjectName();
}
