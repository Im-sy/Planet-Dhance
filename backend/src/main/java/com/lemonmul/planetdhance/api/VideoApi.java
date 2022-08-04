package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
     * 요청 파라미터 예시: /video/list/latest/{마지막 video_id}
     * size는 기본값 18
     */
    @GetMapping("/list/latest/{lastId}")
    public Slice<VideoDto> newestList(@PathVariable Long lastId){
        //반환할 영상 개수
        int size=18;
        Slice<Video> videoList = videoService.findPublicNewestVideoList(lastId,size, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
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
        private Long videoId;
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
