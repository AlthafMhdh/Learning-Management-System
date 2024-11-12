package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.QueryInterface.BatchDetails;
import com.example.LmsBackend.DTO.QueryInterface.NewAssignmentToBatchDetails;
import com.example.LmsBackend.DTO.request.AssignLecturerDTO;
import com.example.LmsBackend.DTO.request.NewBatchDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.NewAssignmentToBatchDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.Student_BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.ToDoListDTO;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.Entity.*;
import com.example.LmsBackend.Repository.*;
import com.example.LmsBackend.Service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Transactional
@Service
public class BatchServiceImpl implements BatchService {

    @Autowired
    private BatchRepo batchRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private LecturerRepo lecturerRepo;

    @Autowired
    private SubjectRepo subjectRepo;

    @Override
    public String createNewBatch(NewBatchDTO newBatchDTO) {
        Course course = courseRepo.getReferenceById(newBatchDTO.getCourse());

//        LocalDate startDate = LocalDate.parse((CharSequence) newBatchDTO.getStartDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
//        LocalDate endDate = startDate.plusDays(Long.parseLong(course.getDuration()));

        LocalDate startDate = newBatchDTO.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        // Calculate endDate based on startDate and course duration
      //  LocalDate endDate = startDate.plusDays(Long.parseLong(course.getDuration()));
        // Interpret course duration and calculate endDate based on it
        long duration = parseDuration(course.getDuration());
        LocalDate endDate = startDate.plus(duration, ChronoUnit.DAYS);
        // Convert LocalDate to Date
        Instant instant = endDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant();
        Date endDateAsDate = Date.from(instant);

        int numberOfBatchesForCourse = batchRepo.countByCourse(course);
        String batchCode = course.getCourseCode() + "Batch" + (numberOfBatchesForCourse + 1);
        String batchName = course.getLevel() + " In " + course.getCourseName() + " Batch" + (numberOfBatchesForCourse + 1);

        Batch batch = new Batch();
        batch.setActiveState(true);
        batch.setBatchCode(batchCode);
        batch.setBatchName(batchName);
        batch.setCourse(course);
        batch.setStartDate(newBatchDTO.getStartDate());
        batch.setEndDate(endDateAsDate);
        batch.setAssessmentState(false);
        batchRepo.save(batch);
        return "Batch created successfully!" + " Batch Id is "+ batchCode;
    }

    private long parseDuration(String durationString) {
        String[] parts = durationString.split(" ");
        int amount = Integer.parseInt(parts[0]);
        if (parts[1].equalsIgnoreCase("months")) {
            return amount * 30; // Assuming 30 days in a month
        } else if (parts[1].equalsIgnoreCase("years")) {
            return amount * 365; // Assuming 365 days in a year
        }else if (parts[1].equalsIgnoreCase("year")) {
            return amount * 365; // Assuming 365 days in a year
        } else {
            throw new IllegalArgumentException("Invalid duration format: " + durationString);
        }
    }

    @Override
    public List<BatchDetailsDTO> ViewAllBatches() {

        List<BatchDetails> batches = batchRepo.AllBatches();

        List<BatchDetailsDTO> allbatches = new ArrayList<>();
        for (BatchDetails d: batches) {
            BatchDetailsDTO n = new BatchDetailsDTO(
                    d.getBatchId(),
                    d.getBatchName(),
                    d.getBatchCode(),
                    d.getStartDate(),
                    d.getEndDate(),
                    d.getCourseLevel(),
                    d.getCourseName(),
                    d.getStudents()
            );
            allbatches.add(n);
        }
        return allbatches;
    }

    @Override
    public Long batchCount() {
        return batchRepo.count();
    }


    @Override
    public List<StudentResponseDTO> getStudentsInBatch(int batchId) {
        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
        if (optionalBatch.isPresent()) {
            // Get the batch object
            Batch batch = optionalBatch.get();

            // Access the set of students associated with the batch directly
            List<Student> studentList = batch.getStudents();

            List<StudentResponseDTO> studentDTOList = new ArrayList<>();

            for (Student student : studentList) {
                StudentResponseDTO studentResponseDTO = new StudentResponseDTO();
                studentResponseDTO.setStudentId(student.getStudentId());
                studentResponseDTO.setSid(student.getSid());
                studentResponseDTO.setStudentName(student.getStudentName());
                studentResponseDTO.setNic(student.getNic());
                studentResponseDTO.setEmail(student.getEmail());
                studentResponseDTO.setAddress(student.getAddress());
                studentResponseDTO.setDob(student.getDob());
                studentResponseDTO.setPhoneNumber(student.getPhoneNumber());
                studentResponseDTO.setRegistredDate(student.getRegistredDate());
                // Add StudentDTO to the list
                studentDTOList.add(studentResponseDTO);
            }

            // Return the list of StudentDTO objects
            return studentDTOList;
        } else {
            // Return an empty list if batch with given ID is not found
            return Collections.emptyList();
        }
    }



//    @Override
//    @Transactional
//    public void addStudentsToBatch(int batchId, List<Integer> studentIds) {
//        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
//        if (optionalBatch.isPresent()) {
//            Batch batch = optionalBatch.get();
//
//            List<Student> studentsToAdd = studentRepo.findAllById(studentIds);
//
//            batch.setStudents(studentsToAdd);
//
//            // Save the updated batch
//            batchRepo.save(batch);
//
//        } else {
//            throw new EntityNotFoundException("Batch not found with ID: " + batchId);
//        }
//    }

    @Override
    @Transactional
    public void addStudentsToBatch(int batchId, List<Integer> studentIds, Date submitDate) {
        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
        if (optionalBatch.isPresent()) {
            Batch batch = optionalBatch.get();

            List<Student> studentsToAdd = studentRepo.findAllById(studentIds);

            batch.setStudents(studentsToAdd);

            // Save the updated batch
            batchRepo.save(batch);

        } else {
            throw new EntityNotFoundException("Batch not found with ID: " + batchId);
        }
    }



    @Override
    public List<NewAssignmentToBatchDTO> BatchToNewAssignment() {

        List<NewAssignmentToBatchDetails> batches = batchRepo.BatchToNewAssignment();

        List<NewAssignmentToBatchDTO> allbatches = new ArrayList<>();
        for (NewAssignmentToBatchDetails d: batches) {
            NewAssignmentToBatchDTO n = new NewAssignmentToBatchDTO(
                    d.getBatchId(),
                    d.getBatchCode(),
                    d.getBatchName(),
                    d.getCourseId(),
                    d.getCourseCode(),
                    d.getLevel(),
                    d.getCourseName(),
                    d.getSubjectId(),
                    d.getSubjectName()
            );
            allbatches.add(n);
        }
        return allbatches;
    }

    @Override
    public List<Student_BatchDetailsDTO> getMyBatchesForStudent(int studentId) {

        Optional<Student> optionalStudent = studentRepo.findById(studentId);
        List<Student_BatchDetailsDTO> studentBatchDetailsList = null;
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            List<Batch> batches = student.getBatches();

            studentBatchDetailsList = new ArrayList<>();

            for (Batch batch : batches) {
                Course course = batch.getCourse();
                Student_BatchDetailsDTO student_batches = new Student_BatchDetailsDTO();
                student_batches.setBatchId(batch.getBatchId());
                student_batches.setBatchCode(batch.getBatchCode());
                student_batches.setBatchName(batch.getBatchName());
                student_batches.setStartDate(String.valueOf(batch.getStartDate()));
                student_batches.setEndDate(String.valueOf(batch.getEndDate()));
                student_batches.setCourseId(course.getCourseId());
                student_batches.setCourseLevel(course.getLevel());
                student_batches.setCourseName(course.getCourseName());

                studentBatchDetailsList.add(student_batches);
            }
            return studentBatchDetailsList;
        }
        else {
            throw new EntityNotFoundException("Student not found with ID: " + studentId);
        }
    }

    @Override
    public String removeStudentFromBatch(int batchId, int studentId) {

        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
        if (optionalBatch.isPresent()) {
            Batch batch = optionalBatch.get();

            Optional<Student> optionalStudent = batch.getStudents().stream()
                    .filter(student -> student.getStudentId() == studentId)
                    .findFirst();

            if (optionalStudent.isPresent()) {
                // Remove student from the batch
                Student student = optionalStudent.get();
                batch.getStudents().remove(student);
                student.setBatches(null); // Update student's batch association
                studentRepo.save(student);

                return "Student removed from batch successfully.";

            } else {
                throw new EntityNotFoundException("Student with ID " + studentId + " not found in batch with ID " + batchId);
            }
        } else {
            throw new EntityNotFoundException("Batch not found with ID: " + batchId);
        }

    }

    @Override
    public List<ToDoListDTO> StudentToDoList(int studentId) {
//
//        Optional<Student> optionalStudent = studentRepo.findById(studentId);
//        if (optionalStudent.isPresent()) {
//            Student student = optionalStudent.get();
//
//            List<ToDoList> myToDo = batchRepo.StudentToDoList(studentId);
//
//            List<ToDoListDTO> myToDoList = new ArrayList<>();
//            for (ToDoList d: myToDo) {
//                ToDoListDTO n = new ToDoListDTO(
//                        d.getBatchId(),
//                        d.getBatchName(),
//                        d.getSubjectId(),
//                        d.getSubjectCode(),
//                        d.getSubjectName(),
//                        d.getAssignmentId(),
//                        d.getAssignmentName(),
//                        d.getIssuedDate(),
//                        d.getSubmissionDate()
//                );
//                myToDoList.add(n);
//            }
//            return myToDoList;
//
//        }
//        else {
//            throw new EntityNotFoundException("Student not found with ID: " + studentId);
//        }
        return null;
    }

//    @Override
//    public void assignLecturerToBatch(AssignLecturerDTO assignLecturerDTO) {
//        Optional<Lecturer> optionalLecturer = lecturerRepo.findById(assignLecturerDTO.getLecturerId());
//        if (optionalLecturer.isPresent()) {
//            Lecturer lecturer = optionalLecturer.get();
//            Subject subject = subjectRepo.getReferenceById(assignLecturerDTO.getSubjectId());
//            Batch batch = batchRepo.getReferenceById(assignLecturerDTO.getBatchId());
//
//            batch.setLecturer((List<Student>) lecturer);
//            batchRepo.save(batch);
//
//            subject.setLecturers((List<Student>) lecturer);
//            subjectRepo.save(subject);
//        }
//    }

    @Override
    public void assignLecturerToBatch(AssignLecturerDTO assignLecturerDTO) {
        Optional<Lecturer> optionalLecturer = lecturerRepo.findById(assignLecturerDTO.getLecturerId());
        if (optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            Batch batch = batchRepo.getReferenceById(assignLecturerDTO.getBatchId());
            Subject subject = subjectRepo.getReferenceById(assignLecturerDTO.getSubjectId());

            if (batch != null && subject != null) {
                List<Lecturer> batchLecturers = batch.getLecturer();
                if (batchLecturers == null) {
                    batchLecturers = new ArrayList<>();
                }
                // Add lecturer to batch if not already present
                if (!batchLecturers.contains(lecturer)) {
                    batchLecturers.add(lecturer);
                    batch.setLecturer(batchLecturers);
                    batchRepo.save(batch);
                }

                List<Lecturer> subjectLecturers = subject.getLecturers();
                if (subjectLecturers == null) {
                    subjectLecturers = new ArrayList<>();
                }
                // Add lecturer to subject if not already present
                if (!subjectLecturers.contains(lecturer)) {
                    subjectLecturers.add(lecturer);
                    subject.setLecturers(subjectLecturers);
                    subjectRepo.save(subject);
                }
            }
        }
    }





}
