package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.NewLessonDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.LessonDetailsDTO;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

public interface LessonService {


    String saveLesson(NewLessonDTO newLessonDTO, MultipartFile docFile);

    List<LessonDetailsDTO> ViewAllLessons();

    Long LessonCount();

    String getLessonFilePath(int lessonId);
}
