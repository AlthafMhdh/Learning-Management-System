package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "Assignment")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "assignment_seq_generator")
    @SequenceGenerator(name = "assignment_seq_generator", sequenceName = "assignment_sequence", initialValue = 1)
    @Column(name = "assignment_id", nullable = false, length = 20)
    private int assignmentId;

    @Column(name = "assignment_name")
    private String assignmentName;

    @Column(name = "filepath")
    private String filePath;

    @Column(name = "result")
    private String marks;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @Column(name = "issued_date")
    private Date issuedDate;

    @Column(name = "submission_date")
    private Date submissionDate;

    //studentid
    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    //courseid
    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    //batchid
    @ManyToOne
    @JoinColumn(name="batch_id")
    private Batch batch;

    //subjectid
    @ManyToOne
    @JoinColumn(name="subject_id")
    private Subject subjects;

    @OneToMany(mappedBy = "st_assignment")
    private Set<StudentAssignment> studentAssignments;

}
