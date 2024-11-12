package com.example.LmsBackend.DTO.QueryInterface;

import java.time.LocalDateTime;

public interface AllAssignments {

    int getAssignmentId();
    String getAssignmentName();
    int getBatchId();
    String getBatchCode();
    String getBatchName();
    int getCourseId();
    String getCourseCode();
    String getLevel();
    String getCourseName();
    int getSubjectId();
    String getSubjectCode();
    String getSubjectName();

    LocalDateTime getIssuedDate();
    LocalDateTime getSubmissionDate();
}
