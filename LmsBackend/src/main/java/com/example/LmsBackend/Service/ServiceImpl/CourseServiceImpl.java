package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.request.CourseCreateDTO;
import com.example.LmsBackend.DTO.response.CourseResponseDTO;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Entity.Batch;
import com.example.LmsBackend.Entity.Course;
import com.example.LmsBackend.Entity.Student;
import com.example.LmsBackend.Entity.Subject;
import com.example.LmsBackend.Repository.CourseRepo;
import com.example.LmsBackend.Repository.SubjectRepo;
import com.example.LmsBackend.Service.CourseService;
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
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SubjectRepo subjectRepo;

    @Override
    public String createCourse(CourseCreateDTO courseCreateDTO) {

        Course course =modelMapper.map(courseCreateDTO, Course.class);
        course.setActiveState(true);

        if(!courseRepo.existsById(course.getCourseId())){
            courseRepo.save(course);
            return "Course Created Successfully.";
        }
        else{
            throw new DuplicateKeyException("Something went wrong.");
        }
    }

    @Override
    public List<CourseResponseDTO> allcourses() {
        boolean b= true;
        List<Course> courses = courseRepo.findAllByActiveStateEquals(b);
        List<CourseResponseDTO> courseList = new ArrayList<>();

        for (Course course : courses) {
            CourseResponseDTO courseResponseDTO = modelMapper.map(course, CourseResponseDTO.class);
            courseList.add(courseResponseDTO);
        }

        return courseList;
    }

    @Override
    public Long courseCount() {
        return courseRepo.count();
    }

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

            return subjectDTOList;
        } else {
            // Return an empty list if batch with given ID is not found
            return Collections.emptyList();
        }
    }

    @Override
    public void addSubjectsToCourse(int courseId, List<Integer> subjectIds) {

        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();

            List<Subject> subjectsToAdd = subjectRepo.findAllById(subjectIds);

            course.setSubjects(subjectsToAdd);

            courseRepo.save(course);

        } else {
            throw new EntityNotFoundException("Course not found with ID: " + courseId);
        }
    }
}
