package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "lessons")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lesson_seq_generator")
    @SequenceGenerator(name = "lesson_seq_generator", sequenceName = "lesson_sequence", initialValue = 1)
    @Column(name = "lesson_id", nullable = false, length = 20)
    private int lessonId;

    @Column(name = "lesson_name", nullable = false, length = 100)
    private String lessonName;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    @OneToMany(mappedBy = "lesson")
    private Set<Content> contents;

    //courseid
    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    //subjectid
    @ManyToOne
    @JoinColumn(name="subject_id")
    private Subject subject;


}
