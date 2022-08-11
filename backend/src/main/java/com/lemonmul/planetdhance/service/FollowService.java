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

    /**
     * 팔로우 추가
     *
     * 파라미터
     *      fromId: 팔로우하는 사용자 아이디
     *      toId: 팔로우 당하는 사용자 아이디
     *
     * 반환값
     *      TODO: 성공 시 반환값 "Success"? true?
     *      팔로우 성공: "Success"? true?
     *      TODO: 예외 처리
     *      from 유저 조회 실패: "From User Not Found" 예외 발생
     *      To 유저 조회 실패: "To User Not Found" 예외 발생
     *      TODO: 예외 메세지 고민해보기
     *      이미 팔로우 중: "Already Following" 예외 발생
     */
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

    /**
     * 팔로우 해제
     *
     * 파라미터
     *      fromId: 팔로우하는 사용자 아이디
     *      toId: 팔로우 당하는 사용자 아이디
     *
     * 반환값
     *      TODO: 성공 시 반환값 "Success"? true?
     *      팔로우 해제 성공: "Success"? true?
     *      TODO: 예외 처리
     *      from 유저 조회 실패: "From User Not Found" 예외 발생
     *      To 유저 조회 실패: "To User Not Found" 예외 발생
     *      TODO: 예외 메세지 고민해보기
     *      팔로우 관계 X: "Already Not Following" 예외 발생
     */
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

    /**
     * 해당 사용자가 팔로우 한 사람 수
     *
     * 파라미터
     *      fromId: 팔로우하는 사용자 아이디
     *
     * 반환값
     *      TODO: List를 반환할지 List의 size를 반환할지 고민하기
     *      팔로우 리스트 조회 성공: List? List의 size?
     *      TODO: 예외 처리
     *      유저 조회 실패: "User Not Found" 예외 발생
     */
    public List<Follow> countTo(Long fromId) {
        User fromUser = userRepo.findById(fromId).orElse(null);

        if(fromUser == null)
            return new ArrayList<>();

        return followRepo.findAllByFrom(fromUser);
    }

    /**
     * 해당 사용자를 팔로우 한 사람 수
     *
     * 파라미터
     *      toId: 팔로우하는 사용자 아이디
     *
     * 반환값
     *      TODO: List를 반환할지 List의 size를 반환할지 고민하기
     *      팔로우 리스트 조회 성공: List? List의 size?
     *      TODO: 예외 처리
     *      유저 조회 실패: "User Not Found" 예외 발생
     */
    public List<Follow> countFrom(Long toId) {
        User toUser = userRepo.findById(toId).orElse(null);

        if(toUser == null)
            return new ArrayList<>();

        return followRepo.findAllByTo(toUser);
    }
}
