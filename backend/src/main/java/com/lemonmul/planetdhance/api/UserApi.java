package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.GridResponse;
import com.lemonmul.planetdhance.dto.UserSearchResponse;
import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.Validate;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.*;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
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

    private final static int videoSize=18;

    /**
     * 회원가입
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/signup
     *
     * - body (json)
     *      {
     *          "email": "{이메일}",
     *          "nickname": "{닉네임}",
     *          "introduce": "{자기소개글}",
     *          "nationName": "{언어 코드}",
     *          "pwd": "{비밀번호}",
     *          "oAuth2Sub": "{oAuth2 고유키}",
     *          "type": "{Basic 또는 Social}"
     *      }
     *
     * - 참고사항
     *      pwd와 oAuth2Sub는 type에 따라 둘 중에서 하나만 채우면 됨
     *      (Basic일 때는 pwd, Social일 때는 oAuth2Sub)
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody CreateSignUpRequest createSignUpRequest) {

        try {
            boolean result = userService.signUp(toUserForSignUp(createSignUpRequest));
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 이메일 중복 체크
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/check/email
     *
     * - body (json)
     *      {
     *          "email": "{이메일}"
     *      }
     */
    @PostMapping("/check/email")
    public ResponseEntity<?> emailCheck(@RequestBody Map<String, String> param) {
        try {
            return new ResponseEntity<>(userService.emailCheck(param.get("email")), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 닉네임 중복 체크
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/check/nickname
     *
     * - body (json)
     *      {
     *          "nickname": "{닉네임}"
     *      }
     */
    @PostMapping("/check/nickname")
    public ResponseEntity<?> nicknameCheck(@RequestBody Map<String, String> param) {
        try {
            return new ResponseEntity<>(userService.nicknameCheck(param.get("nickname")), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 로그인
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/login
     *
     * - body (json)
     *      {
     *          "email": "{이메일}",
     *          "pwd": "{비밀번호}"
     *      }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CreateLoginRequest createLoginRequest) {
        try {
            User findUser = userService.login(createLoginRequest.email, createLoginRequest.pwd);

            CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
            JwtToken jwtToken = customUserDetails.toJwtToken();
            String tokenString = jwtTokenProvider.createToken(jwtToken.getUserId(), jwtToken);
            Validate validate = new Validate(findUser, tokenString);

            validateService.login(validate);

            return new ResponseEntity<>(new JwtTokenJson("Success", tokenString), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 로그아웃
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/logout/{사용자 아이디}
     *
     * - body
     *      없음
     */
    @DeleteMapping("/logout/{userId}")
    public ResponseEntity<?> logout(@PathVariable Long userId) {
        try {
            return new ResponseEntity<>(validateService.logout(userId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 사용자 정보 조회
     *
     * 요청 파라미터 예시: /user/profile/{사용자 아이디}
     */
    @GetMapping("/profile/{user_id}")
    public UserSearchResponse profile(@PathVariable Long user_id) throws Exception{
        int page=0;
        User user = userService.findById(user_id);
        List<Clear> clearList = user.getClears();
        Slice<Video> videoList=videoService.findAllNewestVideoListByUser(page,videoSize,user);
        return new UserSearchResponse(user,clearList,videoList);
    }

    /**
     * 사용자 정보 수정
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/update/{사용자 아이디}
     *
     * - body (form-data)
     *      - inputFile (?)
     *          value: 프로필 사진
     *
     *      - createUpdateRequest (json)
     *          value: {
     *                      "email": "1217jdk@gmail.com",
     *                      "introduce": "asdf",
     *                      "nationName": "ko"
     *                  }
     */
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

    /**
     * 사용자 정보 수정
     *
     * 요청 파라미터 예시:
     * - url
     *      /user/delete/{사용자 아이디}
     *
     * - body
     *      없음
     */
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
    public GridResponse likeVideos(@PathVariable Long user_id, @PathVariable int page) throws Exception {
        int size=18;
        User user = userService.findById(user_id);
        Slice<Video> videoList = videoService.findLikeVideoList(page, size, user.getLikes());
        return new GridResponse("like",videoList);
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

            // TODO: imgUrl이 null일 때의 반환값 처리 통합?
            if(this.imgUrl == null)
                imgUrl = "/resource/user/img/default/default_profile.png";
        }
    }

    private User toUserForSignUp(CreateSignUpRequest createSignUpRequest) {
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
        private String prevPage="user";
        private List<VideoDto> videoList;

        public UserFollowDto(User user) {
            id=user.getId();
            nickname=user.getNickname();
            introduce=user.getIntroduce();
            imgUrl=user.getImgUrl();
            nation=user.getNation().getFlag();

            if(imgUrl == null)
                //TODO 프로필 이미지 경로 수정
                imgUrl = "/resource/user/img/default/default_profile.png";

            //최신 영상 5개만
            videoList=user.getVideos().stream().sorted(Comparator.comparing(Video::getRegDate).reversed())
                    .limit(5).map(VideoDto::new).collect(Collectors.toList());
        }
    }
}
