package com.example.LmsBackend.DTO.response.QueryResponse;

import com.example.LmsBackend.Entity.Assignment;
import com.example.LmsBackend.Entity.Course;
import com.example.LmsBackend.Entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BatchDetailsDTO {

    private int batchId;
    private String batchName;
    private String batchCode;
    private String startDate;
    private String endDate;
    private String courseLevel;
    private String courseName;
    private int students;
}
