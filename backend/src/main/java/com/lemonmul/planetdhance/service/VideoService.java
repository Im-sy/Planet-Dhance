package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.dto.ChallengeRequest;
import com.lemonmul.planetdhance.dto.TagRequestDto;
import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.VideoTag;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.repo.*;
import com.lemonmul.planetdhance.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VideoService {

    private final VideoRepo videoRepo;
    private final UserRepo userRepo;
    private final MusicRepo musicRepo;
    private final TagRepo tagRepo;
    private final ClearRepo clearRepo;

    /**
     * 검색 조건: 곡 1건, 공개 여부
     * 정렬: 최신순
     */
    public Slice<Video> findLatestVideoList(int page, int size, Music music, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByMusicAndScopeOrderByRegDateDesc(music,scope,pageable);
    }

    public Slice<Video> findNextLatestVideoList(int page, int size, Long videoId,Music music, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByIdLessThanEqualAndMusicAndScopeOrderByRegDateDescIdDesc(videoId,music,scope,pageable);
    }

    /**
     * 검색 조건: 곡 1건, 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findMusicVideoList(int page, int size, Music music, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByMusicAndScopeOrderByOrderWeightDescRegDateDesc(music,scope,pageable);
    }

    public Slice<Video> findNextMusicVideoList(int page, int size, Long orderWeight, Music music, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByOrderWeightLessThanEqualAndMusicAndScopeOrderByOrderWeightDescRegDateDescIdDesc(orderWeight,music,scope,pageable);
    }

    /**
     * 검색 조건: 곡 여러 건, 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findArtistVideoList(int page, int size, List<Music> musicList, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByMusicInAndScopeOrderByOrderWeightDescRegDateDesc(musicList,scope,pageable);
    }

    public Slice<Video> findNextArtistVideoList(int page, int size, Long orderWeight, List<Music> musicList, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByOrderWeightLessThanEqualAndMusicInAndScopeOrderByOrderWeightDescRegDateDesc(orderWeight,musicList,scope,pageable);
    }

    /**
     * 검색 조건: videoTag 여러 건, 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findCustomVideoList(int page, int size, List<VideoTag> videoTagList, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByVideoTagsInAndScopeOrderByOrderWeightDescRegDateDesc(videoTagList,scope,pageable);
    }

    public Slice<Video> findNextCustomVideoList(int page, int size, Long orderWeight,List<VideoTag> videoTagList, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByOrderWeightLessThanEqualAndVideoTagsInAndScopeOrderByOrderWeightDescRegDateDesc(orderWeight,videoTagList,scope,pageable);
    }

    /**
     * 검색 조건: 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findMainPageVideoList(int page,int size,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findMainByScopeOrderByOrderWeightDescRegDateDescIdDesc(scope,pageable);
    }

    public Slice<Video> findNextMainPageVideoList(int page,int size,Long orderWeight,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findMainByOrderWeightLessThanEqualAndScopeOrderByOrderWeightDescRegDateDescIdDesc(orderWeight,scope,pageable);
    }

    /**
     * 검색 조건: 없음
     * 정렬: 없음(랜덤)
     */
    public List<Video> findRandomVideoInfoList(int size){
        return videoRepo.findRandom(size);
    }

    /**
     * 검색 조건: 좋아요 한 영상
     * 정렬: 최신순
     */
    public Slice<Video> findLikeVideoList(int page, int size, List<Like> likeList){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByLikesInOrderByRegDateDesc(likeList,pageable);
    }

    public Slice<Video> findNextLikeVideoList(int page, int size,Long videoId, List<Like> likeList){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByIdLessThanEqualAndLikesInOrderByRegDateDescIdDesc(videoId,likeList,pageable);
    }

    /**
     * 검색 조건: 유저 한 명, 공개 여부
     * 정렬: 최신순
     */
    public Slice<Video> findUserVideoList(int page, int size, User user, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByUserAndScopeOrderByRegDateDesc(user,scope,pageable);
    }

    public Slice<Video> findNextUserVideoList(int page, int size, Long orderWeight,User user, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByOrderWeightLessThanEqualAndUserAndScopeOrderByRegDateDesc(orderWeight,user,scope,pageable);
    }

    /**
     * 검색 조건: 유저 한 명
     * 정렬: 최신순
     * TODO 공개 여부 조건 거는 부분 개선해서 함수 하나로 합치기
     */
    public Slice<Video> findAllNewestVideoListByUser(int page, int size, User user){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByUserOrderByRegDateDesc(user,pageable);
    }

    public Video findById(Long videoId){
        return videoRepo.findById(videoId).get();
    }

    @Transactional
    public boolean addHitCount(Long videoId){
        Optional<Video> optionalVideo = videoRepo.findById(videoId);
        Video video;
        if(optionalVideo.isEmpty()) return false;
        else video=optionalVideo.get();

        video.addHit();
        videoRepo.save(video);
        return true;
    }

    /**
     * 챌린지 영상 업로드
     *
     * 영상, 썸네일 없을 시 예외처리
     * 해당 유저, 곡 없을 시 예외처리
     *
     * 영상, 썸네일 파일 서버에 저장하고, 경로 받아두기
     * 새 커스텀 태그들(request에서 받기) tag 테이블에 추가
     * 고정 태그들(tag 테이블에서 불러오기), 커스텀 태그들(request에서 받기) video_tag 테이블에 추가
     * 처음 클리어한 경우 clear 테이블에 추가
     * 영상을 video 테이블에 추가
     */
    @Transactional
    public boolean uploadChallengeVideo(List<MultipartFile> inputFile,ChallengeRequest challengeRequest) throws Exception {

        if(inputFile.isEmpty() || inputFile.size()<2)
            throw new Exception("File Not Found");

        //영상 경로, 썸네일 경로
        String videoUrl=null,imgUrl=null;
        for (MultipartFile multipartFile : inputFile) {
            String originalFilename = multipartFile.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            if(".webm".equals(extension) || ".mp4".equals(extension)){
                videoUrl=FileUtil.createFilePath(multipartFile,"video" + File.separator + "article");
            }else{
                imgUrl=FileUtil.createFilePath(multipartFile,"video"+File.separator+"img");
            }
        }

        VideoScope scope=challengeRequest.getScope();

        User user = userRepo.findById(challengeRequest.getUserId()).orElseThrow(() -> new Exception("User Not Found"));
        Music music = musicRepo.findById(challengeRequest.getMusicId()).orElseThrow(() -> new Exception("Music Not Found"));

        List<Tag> tagList = new ArrayList<>();
        //고정 태그들 추가
        tagList.add(tagRepo.findByNameAndType(user.getNickname(), TagType.NICKNAME).orElseThrow(() -> new Exception("Nickname Tag Not Found")));
        tagList.add(tagRepo.findByNameAndType(user.getNation().getName(), TagType.NATION).orElseThrow(() -> new Exception("Nation Tag Not Found")));
        tagList.add(tagRepo.findByNameAndType(music.getTitle(), TagType.TITLE).orElseThrow(() -> new Exception("Title Tag Not Found")));
        tagList.add(tagRepo.findByNameAndType(music.getArtist().getName(), TagType.ARTIST).orElseThrow(() -> new Exception("Artist Tag Not Found")));

        //커스텀 태그들 추가
        for (TagRequestDto tagRequestDto : challengeRequest.getTagList()) {
            String tagName=tagRequestDto.getType();
            Optional<Tag> optionalTag=tagRepo.findByNameAndType(tagName,TagType.CUSTOM);
            Tag tag;
            //이미 등록된 커스텀 태그인지 확인
            if(optionalTag.isEmpty()){
                //등록 안된 태그는 tag 테이블에 추가
                tag=Tag.createCustomTag(tagRequestDto);
                tagRepo.save(tag);
            }else{
                tag = optionalTag.get();
            }
            tagList.add(tag);
        }

        Video video = Video.createVideo(videoUrl, imgUrl, scope, user, music);
        //video_tag 테이블에 태그들 추가
        for (Tag tag : tagList) {
            VideoTag.createVideoTag(video,tag);
        }

        //클리어 여부 확인
        if(challengeRequest.isClear()){
            Optional<Clear> clear = clearRepo.findByMusicAndUser(music, user);
            //clear 테이블에 없는 경우 추가
            if(clear.isEmpty())
                clearRepo.save(Clear.createClear(music,user));
        }

        videoRepo.save(video);

        return true;
    }
}
