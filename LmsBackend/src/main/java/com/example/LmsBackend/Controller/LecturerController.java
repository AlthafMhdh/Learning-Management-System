package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.*;
import com.example.LmsBackend.DTO.response.LecturerProfile;
import com.example.LmsBackend.DTO.response.LecturerResponseDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.MyBatchesLecturerDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.SubjectDTO;
import com.example.LmsBackend.DTO.response.StudentProfile;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Entity.Lecturer;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Service.LecturerService;
import com.example.LmsBackend.Util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/lecturer")
public class LecturerController {

    @Autowired
    private LecturerService lecturerService;

    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveLecturer(@RequestBody LecturerSaveDTO lecturerSaveDTO){
        String message = lecturerService.saveLecturer(lecturerSaveDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @PutMapping(path = "/upload/{Id}")
    public ResponseEntity<StandardResponse> uploadProfileImage(@PathVariable(value = "Id") int lecturerId, @RequestParam("imageFile") MultipartFile imageFile, @ModelAttribute ImageUploadDTO imageUploadDTO){
        String message =lecturerService.uploadLecturerImage(lecturerId,imageUploadDTO, imageFile);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/update/{Id}")
    public ResponseEntity<StandardResponse> updateProfile(@PathVariable(value = "Id") int lecturerId, @RequestBody LecturerUpdateDTO lecturerUpdateDTO){
        String message = lecturerService.updateProfileDetails(lecturerId, lecturerUpdateDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/alllecturer")
    public ResponseEntity<StandardResponse> AllLecturers(){
        List<LecturerResponseDTO> alllecturers = lecturerService.alllecturers();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alllecturers),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/allremovedlecturers")
    public ResponseEntity<StandardResponse> AllRemovedLecturers(){
        List<LecturerResponseDTO> alllecturers = lecturerService.allremovedlecturers();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",alllecturers),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/suspend/{Id}")
    public ResponseEntity<StandardResponse> suspendLecturer(@PathVariable(value="Id") int lecturerId){
        String message = lecturerService.suspendLecturer(lecturerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/active/{Id}")
    public ResponseEntity<StandardResponse> activeLecturer(@PathVariable(value="Id") int lecturerId){
        String message = lecturerService.activeLecturer(lecturerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> ActiveLecturerCount(){
        Long message = lecturerService.activelecturerCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/suspent-count")
    public ResponseEntity<StandardResponse> SuspentLecturerCount(){
        Long message = lecturerService.suspentlecturerCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/profile/{Id}")
    public ResponseEntity<StandardResponse> profile(@PathVariable(value = "Id") int lecturerId){

        List<LecturerProfile> lecturer = lecturerService.LecturerProfile(lecturerId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",lecturer),
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/updatepassword")
    public ResponseEntity<StandardResponse> updatePassword(@RequestBody UpdatePassword updatePassword){
        String message = lecturerService.updatePassword(updatePassword);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @PostMapping("/logvalid")
    public ResponseEntity<StandardResponse> loginvalid(@RequestBody LoginRequest loginRequest){
        try{
            Lecturer lecturer = lecturerService.loginCheck(loginRequest.getUserName(),loginRequest.getPassword());

            if (lecturer != null) {
                int message = lecturer.getLecturerId();
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

    @GetMapping(path = "/mybatches/{lecturerId}")
    public ResponseEntity<StandardResponse> MyBatches(@PathVariable int lecturerId){
        List<MyBatchesLecturerDTO> mybatches = lecturerService.myBatches(lecturerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",mybatches),
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/mysubjects/{lecturerId}")
    public ResponseEntity<StandardResponse> MySubjects(@PathVariable int lecturerId){
        List<SubjectDTO> mysubjects = lecturerService.mySubjects(lecturerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",mysubjects),
                HttpStatus.OK
        );
    }


}
