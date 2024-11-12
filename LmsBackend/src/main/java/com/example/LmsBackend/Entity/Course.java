package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "course")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_seq_generator")
    @SequenceGenerator(name = "course_seq_generator", sequenceName = "course_sequence", initialValue = 1)
    @Column(name = "course_id", nullable = false, length = 20)
    private int courseId;

    @Column(name = "course_name", nullable = false, length = 100)
    private String courseName;

    @Column(name = "course_code", nullable = false, length = 20)
    private String courseCode;

    @Column(name = "level", nullable = false, length = 100)
    private String level;

    @Column(name = "duration", nullable = false, length = 100)
    private String duration;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToMany(mappedBy = "course")
    private Set<Lesson> lessons ;

//    @OneToMany(mappedBy = "course")
//    private Set<Subject> subjects;

//    @ManyToMany(mappedBy = "course")
//    private List<Subject> subjects = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "course_subjects",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private List<Subject> subjects = new ArrayList<>();

    @OneToMany(mappedBy = "course")
    private Set<Batch> batches ;

    @OneToMany(mappedBy = "course")
    private Set<Assignment> assignments;

    @OneToMany(mappedBy = "st_course")
    private Set<StudentAssignment> studentAssignments;

}
