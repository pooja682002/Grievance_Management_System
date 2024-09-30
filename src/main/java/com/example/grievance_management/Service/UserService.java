package com.example.grievance_management.Service;  // Ensure package name is lowercase
import com.example.grievance_management.controller.UserController;
import com.example.grievance_management.entity.User;
import com.example.grievance_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    void deleteUser(Long id);
    User getUserByUsername(String username);
}

