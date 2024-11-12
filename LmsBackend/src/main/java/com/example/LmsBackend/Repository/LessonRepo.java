package com.example.LmsBackend.Repository;

import com.example.LmsBackend.DTO.QueryInterface.LessonDetails;
import com.example.LmsBackend.Entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface LessonRepo extends JpaRepository<Lesson,Integer> {

    @Query(value = "select l.lesson_id as lessonId, l.lesson_name as lessonName, s.subject_code as subjectCode, s.subject_name as subjectName, c.content_name as contentName , c.content_type as contentType from lessons l, content c, subject s  where l.active_state= 1 and l.subject_id = s.subject_id and l.lesson_id = c.lession_id",nativeQuery = true)
    List<LessonDetails> AllLessons();

    @Query(value = "select c.filePath from content c, lessons l where c.lession_id = l.lesson_id and l.lesson_id= ?1",nativeQuery = true)
    String getLessonFilePath(int lessonId);
}
