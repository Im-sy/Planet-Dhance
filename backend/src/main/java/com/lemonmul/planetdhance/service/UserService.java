package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.user.CreateUpdateRequest;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.repo.NationRepo;
import com.lemonmul.planetdhance.repo.TagRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepo userRepo;
    private final TagRepo tagRepo;
    private final NationRepo nationRepo;
    private static final String defaultImgPath = "/user/default/default_profile_img.png";

    /**
     * 이메일 중복 검사
     *
     * 파라미터
     *      email: 검사할 이메일
     *
     * 반환값
     *      이메일 중복 X: true
     *      이메일 중복 O: "Duplicated Email" 예외 발생
     */
    public boolean emailCheck(String email) throws Exception {
        if(userRepo.findByEmail(email).isPresent())
            throw new Exception("Duplicated Email");

        return true;
    }

    /**
     * 닉네임 중복 검사
     *
     * 파라미터
     *      nickname: 검사할 닉네임
     *
     * 반환값
     *      닉네임 중복 X: true
     *      닉네임 중복 O: "Duplicated Nickname" 예외 발생
     */
    public boolean nicknameCheck(String nickname) throws Exception {
        if(userRepo.findByNickname(nickname).isPresent())
            throw new Exception("Duplicated Nickname");

        return true;
    }

    /**
     * 회원가입
     *
     * 파라미터
     *      user: 회원가입할 사용자 객체
     *
     * 반환값
     *      회원가입 성공: true
     *      이메일 중복: "Duplicated Email" 예외 발생
     *      닉네임 중복: "Duplicated Nickname" 예외 발생
     */
    @Transactional
    public boolean signUp(User user) throws Exception {
        if(userRepo.findByEmail(user.getEmail()).isPresent())
            throw new Exception("Duplicated Email");

        if(userRepo.findByNickname(user.getNickname()).isPresent())
            throw  new Exception("Duplicated Nickname");

        userRepo.save(user);

        //Tag 테이블에 nickname 추가
        tagRepo.save(Tag.createTag(user.getNickname(), TagType.NICKNAME, ""));

        return true;
    }

    /**
     * 로그인
     *
     * 파라미터
     *      email: 로그인할 사용자 이메일
     *      pwd: 로그인할 사용자 비밀번호
     *
     * 반환값
     *      로그인 성공: 로그인한 사용자 정보
     *      사용자 조회 실패: "User Not Found" 예외 발생
     *      비밀번호 불일치: "Password Not Correct" 예외 발생
     */
    @Transactional
    public User login(String email, String pwd) throws Exception {
        Basic findUser = (Basic)(userRepo.findByEmail(email)).orElseThrow(() -> new Exception("User Not Found"));

        if(!findUser.getPwd().equals(pwd))
            throw new Exception("Password Not Correct");

        return findUser;
    }

    /**
     * 사용자 정보 조회 - 아이디
     *
     * 파라미터
     *      id: 조회할 사용자 아이디
     *
     * 반환값
     *      조회 성공: 조회된 사용자 객체
     *      조회 실패: "User Not Found" 예외 발생
     */
    public User findById(Long id) throws Exception {
        return userRepo.findById(id).orElseThrow(() -> new Exception("User Not Found"));
    }

    /**
     * 사용자 정보 조회 - 닉네임
     *
     * 파라미터
     *      nickname: 조회할 사용자 닉네임
     *
     * 반환값
     *      조회 성공: 조회된 사용자 객체
     *      조회 실패: "User Not Found" 예외 발생???
     */
    public User findByNickname(String nickname) throws Exception {
        return userRepo.findByNickname(nickname).orElseThrow(() -> new Exception("User Not Found"));
    }

    /**
     * 사용자 정보 수정
     *
     * 파라미터
     *      id: 수정할 사용자 아이디
     *      inputFile: 프로필 사진
     *      createUpdateRequest: 업데이트할 사용자 정보가 담긴 객체
     *
     * 반환값
     *      수정 성공: true
     *      사용자 조회 실패: "User Not Found" 예외 발생
     *      국가 조회 실패: "Nation Not Found" 예외 발생
     */
    @Transactional
    public boolean update(Long id, MultipartFile inputFile, CreateUpdateRequest createUpdateRequest) throws Exception {
        User findUser = userRepo.findById(id).orElseThrow(() -> new Exception("User Not Found"));
        Nation findNation = nationRepo.findByName(createUpdateRequest.getNationName()).orElseThrow(() -> new Exception("Nation Not Found"));

        if(inputFile.isEmpty()){
            findUser.setImgUrl(defaultImgPath);
        }else{
            if(!findUser.getImgUrl().equals(defaultImgPath)) {
                File beforeFile = new File(findUser.getImgUrl());
                beforeFile.delete();
            }

            String separator = File.separator;
            String path = "users" + separator + "img" + separator + createUpdateRequest.getEmail();
            String filePath = FileUtil.createFilePath(inputFile, path);

            findUser.setImgUrl(filePath);
        }

        findUser.setIntroduce(createUpdateRequest.getIntroduce());
        findUser.setNation(findNation);
        userRepo.save(findUser);

        return true;
    }

    /**
     * 회원탈퇴
     *
     * 파라미터
     *      id: 탈퇴할 사용자 아이디
     *
     * 반환값
     *      탈퇴 성공: true
     *      사용자 조회 실패: "User Not Found" 예외 발생
     */
    @Transactional
    public boolean delete(Long id) throws Exception {
        User findUser = userRepo.findById(id).orElseThrow(() -> new Exception("User Not Found"));

        // 사용자 관련 파일 제거
        String separator = File.separator;

        File tempFile = new File("");
        String rootPath = tempFile.getAbsolutePath().split("src")[0];

        //TODO: separator 빼기
        String savePath = rootPath + separator + "users" + separator + findUser.getEmail();

        File deleteFile = new File(savePath);
        deleteFile.delete();

        // 사용자가 올린 게시글 삭제 안되도록 video 각각에 null 처리
        List<Video> videoList = findUser.getVideos();

        for(Video video: videoList)
            video.removeUser();

        userRepo.delete(findUser);

        return true;
    }

    /**
     * 팔로우한 유저 정보
     * 검색 조건: 해당 유저가 팔로우한 사용자
     * 정렬: 영상 갱신일 최신순
     */
    public Slice<User> findFollowingUserInfo(int page,int size,List<Follow> tos){
        Pageable pageable= PageRequest.of(page,size);
        return userRepo.findByTosInOrderByRenewDateDesc(tos,pageable);
    }
}
