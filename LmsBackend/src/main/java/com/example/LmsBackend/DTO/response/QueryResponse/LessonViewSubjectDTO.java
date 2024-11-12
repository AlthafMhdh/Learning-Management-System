package com.example.LmsBackend.DTO.response.QueryResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LessonViewSubjectDTO {

    private int lessonId;
    private String lessonName;
    private int contentId;
    private String contentName;
    private String contentType;
    private String filepath;

    public String getDownloadLink() {
        // Assuming filePath contains the URL to the PDF file
        return "<a href=\"" + filepath + "\" download>Download " + contentName + "</a>";
    }

}
