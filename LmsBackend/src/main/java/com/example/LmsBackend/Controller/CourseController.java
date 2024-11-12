package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.CourseCreateDTO;
import com.example.LmsBackend.DTO.request.StudentSaveDTO;
import com.example.LmsBackend.DTO.response.CourseResponseDTO;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Service.CourseService;
import com.example.LmsBackend.Util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping(path = "/create")
    public ResponseEntity<StandardResponse> createCourse(@RequestBody CourseCreateDTO courseCreateDTO){
        String message =courseService.createCourse(courseCreateDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping(path = "/allcourse")
    public ResponseEntity<StandardResponse> AllCourses(){
        List<CourseResponseDTO> allcourses = courseService.allcourses();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allcourses),
                HttpStatus.OK
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> CourseCount(){
        Long message = courseService.courseCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/view/{courseId}")
    public ResponseEntity<StandardResponse> getSubjectsForCourse(@PathVariable int courseId){
        List<SubjectDetailsDTO> subjects = courseService.getSubjectsForCourse(courseId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Success", subjects),
                HttpStatus.OK
        );
//        if (!subjects.isEmpty()) {
//            return new ResponseEntity<StandardResponse>(
//                    new StandardResponse(201, "Success", subjects),
//                    HttpStatus.OK
//            );
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }

    }

    @PostMapping("/addSubject/{courseId}")
    public ResponseEntity<StandardResponse> addSubjectsToCourse(@PathVariable int courseId, @RequestBody List<Integer> subjectIds) {
        try {
            courseService.addSubjectsToCourse(courseId,subjectIds);
            String message="Subjects added to course successfully.";
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(201, "Ok", message),
                    HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            //   return ResponseEntity.notFound().build();
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(401,"NotFound","Can't Add these Subjects."),
                    HttpStatus.NOT_FOUND
            );
        }
    }
}
