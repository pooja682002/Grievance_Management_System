/* package com.example.grievance_management.Service.impl;



import com.example.grievance_management.entity.Assignment;
import com.example.grievance_management.repository.AssignmentRepository;
import com.example.grievance_management.Service.AssignmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private static final Logger logger = LoggerFactory.getLogger(AssignmentServiceImpl.class);

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @Override
    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {
        if (updatedAssignment == null) {
            logger.error("Attempted to update assignment, but the updated assignment object is null.");
            throw new IllegalArgumentException("Updated assignment must not be null.");
        }

        Optional<Assignment> existingAssignmentOpt = assignmentRepository.findById(id);
        if (existingAssignmentOpt.isPresent()) {
            Assignment existingAssignment = existingAssignmentOpt.get();

            logger.info("Updating assignment with ID: {}", id);

            if (updatedAssignment.getGrievance() != null) {
                existingAssignment.setGrievance(updatedAssignment.getGrievance());
            }
            if (updatedAssignment.getAssignee() != null) {
                existingAssignment.setAssignee(updatedAssignment.getAssignee());
            }
            if (updatedAssignment.getUpdatedAt() != null) {
                existingAssignment.setUpdatedAt(updatedAssignment.getUpdatedAt());
            }

            Assignment savedAssignment = assignmentRepository.save(existingAssignment);
            logger.info("Assignment with ID: {} has been updated successfully.", id);
            return savedAssignment;
        } else {
            logger.error("Assignment with ID: {} not found. Update operation aborted.", id);
            throw new IllegalArgumentException("Assignment with ID " + id + " not found.");
        }
    }

    @Override
    public void deleteAssignment(Long id) {
        if (assignmentRepository.existsById(id)) {
            assignmentRepository.deleteById(id);
            logger.info("Assignment with ID: {} has been deleted successfully.", id);
        } else {
            logger.error("Assignment with ID: {} not found. Delete operation aborted.", id);
            throw new IllegalArgumentException("Assignment with ID " + id + " not found.");
        }
    }
}
*/
package com.example.grievance_management.Service.impl;

import com.example.grievance_management.entity.Assignment;
import com.example.grievance_management.repository.AssignmentRepository;
import com.example.grievance_management.Service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @Override
    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {
        Optional<Assignment> existingAssignmentOpt = assignmentRepository.findById(id);
        if (existingAssignmentOpt.isPresent()) {
            Assignment existingAssignment = existingAssignmentOpt.get();

            if (updatedAssignment.getGrievance() != null) {
                existingAssignment.setGrievance(updatedAssignment.getGrievance());
            }
            if (updatedAssignment.getAssignee() != null) {
                existingAssignment.setAssignee(updatedAssignment.getAssignee());
            }
            existingAssignment.setUpdatedAt(updatedAssignment.getUpdatedAt());

            return assignmentRepository.save(existingAssignment);
        } else {
            throw new IllegalArgumentException("Assignment with ID " + id + " not found.");
        }
    }

    @Override
    public void deleteAssignment(Long id) {
        if (assignmentRepository.existsById(id)) {
            assignmentRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Assignment with ID " + id + " not found.");
        }
    }
}

