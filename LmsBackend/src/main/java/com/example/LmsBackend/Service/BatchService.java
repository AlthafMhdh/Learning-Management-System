package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.AssignLecturerDTO;
import com.example.LmsBackend.DTO.request.NewBatchDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.NewAssignmentToBatchDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.Student_BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.ToDoListDTO;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;

import java.util.Date;
import java.util.List;

public interface BatchService {

    String createNewBatch(NewBatchDTO newBatchDTO);

    List<BatchDetailsDTO> ViewAllBatches();

    Long batchCount();

    List<StudentResponseDTO> getStudentsInBatch(int batchId);

    void addStudentsToBatch(int batchId, List<Integer> studentIds, Date submitDate);

    List<NewAssignmentToBatchDTO> BatchToNewAssignment();

    List<Student_BatchDetailsDTO> getMyBatchesForStudent(int studentId);

    String removeStudentFromBatch(int batchId, int studentId);

    List<ToDoListDTO> StudentToDoList(int studentId);

    void assignLecturerToBatch(AssignLecturerDTO assignLecturerDTO);
}
