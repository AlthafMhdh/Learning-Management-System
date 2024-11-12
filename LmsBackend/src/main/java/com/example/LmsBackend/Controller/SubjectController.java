package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.NewSubjectDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.LessonViewSubjectDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Entity.Subject;
import com.example.LmsBackend.Service.SubjectService;
import com.example.LmsBackend.Util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/subject")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping("/create")
    public ResponseEntity<StandardResponse> createSubject(@RequestBody NewSubjectDTO newSubjectDTO){
        String message = subjectService.createNewSubject(newSubjectDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", message),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/allsubjects")
    public ResponseEntity<StandardResponse> ViewAllSubjects(){

        List<SubjectDetailsDTO> allSubjects = subjectService.ViewAllSubjects();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", allSubjects),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> SubjectCount(){
        Long message = subjectService.subjectCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/view/{courseId}")
    public ResponseEntity<StandardResponse> getSubjectsForCourse(@PathVariable int courseId){
        List<SubjectDetailsDTO > subjects = subjectService.getSubjectsForCourse(courseId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", subjects),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/viewlessons/{subjectId}")
    public ResponseEntity<StandardResponse> AllLessonsforSubject(@PathVariable int subjectId){
        List<LessonViewSubjectDTO> lessons = subjectService.AllLessonsforSubject(subjectId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", lessons),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<StandardResponse> getAllSubjectsForBatch(@PathVariable int batchId){
        List<SubjectDetailsDTO> subjects = subjectService.getAllSubjectsForBatch(batchId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", subjects),
                HttpStatus.CREATED
        );
    }



}
