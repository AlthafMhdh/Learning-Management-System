package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.CreateAssignmentDTO;
import com.example.LmsBackend.DTO.request.NewAssessmentDTO;
import com.example.LmsBackend.DTO.request.NewLessonDTO;
import com.example.LmsBackend.DTO.request.StudentAssignmentSubmissionDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.*;
import com.example.LmsBackend.Service.AssignmentService;
import com.example.LmsBackend.Util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.time.Instant;

@RestController
@CrossOrigin
@RequestMapping("api/v1/assignment")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("/new-assessment")
        public ResponseEntity<StandardResponse> NewAssessment(@RequestParam("docFile") MultipartFile docFile, @ModelAttribute NewAssessmentDTO newAssessmentDTO){
            String message = assignmentService.newAssessmentByAdmin(newAssessmentDTO, docFile);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(201,"Success",message),
                    HttpStatus.CREATED
        );
    }

    @GetMapping("/assigntobatch")
    public ResponseEntity<StandardResponse> AssignToBatch(){

        List<AssignToBatchDTO> assignassessment = assignmentService.AssignToBatch();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", assignassessment),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/studentSubmission")
    public ResponseEntity<StandardResponse> StudentSubmission(@RequestParam("docFile") MultipartFile docFile, @ModelAttribute StudentAssignmentSubmissionDTO studentAssignmentSubmissionDTO){
        String message = assignmentService.studentSubmission(studentAssignmentSubmissionDTO, docFile);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.CREATED
        );
    }


    @GetMapping("/AssignmentInLesson/{studentId}/{subjectId}")
    public ResponseEntity<StandardResponse> getAssessments(@PathVariable int studentId, @PathVariable int subjectId){
        List<AssignmentInLessonDTO> assignments = assignmentService.AssignmentInLessons(studentId,subjectId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", assignments),
                HttpStatus.OK
        );
    }


    @GetMapping("/AssignmentInLessonView/{studentId}/{subjectId}")
    public ResponseEntity<StandardResponse> getToDoAssessments(@PathVariable int studentId, @PathVariable int subjectId){
        List<AssessmentViewDTO> assignments = assignmentService.AssignmentInLessonsBefore(studentId,subjectId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", assignments),
                HttpStatus.OK
        );
    }

    @PostMapping("/assignaasignment")
    public ResponseEntity<StandardResponse> assignAssessmentToStudents(@RequestBody CreateAssignmentDTO createAssignmentDTO) {
        try {
            assignmentService.assignAssessmentToStudents(createAssignmentDTO);
            String message = "Assignment Assigned successfully.";
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(201, "Ok", message),
                    HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            //   return ResponseEntity.notFound().build();
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(401, "NotFound", "Can't Add these Students."),
                    HttpStatus.NOT_FOUND
            );
        }
    }

    //Assign button clicked page
    @PostMapping("/studentAssignmentSubmission")
    public ResponseEntity<StandardResponse> StudentAssessmentSubmission(@RequestParam("docFile") MultipartFile docFile, @ModelAttribute StudentAssignmentSubmissionDTO studentAssignmentSubmissionDTO){
        String message = assignmentService.studentSubmission(studentAssignmentSubmissionDTO, docFile);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/ToDo/{studentId}")
    public ResponseEntity<StandardResponse> getToDoList(@PathVariable int studentId){
        List<ToDoListDTO> Todo = assignmentService.StudentToDoList(studentId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", Todo),
                HttpStatus.OK
        );
    }

    @GetMapping("/SubjectToDoForStudent /{studentId}/ {subjectId}")
    public ResponseEntity<StandardResponse> getSubjectToDoList(@PathVariable int studentId, @PathVariable int subjectId){
        List<SubtectTodoList> Todo = assignmentService.SubjectToDoForStudent(studentId, subjectId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", Todo),
                HttpStatus.OK
        );
    }

    @GetMapping("/BatchStudentAssessment/{batchId}/{subjectId}")
    public ResponseEntity<StandardResponse> getBatchStudentAssessmentForLecturer(@PathVariable int batchId, @PathVariable int subjectId){
        List<StudentAssessmentDTO> batchStudent = assignmentService.BatchStudentAssessment(batchId,subjectId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", batchStudent),
                HttpStatus.OK
        );
    }

    @PutMapping("updatemarks/{assignmentId}/{marks}")
    public ResponseEntity<StandardResponse> updateResult(@PathVariable int assignmentId, @PathVariable String marks){
        String massege = assignmentService.updateResults(assignmentId,marks);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", massege),
                HttpStatus.OK
        );
    }

    @GetMapping("/StudentBatchAssignment/{batchId}/{studentId}")
    public ResponseEntity<StandardResponse> getStudentBatchAssignment(@PathVariable int batchId, @PathVariable int studentId){
        List<StudentBatchAssignmentDTO> studentAssignment = assignmentService.StudentBatchAssignment(batchId,studentId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", studentAssignment),
                HttpStatus.OK
        );
    }

    @GetMapping("/StudentAssignment/{assignmentId}")
    public ResponseEntity<byte[]> getStudentPDF(@PathVariable int assignmentId) throws IOException {
        String assignment = assignmentService.getStudentAssignment(assignmentId);
        if (assignment != null) {
            byte[] pdfBytes = Files.readAllBytes(Paths.get(assignment));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/Assignment/{assignmentId}")
    public ResponseEntity<byte[]> getAssignmentPDF(@PathVariable int assignmentId) throws IOException {
        String assignment = assignmentService.getAssignment(assignmentId);
        if (assignment != null) {
            byte[] pdfBytes = Files.readAllBytes(Paths.get(assignment));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update Assignment Date
    @PutMapping("updateAssignmentDate/{assignmentId}/{date}")
    public ResponseEntity<StandardResponse> updateAssignmentDate(@PathVariable int assignmentId, @PathVariable String date){

        //parse the date string to date
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date parsedDate;
        try {
            parsedDate = formatter.parse(date);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        String massege = assignmentService.updateAssignmentDate(assignmentId,parsedDate);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", massege),
                HttpStatus.OK
        );
    }

    //All Assignments
    @GetMapping("/all-assignment")
    public ResponseEntity<StandardResponse> allAssignments(){

        List<AssignmentsDTO> allassessment = assignmentService.AllAssignments();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", allassessment),
                HttpStatus.CREATED
        );
    }



}
