package com.ems.backend.repository;

import com.ems.backend.modal.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EMSRepository extends JpaRepository<Employee, Integer> {
}
