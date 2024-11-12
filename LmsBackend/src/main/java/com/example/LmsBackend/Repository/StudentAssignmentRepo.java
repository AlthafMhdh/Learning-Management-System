package com.example.LmsBackend.Repository;

import com.example.LmsBackend.Entity.StudentAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface StudentAssignmentRepo extends JpaRepository<StudentAssignment,Integer> {
}
