package com.example.LmsBackend.Service;

import com.example.LmsBackend.DTO.request.ImageUploadDTO;
import com.example.LmsBackend.DTO.request.LecturerSaveDTO;
import com.example.LmsBackend.DTO.request.LecturerUpdateDTO;
import com.example.LmsBackend.DTO.request.UpdatePassword;
import com.example.LmsBackend.DTO.response.LecturerProfile;
import com.example.LmsBackend.DTO.response.LecturerResponseDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.MyBatchesLecturerDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.SubjectDTO;
import com.example.LmsBackend.Entity.Lecturer;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LecturerService {
    String saveLecturer(LecturerSaveDTO lecturerSaveDTO);

    List<LecturerResponseDTO> alllecturers();

    List<LecturerResponseDTO> allremovedlecturers();

    String uploadLecturerImage(int lecturerId, ImageUploadDTO imageUploadDTO, MultipartFile imageFile);

    String suspendLecturer(int lecturerId);

    String activeLecturer(int lecturerId);

    Long suspentlecturerCount();

    Long activelecturerCount();

    String updateProfileDetails(int lecturerId, LecturerUpdateDTO lecturerUpdateDTO);

    List<LecturerProfile> LecturerProfile(int lecturerId);

    String updatePassword(UpdatePassword updatePassword);

    Lecturer loginCheck(String userName, String password);

    List<MyBatchesLecturerDTO> myBatches(int lecturerId);

    List<SubjectDTO> mySubjects(int lecturerId);
}
