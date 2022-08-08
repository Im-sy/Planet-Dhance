package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.video.Video;
import lombok.Data;

@Data
public class VideoDto{
    private Long videoId;
    private String imgUrl;

    public VideoDto(Video video) {
        videoId=video.getId();
        imgUrl=video.getImgUrl();
    }
}