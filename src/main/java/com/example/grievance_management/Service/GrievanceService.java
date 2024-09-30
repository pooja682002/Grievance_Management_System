package com.example.grievance_management.Service;

import com.example.grievance_management.entity.Grievance;
import com.example.grievance_management.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    public Grievance createGrievance(Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    public Grievance getGrievanceById(Long id) {
        return grievanceRepository.findById(id).orElse(null);
    }

    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    public Grievance updateGrievance(Long id, Grievance grievance) {
        if (grievanceRepository.existsById(id)) {
            grievance.setId(id);
            return grievanceRepository.save(grievance);
        }
        return null;
    }

    public void deleteGrievance(Long id) {
        grievanceRepository.deleteById(id);
    }
}

