package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.CreateAssignmentDTO;
import com.example.LmsBackend.DTO.request.NewAssessmentDTO;
import com.example.LmsBackend.DTO.request.StudentAssignmentSubmissionDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface AssignmentService {
    String newAssessmentByAdmin(NewAssessmentDTO newAssessmentDTO, MultipartFile docFile);

    List<AssignToBatchDTO> AssignToBatch();

    String studentSubmission(StudentAssignmentSubmissionDTO studentAssignmentSubmissionDTO, MultipartFile docFile);

    List<AssignmentInLessonDTO> AssignmentInLessons(int studentId, int subjectId);

    List<AssessmentViewDTO> AssignmentInLessonsBefore(int studentId, int subjectId);

    void assignAssessmentToStudents(CreateAssignmentDTO createAssignmentDTO);

    List<ToDoListDTO> StudentToDoList(int studentId);

    List<SubtectTodoList> SubjectToDoForStudent(int studentId, int subjectId);

    List<StudentAssessmentDTO> BatchStudentAssessment(int batchId, int subjectId);

    String updateResults(int assignmentId, String marks);

    List<StudentBatchAssignmentDTO> StudentBatchAssignment(int batchId, int studentId);

    String getStudentAssignment(int assignmentId);

    String getAssignment(int assignmentId);

    String updateAssignmentDate(int assignmentId, Date date);

    List<AssignmentsDTO> AllAssignments();
}
