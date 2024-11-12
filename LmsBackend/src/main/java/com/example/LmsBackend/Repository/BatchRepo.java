package com.example.LmsBackend.Repository;

import com.example.LmsBackend.DTO.QueryInterface.BatchDetails;
import com.example.LmsBackend.DTO.QueryInterface.NewAssignmentToBatchDetails;
import com.example.LmsBackend.DTO.QueryInterface.ToDoList;
import com.example.LmsBackend.Entity.Batch;
import com.example.LmsBackend.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface BatchRepo extends JpaRepository<Batch,Integer> {

    int countByCourse(Course course);

//    @Query(value = "select b.batch_id as batchId, b.batch_code as batchCode, b.batch_name as batchName, b.start_date as startDate, b.end_date as endDate, count(b.student_id) as students , c.course_name as courseName, c.level as courseLevel  from batch b, course c where b.active_state= 1 and b.course_id = c.course_id group by  b.batch_id",nativeQuery = true)
//    List<BatchDetails> AllBatches();

    @Query(value = "SELECT b.batch_id as batchId, b.batch_code as batchCode, b.batch_name as batchName, b.start_date as startDate, b.end_date as endDate, COUNT(bs.student_id) as students, c.course_name as courseName, c.level as courseLevel FROM batch b INNER JOIN course c ON b.course_id = c.course_id LEFT JOIN batch_student bs ON b.batch_id = bs.batch_id WHERE b.active_state = 1 GROUP BY b.batch_id;",nativeQuery = true)
    List<BatchDetails> AllBatches();

    @Query(value = "select b.batch_id as batchId, b.batch_code as batchCode, b.batch_name as batchName, c.course_id as courseId, c.course_code as courseCode, c.course_name as courseName, c.level as Level, s.subject_id as subjectId, s.subject_name as subjectName from batch b, course c, subject s where b.assignment_state= 0 and b.course_id = c.course_id and c.course_id = s.course_id",nativeQuery = true)
    List<NewAssignmentToBatchDetails> BatchToNewAssignment();

    @Query(value = "SELECT b.batch_id AS batchId, b.batch_name AS batchName, s.subject_id AS subjectId, s.subject_code AS subjectCode, s.subject_name AS subjectName, a.assignment_id AS assignmentId, a.assignment_name AS assignmentName, a.issued_date AS issuedDate, a.submission_date AS submissionDate FROM batch b INNER JOIN batch_student bs ON b.batch_id = bs.batch_id INNER JOIN student st ON bs.student_id = st.student_id INNER JOIN assignment a ON b.batch_id = a.batch_id INNER JOIN subject s ON a.subject_id = s.subject_id WHERE st.student_id = ?1 AND b.assignment_state = 1;",nativeQuery = true)
    List<ToDoList> StudentToDoList(int studentId);
}
