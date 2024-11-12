package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.CourseCreateDTO;
import com.example.LmsBackend.DTO.response.CourseResponseDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;

import java.util.List;

public interface CourseService {

    String createCourse(CourseCreateDTO courseCreateDTO);

    List<CourseResponseDTO> allcourses();

    Long courseCount();

    List<SubjectDetailsDTO> getSubjectsForCourse(int courseId);

    void addSubjectsToCourse(int courseId, List<Integer> subjectIds);
}
