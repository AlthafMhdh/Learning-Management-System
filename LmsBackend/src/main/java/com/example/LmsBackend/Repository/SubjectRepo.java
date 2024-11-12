package com.example.LmsBackend.Repository;

import com.example.LmsBackend.DTO.QueryInterface.LessonSubjectView;
import com.example.LmsBackend.DTO.QueryInterface.SubjectDetails;
import com.example.LmsBackend.DTO.response.SubjectDetailsDTO;
import com.example.LmsBackend.Entity.Course;
import com.example.LmsBackend.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface SubjectRepo extends JpaRepository<Subject,Integer> {

    @Query(value = "select s.subject_id as subjectId, s.subject_code as subjectCode, s.subject_name as subjectName, s.credit as credit, c.course_name as courseName, c.level as level  from subject s, course c where s.active_state= 1 and s.course_id = c.course_id group by  s.subject_id",nativeQuery = true)
    List<SubjectDetails> AllSubjects();

    List<Subject> findAllByActiveStateEquals(boolean b);

    List<Subject> findAllByCourseAndActiveStateEquals(Optional<Course> c, boolean b);

    @Query(value = "select l.lesson_id as lessonId, l.lesson_name as lessonName, c.content_id as contentId, c.content_name as contentName, c.content_type as contentType, c.filepath as filepath from lessons l, content c, subject s where c.lession_id = l.lesson_id and l.subject_id = s.subject_id and s.subject_id=?1",nativeQuery = true)
    List<LessonSubjectView> SubjectLessons(int subjectId);

    @Query(value = "select s.subject_id as subjectId, s.subject_name as subjectName, s.subject_code as subjectCode, s.credit as credit from subject s, batch b where s.course_id = b.course_id and b.batch_id=?1",nativeQuery = true)
    List<SubjectDetails> SubjectsOfBatch(int batchId);

    List<SubjectDetailsDTO> findAllByLecturersEquals(int lecturerId);
}
