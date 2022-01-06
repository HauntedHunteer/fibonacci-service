package com.niemczuk.fibserver;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FibElementService {

    private final FibElementRepository fibElementRepository;

    public void saveFibElementIfNotExists(FibPairDto fibPairDto) {
        if (!fibElementRepository.existsByValue(fibPairDto.getFibIndex())) {
            fibElementRepository.save(new FibElement(fibPairDto.getFibIndex()));
        }
    }

    public List<FibElement> getAllFibElements() {
        return fibElementRepository.findAll();
    }
}
