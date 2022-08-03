package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.repo.ClearRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClearService {

    private final ClearRepo clearRepo;


}
