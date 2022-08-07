package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.FollowRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepo followRepo;
    private final UserRepo userRepo;


    public boolean follow(Long fromId, Long toId) {
        User fromUser = userRepo.findById(fromId).orElse(null);
        User toUser = userRepo.findById(toId).orElse(null);

        if(fromUser == null || toUser == null)
            return false;

        if(followRepo.findByFromAndTo(fromUser, toUser).orElse(null) != null)
            return false;

        Follow follow = Follow.createFollow(fromUser, toUser);
        followRepo.save(follow);

        return true;
    }

    public boolean unfollow(Long fromId, Long toId) {
        User fromUser = userRepo.findById(fromId).orElse(null);
        User toUser = userRepo.findById(toId).orElse(null);

        if(fromUser == null || toUser == null)
            return false;

        Follow findFollow = followRepo.findByFromAndTo(fromUser, toUser).orElse(null);

        if(findFollow == null)
            return false;

        followRepo.delete(findFollow);

        return true;
    }

    public List<Follow> countTo(Long fromId) {
        User fromUser = userRepo.findById(fromId).orElse(null);

        if(fromUser == null)
            return new ArrayList<>();

        return followRepo.findAllByFrom(fromUser);
    }

    public List<Follow> countFrom(Long toId) {
        User toUser = userRepo.findById(toId).orElse(null);

        if(toUser == null)
            return new ArrayList<>();

        return followRepo.findAllByTo(toUser);
    }
}
