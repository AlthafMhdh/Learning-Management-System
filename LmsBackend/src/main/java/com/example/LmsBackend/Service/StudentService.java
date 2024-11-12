package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.ImageUploadDTO;
import com.example.LmsBackend.DTO.request.StudentSaveDTO;
import com.example.LmsBackend.DTO.request.StudentUpdateDTO;
import com.example.LmsBackend.DTO.request.UpdatePassword;
import com.example.LmsBackend.DTO.response.StudentProfile;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.Entity.Student;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {
    Student saveStudent(StudentSaveDTO studentSaveDTO);

    List<StudentResponseDTO> allstudents();


    Student loginCheck(String userName, String password);

    String updatePassword(UpdatePassword updatePassword);

    String suspendStudent(int studentId);

    String activeStudent(int studentId);

    List<StudentResponseDTO> allsuspendedstudents();

    List<StudentProfile> StudentProfile(int studentId);

    String updateProfileDetails(int studentId, StudentUpdateDTO studentUpdateDTO);

    String uploadStudentImage(int studentId, ImageUploadDTO imageUploadDTO, MultipartFile imageFile);

    Long studentCount();

    Long suspentstudentCount();
}
