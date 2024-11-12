package com.example.LmsBackend.Repository;

import com.example.LmsBackend.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface StudentRepo extends JpaRepository<Student,Integer> {

    List<Student> findAllByActiveStateEquals(boolean b);

    Student findByUserNameAndPasswordAndActiveStateEquals(String userName, String password, boolean b);

    Long countByActiveStateEquals(boolean b);
}
