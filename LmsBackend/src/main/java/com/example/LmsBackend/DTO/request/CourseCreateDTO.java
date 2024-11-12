package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseCreateDTO {
    private String courseName;
    private String courseCode;
    private String level;
    private String duration;
}
