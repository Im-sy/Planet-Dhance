package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FollowApi {

    private final FollowService followService;

    /**
     * 팔로우 추가 - from 유저가 to 유저를 팔로우
     *
     * 요청 파라미터 예시: /follow/{팔로우하는 유저 아이디}/{팔로우 당하는 유저 아이디}
     */
    @PostMapping("/follow/{fromId}/{toId}")
    public boolean follow(@PathVariable Long fromId, @PathVariable Long toId) {
        return followService.follow(fromId, toId);
    }

    /**
     * 팔로우 해제 - from 유저가 to 유저를 팔로우 해제
     *
     * 요청 파라미터 예시: /unfollow/{팔로우 해제하는 유저 아이디}/{팔로우 해제 당하는 유저 아이디}
     */
    @DeleteMapping("/unfollow/{fromId}/{toId}")
    public boolean unfollow(@PathVariable Long fromId, @PathVariable Long toId) {
        return followService.unfollow(fromId, toId);
    }

    /**
     * 해당 유저가 팔로우 한 사람의 수
     *
     * 요청 파라미터 예시: /follow/count/to/{유저 아이디}
     */
    @GetMapping("/follow/count/to/{fromId}")
    public int countTo(@PathVariable Long fromId) {
        return followService.countTo(fromId).size();
    }

    /**
     * 해당 유저를 팔로우 한 사람의 수
     *
     * 요청 파라미터 예시: /follow/count/from/{유저 아이디}
     */
    @GetMapping("/follow/count/from/{toId}")
    public int countFrom(@PathVariable Long toId) {
        return followService.countFrom(toId).size();
    }
}
