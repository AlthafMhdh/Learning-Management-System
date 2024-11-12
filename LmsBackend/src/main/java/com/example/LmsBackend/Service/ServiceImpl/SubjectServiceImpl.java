package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.QueryInterface.LessonSubjectView;
import com.example.LmsBackend.DTO.QueryInterface.SubjectDetails;
import com.example.LmsBackend.DTO.QueryInterface.ToDoList;
import com.example.LmsBackend.DTO.request.NewSubjectDTO;
import com.example.LmsBackend.DTO.response.CourseResponseDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.LessonViewSubjectDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.ToDoListDTO;
import com.example.LmsBackend.DTO.response.StudentResponseDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Entity.Batch;
import com.example.LmsBackend.Entity.Course;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Entity.Subject;
import com.example.LmsBackend.Repository.BatchRepo;
import com.example.LmsBackend.Repository.CourseRepo;
import com.example.LmsBackend.Repository.SubjectRepo;
import com.example.LmsBackend.Service.SubjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepo subjectRepo;

    @Autowired
    private BatchRepo batchRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CourseRepo courseRepo;

    @Override
    public String createNewSubject(NewSubjectDTO newSubjectDTO) {

      //  Course course = courseRepo.getReferenceById(newSubjectDTO.getCourse());

      //  Subject subject =modelMapper.map(newSubjectDTO, Subject.class);
        Subject subject = new Subject();
        subject.setSubjectCode(newSubjectDTO.getSubjectCode());
        subject.setSubjectName(newSubjectDTO.getSubjectName());
        subject.setCredit(newSubjectDTO.getCredit());
      //  subject.setCourse(course);
        subject.setActiveState(true);

        if(!subjectRepo.existsById(subject.getSubjectId())){
            subjectRepo.save(subject);
            return "Subject Created Successfully.";
        }
        else{
            throw new DuplicateKeyException("Something went wrong.");
        }
    }

    @Override
    public List<SubjectDetailsDTO> ViewAllSubjects() {
//        List<SubjectDetails> subjects = subjectRepo.AllSubjects();
//
//        List<SubjectDetailsDTO> allsubjects = new ArrayList<>();
//        for (SubjectDetails d: subjects) {
//            SubjectDetailsDTO n = new SubjectDetailsDTO(
//                    d.getSubjectId(),
//                    d.getSubjectName(),
//                    d.getSubjectCode(),
//                    d.getCredit(),
//                    d.getCourseName(),
//                    d.getLevel()
//            );
//            allsubjects.add(n);
//        }
//        return allsubjects;
        boolean b= true;
        List<Subject> subjects = subjectRepo.findAllByActiveStateEquals(b);
        List<SubjectDetailsDTO> subjectList = new ArrayList<>();

        for (Subject subject : subjects) {
            SubjectDetailsDTO subjectDetailsDTO = modelMapper.map(subject, SubjectDetailsDTO.class);
            subjectList.add(subjectDetailsDTO);
        }

        return subjectList;
    }

    @Override
    public Long subjectCount() {
        return subjectRepo.count();
    }

//    @Override
//    public List<SubjectDetailsDTO> getSubjectsForCourse(int courseId) {
//
//        Optional<Course> course= courseRepo.findById(courseId);
//
//        boolean b= true;
//        List<Subject> subjects = subjectRepo.findAllByCourseAndActiveStateEquals(course,b);
//        List<SubjectDetailsDTO> subjectList = new ArrayList<>();
//
//        for (Subject subject : subjects) {
//            SubjectDetailsDTO subjectDetailsDTO = modelMapper.map(subject, SubjectDetailsDTO.class);
//            subjectList.add(subjectDetailsDTO);
//        }
//
//        return subjectList;
//    }

    @Override
    public List<SubjectDetailsDTO> getSubjectsForCourse(int courseId) {

        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();

            List<Subject> subjectList = course.getSubjects();

            List<SubjectDetailsDTO> subjectDTOList = new ArrayList<>();

            for (Subject subject : subjectList) {
                SubjectDetailsDTO subjectDetailsDTO = new SubjectDetailsDTO();
                subjectDetailsDTO.setSubjectId(subject.getSubjectId());
                subjectDetailsDTO.setSubjectCode(subject.getSubjectCode());
                subjectDetailsDTO.setSubjectName(subject.getSubjectName());
                subjectDetailsDTO.setCredit(subject.getCredit());

                subjectDTOList.add(subjectDetailsDTO);
            }

            // Return the list of StudentDTO objects
            return subjectDTOList;
        } else {
            // Return an empty list if batch with given ID is not found
            return Collections.emptyList();
        }
    }

    @Override
    public List<LessonViewSubjectDTO> AllLessonsforSubject(int subjectId) {

        Optional<Subject> optionalSubject = subjectRepo.findById(subjectId);
        if (optionalSubject.isPresent()){
            Subject subject = optionalSubject.get();

            List<LessonSubjectView> lesson = subjectRepo.SubjectLessons(subjectId);

            List<LessonViewSubjectDTO> lessonsList = new ArrayList<>();

            for (LessonSubjectView d: lesson) {
                LessonViewSubjectDTO n = new LessonViewSubjectDTO(
                        d.getLessonId(),
                        d.getLessonName(),
                        d.getContentId(),
                        d.getContentName(),
                        d.getContentType(),
                        d.getFilepath()



                );
                lessonsList.add(n);
            }
            return lessonsList;
        }else {
            throw new EntityNotFoundException("Subject not found with ID: " + subjectId);
        }
    }

    @Override
    public List<SubjectDetailsDTO> getAllSubjectsForBatch(int batchId) {

        Optional<Batch> optionalBatch = batchRepo.findById(batchId);
        if (optionalBatch.isPresent()){
            Batch batch = optionalBatch.get();

            List<SubjectDetails> subjects = subjectRepo.SubjectsOfBatch(batchId);

            List<SubjectDetailsDTO> subjectList = new ArrayList<>();

            for (SubjectDetails d: subjects) {
                SubjectDetailsDTO n = new SubjectDetailsDTO(
                        d.getSubjectId(),
                        d.getSubjectName(),
                        d.getSubjectCode(),
                        d.getCredit()

                );
                subjectList.add(n);
            }
            return subjectList;
        }else {
            throw new EntityNotFoundException("Batch not found with ID: " + batchId);
        }
    }
}
