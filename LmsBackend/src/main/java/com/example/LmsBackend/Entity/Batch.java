package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "batch")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Batch {

    //this is the entrollement
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "batch_seq_generator")
    @SequenceGenerator(name = "batch_seq_generator", sequenceName = "batch_sequence", initialValue = 1)
    @Column(name = "batch_id", nullable = false, length = 20)
    private int batchId;

    @Column(name = "batch_name", nullable = false, length = 100)
    private String batchName;

    @Column(name = "batch_code", nullable = false, length = 20)
    private String batchCode;

    @Column(name = "start_date", columnDefinition = "DATE")
    private Date startDate;

    @Column(name = "end_date", columnDefinition = "DATE")
    private Date endDate;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @Column(name = "assignment_state", columnDefinition = "TINYINT default 0")
    private boolean assessmentState;

    @OneToMany(mappedBy = "batch")
    private Set<Assignment> assignments;

    //studentid
//    @ManyToOne
//    @JoinColumn(name="student_id")
//    private Student student;

    @ManyToMany
    @JoinTable(
            name = "batch_student",
            joinColumns = @JoinColumn(name = "batch_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students = new ArrayList<>();
//    private Set<Student> students;

    @ManyToMany
    @JoinTable(
            name = "batch_lecturer",
            joinColumns = @JoinColumn(name = "batch_id"),
            inverseJoinColumns = @JoinColumn(name = "lecturer_id")
    )
    private List<Lecturer> lecturer = new ArrayList<>();

    //courseid
    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    @OneToMany(mappedBy = "st_batch")
    private Set<StudentAssignment> studentAssignments;

    @Transient
    private int studentCount;


    public Batch(String batchName, String batchCode, LocalDate startDate, LocalDate endDate, Course course) {
    }
}
