package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.api.VideoApi;
import com.lemonmul.planetdhance.api.VideoApi.TagDto;
import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.video.Video;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class VideoPlayDto {
    private Long videoId;
    private Long musicId;
    private Long hit;
    private String videoUrl;
    private boolean like=false;
    private int likeCnt;
    private List<TagDto> tagList;

    public VideoPlayDto(Video video, List<Like> likeList) {
        videoId=video.getId();
        musicId=video.getMusic().getId();
        hit=video.getHit();
        videoUrl= video.getVideoUrl();
        for (Like l : likeList) {
            if(l.getVideo().getId().equals(video.getId())) {
                like=true;
                break;
            }
        }
        likeCnt=video.getLikes().size();
        tagList=video.getVideoTags().stream().map(TagDto::new).collect(Collectors.toList());
    }
}
