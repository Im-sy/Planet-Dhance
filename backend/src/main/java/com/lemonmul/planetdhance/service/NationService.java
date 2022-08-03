package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.repo.NationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NationService {

    private final NationRepo nationRepo;

    public Nation findByName(String nationName){
        return nationRepo.findByName(nationName).get();
    }
}
