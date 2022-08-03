package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.User;
import com.lemonmul.planetdhance.service.NationService;
import com.lemonmul.planetdhance.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserApi {

    private final UserService userService;
    private final NationService nationService;

    @PostMapping
    public boolean signup(@RequestBody SignUpDto signUpDto) {
        return userService.signUp(toUser(signUpDto));
    }

    @Data
    @AllArgsConstructor
    static class SignUpDto {
        private String nickname;
        private String email;
        private String pwd;
        private String introduce;
        private String imgUrl;
        private String nationName;
        private String oAuth2Sub;
        private String type;
    }

    private User toUser(SignUpDto signUpDto){
        Nation nation = nationService.findByName(signUpDto.nationName);
        if(signUpDto.type == "social"){

        }else {

        }
    }
}
