package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FollowApi {

    private final FollowService followService;

    @PostMapping("/follow/{fromId}/{toId}")
    public boolean follow(@PathVariable Long fromId, @PathVariable Long toId) {
        return followService.follow(fromId, toId);
    }

    @DeleteMapping("/unfollow/{fromId}/{toId}")
    public boolean unfollow(@PathVariable Long fromId, @PathVariable Long toId) {
        return followService.unfollow(fromId, toId);
    }

    @GetMapping("/follow/count/to/{fromId}")
    public int countTo(@PathVariable Long fromId) {
        return followService.countTo(fromId).size();
    }

    @GetMapping("/follow/count/from/{toId}")
    public int countFrom(@PathVariable Long toId) {
        return followService.countFrom(toId).size();
    }
}
