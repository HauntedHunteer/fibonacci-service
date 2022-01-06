package com.niemczuk.fibserver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FibElementRepository extends JpaRepository<FibElement, Long> {

    Boolean existsByValue(String value);
}
