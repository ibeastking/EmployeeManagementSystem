package com.ems.backend.service;

import com.ems.backend.modal.Employee;
import com.ems.backend.repository.EMSRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class EMSService {

    @Autowired
    public EMSRepository emsRepository;

    public void addEmployee(Employee employee) {
        emsRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return emsRepository.findAll();
    }

    public Employee readEmployee(int employeeId) {
        Employee employee = emsRepository.getReferenceById(employeeId);
        System.out.println(employee.getEmployeeId());
        System.out.println(employee.getEmployeeName());
        System.out.println(employee.getEmployeeEmail());
        System.out.println(employee.getEmployeeDepartment());
        System.out.println(employee.getEmployeePosition());
        return employee;
    }

    public void updateEmployee(Employee employee) {
        Employee originalEmployee = emsRepository.getReferenceById(employee.getEmployeeId());
        originalEmployee.setEmployeeName(employee.getEmployeeName());
        originalEmployee.setEmployeeEmail(employee.getEmployeeEmail());
        originalEmployee.setEmployeeDepartment(employee.getEmployeeDepartment());
        originalEmployee.setEmployeePosition(employee.getEmployeePosition());
        emsRepository.save(employee);
    }

    public void deleteEmployee(int employeeId) {
        emsRepository.deleteById(employeeId);
    }


}
