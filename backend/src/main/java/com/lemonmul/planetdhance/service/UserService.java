package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.User;
import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    public boolean signUp(User user) {
        if(userRepo.findByEmail(user.getEmail()).orElse(null) == null){
            userRepo.save(user);
            return true;
        }else{
            return false;
        }
    }
}
