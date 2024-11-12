package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.request.ImageUploadDTO;
import com.example.LmsBackend.DTO.request.StudentSaveDTO;
import com.example.LmsBackend.DTO.request.StudentUpdateDTO;
import com.example.LmsBackend.DTO.request.UpdatePassword;
import com.example.LmsBackend.DTO.response.StudentProfile;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Repository.StudentRepo;
import com.example.LmsBackend.Service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public Student saveStudent(StudentSaveDTO studentSaveDTO) {

        Student student =modelMapper.map(studentSaveDTO, Student.class);
        student.setRegistredDate(new Date());
        student.setActiveState(true);
        student.setProfileImage(null);

        if(!studentRepo.existsById(student.getStudentId())){
          //  studentRepo.save(student);

            Student savedStudent = studentRepo.save(student);
            savedStudent.setSid(String.format("S%04d", savedStudent.getStudentId()));

            savedStudent.setUserName(savedStudent.getSid()+"@Edumatrix");

            // Update the saved student with the generated Sid
            studentRepo.save(savedStudent);
            return savedStudent;
        }
        else{
        throw new DuplicateKeyException("Something went wrong.");
        }

    }


    @Override
    public String uploadStudentImage(int studentId, ImageUploadDTO imageUploadDTO, MultipartFile imageFile) {
        Optional<Student> student = studentRepo.findById(studentId);

        if (student.isPresent()){
            Student existingStudent = student.get();

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
            modelMapper.map(imageUploadDTO, existingStudent);
            studentRepo.save(existingStudent);

            return "Your Profile Updated Successfully.";
        }

        return "Your Profile Updated Successfully.";
    }

    @Override
    public Long studentCount() {
        boolean b=true;
        return studentRepo.countByActiveStateEquals(b);
    }

    @Override
    public Long suspentstudentCount() {
        boolean b=false;
        return studentRepo.countByActiveStateEquals(b);
    }


    @Override
    public String updatePassword(UpdatePassword updatePassword) {
        Optional<Student> student= studentRepo.findById(updatePassword.getId());

        if (student.isPresent()) {
            Student existingStudent = student.get();
            modelMapper.map(updatePassword, existingStudent);
            studentRepo.save(existingStudent);
            return "Password Changed Successfully.";
        }
        else{
            throw new NoSuchElementException("Student not found.");
        }

    }

    @Override
    public String suspendStudent(int studentId) {
        Optional<Student> student = studentRepo.findById(studentId);

        if (student.isPresent()){
            Student existingStudent = student.get();
            existingStudent.setActiveState(false);
            studentRepo.save(existingStudent);
            return "Student Suspended.";
        }
        else{
            throw new NoSuchElementException("Student not found.");
        }
    }

    @Override
    public String activeStudent(int studentId) {
        Optional<Student> student = studentRepo.findById(studentId);

        if (student.isPresent()){
            Student existingStudent = student.get();
            existingStudent.setActiveState(true);
            studentRepo.save(existingStudent);
            return "Student Activated.";
        }
        else{
            throw new NoSuchElementException("Student not found.");
        }
    }

    @Override
    public List<StudentResponseDTO> allstudents() {
        boolean b= true;
        List<Student> students = studentRepo.findAllByActiveStateEquals(b);
        List<StudentResponseDTO> studentList = new ArrayList<>();

        for (Student student : students) {
            StudentResponseDTO studentResponseDTO = modelMapper.map(student, StudentResponseDTO.class);
            studentList.add(studentResponseDTO);
        }

        return studentList;
    }

    @Override
    public List<StudentResponseDTO> allsuspendedstudents() {
        boolean b= false;
        List<Student> students = studentRepo.findAllByActiveStateEquals(b);
        List<StudentResponseDTO> studentList = new ArrayList<>();

        for (Student student : students) {
            StudentResponseDTO studentResponseDTO = modelMapper.map(student, StudentResponseDTO.class);
            studentList.add(studentResponseDTO);
        }

        return studentList;
    }

    @Override
    public List<StudentProfile> StudentProfile(int studentId) {
        Student student = studentRepo.getReferenceById(studentId);
        StudentProfile studentProfile = modelMapper.map(student, StudentProfile.class);

        // Read the image file and encode it as Base64
        String profileImageBase64 = null;
        String profileImageFilePath = student.getProfileImage();

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
        studentProfile.setProfileImage(profileImageBase64);

        return  List.of(studentProfile);

    }

    @Override
    public String updateProfileDetails(int studentId, StudentUpdateDTO studentUpdateDTO) {
       Optional<Student> student = studentRepo.findById(studentId);

        if (student.isPresent()) {
            Student existingStudent = student.get();
            modelMapper.map(studentUpdateDTO, existingStudent);
            studentRepo.save(existingStudent);
            return "Your Profile Updated Successfully.";
        } else {
            throw new NoSuchElementException("Student not found.");
        }
    }


    @Override
    public Student loginCheck(String userName, String password) {
        boolean b= true;
        return studentRepo.findByUserNameAndPasswordAndActiveStateEquals(userName, password,b);
    }

}
