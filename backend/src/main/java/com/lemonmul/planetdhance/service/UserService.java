package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Tag;
import com.lemonmul.planetdhance.entity.TagType;
import com.lemonmul.planetdhance.entity.User;
import com.lemonmul.planetdhance.repo.TagRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final TagRepo tagRepo;

    public boolean signUp(User user) {
        if(userRepo.findByEmail(user.getEmail()).orElse(null) != null
        || userRepo.findByNickname(user.getNickname()).orElse(null) != null){
            return false;
        }else{
            userRepo.save(user);

            //Tag 테이블에 nickname 추가
            tagRepo.save(Tag.createTag(user.getNickname(), TagType.NICKNAME, ""));
            return true;
        }
    }
}
