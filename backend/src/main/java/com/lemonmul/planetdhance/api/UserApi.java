package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.user.*;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenJson;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import com.lemonmul.planetdhance.service.NationService;
import com.lemonmul.planetdhance.service.ValidateService;
import com.lemonmul.planetdhance.service.UserService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserApi {

    private final UserService userService;
    private final NationService nationService;
    private final ValidateService validateService;
    private final JwtTokenProvider jwtTokenProvider;
    private final VideoService videoService;

    private static final int size=18;

    @PostMapping("/signup")
    public boolean signup(@RequestBody CreateSignUpRequest createSignUpRequest) {
        return userService.signUp(toUserForSignUp(createSignUpRequest));
    }

    @PostMapping("/login")
    public JwtTokenJson login(@RequestBody CreateLoginRequest createLoginRequest) {
        User findUser = userService.login(createLoginRequest.email, createLoginRequest.pwd);

        if(findUser != null){
            CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
            JwtToken jwtToken = customUserDetails.toJwtToken();
            String tokenString = jwtTokenProvider.createToken(jwtToken.getEmail(), jwtToken);
            Validate validate = new Validate(jwtToken.getEmail(), tokenString);

            if(validateService.login(validate))
                return new JwtTokenJson("loginSuccess", tokenString);
        }

        return null;
    }

    @PostMapping("/logout/{id}")
    public boolean logout(@PathVariable Long id) {
        return validateService.logout(id);
    }

    @GetMapping("/profile/{id}")
    public User profile(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping("/update/{id}")
    public boolean update(@PathVariable Long id, @RequestBody CreateUpdateRequest createUpdateRequest) {
        return userService.update(id, createUpdateRequest);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Long id) {
        return userService.delete(id);
    }

    /**
     * 사용자의 좋아요 영상 리스트(최신순) - 구독 좋아요 페이지 진입(0), 무한 스크롤(1~)
     *
     * 요청 파라미터 예시: /user/{로그인 사용자 아이디}/like/{page 번호}
     * size는 기본값 18
     */
    @GetMapping("/{user_id}/like/{page}")
    public Slice<VideoDto> likeVideos(@PathVariable Long user_id,@PathVariable int page){
        User user = userService.findById(user_id);
        return videoService.findLikeVideoList(page,size, user.getLikes()).map(VideoDto::new);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class CreateSignUpRequest {
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
    static class CreateLoginRequest {
        private String email;
        private String pwd;
    }

    private User toUserForSignUp(CreateSignUpRequest createSignUpRequest){
        String email = createSignUpRequest.email;
        String nickname = createSignUpRequest.nickname;
        String introduce = createSignUpRequest.introduce;
        String imgUrl = createSignUpRequest.imgUrl;
        Nation nation = nationService.findByName(createSignUpRequest.nationName);
        Role role = Role.USER;

        if(createSignUpRequest.type.equals("Social")){
            String oAuth2Sub = createSignUpRequest.oAuth2Sub;
            return Social.createSocial(email, nickname, introduce, imgUrl, nation, role, oAuth2Sub);
        }else {
            String pwd = createSignUpRequest.pwd;
            return Basic.createBasic(email, nickname, introduce, imgUrl, nation, role, pwd);
        }
    }
}
