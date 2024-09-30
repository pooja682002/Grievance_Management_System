package com.example.grievance_management.Service.impl;

import com.example.grievance_management.entity.Grievance;
import com.example.grievance_management.repository.GrievanceRepository;
import com.example.grievance_management.Service.GrievanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrievanceServiceImpl extends GrievanceService {
    private static final Logger logger = LoggerFactory.getLogger(GrievanceServiceImpl.class);

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Override
    public Grievance createGrievance(Grievance grievance) {
        if (grievance == null) {
            logger.error("Attempted to create a grievance, but the grievance object is null.");
            throw new IllegalArgumentException("Grievance must not be null.");
        }
        return grievanceRepository.save(grievance);
    }

    @Override
    public Grievance getGrievanceById(Long id) {
        return grievanceRepository.findById(id).orElse(null);
    }

    @Override
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    @Override
    public Grievance updateGrievance(Long id, Grievance updatedGrievance) {
        if (updatedGrievance == null) {
            logger.error("Attempted to update grievance, but the updated grievance object is null.");
            throw new IllegalArgumentException("Updated grievance must not be null.");
        }

        Optional<Grievance> existingGrievanceOpt = grievanceRepository.findById(id);
        if (existingGrievanceOpt.isPresent()) {
            Grievance existingGrievance = existingGrievanceOpt.get();
            logger.info("Updating grievance with ID: {}", id);

            if (updatedGrievance.getCategory() != null) {
                existingGrievance.setCategory(updatedGrievance.getCategory());
            }
            if (updatedGrievance.getDescription() != null) {
                existingGrievance.setDescription(updatedGrievance.getDescription());
            }
            if (updatedGrievance.getStatus() != null) {
                existingGrievance.setStatus(updatedGrievance.getStatus());
            }

            Grievance savedGrievance = grievanceRepository.save(existingGrievance);
            logger.info("Grievance with ID: {} has been updated successfully.", id);
            return savedGrievance;
        } else {
            logger.error("Grievance with ID: {} not found. Update operation aborted.", id);
            throw new IllegalArgumentException("Grievance with ID " + id + " not found.");
        }
    }

    @Override
    public void deleteGrievance(Long id) {
        if (grievanceRepository.existsById(id)) {
            grievanceRepository.deleteById(id);
            logger.info("Grievance with ID: {} has been deleted successfully.", id);
        } else {
            logger.error("Grievance with ID: {} not found. Delete operation aborted.", id);
            throw new IllegalArgumentException("Grievance with ID " + id + " not found.");
        }
    }
}

