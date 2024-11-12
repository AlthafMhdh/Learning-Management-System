package com.example.LmsBackend.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseResponseDTO {

    private int courseId;
    private String courseName;
    private String courseCode;
    private String level;
    private String duration;
}
