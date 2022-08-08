package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.Validate;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.user.CreateUpdateRequest;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.NationRepo;
import com.lemonmul.planetdhance.repo.TagRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenJson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepo userRepo;
    private final TagRepo tagRepo;
    private final NationRepo nationRepo;

    @Transactional
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

    public User login(String email, String pwd) {
        Basic findUser = (Basic)(userRepo.findByEmail(email)).orElse(null);

        if(findUser != null && findUser.getPwd().equals(pwd))
            return findUser;
        return null;
    }

    public User findById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    public User findByNickname(String nickname){
        return userRepo.findByNickname(nickname).orElse(null);
    }

    @Transactional
    public boolean update(Long id, CreateUpdateRequest createUpdateRequest) {
        User findUser = userRepo.findById(id).orElse(null);
        Nation findNation = nationRepo.findByName(createUpdateRequest.getNationName()).orElse(null);

        if(findUser != null && findNation != null)
            return false;

        findUser.setIntroduce(createUpdateRequest.getIntroduce());
        findUser.setImgUrl(createUpdateRequest.getImgUrl());
        findUser.setNation(findNation);
        userRepo.save(findUser);

        return true;
    }

    @Transactional
    public boolean delete(Long id) {
        User findUser = userRepo.findById(id).orElse(null);

        if(findUser == null)
            return false;

        userRepo.delete(findUser);

        return true;
    }
}
