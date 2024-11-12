package com.example.LmsBackend.DTO.QueryInterface;

public interface StudentBatchDetails {

    int getBatchId();
    String getBatchCode();
    String getBatchName();
    int getCourseId();
    String getCourseName();
    String getCourseLevel();
    String getStartDate();
    String getEndDate();
}
