package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import lombok.Data;

@Data
public class VideoProfileDto{
    private Long videoId;
    private String imgUrl;
    private VideoScope scope;

    public VideoProfileDto(Video video) {
        videoId=video.getId();
        imgUrl=video.getImgUrl();
        scope=video.getScope();
    }
}