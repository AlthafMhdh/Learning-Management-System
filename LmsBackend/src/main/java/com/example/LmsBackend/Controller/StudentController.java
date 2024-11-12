package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.*;
import com.example.LmsBackend.DTO.response.StudentProfile;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Service.StudentService;
import com.example.LmsBackend.Util.StandardResponse;
import com.example.LmsBackend.Util.StudentEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentEmail studentEmail;

    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveStudent(@RequestBody StudentSaveDTO studentSaveDTO){
      //  String message =studentService.saveStudent(studentSaveDTO);
        Student savedStudent = studentService.saveStudent(studentSaveDTO);

        String message = "Student Saved Successfully";

        studentEmail.sendStudentRegistrationEmail(savedStudent.getEmail(), savedStudent.getStudentName(), savedStudent.getUserName(),savedStudent.getPassword());

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @PutMapping(path = "/upload/{Id}")
    public ResponseEntity<StandardResponse> uploadProfileImage(@PathVariable(value = "Id") int studentId, @RequestParam("imageFile") MultipartFile imageFile, @ModelAttribute ImageUploadDTO imageUploadDTO){
        String message =studentService.uploadStudentImage(studentId,imageUploadDTO, imageFile);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/update/{Id}")
    public ResponseEntity<StandardResponse> updateProfile(@PathVariable(value = "Id") int studentId, @RequestBody StudentUpdateDTO studentUpdateDTO){
        String message = studentService.updateProfileDetails(studentId, studentUpdateDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }


    @PutMapping(path = "/updatepassword")
    public ResponseEntity<StandardResponse> updatePassword(@RequestBody UpdatePassword updatePassword){
        String message = studentService.updatePassword(updatePassword);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/suspend/{Id}")
    public ResponseEntity<StandardResponse> suspendStudent(@PathVariable(value="Id") int studentId){
        String message = studentService.suspendStudent(studentId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/active/{Id}")
    public ResponseEntity<StandardResponse> activeStudent(@PathVariable(value="Id") int studentId){
        String message = studentService.activeStudent(studentId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/profile/{Id}")
    public ResponseEntity<StandardResponse> profile(@PathVariable(value = "Id") int studentId){

        List<StudentProfile> student = studentService.StudentProfile(studentId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",student),
                HttpStatus.OK
        );
    }


    @GetMapping(path = "/allstudent")
    public ResponseEntity<StandardResponse> AllStudents(){
        List<StudentResponseDTO> allstudents = studentService.allstudents();
        return new ResponseEntity<StandardResponse>(
            new StandardResponse(200,"Success",allstudents),
            HttpStatus.OK
        );
    }

    @GetMapping(path = "/allsuspendedstudents")
    public ResponseEntity<StandardResponse> AllSuspendedStudents(){
        List<StudentResponseDTO> allstudents = studentService.allsuspendedstudents();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",allstudents),
                HttpStatus.OK
        );
    }

    @PostMapping("/logvalid")
    public ResponseEntity<StandardResponse> loginvalid(@RequestBody LoginRequest loginRequest){
        try{
            Student student = studentService.loginCheck(loginRequest.getUserName(),loginRequest.getPassword());

            if (student != null) {
                int message = student.getStudentId();
                return new ResponseEntity<>(new StandardResponse(200, "Success", message), HttpStatus.OK);
            }  else
            {
                // Return an error response for invalid credentials
                return new ResponseEntity<>(new StandardResponse(401, "Unauthorized", "Invalid login credentials"), HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            return new ResponseEntity<>(new StandardResponse(500, "Internal Server Error", "Error during login. Please try again."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> ActiveStudentCount(){
        Long message = studentService.studentCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/suspent-count")
    public ResponseEntity<StandardResponse> SuspentStudentCount(){
        Long message = studentService.suspentstudentCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

}
