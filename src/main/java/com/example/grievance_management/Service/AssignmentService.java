package com.example.grievance_management.Service;

import com.example.grievance_management.entity.Assignment;
import com.example.grievance_management.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

public interface AssignmentService {
    Assignment createAssignment(Assignment assignment);
    Assignment getAssignmentById(Long id);
    List<Assignment> getAllAssignments();
    Assignment updateAssignment(Long id, Assignment assignment);
    void deleteAssignment(Long id);
}






