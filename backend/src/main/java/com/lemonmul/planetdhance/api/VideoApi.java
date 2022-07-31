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
     * 영상 리스트
     *
     * 요청 파라미터 예시: /video/list?sort=hit,desc&page=1&size=3
     * sort [hit,**like**,regDate]
     * page는 0부터 시작, 안주면 0
     * size는 굳이 필요 없을듯? 기본값은 20
     *
     * TODO 백에서 알아서 다음 페이지 주는 방법은 없겠지..?
     * TODO tag나 like 필요하면 fetch join으로 한번에 데려오기
     * TODO size 기본값 프론트랑 얘기해보기
     */
    @GetMapping("/list")
    public Slice<VideoDto> videoList(Pageable pageable){

        Slice<Video> videoList = videoService.findVideoList(pageable);
        Slice<VideoDto> videoDtos = videoList.map(VideoDto::new);

        return videoDtos;
    }

    @Data
    static class VideoDto{
        private String videoUrl;
        private String imgUrl;
        private int hit;
//        private List<VideoTagDto> videoTags;
//        private List<LikeDto> likes;

        public VideoDto(Video video) {
            videoUrl=video.getVideoUrl();
            imgUrl=video.getImgUrl();
            hit= video.getHit();
//            videoTags=video.getVideoTags().stream()
//                    .map(VideoTagDto::new)
//                    .collect(Collectors.toList());
//            likes=video.getLikes().stream()
//                    .map(LikeDto::new)
//                    .collect(Collectors.toList());
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
