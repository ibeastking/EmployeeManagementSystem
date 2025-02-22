package com.ems.backend.controller;

import com.ems.backend.modal.Employee;
import com.ems.backend.service.EMSService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@Slf4j
@RequestMapping("/ems")
public class EMSController {

    @Autowired
    private EMSService emsService;

    //* Create Employee
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        try {
            emsService.addEmployee(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body("Employee added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add employee.");
        }
    }

    //* Read All Employees
    @GetMapping(value = "/read")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = emsService.getAllEmployees();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    //* Read Employee
    @GetMapping(value = "/read/{employeeId}")
    public ResponseEntity<String> readEmployee(@PathVariable int employeeId) {
        try {
            Employee employee = emsService.readEmployee(employeeId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Employee read successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving employee details.");
        }
    }

    //* Update Employee
    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateEmployee(@RequestBody Employee employee) {
        try {
            emsService.updateEmployee(employee);
            return ResponseEntity.ok("Employee updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update employee.");
        }
    }

    //* Delete Employee
    @DeleteMapping(value = "/delete/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int employeeId) {
        try {
            emsService.deleteEmployee(employeeId);
            return ResponseEntity.ok("Employee deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete employee.");
        }
    }
}