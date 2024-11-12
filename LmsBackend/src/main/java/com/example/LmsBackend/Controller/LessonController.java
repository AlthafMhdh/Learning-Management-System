package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.NewLessonDTO;
import com.example.LmsBackend.DTO.request.StudentSaveDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.LessonDetailsDTO;
import com.example.LmsBackend.Entity.Lesson;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Service.LessonService;
import com.example.LmsBackend.Util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/lesson")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @PostMapping(path = "/save")
    public ResponseEntity<StandardResponse> saveLesson(@RequestParam("docFile") MultipartFile docFile, @ModelAttribute NewLessonDTO newLessonDTO){
        String newLesson = lessonService.saveLesson(newLessonDTO, docFile);
        String message = "New Lesson Created Successfully.";

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",message),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/alllessons")
    public ResponseEntity<StandardResponse> ViewAllLessons(){

        List<LessonDetailsDTO> allLessons = lessonService.ViewAllLessons();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", allLessons),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> LessonCount(){
        Long message = lessonService.LessonCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/download/pdf/{lessonId}")
    public ResponseEntity<byte[]> downloadPDF(@PathVariable int lessonId) throws IOException {
        // Assuming you have a method to get the file path for a lesson
        String filePath = lessonService.getLessonFilePath(lessonId);
        if (filePath != null) {
            byte[] pdfBytes = Files.readAllBytes(Paths.get(filePath)
);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "lesson.pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } else {
            // Handle case where file path is not found
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/lesson/pdf/{lessonId}")
    public ResponseEntity<byte[]> getPDF(@PathVariable int lessonId) throws IOException {
        String filePath = lessonService.getLessonFilePath(lessonId);
        if (filePath != null) {
            byte[] pdfBytes = Files.readAllBytes(Paths.get(filePath));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
