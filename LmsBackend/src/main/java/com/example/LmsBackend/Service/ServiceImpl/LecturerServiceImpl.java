package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.QueryInterface.MyBatchesLecturer;
import com.example.LmsBackend.DTO.QueryInterface.SubjectDetails;
import com.example.LmsBackend.DTO.request.ImageUploadDTO;
import com.example.LmsBackend.DTO.request.LecturerSaveDTO;
import com.example.LmsBackend.DTO.request.LecturerUpdateDTO;
import com.example.LmsBackend.DTO.request.UpdatePassword;
import com.example.LmsBackend.DTO.response.LecturerProfile;
import com.example.LmsBackend.DTO.response.LecturerResponseDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.MyBatchesLecturerDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.SubjectDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Entity.Lecturer;
import com.example.LmsBackend.Entity.Subject;
import com.example.LmsBackend.Repository.LecturerRepo;
import com.example.LmsBackend.Repository.SubjectRepo;
import com.example.LmsBackend.Service.LecturerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@Service
public class LecturerServiceImpl implements LecturerService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    LecturerRepo lecturerRepo;

    @Value("${profile.path}")
    private String uploadPath;

    @Autowired
    private SubjectRepo subjectRepo;

    @Override
    public String saveLecturer(LecturerSaveDTO lecturerSaveDTO) {

        Lecturer lecturer =modelMapper.map(lecturerSaveDTO, Lecturer.class);
        lecturer.setRegistredDate(new Date());
        lecturer.setActiveState(true);
        lecturer.setProfileImage(null);

        if(!lecturerRepo.existsById(lecturer.getLecturerId())){
          //  lecturerRepo.save(lecturer);

            Lecturer savedLecturer = lecturerRepo.save(lecturer);

            savedLecturer.setLecId(String.format("L%04d",savedLecturer.getLecturerId()));
            savedLecturer.setUserName(savedLecturer.getLecId()+"@edumatrix");

            lecturerRepo.save(savedLecturer);

            return "Lecturer Saved Successfully.";
        }
        else{
            throw new DuplicateKeyException("Something went wrong.");
        }
    }

    @Override
    public List<LecturerResponseDTO> alllecturers() {
        boolean b= true;
        List<Lecturer> lecturers = lecturerRepo.findAllByActiveStateEquals(b);
        List<LecturerResponseDTO> lecturerList = new ArrayList<>();

        for (Lecturer lecturer : lecturers) {
            LecturerResponseDTO lecturerResponseDTO = modelMapper.map(lecturer, LecturerResponseDTO.class);
            lecturerList.add(lecturerResponseDTO);
        }

        return lecturerList;
    }

    @Override
    public List<LecturerResponseDTO> allremovedlecturers() {
        boolean b= false;
        List<Lecturer> lecturers = lecturerRepo.findAllByActiveStateEquals(b);
        List<LecturerResponseDTO> lecturerList = new ArrayList<>();

        for (Lecturer lecturer : lecturers) {
            LecturerResponseDTO lecturerResponseDTO = modelMapper.map(lecturer, LecturerResponseDTO.class);
            lecturerList.add(lecturerResponseDTO);
        }

        return lecturerList;
    }

    @Override
    public String uploadLecturerImage(int lecturerId, ImageUploadDTO imageUploadDTO, MultipartFile imageFile) {

        Optional<Lecturer> lecturer = lecturerRepo.findById(lecturerId);

        if (lecturer.isPresent()){
            Lecturer existingLecturer = lecturer.get();

            // Save the uploaded image
            String fileName = imageFile.getOriginalFilename();
            String filePath = uploadPath + File.separator + fileName;

            try {
                File dest = new File(filePath);
                imageFile.transferTo(dest);

                // Set the profile image path in the DTO
                imageUploadDTO.setProfileImage(filePath);
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception appropriately
                return "Failed to upload image.";
            }
            modelMapper.map(imageUploadDTO, existingLecturer);
            lecturerRepo.save(existingLecturer);

            return "Your Profile Updated Successfully.";
        }

        return "Your Profile Updated Successfully.";
    }

    @Override
    public String updateProfileDetails(int lecturerId, LecturerUpdateDTO lecturerUpdateDTO) {

        Optional<Lecturer> lecturer = lecturerRepo.findById(lecturerId);

        if (lecturer.isPresent()) {
            Lecturer existingLecturer = lecturer.get();
            modelMapper.map(lecturerUpdateDTO, existingLecturer);
            lecturerRepo.save(existingLecturer);
            return "Your Profile Updated Successfully.";
        } else {
            throw new NoSuchElementException("Student not found.");
        }
    }

    @Override
    public List<LecturerProfile> LecturerProfile(int lecturerId) {
        Lecturer lecturer = lecturerRepo.getReferenceById(lecturerId);
        LecturerProfile lecturerProfile = modelMapper.map(lecturer, LecturerProfile.class);

        // Read the image file and encode it as Base64
        String profileImageBase64 = null;
        String profileImageFilePath = lecturer.getProfileImage();

        // Check if profile image path is not null
        if (profileImageFilePath != null) {
            try (FileInputStream fileInputStream = new FileInputStream(new File(profileImageFilePath))) {
                byte[] imageBytes = fileInputStream.readAllBytes();
                profileImageBase64 = Base64.getEncoder().encodeToString(imageBytes);
            } catch (IOException e) {
                // Handle exception
                e.printStackTrace();
            }
        }
        // Set the Base64 encoded image as profile image in the DTO
        lecturerProfile.setProfileImage(profileImageBase64);

        return  List.of(lecturerProfile);
    }

    @Override
    public String updatePassword(UpdatePassword updatePassword) {
        Optional<Lecturer> lecturer= lecturerRepo.findById(updatePassword.getId());

        if (lecturer.isPresent()) {
            Lecturer existingLecturer = lecturer.get();
            modelMapper.map(updatePassword, existingLecturer);
            lecturerRepo.save(existingLecturer);
            return "Password Changed Successfully.";
        }
        else{
            throw new NoSuchElementException("Lecturer not found.");
        }
    }

    @Override
    public Lecturer loginCheck(String userName, String password) {
        boolean b= true;
        return lecturerRepo.findByUserNameAndPasswordAndActiveStateEquals(userName, password,b);
    }

    @Override
    public List<MyBatchesLecturerDTO> myBatches(int lecturerId) {

        Optional<Lecturer> optionalLecturer = lecturerRepo.findById(lecturerId);
        if (optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();

            List<MyBatchesLecturer> mybatch = lecturerRepo.LecturerBatches(lecturerId);

            List<MyBatchesLecturerDTO> mybatchList = new ArrayList<>();
            for (MyBatchesLecturer d: mybatch) {
                MyBatchesLecturerDTO n = new MyBatchesLecturerDTO(
                        d.getBatchId(),
                        d.getBatchName(),
                        d.getBatchCode(),
                        d.getCourseId(),
                        d.getLevel(),
                        d.getCourseName(),
                        d.getSubjectId(),
                        d.getSubjectName(),
                        d.getSubjectCode()
                );
                mybatchList.add(n);
            }
            return mybatchList;

       }
        else {
            throw new EntityNotFoundException("Lecturer not found with ID: " + lecturerId);
        }

    }

    @Override
    public List<SubjectDTO> mySubjects(int lecturerId) {

        Optional<Lecturer> optionalLecturer = lecturerRepo.findById(lecturerId);


        if (optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();

            List<SubjectDetails> mysubjects = lecturerRepo.LecturerSubjects(lecturerId);

            List<SubjectDTO> mysubjectList = new ArrayList<>();
            for (SubjectDetails d: mysubjects) {
                SubjectDTO n = new SubjectDTO(
                        d.getSubjectId(),
                        d.getSubjectName(),
                        d.getSubjectCode(),
                        d.getCredit(),
                        d.getCourseName(),
                        d.getLevel()
                );
                mysubjectList.add(n);
            }
            return mysubjectList;

        }
        else {
            throw new EntityNotFoundException("Lecturer not found with ID: " + lecturerId);
        }

    }

    @Override
    public String suspendLecturer(int lecturerId) {
        Optional<Lecturer> lecturer = lecturerRepo.findById(lecturerId);

        if (lecturer.isPresent()){
            Lecturer existingLecturer = lecturer.get();
            existingLecturer.setActiveState(false);
            lecturerRepo.save(existingLecturer);
            return "Lecturer Removed.";
        }
        else{
            throw new NoSuchElementException("Lecturer not found.");
        }
    }

    @Override
    public String activeLecturer(int lecturerId) {
        Optional<Lecturer> lecturer = lecturerRepo.findById(lecturerId);

        if (lecturer.isPresent()){
            Lecturer existingLecturer = lecturer.get();
            existingLecturer.setActiveState(true);
            lecturerRepo.save(existingLecturer);
            return "Lecturer Activated.";
        }
        else{
            throw new NoSuchElementException("Lecturer not found.");
        }
    }

    @Override
    public Long suspentlecturerCount() {
        boolean b=false;
        return lecturerRepo.countByActiveStateEquals(b);
    }

    @Override
    public Long activelecturerCount() {
        boolean b=true;
        return lecturerRepo.countByActiveStateEquals(b);
    }

}
