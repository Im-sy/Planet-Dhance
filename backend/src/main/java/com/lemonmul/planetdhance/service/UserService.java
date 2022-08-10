package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.user.CreateUpdateRequest;
import com.lemonmul.planetdhance.entity.user.User;
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
import java.util.stream.Stream;

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
    public boolean signUp(MultipartFile inputFile, User user) throws IOException {
        String filePath = UserService.createFile(inputFile, user.getEmail());

        user.setImgUrl(filePath);

        if(userRepo.findByEmail(user.getEmail()).orElse(null) != null
        || userRepo.findByNickname(user.getNickname()).orElse(null) != null){
            return false;
        }else{
            userRepo.save(user);

            //Tag 테이블에 nickname 추가
            tagRepo.save(Tag.createTag(user.getNickname(), TagType.NICKNAME, ""));
            return true;
        }
    }

    public User login(String email, String pwd) {
        Basic findUser = (Basic)(userRepo.findByEmail(email)).orElse(null);

        if(findUser != null && findUser.getPwd().equals(pwd))
            return findUser;
        return null;
    }

    public User findById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    @Transactional
    public boolean update(Long id, MultipartFile inputFile, CreateUpdateRequest createUpdateRequest) throws IOException {
        User findUser = userRepo.findById(id).orElse(null);
        Nation findNation = nationRepo.findByName(createUpdateRequest.getNationName()).orElse(null);

        if(findUser == null || findNation == null)
            return false;

        if(inputFile != null){
            File beforeFile = new File(findUser.getImgUrl());
            beforeFile.delete();

            String filePath = UserService.createFile(inputFile, createUpdateRequest.getEmail());

            findUser.setImgUrl(filePath);
        }

        findUser.setIntroduce(createUpdateRequest.getIntroduce());
        findUser.setNation(findNation);
        userRepo.save(findUser);

        return true;
    }

    @Transactional
    public boolean delete(Long id) {
        User findUser = userRepo.findById(id).orElse(null);

        if(findUser == null)
            return false;

        String separator = File.separator;

        File tempFile = new File("");
        String rootPath = tempFile.getAbsolutePath().split("src")[0];

        String savePath = rootPath + separator + "images" + separator + findUser.getEmail();

        File deleteFile = new File(savePath);
        deleteFile.delete();

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

    public static String createFile(MultipartFile inputFile, String email) throws IOException {
        String separator = File.separator;

        File tempFile = new File("");
        String rootPath = tempFile.getAbsolutePath().split("src")[0];

        String savePath = rootPath + separator + "images" + separator + email + separator + "profileImg";

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
        System.out.println("filePath = " + filePath);
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
