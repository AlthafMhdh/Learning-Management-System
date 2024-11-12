package com.example.LmsBackend.Repository;

import com.example.LmsBackend.DTO.QueryInterface.MyBatchesLecturer;
import com.example.LmsBackend.DTO.QueryInterface.SubjectDetails;
import com.example.LmsBackend.Entity.Lecturer;
import com.example.LmsBackend.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface LecturerRepo extends JpaRepository<Lecturer,Integer> {

    List<Lecturer> findAllByActiveStateEquals(boolean b);

    Long countByActiveStateEquals(boolean b);

    Lecturer findByUserNameAndPasswordAndActiveStateEquals(String userName, String password, boolean b);

    @Query(value = "select b.batch_id as batchId, b.batch_name as batchName, b.batch_code as batchCode, c.course_id as courseId, c.level as level, c.course_name as courseName, s.subject_id as subjectId, s.subject_name as subjectName, s.subject_code as subjectCode from lecturer l, subject s join course c on c.course_id = s.course_id join batch b on c.course_id = b.course_id join batch_lecturer bl on b.batch_id = bl.batch_id where l.lecturer_id =?1",nativeQuery = true)
    List<MyBatchesLecturer> LecturerBatches(int lecturerId);

    @Query(value = "select s.subject_id as subjectId, s.subject_name as subjectName, s.subject_code as subjectCode, s.credit as credit, c.course_name as courseName, c.level as level  from lecturer l, subject s join subject_lecturer sl on s.subject_id = sl.subject_id join course c on c.course_id = s.course_id where l.lecturer_id =?1",nativeQuery = true)
    List<SubjectDetails> LecturerSubjects(int lecturerId);
}
