package com.example.LmsBackend.Repository;

import com.example.LmsBackend.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface CourseRepo extends JpaRepository<Course,Integer> {

    List<Course> findAllByActiveStateEquals(boolean b);
}
