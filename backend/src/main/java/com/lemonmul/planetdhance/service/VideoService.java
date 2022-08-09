package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.VideoTag;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.repo.VideoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VideoService {

    private final VideoRepo videoRepo;

    /**
     * 검색 조건: 곡 1건, 공개 여부
     * 정렬: 최신순
     */
    public Slice<Video> findNewestVideoList(int page, int size, Music music,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByMusicAndScopeOrderByRegDateDesc(music,scope,pageable);
    }

    /**
     * 검색 조건: 곡 1건, 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findHitLikeVideoList(int page,int size,Music music,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByMusicAndScopeOrderByOrderWeightDescRegDateDesc(music,scope,pageable);
    }

    /**
     * 검색 조건: 곡 여러 건, 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findHitLikeVideoListByMusicList(int page, int size, List<Music> musicList, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByMusicInAndScopeOrderByOrderWeightDescRegDateDesc(musicList,scope,pageable);
    }

    /**
     * 검색 조건: videoTag 여러 건, 공개 여부
     * 정렬: 조회수&좋아요 가중치, 가중치 같으면 최신순
     */
    public Slice<Video> findHitLikeVideoListByVideoTagList(int page, int size, List<VideoTag> videoTagList,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByVideoTagsInAndScopeOrderByOrderWeightDescRegDateDesc(videoTagList,scope,pageable);
    }

    /**
     * 검색 조건: 유저 한 명, 공개 여부
     * 정렬: 최신순
     */
    public Slice<Video> findNewestVideoListByUser(int page, int size, User user,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByUserAndScopeOrderByRegDateDesc(user,scope,pageable);
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

}
