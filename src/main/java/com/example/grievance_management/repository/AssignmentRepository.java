package com.example.grievance_management.repository;

import com.example.grievance_management.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    // Custom query methods if needed
}


