package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.FollowRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FollowService {

    private final FollowRepo followRepo;
    private final UserRepo userRepo;

    /**
     * 팔로우 추가
     *
     * 파라미터
     *      fromId: 팔로우하는 사용자 아이디
     *      toId: 팔로우 당하는 사용자 아이디
     *
     * 반환값
     *      팔로우 성공: true
     *      from 유저 조회 실패: "From User Not Found" 예외 발생
     *      To 유저 조회 실패: "To User Not Found" 예외 발생
     *      이미 팔로우 중: "Already Following" 예외 발생
     */
    @Transactional
    public boolean follow(Long fromId, Long toId) throws Exception {
        User fromUser = userRepo.findById(fromId).orElseThrow(() -> new Exception("From User Not Found"));
        User toUser = userRepo.findById(toId).orElseThrow(() -> new Exception("To User Not Found"));

        if(followRepo.findByFromAndTo(fromUser, toUser).isPresent())
            throw new Exception("Already Following");

        Follow follow = Follow.createFollow(fromUser, toUser);
        followRepo.save(follow);

        return true;
    }

    /**
     * 팔로우 해제
     *
     * 파라미터
     *      fromId: 팔로우하는 사용자 아이디
     *      toId: 팔로우 당하는 사용자 아이디
     *
     * 반환값
     *      팔로우 해제 성공: true
     *      from 유저 조회 실패: "From User Not Found" 예외 발생
     *      To 유저 조회 실패: "To User Not Found" 예외 발생
     *      팔로우 관계 X: "Not Following" 예외 발생
     */
    @Transactional
    public boolean unfollow(Long fromId, Long toId) throws Exception {
        User fromUser = userRepo.findById(fromId).orElseThrow(() -> new Exception("From User Not Found"));
        User toUser = userRepo.findById(toId).orElseThrow(() -> new Exception("To User Not Found"));

        Optional<Follow> findFollow = followRepo.findByFromAndTo(fromUser, toUser);

        if(findFollow.isEmpty())
            throw new Exception("Not Following");

        followRepo.delete(findFollow.get());

        return true;
    }

    /**
     * 해당 사용자가 팔로우 한 사람 수
     *
     * 파라미터
     *      fromId: 팔로우하는 사용자 아이디
     *
     * 반환값
     *      팔로우 리스트 조회 성공: List? List의 size?
     *      유저 조회 실패: "User Not Found" 예외 발생
     */
    public List<Follow> countTo(Long fromId) throws Exception {
        User fromUser = userRepo.findById(fromId).orElseThrow(() -> new Exception("User Not Found"));

        return followRepo.findAllByFrom(fromUser);
    }

    /**
     * 해당 사용자를 팔로우 한 사람 수
     *
     * 파라미터
     *      toId: 팔로우하는 사용자 아이디
     *
     * 반환값
     *      팔로우 리스트 조회 성공: List? List의 size?
     *      유저 조회 실패: "User Not Found" 예외 발생
     */
    public List<Follow> countFrom(Long toId) throws Exception {
        User toUser = userRepo.findById(toId).orElseThrow(() -> new Exception("User Not Found"));

        return followRepo.findAllByTo(toUser);
    }

    /**
     * 팔로우 여부
     */
    public boolean isFollow(Long fromId, Long toId) throws Exception {
        User fromUser = userRepo.findById(fromId).orElseThrow(() -> new Exception("From User Not Found"));
        User toUser = userRepo.findById(toId).orElseThrow(() -> new Exception("To User Not Found"));

        Optional<Follow> findFollow = followRepo.findByFromAndTo(fromUser, toUser);

        return findFollow.isPresent();
    }
}
