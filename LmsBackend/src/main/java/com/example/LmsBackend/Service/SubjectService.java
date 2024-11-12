package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.NewSubjectDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.LessonViewSubjectDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;

import java.util.List;

public interface SubjectService {
    String createNewSubject(NewSubjectDTO newSubjectDTO);

    List<SubjectDetailsDTO> ViewAllSubjects();

    Long subjectCount();

    List<SubjectDetailsDTO> getSubjectsForCourse(int courseId);

    List<LessonViewSubjectDTO> AllLessonsforSubject(int subjectId);

    List<SubjectDetailsDTO> getAllSubjectsForBatch(int batchId);
}
