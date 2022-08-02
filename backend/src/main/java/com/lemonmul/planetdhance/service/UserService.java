package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;


}
