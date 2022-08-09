package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.user.*;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenJson;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import com.lemonmul.planetdhance.service.NationService;
import com.lemonmul.planetdhance.service.ValidateService;
import com.lemonmul.planetdhance.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserApi {

    private final UserService userService;
    private final NationService nationService;
    private final ValidateService validateService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public boolean signup(@RequestPart MultipartFile inputFile, @RequestPart CreateSignUpRequest createSignUpRequest) throws IOException {
        return userService.signUp(inputFile, toUserForSignUp(createSignUpRequest));
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
    public CreateProfileResponse profile(@PathVariable Long id) throws IOException {
        User findUser = userService.findById(id);
        File img = new File(findUser.getImgUrl());

        return new CreateProfileResponse(findUser, img);
    }

    @PutMapping("/update/{id}")
    public boolean update(@PathVariable Long id, @RequestPart MultipartFile inputFile, @RequestPart CreateUpdateRequest createUpdateRequest) throws IOException {
        return userService.update(id, inputFile, createUpdateRequest);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Long id) {
        return userService.delete(id);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class CreateSignUpRequest {
        private String email;
        private String nickname;
        private String introduce;
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

    @Data
    static class CreateProfileResponse {
        private String email;
        private String nickname;
        private byte[] img;
        private String nationName;

        public CreateProfileResponse(User user, File img) throws IOException {
            this.email = user.getEmail();
            this.nickname = user.getNickname();
            this.img = Files.readAllBytes(img.toPath());
            this.nationName = user.getNation().getName();
        }
    }

    private User toUserForSignUp(CreateSignUpRequest createSignUpRequest) {
        System.out.println("createSignUpRequest = " + createSignUpRequest.nationName);
        String email = createSignUpRequest.email;
        String nickname = createSignUpRequest.nickname;
        String introduce = createSignUpRequest.introduce;
        Nation nation = nationService.findByName(createSignUpRequest.nationName);
        Role role = Role.USER;

        if(createSignUpRequest.type.equals("Social")){
            String oAuth2Sub = createSignUpRequest.oAuth2Sub;
            return Social.createSocial(email, nickname, introduce, null, nation, role, oAuth2Sub);
        }else {
            String pwd = createSignUpRequest.pwd;
            return Basic.createBasic(email, nickname, introduce, null, nation, role, pwd);
        }
    }
}
