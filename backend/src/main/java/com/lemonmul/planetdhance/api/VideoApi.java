package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/video")
public class VideoApi {

    private final VideoService videoService;

    /**
     * 영상 리스트 - 최신
     *
     * 요청 파라미터 예시: /video/list/newest
     * size는 기본값 30
     */
    @GetMapping("/list/latest")
    public Slice<VideoDto> newestList(@PageableDefault(sort = "regDate",direction = Sort.Direction.DESC) Pageable pageable){
        Slice<Video> videoList = videoService.findPublicNewestVideoList(VideoScope.PUBLIC, pageable);
        Slice<VideoDto> videoDtos=videoList.map(VideoDto::new);

        return videoDtos;
    }



//    @GetMapping("/list")
//    public Slice<VideoDto> videoList(Pageable pageable){
//
//        Slice<Video> videoList = videoService.findVideoList(pageable);
//        Slice<VideoDto> videoDtos = videoList.map(VideoDto::new);
//
//        return videoDtos;
//    }

    @Data
    static class VideoDto{
        private int videoId;
        private String imgUrl;

        public VideoDto(Video video) {
            videoId=video.getId();
            imgUrl=video.getImgUrl();
        }
    }

//    @Data
//    @AllArgsConstructor
//    static class VideoTagDto {
//        private String tagName;
//        private TagType tagType;
//
//        public VideoTagDto(VideoTag videoTag) {
//            tagName=videoTag.getTag().getName();
//            tagType=videoTag.getTag().getType();
//        }
//    }

//    @Data
//    @AllArgsConstructor
//    private static class LikeDto {
//        private int id;
//
//        public LikeDto(Like like) {
//            id=like.getId();
//        }
//    }
}
