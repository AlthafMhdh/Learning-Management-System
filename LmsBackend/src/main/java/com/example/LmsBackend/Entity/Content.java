package com.example.LmsBackend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "content")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "content_seq_generator")
    @SequenceGenerator(name = "content_seq_generator", sequenceName = "content_sequence", initialValue = 1)
    @Column(name = "content_id", nullable = false, length = 20)
    private int contentId;

    @Column(name = "content_name", nullable = false, length = 100)
    private String contentName;

    @Lob
    @Column(name = "filepath")
    private String filepath;

    @Column(name = "description")
    private String description;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean activeState;

    //lessionid
    @ManyToOne
    @JoinColumn(name="lession_id")
    private Lesson lesson;

}
