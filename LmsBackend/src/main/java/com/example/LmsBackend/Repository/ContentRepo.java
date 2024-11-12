package com.example.LmsBackend.Repository;

import com.example.LmsBackend.Entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ContentRepo extends JpaRepository<Content,Integer> {

}
