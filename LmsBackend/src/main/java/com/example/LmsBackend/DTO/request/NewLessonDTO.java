package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewLessonDTO {
    private String lessonName;
    private int subjectId;
    private String contentName;
    private String contentType;
    private String filepath;
}
