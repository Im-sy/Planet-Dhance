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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepo userRepo;
    private final TagRepo tagRepo;
    private final NationRepo nationRepo;

    public boolean emailCheck(String email) {
        return userRepo.findByEmail(email).isEmpty();
    }

    public boolean nicknameCheck(String nickname) {
        return userRepo.findByNickname(nickname).isEmpty();
    }

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

    @Transactional
    public User login(String email, String pwd) throws Exception {
        Basic findUser = (Basic)(userRepo.findByEmail(email)).orElseThrow(() -> new Exception("User Not Found"));

        if(!findUser.getPwd().equals(pwd))
            throw new Exception("Password Not Correct");

        return findUser;
    }

    public User findById(Long id) throws Exception {
        return userRepo.findById(id).orElseThrow(() -> new Exception("User Not Found"));
    }

    public User findByNickname(String nickname){
        return userRepo.findByNickname(nickname).orElse(null);
    }

    @Transactional
    public boolean update(Long id, MultipartFile inputFile, CreateUpdateRequest createUpdateRequest) throws Exception {
        User findUser = userRepo.findById(id).orElseThrow(() -> new Exception("User Not Found"));
        Nation findNation = nationRepo.findByName(createUpdateRequest.getNationName()).orElseThrow(() -> new Exception("Nation Not Found"));

        // TODO: 조건 분기 수정

        if(inputFile.isEmpty()){
            if(findUser.getImgUrl() != null) {
                File beforeFile = new File(findUser.getImgUrl());
                beforeFile.delete();
            }

            String filePath = UserService.createUserImg(inputFile, createUpdateRequest.getEmail());
            findUser.setImgUrl(filePath);
        }

        findUser.setIntroduce(createUpdateRequest.getIntroduce());
        findUser.setNation(findNation);
        userRepo.save(findUser);

        return true;
    }

    @Transactional
    public boolean delete(Long id) throws Exception {
        User findUser = userRepo.findById(id).orElseThrow(() -> new Exception("User Not Found"));

        // 사용자 관련 파일 제거
        String separator = File.separator;

        File tempFile = new File("");
        String rootPath = tempFile.getAbsolutePath().split("src")[0];

        String savePath = rootPath + separator + "images" + separator + findUser.getEmail();

        File deleteFile = new File(savePath);
        deleteFile.delete();

        // 사용자가 올린 게시글 삭제 안되도록 video 각각에 null 처리
        List<Video> videoList = findUser.getVideos();

        for(Video video: videoList)
            video.removeUser();

        // TODO: Validate 테이블에서 제거 필요?

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

    public static String createUserImg(MultipartFile inputFile, String email) throws IOException {
        String separator = File.separator;

        File tempFile = new File("");
        String rootPath = tempFile.getAbsolutePath().split("src")[0] + separator + "static";

        String savePath = rootPath + separator + "users" + separator + "img" + separator + email;

        if(!new File(savePath).exists()) {
            try {
                new File(savePath).mkdirs();
            }catch (Exception e) {
                e.printStackTrace();
            }
        }

        String originFileName = inputFile.getOriginalFilename();
        String saveFileName = UUID.randomUUID() + originFileName.substring(originFileName.lastIndexOf("."));

        String filePath = savePath + separator + saveFileName;
        inputFile.transferTo(new File(filePath));

        return filePath;
    }

    /**
     * 국가 랭킹
     *
     * TODO 그냥 db에 랭킹 집계 컬럼 추가하는거나, 일정 시간마다 랭킹 집계하는거 고려해보기
     */
    public Map<Nation, Integer> ranking(){
        Map<Nation, List<User>> nationListMap = userRepo.findAll().stream().collect(Collectors.groupingBy(User::getNation));
        Map<Nation,Integer> points=new HashMap<>();

        for (Map.Entry<Nation, List<User>> entry : nationListMap.entrySet()) {
            int point=0;
            for (User user : entry.getValue()) {
                point+=user.getClears().size();
            }
            points.put(entry.getKey(),point);
        }

        return points;
    }
}
