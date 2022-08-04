package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.user.Role;
import com.lemonmul.planetdhance.entity.user.Social;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenJson;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import com.lemonmul.planetdhance.service.NationService;
import com.lemonmul.planetdhance.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserApi {

    private final UserService userService;
    private final NationService nationService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public boolean signup(@RequestBody SignUpDto signUpDto) {
        return userService.signUp(toUser(signUpDto));
    }

    @PostMapping("/login")
    public JwtTokenJson login(@RequestBody LoginDto loginDto) {
        Basic findUser = (Basic)(userService.login(loginDto.email));

        if(findUser != null){
            if(findUser.getPwd().equals(loginDto.pwd)){
                JwtToken jwtToken = new JwtToken(findUser);

                return new JwtTokenJson("loginSuccess", jwtTokenProvider.createToken(jwtToken.getEmail(), jwtToken));
            }
        }

        return null;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class SignUpDto {
        private String email;
        private String nickname;
        private String introduce;
        private String imgUrl;
        private String nationName;
        private String pwd;
        private String oAuth2Sub;
        private String type;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class LoginDto {
        private String email;
        private String pwd;
    }

    private User toUser(SignUpDto signUpDto){
        String email = signUpDto.email;
        String nickname = signUpDto.nickname;
        String introduce = signUpDto.introduce;
        String imgUrl = signUpDto.imgUrl;
        Nation nation = nationService.findByName(signUpDto.nationName);
        Role role = Role.USER;

        if(signUpDto.type.equals("social")){
            String oAuth2Sub = signUpDto.oAuth2Sub;
            return Social.createSocial(email, nickname, introduce, imgUrl, nation, role, oAuth2Sub);
        }else {
            String pwd = signUpDto.pwd;
            return Basic.createBasic(email, nickname, introduce, imgUrl, nation, role, pwd);
        }
    }
}
