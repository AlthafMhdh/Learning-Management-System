package com.example.LmsBackend.Service.ServiceImpl;

import com.example.LmsBackend.DTO.QueryInterface.BatchDetails;
import com.example.LmsBackend.DTO.QueryInterface.LessonDetails;
import com.example.LmsBackend.DTO.request.NewLessonDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.BatchDetailsDTO;
import com.example.LmsBackend.DTO.response.QueryResponse.LessonDetailsDTO;
import com.example.LmsBackend.Entity.Content;
import com.example.LmsBackend.Entity.Lesson;
import com.example.LmsBackend.Entity.Subject;
import com.example.LmsBackend.Repository.ContentRepo;
import com.example.LmsBackend.Repository.LessonRepo;
import com.example.LmsBackend.Repository.SubjectRepo;
import com.example.LmsBackend.Service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@Transactional
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonRepo lessonRepo;

    @Autowired
    private ContentRepo contentRepo;

    @Autowired
    private SubjectRepo subjectRepo;

    @Value("${content.path}")
    private String contentPath;



    @Override
    @Transactional
    public String saveLesson(NewLessonDTO newLessonDTO, MultipartFile docFile) {

        Subject subject = subjectRepo.getById(newLessonDTO.getSubjectId());

        Lesson lesson = new Lesson();
        lesson.setLessonName(newLessonDTO.getLessonName());
        lesson.setSubject(subject);
        lesson.setActiveState(true);

        Content content = new Content();
        content.setContentName(newLessonDTO.getContentName());
        content.setContentType(newLessonDTO.getContentType());
        content.setActiveState(true);

        String fileName = docFile.getOriginalFilename();
        String filePath = contentPath + File.separator + fileName;

        try {
            File dest = new File(filePath);
            docFile.transferTo(dest);

            content.setFilepath(filePath);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return "Failed to upload lesson file.";
        }

        Lesson savedLesson = lessonRepo.save(lesson);
        if (savedLesson != null) {
            content.setLesson(savedLesson);
            contentRepo.save(content);
        }

//      //  content.setFilepath(newLessonDTO.getFilepath());
//        Content savedContent = contentRepo.save(content);
//
//        if (savedContent != null){
//            Set<Content> contents = new HashSet<>();
//            contents.add(savedContent);
//            lesson.setContents(contents);
//           // lessonRepo.save(lesson);
//            Lesson savedLesson = lessonRepo.save(lesson);
//
//        }

        return null;
    }

    @Override
    public List<LessonDetailsDTO> ViewAllLessons() {
        List<LessonDetails> lessons = lessonRepo.AllLessons();

        List<LessonDetailsDTO> alllessons = new ArrayList<>();
        for (LessonDetails d: lessons) {
            LessonDetailsDTO n = new LessonDetailsDTO(
                    d.getLessonId(),
                    d.getLessonName(),
                    d.getSubjectCode(),
                    d.getSubjectName(),
                    d.getContentName(),
                    d.getContentType()
            );
            alllessons.add(n);
        }
        return alllessons;
    }

    @Override
    public Long LessonCount() {
        return lessonRepo.count();
    }

    @Override
    public String getLessonFilePath(int lessonId) {
        Optional<Lesson> optionalLesson = lessonRepo.findById(lessonId);
        if (optionalLesson.isPresent()){
            Lesson lesson= optionalLesson.get();

            String fileName = lessonRepo.getLessonFilePath(lessonId);
            return fileName;
        }
        else {
            throw new EntityNotFoundException("Lesson not found with ID: " + lessonId);
        }
    }
}
