package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.QueryInterface.*;
import com.example.LmsBackend.DTO.request.CreateAssignmentDTO;
import com.example.LmsBackend.DTO.request.NewAssessmentDTO;
import com.example.LmsBackend.DTO.request.StudentAssignmentSubmissionDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.*;
import com.example.LmsBackend.Entity.*;
import com.example.LmsBackend.Repository.*;
import com.example.LmsBackend.Service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepo assignmentRepo;

    @Autowired
    private BatchRepo batchRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private SubjectRepo subjectRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private StudentAssignmentRepo studentAssignmentRepo;

    @Value("${assessment.path}")
    private String assessmentPath;

    @Value("${studentSubmit.path}")
    private String submissionPath;

    @Override
    @Transactional
    public String newAssessmentByAdmin(NewAssessmentDTO newAssessmentDTO, MultipartFile docFile) {

        Batch batch = batchRepo.getReferenceById(newAssessmentDTO.getBatchId());
        Course course = courseRepo.getReferenceById(newAssessmentDTO.getCourseId());
        Subject subject = subjectRepo.getReferenceById(newAssessmentDTO.getSubjectId());

        Assignment assignment = new Assignment();
        assignment.setAssignmentName(newAssessmentDTO.getAssessmentName());
        assignment.setCourse(course);
        assignment.setBatch(batch);
        assignment.setSubjects(subject);
        assignment.setActiveState(false);

        String fileName = docFile.getOriginalFilename();
        String filePath = assessmentPath + File.separator + fileName;

        try {
            File dest = new File(filePath);
            docFile.transferTo(dest);

            assignment.setFilePath(filePath);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return "Failed to upload assessment file.";
        }

        batch.setAssessmentState(true);
        batchRepo.save(batch);

        assignmentRepo.save(assignment);


        return "Assignment Saved Successfully.";
    }

    @Override
    public List<AssignToBatchDTO> AssignToBatch() {
        List<AssignToBatchDetails> assignment = assignmentRepo.AssignToBatch();

        List<AssignToBatchDTO> allassignment = new ArrayList<>();
        for (AssignToBatchDetails d: assignment) {
            AssignToBatchDTO n = new AssignToBatchDTO(
                    d.getAssignmentId(),
                    d.getAssignmentName(),
                    d.getBatchId(),
                    d.getBatchCode(),
                    d.getBatchName(),
                    d.getCourseId(),
                    d.getCourseCode(),
                    d.getLevel(),
                    d.getCourseName(),
                    d.getSubjectId(),
                    d.getSubjectCode(),
                    d.getSubjectName()
            );
            allassignment.add(n);
        }
        return allassignment;
    }

    @Override
    @Transactional
    public String studentSubmission(StudentAssignmentSubmissionDTO studentAssignmentSubmissionDTO, MultipartFile docFile) {

//        Student student = studentRepo.getReferenceById(studentAssignmentSubmissionDTO.getStudentId());
//        Assignment assignment = assignmentRepo.getReferenceById(studentAssignmentSubmissionDTO.getAssignmentId());
//        Subject subject = subjectRepo.getReferenceById(studentAssignmentSubmissionDTO.getSubjectId());
//        Batch batch = batchRepo.getReferenceById(studentAssignmentSubmissionDTO.getBatchId());

        StudentAssignment studentAssignment = studentAssignmentRepo.getReferenceById(studentAssignmentSubmissionDTO.getStudentAssignmentId());

     //   StudentAssignment studentAssignment = new StudentAssignment();
//        studentAssignment.setSt_assignment(assignment);
//        studentAssignment.setSt_student(student);
//        studentAssignment.setSt_subjects(subject);
//        studentAssignment.setSt_batch(batch);
//        studentAssignment.setSt_course(batch.getCourse());
//        studentAssignment.setAssignmentName(assignment.getAssignmentName());
        studentAssignment.setSubmitState(true);
        studentAssignment.setSubmitDate(new Date());

        String fileName = docFile.getOriginalFilename();
        String filePath = submissionPath + File.separator + fileName;

        try {
            File dest = new File(filePath);
            docFile.transferTo(dest);

            studentAssignment.setFilePath(filePath);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return "Failed to upload assessment file.";
        }

        studentAssignmentRepo.save(studentAssignment);


        return "Assignment Uploaded Successfully.";
    }

    @Override
    public List<AssignmentInLessonDTO> AssignmentInLessons(int studentId, int subjectId) {

        List<AssignmentInLessons> assignmentview = assignmentRepo.AssignmentInLesson(studentId,subjectId);

        List<AssignmentInLessonDTO> assignmentList = new ArrayList<>();
        for (AssignmentInLessons d: assignmentview) {
            AssignmentInLessonDTO n = new AssignmentInLessonDTO(
                    d.getAssignmentId(),
                    d.getAssignmentName(),
                    d.getIssuedDate(),
                    d.getSubmissionDate(),
                    d.getFilePath(),
                    d.getSubmitAssignmentId(),
                    d.getSubmitState(),
                    d.getSubmitDate()
            );

            // Retrieve document based on file path
            String documentContent = retrieveDocumentContent(d.getFilePath());
//            n.setDocumentContent(documentContent);

            assignmentList.add(n);
        }
        return assignmentList;
    }

    private String retrieveDocumentContent(String filePath) {
        try {
            File file = new File(filePath);
            if (file.exists()) {
                // Read document content from file
                byte[] fileContent = Files.readAllBytes(file.toPath());
                return new String(fileContent, StandardCharsets.UTF_8);
            } else {
                // Document not found
                return "Document not found.";
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return "Failed to retrieve document.";
        }
    }

    @Override
    public List<AssessmentViewDTO> AssignmentInLessonsBefore(int studentId, int subjectId) {

        List<AssessmentView> assignmentview = assignmentRepo.AssignmentInLessonBefore(studentId,subjectId);

        List<AssessmentViewDTO> assignmentList = new ArrayList<>();
        for (AssessmentView d: assignmentview) {
            AssessmentViewDTO n = new AssessmentViewDTO(
                    d.getAssignmentId(),
                    d.getAssignmentName(),
                    d.getIssuedDate(),
                    d.getSubmissionDate(),
                    d.getFilePath()
            );
            assignmentList.add(n);
        }
        return assignmentList;

    }

    @Override
    @Transactional
    public void assignAssessmentToStudents(CreateAssignmentDTO createAssignmentDTO) {

        Batch batch = batchRepo.getReferenceById(createAssignmentDTO.getBatchId());
        Course course = courseRepo.getReferenceById(createAssignmentDTO.getCourseId());
        Subject subject = subjectRepo.getReferenceById(createAssignmentDTO.getSubjectId());
        Assignment assignment = assignmentRepo.getReferenceById(createAssignmentDTO.getAssignmentId());

        assignment.setIssuedDate(new Date());
        assignment.setSubmissionDate(createAssignmentDTO.getSubmissionDate());
        assignmentRepo.save(assignment);

        for (Integer studentId : createAssignmentDTO.getStudentIds()) {
            Student student = studentRepo.getReferenceById(studentId);

            StudentAssignment studentAssignment = new StudentAssignment();
            studentAssignment.setAssignmentName(assignment.getAssignmentName());
            studentAssignment.setSt_assignment(assignment);
            studentAssignment.setSt_subjects(subject);
            studentAssignment.setSt_course(course);
            studentAssignment.setSt_batch(batch);

            studentAssignment.setSt_student(student);

            studentAssignmentRepo.save(studentAssignment);

        }
    }

    @Override
    public List<ToDoListDTO> StudentToDoList(int studentId) {

        Optional<Student> optionalStudent = studentRepo.findById(studentId);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            List<ToDoList> myToDo = assignmentRepo.StudentToDoList(studentId);

            List<ToDoListDTO> myToDoList = new ArrayList<>();
            for (ToDoList d: myToDo) {
                ToDoListDTO n = new ToDoListDTO(
                        d.getStudentAssignmentId(),
                        d.getBatchId(),
                        d.getBatchName(),
                        d.getSubjectId(),
                        d.getSubjectCode(),
                        d.getSubjectName(),
                        d.getAssignmentId(),
                        d.getAssignmentName(),
                        d.getIssuedDate(),
                        d.getSubmissionDate()
                );
                myToDoList.add(n);
            }
            return myToDoList;

        }
        else {
            throw new EntityNotFoundException("Student not found with ID: " + studentId);
        }
    }

    @Override
    public List<SubtectTodoList> SubjectToDoForStudent(int studentId, int subjectId) {

        Optional<Student> optionalStudent = studentRepo.findById(studentId);
        List<SubtectTodoList> myToDoList = null;
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            Optional<Subject> optionalSubject = subjectRepo.findById(subjectId);
            if (optionalSubject.isPresent()) {

                List<SubjectTodo> myToDo = assignmentRepo.SubjectToDoListForStudent(studentId, subjectId);

                myToDoList = new ArrayList<>();
                for (SubjectTodo d : myToDo) {
                    SubtectTodoList n = new SubtectTodoList(
                            d.getStudentAssignmentId(),
                            d.getSubmitDate(),
                            getSubmitStateString(d.getSubmitState()),
                            d.getMarks(),
                            d.getBatchId(),
                            d.getBatchName(),
                            d.getSubjectCode(),
                            d.getSubjectName(),
                            d.getAssignmentId(),
                            d.getAssignmentName(),
                            d.getIssuedDate(),
                            d.getSubmissionDate()

                    );
                    myToDoList.add(n);
                }
                return myToDoList;

            }


        } else {
            throw new EntityNotFoundException("Student not found with ID: " + studentId);
        }
        return myToDoList;
    }

    @Override
    public List<StudentAssessmentDTO> BatchStudentAssessment(int batchId, int subjectId) {

        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
        List<StudentAssessmentDTO> myToDoList = null;
        if (optionalBatch.isPresent()) {
            Batch batch = optionalBatch.get();

            Optional<Subject> optionalSubject = subjectRepo.findById(subjectId);
            if (optionalSubject.isPresent()) {

                List<StudentAssessment> myToDo = assignmentRepo.BatchStudentAssessment(batchId, subjectId);

                myToDoList = new ArrayList<>();
                for (StudentAssessment d : myToDo) {
                    StudentAssessmentDTO n = new StudentAssessmentDTO(
                            d.getStudentId(),
                            d.getSId(),
                            d.getStudentName(),
                            d.getAssessmentId(),
                            d.getAssessmentName(),
                            d.getFilePath(),
                            getStatusSt(d.getStatus()),
                            d.getResult()

                    );
                    myToDoList.add(n);
                }
                return myToDoList;

            }


        } else {
            throw new EntityNotFoundException("Student not found In this Batch : " + batchId);
        }
        return myToDoList;
    }

    @Transactional
    @Override
    public String updateResults(int assignmentId, String marks) {

        Optional<StudentAssignment> optionalassignment = studentAssignmentRepo.findById(assignmentId);
        if (optionalassignment.isPresent()){
           StudentAssignment studentAssignment= optionalassignment.get();

           studentAssignment.setMarks(marks);
           studentAssignment.setActiveState(true);

           studentAssignmentRepo.save(studentAssignment);

           return "Results Added success.";
        }
        else{
            throw new EntityNotFoundException("Assignment not found In this Batch : " + assignmentId);
        }
    }

    @Override
    public List<StudentBatchAssignmentDTO> StudentBatchAssignment(int batchId, int studentId) {

        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
        List<StudentBatchAssignmentDTO> studentAssignmentList = null;
        if (optionalBatch.isPresent()) {
            Batch batch = optionalBatch.get();

            Optional<Student> optionalStudent = studentRepo.findById(studentId);
            if (optionalStudent.isPresent()) {
                Student student = optionalStudent.get();

                List<StudentBatchAssignment> studentAssignment = assignmentRepo.StudentAssignment(batchId, studentId);
                studentAssignmentList = new ArrayList<>();

                for (StudentBatchAssignment d : studentAssignment) {
                    StudentBatchAssignmentDTO n = new StudentBatchAssignmentDTO(
                            d.getAssessmentId(),
                            d.getAssessmentName(),
                            d.getFilePath(),
                            d.getIssueDate(),
                            d.getSubmissionDate(),
                            d.getSubmitDate(),
                            getSubmitStateString(d.getStatus()),
                            d.getResult(),
                            d.getSubjectId(),
                            d.getSubjectCode(),
                            d.getSubjectName()
                    );
                    studentAssignmentList.add(n);
                }
                return studentAssignmentList;

            }

        }
        else {
            throw new EntityNotFoundException("Batch not found in this Id :" + batchId);
        }

        return studentAssignmentList;
    }

    @Override
    public String getStudentAssignment(int assignmentId) {

        Optional<StudentAssignment> optionalStudentAssignment = studentAssignmentRepo.findById(assignmentId);
        if (optionalStudentAssignment.isPresent()){
            StudentAssignment studentAssignment = optionalStudentAssignment.get();

            String fileName = studentAssignment.getFilePath();
         //   String fileName = studentAssignmentRepo.getStudentAssignment(assignmentId);
            return fileName;
        }
        else {
            throw new EntityNotFoundException("Assignment not found with ID: " + assignmentId);
        }

    }

    @Override
    public String getAssignment(int assignmentId) {

        Optional<Assignment> optionalAssignment = assignmentRepo.findById(assignmentId);
        if (optionalAssignment.isPresent()){
            Assignment assignment = optionalAssignment.get();

            String fileName = assignment.getFilePath();
            return fileName;
        }
        else {
            throw new EntityNotFoundException("Assignment not found with ID: " + assignmentId);
        }
    }

    @Override
    public String updateAssignmentDate(int assignmentId, Date date) {

        Optional<Assignment> optionalAssignment = assignmentRepo.findById(assignmentId);
        if (optionalAssignment.isPresent()) {
            Assignment assignment = optionalAssignment.get();
            assignment.setSubmissionDate(date);

            assignmentRepo.save(assignment);
        }

        return "Assignment Date Updated.";
    }

    @Override
    public List<AssignmentsDTO> AllAssignments() {
        List<AllAssignments> assignment = assignmentRepo.AllAssignment();

        List<AssignmentsDTO> allassignment = new ArrayList<>();
        for (AllAssignments a: assignment) {
            AssignmentsDTO n = new AssignmentsDTO(
                    a.getAssignmentId(),
                    a.getAssignmentName(),
                    a.getBatchId(),
                    a.getBatchCode(),
                    a.getBatchName(),
                    a.getCourseId(),
                    a.getCourseCode(),
                    a.getLevel(),
                    a.getCourseName(),
                    a.getSubjectId(),
                    a.getSubjectCode(),
                    a.getSubjectName(),
                    a.getIssuedDate(),
                    a.getSubmissionDate()
            );
            allassignment.add(n);
        }

        return allassignment;
    }

    private String getSubmitStateString(int submitState) {
        return submitState == 0 ? "Not Submitted" : "Submitted";
    }

    private String getStatusSt(int result) {
        return result == 0 ? "Not Submitted" : "Submitted";
    }
}

