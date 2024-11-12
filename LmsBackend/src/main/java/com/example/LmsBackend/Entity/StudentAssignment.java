package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "studentassignment")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "st_assignment_seq_generator")
    @SequenceGenerator(name = "st_assignment_seq_generator", sequenceName = "st_assignment_sequence", initialValue = 1)
    @Column(name = "submit_assignment_id", nullable = false, length = 20)
    private int submitAssignmentId;

    @Column(name = "assignment_name")
    private String assignmentName;

    @Column(name = "filepath")
    private String filePath;

    @Column(name = "result")
    private String marks;

    @Column(name = "submit_date")
    private Date submitDate;

    @Column(name = "submit_state", columnDefinition = "TINYINT default 0")
    private boolean submitState;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student st_student;

    //courseid
    @ManyToOne
    @JoinColumn(name="course_id")
    private Course st_course;

    //batchid
    @ManyToOne
    @JoinColumn(name="batch_id")
    private Batch st_batch;

    @ManyToOne
    @JoinColumn(name="assignment_id")
    private Assignment st_assignment;

    //subjectid
    @ManyToOne
    @JoinColumn(name="subject_id")
    private Subject st_subjects;
}
