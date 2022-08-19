package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.video.Video;
import lombok.Data;
import org.springframework.data.domain.Slice;

/**
 * 그리드 뷰 무한스크롤 시 반환 객체
 */
@Data
public class GridResponse {
    private String prevPage;
    private Slice<VideoDto> videoList;

    public GridResponse(String prevPage,Slice<Video> videos) {
        this.prevPage=prevPage;
        this.videoList=videos.map(VideoDto::new);
    }
}