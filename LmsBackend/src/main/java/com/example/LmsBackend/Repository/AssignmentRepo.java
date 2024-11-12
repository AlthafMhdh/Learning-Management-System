package com.example.LmsBackend.Repository;

import com.example.LmsBackend.DTO.QueryInterface.*;
import com.example.LmsBackend.Entity.Assignment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface AssignmentRepo extends JpaRepository<Assignment,Integer> {

    @Query(value = "select a.assignment_id as assignmentId, a.assignment_name as assignmentName, s.subject_id as subjectId, s.subject_code as subjectCode, s.subject_name as subjectName, c.course_id as courseId, c.course_code as courseCode, c.level as level, c.course_name as courseName, b.batch_id as batchId, b.batch_code as batchCode, b.batch_name as batchName from assignment a, batch b, course c, subject s  where a.active_state= 0 and a.subject_id = s.subject_id and a.batch_id = b.batch_id and a.course_id = c.course_id",nativeQuery = true)
    List<AssignToBatchDetails> AssignToBatch();

    @Query(value = "select a.assignment_id as assignmentId, a.assignment_name as assignmentName, a.issued_date as issuedDate, a.submission_date as submissionDate, a.filepath as filePath, st.submit_assignment_id as submitAssignmentId, st.submit_state as submitState, st.submit_date as submitDate from assignment a, studentassignment st where a.subject_id =?2 and st.student_id=?1",nativeQuery = true)
    List<AssignmentInLessons> AssignmentInLesson(int studentId, int subjectId);

    @Query(value = "select a.assignment_id as assignmentId, a.assignment_name as assignmentName, a.issued_date as issuedDate, a.submission_date as submissionDate, a.filepath as filePath from assignment a join batch b on b.batch_id = a.batch_id join  batch_student bs on bs.batch_id = b.batch_id where a.subject_id =?2 and bs.student_id =?1",nativeQuery = true)
    List<AssessmentView> AssignmentInLessonBefore(int studentId, int subjectId);


//    @Query(value = "SELECT b.batch_id AS batchId, b.batch_name AS batchName, s.subject_id AS subjectId, s.subject_code AS subjectCode, s.subject_name AS subjectName, a.assignment_id AS assignmentId, a.assignment_name AS assignmentName, a.issued_date AS issuedDate, a.submission_date AS submissionDate FROM batch b INNER JOIN batch_student bs ON b.batch_id = bs.batch_id INNER JOIN student st ON bs.student_id = st.student_id INNER JOIN assignment a ON b.batch_id = a.batch_id INNER JOIN subject s ON a.subject_id = s.subject_id WHERE st.student_id = ?1 AND b.assignment_state = 1;",nativeQuery = true)

//    @Query(value="select d.submit_assignment_id as studentAssignmentId, a.assignment_id as assignmentId, a.assignment_name as assignmentName, a.issued_date as issuedDate, a.submission_date as submissionDate, a.filepath as filePath, s.subject_id as subjectId, s.subject_code as subjectCode, s.subject_name as subjectName, b.batch_id as batchId, b.batch_name as batchName from assignment a, studentassignment d, subject s, course c, batch b where b.batch_id= d.batch_id and s.subject_id= d.subject_id and a.assignment_id= d.assignment_id and d.student_id=?1 and d.submit_state=0  ",nativeQuery = true)
//    List<ToDoList> StudentToDoList(int studentId);

    @Query(value = "select sa.submit_assignment_id as studentAssignmentId, b.batch_id as batchId, b.batch_name as batchName, sub.subject_id as subjectId, sub.subject_code as subjectCode, sub.subject_name as subjectName, a.assignment_id as assignmentId, a.assignment_name as assignmentName, a.issued_date as issuedDate, a.submission_date as submissionDate from studentassignment sa join batch b on sa.batch_id = b.batch_id join subject sub on sa.subject_id = sub.subject_id join assignment a on sa.assignment_id = a.assignment_id where sa.student_id =?1 and sa.submit_state = 0", nativeQuery = true)
    List<ToDoList> StudentToDoList(int studentId);


    @Query(value = "select sa.submit_assignment_id as studentAssignmentId, sa.submit_date as submit_date , submit_state as submitState, sa.result as marks ,b.batch_id as batchId, b.batch_name as batchName, sub.subject_code as subjectCode, sub.subject_name as subjectName, a.assignment_id as assignmentId, a.assignment_name as assignmentName, a.issued_date as issuedDate, a.submission_date as submissionDate from studentassignment sa join batch b on sa.batch_id = b.batch_id join subject sub on sa.subject_id = sub.subject_id join assignment a on sa.assignment_id = a.assignment_id where sa.student_id =?1 and sa.subject_id =?2 ", nativeQuery = true)
    List<SubjectTodo> SubjectToDoListForStudent(int studentId, int subjectId);

    @Query(value = "select s.student_id as studentId, s.sid as sId, s.student_name as studentName, max(sa.submit_assignment_id) as assessmentId, max(sa.assignment_name) as assessmentName, max(sa.filepath) as filePath, max(sa.submit_state) as status, sa.result as result from student s join studentassignment sa on s.student_id = sa.student_id join batch_student bs1 on sa.batch_id = bs1.batch_id left join batch_student bs2 on s.student_id = bs2.student_id join subject s2 on s2.subject_id = sa.subject_id join batch b on b.batch_id = sa.batch_id where s2.subject_id = ?2 and b.batch_id = ?1 group by sa.submit_assignment_id",nativeQuery = true)
    List<StudentAssessment> BatchStudentAssessment(int batchId, int subjectId);

    @Query(value = "select s.subject_id as subjectId, s.subject_code as subjectCode, s.subject_name as subjectName, s2.submit_assignment_id as assessmentId, s2.assignment_name as assessmentName, s2.filepath as filePath, s2.result as result, s2.submit_date as submitDate, s2.submit_state as status, a.issued_date as issueDate, a.submission_date as submissionDate  from subject s join studentassignment s2 on s.subject_id = s2.subject_id join student s3 on s2.student_id = s3.student_id join batch b on s2.batch_id = b.batch_id join batch_student bs on s2.batch_id = bs.batch_id and s3.student_id = bs.student_id join assignment a on s2.assignment_id = a.assignment_id where s3.student_id= ?2 and b.batch_id= ?1 group by s2.submit_assignment_id", nativeQuery = true)
    List<StudentBatchAssignment> StudentAssignment(int batchId, int studentId);

    @Query(value = "select a.assignment_id as assignmentId, a.assignment_name as assignmentName, a.issued_date as issuedDate, a.submission_date as submissionDate, s.subject_id as subjectId, s.subject_code as subjectCode, s.subject_name as subjectName, c.course_id as courseId, c.course_code as courseCode, c.level as level, c.course_name as courseName, b.batch_id as batchId, b.batch_code as batchCode, b.batch_name as batchName from assignment a, batch b, course c, subject s  where a.active_state= 0 and a.subject_id = s.subject_id and a.batch_id = b.batch_id and a.course_id = c.course_id order by a.assignment_id desc",nativeQuery = true)
    List<AllAssignments> AllAssignment();
}