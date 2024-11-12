package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Lob;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LessonDetailsDTO {

    private int lessonId;
    private String lessonName;
    private String subjectCode;
    private String subjectName;
    private String contentName;
    private String contentType;

}
