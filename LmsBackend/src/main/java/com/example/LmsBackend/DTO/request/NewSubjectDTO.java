package com.example.LmsBackend.DTO.request;

import com.example.LmsBackend.Entity.Assignment;
import com.example.LmsBackend.Entity.Course;
import com.example.LmsBackend.Entity.Lesson;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewSubjectDTO {
    private String subjectName;
    private String subjectCode;
    private String credit;
   // private int course;
}
