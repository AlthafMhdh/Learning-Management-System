package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateAssignmentDTO {

    private int batchId;
    private int courseId;
    private int subjectId;
    private int assignmentId;
    private Date submissionDate;
    private List<Integer> studentIds;
}
