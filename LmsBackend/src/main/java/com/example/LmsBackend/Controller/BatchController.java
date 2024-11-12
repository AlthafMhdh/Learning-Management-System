package com.example.LmsBackend.Controller;

import com.example.LmsBackend.DTO.request.AssignLecturerDTO;
import com.example.LmsBackend.DTO.request.NewBatchDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.NewAssignmentToBatchDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.Student_BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.ToDoListDTO;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Service.BatchService;
import com.example.LmsBackend.Util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/batch")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @PostMapping("/new")
    public ResponseEntity<StandardResponse> createBatch(@RequestBody NewBatchDTO newBatchDTO){
        String message = batchService.createNewBatch(newBatchDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", message),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/allbatches")
    public ResponseEntity<StandardResponse> ViewAllBatches(){

        List<BatchDetailsDTO> allBatches = batchService.ViewAllBatches();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", allBatches),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse> BatchCount(){
        Long message = batchService.batchCount();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/batchStudents/{batchId}")
    public ResponseEntity<StandardResponse> getStudentInBatch(@PathVariable int batchId) {
        List<StudentResponseDTO> students = batchService.getStudentsInBatch(batchId);
        String Nodata="No Student Found for This Page";
        if (!students.isEmpty()) {
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(200, "Done", students),
                    HttpStatus.OK);
        } else {
//            return new ResponseEntity<StandardResponse>(
//                    new StandardResponse(404,"Not_Found",Nodata),
//                    HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @PostMapping("/addStudent/{batchId}")
//    public ResponseEntity<StandardResponse> addStudentsToBatch(@PathVariable int batchId, @RequestBody List<Integer> studentIds) {
//        try {
//            batchService.addStudentsToBatch(batchId, studentIds);
//            String message="Students added to batch successfully.";
//            return new ResponseEntity<StandardResponse>(
//                    new StandardResponse(201, "Ok", message),
//                    HttpStatus.OK);
//        } catch (EntityNotFoundException e) {
//         //   return ResponseEntity.notFound().build();
//            return new ResponseEntity<StandardResponse>(
//                    new StandardResponse(401,"NotFound","Can't Add these Students."),
//                    HttpStatus.NOT_FOUND
//            );
//        }
//    }

    @PostMapping("/addStudent/{batchId}")
    public ResponseEntity<StandardResponse> addStudentsToBatch(@PathVariable int batchId, @RequestBody List<Integer> studentIds, @RequestBody Date submitDate) {
        try {
            batchService.addStudentsToBatch(batchId, studentIds, submitDate);
            String message="Students added to batch successfully.";
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(201, "Ok", message),
                    HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            //   return ResponseEntity.notFound().build();
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(401,"NotFound","Can't Add these Students."),
                    HttpStatus.NOT_FOUND
            );
        }
    }

    @GetMapping("/batch-newassignment")
    public ResponseEntity<StandardResponse> BatchToNewAssignment(){

        List<NewAssignmentToBatchDTO> batchtoassignment = batchService.BatchToNewAssignment();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", batchtoassignment),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/mycourses/{studentId}")
    public ResponseEntity<StandardResponse> getMyBatchesForStudent(@PathVariable int studentId) {
        List<Student_BatchDetailsDTO> myCourses = batchService.getMyBatchesForStudent(studentId);
        if (!myCourses.isEmpty()) {
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(200, "Done", myCourses),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/removestudent/{batchId}/{studentId}")
    public ResponseEntity<StandardResponse> removeStudentFromBatch(@PathVariable int batchId, int studentId){
        String message = batchService.removeStudentFromBatch(batchId,studentId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", message),
                HttpStatus.OK
        );
    }

//    @GetMapping("/subjects/{batchId}/{courseId}")
//    public ResponseEntity<StandardResponse> getSubjectsOfCourse(@PathVariable int batchId, int courseId){
//        List<> subjects = batchService.getSubjectsOfCourse(batchId,courseId);
//        return new ResponseEntity<StandardResponse>(
//                new StandardResponse(200, "Success", subjects),
//                HttpStatus.OK
//        );
//    }

    @GetMapping("/ToDo/{studentId}")
    public ResponseEntity<StandardResponse> getToDoList(@PathVariable int studentId){
        List<ToDoListDTO> Todo = batchService.StudentToDoList(studentId);
        return new ResponseEntity<>(
                new StandardResponse(200,"Success", Todo),
                HttpStatus.OK
        );
    }

    @PostMapping("/assignlecturer")
    public ResponseEntity<StandardResponse> addStudentsToBatch(@RequestBody AssignLecturerDTO assignLecturerDTO) {
        try {
            batchService.assignLecturerToBatch(assignLecturerDTO);
            String message="Lecturer assigned to batch successfully.";
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(201, "Ok", message),
                    HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            //   return ResponseEntity.notFound().build();
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(401,"NotFound","Can't Add these Students."),
                    HttpStatus.NOT_FOUND
            );
        }
    }


}
