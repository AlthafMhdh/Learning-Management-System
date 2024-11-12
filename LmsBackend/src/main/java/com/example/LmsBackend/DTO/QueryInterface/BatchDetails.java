package com.example.LmsBackend.DTO.QueryInterface;

public interface BatchDetails {

    int getBatchId();
    String getBatchCode();
    String getBatchName();
    String getCourseName();
    String getCourseLevel();
    String getStartDate();
    String getEndDate();
    int getStudents();
}
