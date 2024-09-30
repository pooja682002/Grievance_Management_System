
package com.example.grievance_management.controller;

import com.example.grievance_management.entity.Assignment;
import com.example.grievance_management.entity.Grievance;
import com.example.grievance_management.entity.User;
import com.example.grievance_management.Service.AssignmentService;
import com.example.grievance_management.Service.GrievanceService;
import com.example.grievance_management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private GrievanceService grievanceService;

    @Autowired
    private UserService userService;

    // Create a new assignment
    @PostMapping
    public ResponseEntity<?> createAssignment(@RequestBody Assignment assignment) {
        try {
            Grievance grievance = grievanceService.getGrievanceById(assignment.getGrievance().getId());
            User assignee = userService.getUserById(assignment.getAssignee().getId());

            if (grievance == null || assignee == null) {
                return ResponseEntity.badRequest().body("Invalid Grievance ID or Assignee ID");
            }

            assignment.setGrievance(grievance);
            assignment.setAssignee(assignee);
            Assignment createdAssignment = assignmentService.createAssignment(assignment);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdAssignment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating assignment");
        }
    }


    // Get assignment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAssignmentById(@PathVariable Long id) {
        Assignment assignment = assignmentService.getAssignmentById(id);
        if (assignment != null) {
            return ResponseEntity.ok(assignment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assignment not found");
        }
    }

    // Get all assignments
    @GetMapping
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return ResponseEntity.ok(assignments);
    }

    // Update assignment by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long id, @RequestBody Assignment assignment) {
        try {
            Grievance grievance = grievanceService.getGrievanceById(assignment.getGrievance().getId());
            User assignee = userService.getUserById(assignment.getAssignee().getId());

            if (grievance == null || assignee == null) {
                return ResponseEntity.badRequest().body("Invalid Grievance ID or Assignee ID");
            }

            assignment.setGrievance(grievance);
            assignment.setAssignee(assignee);
            Assignment updatedAssignment = assignmentService.updateAssignment(id, assignment);

            if (updatedAssignment != null) {
                return ResponseEntity.ok(updatedAssignment);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assignment not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating assignment");
        }
    }

    // Delete assignment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAssignment(@PathVariable Long id) {
        try {
            assignmentService.deleteAssignment(id);
            return ResponseEntity.ok("Assignment deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting assignment");
        }
    }
}
