package com.example.grievance_management.controller;

import com.example.grievance_management.entity.Grievance;
import com.example.grievance_management.entity.User;
import com.example.grievance_management.Service.GrievanceService;
import com.example.grievance_management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    @Autowired
    private UserService userService;

    // Create a new grievance
    @PostMapping
    public ResponseEntity<?> createGrievance(@RequestBody Grievance grievance) {
        try {
            // Ensure the grievance is associated with a valid user
            User user = userService.getUserById(grievance.getUser().getId());
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            grievance.setUser(user); // Associate grievance with the user
            Grievance createdGrievance = grievanceService.createGrievance(grievance);
            return ResponseEntity.ok(createdGrievance);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating grievance");
        }
    }

    // Get grievance by ID
    @GetMapping("/{id}")
    public ResponseEntity<Grievance> getGrievanceById(@PathVariable Long id) {
        Grievance grievance = grievanceService.getGrievanceById(id);
        return grievance != null ? ResponseEntity.ok(grievance) : ResponseEntity.notFound().build();
    }

    // Get all grievances
   @GetMapping
    public ResponseEntity<List<Grievance>> getAllGrievances() {
        List<Grievance> grievances = grievanceService.getAllGrievances();

        // No need to set the username manually; it's derived from the user object
        return ResponseEntity.ok(grievances);
    }

    // Update grievance by ID
    @PutMapping("/{id}")
    public ResponseEntity<Grievance> updateGrievance(@PathVariable Long id, @RequestBody Grievance grievance) {
        Grievance updatedGrievance = grievanceService.updateGrievance(id, grievance);
        return updatedGrievance != null ? ResponseEntity.ok(updatedGrievance) : ResponseEntity.notFound().build();
    }

    // Delete grievance by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable Long id) {
        grievanceService.deleteGrievance(id);
        return ResponseEntity.noContent().build();
    }

    // New endpoint to assign a grievance to a department
    @PutMapping("/assign/{grievanceId}")
    public ResponseEntity<?> assignGrievanceToDepartment(@PathVariable Long grievanceId, @RequestBody Grievance grievanceDetails) {
        try {
            Grievance grievance = grievanceService.getGrievanceById(grievanceId);
            if (grievance == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Grievance not found");
            }

            // Update the grievance's assigned department and status
            grievance.setAssignedTo(grievanceDetails.getAssignedTo());
            grievance.setStatus(grievanceDetails.getStatus());

            // Save the updated grievance
            grievanceService.updateGrievance(grievanceId, grievance);

            return ResponseEntity.ok("Grievance assigned successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning grievance");
        }
    }
}


