package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.Validate;
import com.lemonmul.planetdhance.entity.user.*;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenJson;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import com.lemonmul.planetdhance.service.NationService;
import com.lemonmul.planetdhance.service.UserService;
import com.lemonmul.planetdhance.service.ValidateService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
public class UserApi {

    private final UserService userService;
    private final NationService nationService;
    private final ValidateService validateService;
    private final JwtTokenProvider jwtTokenProvider;
    private final VideoService videoService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody CreateSignUpRequest createSignUpRequest) {

        try {
            boolean result = userService.signUp(toUserForSignUp(createSignUpRequest));
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/check/email")
    public boolean emailCheck(@RequestBody Map<String, String> param) {
        return userService.emailCheck(param.get("email"));
    }

    @PostMapping("/check/nickname")
    public boolean nicknameCheck(@RequestBody String nickname) {
        return userService.nicknameCheck(nickname);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreateLoginRequest createLoginRequest) {
        try {
            User findUser = userService.login(createLoginRequest.email, createLoginRequest.pwd);

            if(findUser != null){
                CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
                JwtToken jwtToken = customUserDetails.toJwtToken();
                String tokenString = jwtTokenProvider.createToken(jwtToken.getUserId(), jwtToken);
                Validate validate = new Validate(jwtToken.getUserId(), tokenString);

                if(validateService.login(validate))
                    return new ResponseEntity<>(new JwtTokenJson("Success", tokenString), HttpStatus.OK);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;
    }

    @DeleteMapping("/logout/{userId}")
    public boolean logout(@PathVariable Long userId) {
        return validateService.logout(userId);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> profile(@PathVariable Long id) {
        try {
            User findUser = userService.findById(id);
            return new ResponseEntity<>(new CreateProfileResponse(findUser), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestPart MultipartFile inputFile, @RequestPart CreateUpdateRequest createUpdateRequest) {
        try {
            userService.update(id, inputFile, createUpdateRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(userService.delete(id), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 사용자의 구독 유저 리스트(최신 업로드순) - 구독 팔로우 페이지 진입(0), 무한 스크롤(1~)
     *
     * 요청 파라미터 예시: /user/{로그인 사용자 아이디}/follow/{page 번호}
     * size는 10개
     */
    @GetMapping("/{user_id}/follow/{page}")
    public Slice<UserFollowDto> followInfoList(@PathVariable Long user_id, @PathVariable int page) throws Exception {
        int size=10;
        User user=userService.findById(user_id);
        return userService.findFollowingUserInfo(page,size,user.getTos()).map(UserFollowDto::new);
    }

    /**
     * 사용자의 좋아요 영상 리스트(최신순) - 구독 좋아요 페이지 진입(0), 무한 스크롤(1~)
     *
     * 요청 파라미터 예시: /user/{로그인 사용자 아이디}/like/{page 번호}
     * size는 기본값 18
     */
    @GetMapping("/{user_id}/like/{page}")
    public Slice<VideoDto> likeVideos(@PathVariable Long user_id,@PathVariable int page) throws Exception {
        int size=18;
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
        private String imgUrl;
        private String nationName;

        public CreateProfileResponse(User user) {
            this.email = user.getEmail();
            this.nickname = user.getNickname();
            this.imgUrl = user.getImgUrl();
            this.nationName = user.getNation().getName();

            if(this.imgUrl == null)
                imgUrl = "/images/default/default_profile.png";
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

    @Data
    static class UserFollowDto {
        private Long id;
        private String nickname;
        private String introduce;
        private String imgUrl;
        private String nation;
        private List<VideoDto> videoList;

        public UserFollowDto(User user) {
            id=user.getId();
            nickname=user.getNickname();
            introduce=user.getIntroduce();
            imgUrl=user.getImgUrl();
            nation=user.getNation().getFlag();

            if(imgUrl == null)
                imgUrl = "/images/default/default_profile.png";

            //최신 영상 5개만
            videoList=user.getVideos().stream().sorted(Comparator.comparing(Video::getRegDate).reversed())
                    .limit(5).map(VideoDto::new).collect(Collectors.toList());
        }
    }
}
