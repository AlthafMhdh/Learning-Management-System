package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "subject")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subject_seq_generator")
    @SequenceGenerator(name = "subject_seq_generator", sequenceName = "subject_sequence", initialValue = 1)
    @Column(name = "subject_id", nullable = false, length = 20)
    private int subjectId;

    @Column(name = "subject_name", nullable = false, length = 100)
    private String subjectName;

    @Column(name = "subject_code", nullable = false, length = 20)
    private String subjectCode;

    @Column(name = "credit")
    private String credit;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToMany(mappedBy = "subject")
    private Set<Lesson> lessons;

    @OneToMany(mappedBy = "subjects")
    private Set<Assignment> assignments;

    @OneToMany(mappedBy = "st_subjects")
    private Set<StudentAssignment> studentAssignments;

    //courseid
//    @ManyToOne
//    @JoinColumn(name="course_id")
//    private Course course;

    @ManyToMany
    @JoinTable(
            name = "course_subjects",
            joinColumns = @JoinColumn(name = "subject_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> course = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "subject_lecturer",
            joinColumns = @JoinColumn(name = "subject_id"),
            inverseJoinColumns = @JoinColumn(name = "lecturer_id")
    )
    private List<Lecturer> lecturers = new ArrayList<>();


}
