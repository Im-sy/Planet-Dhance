package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.video.Video;
import lombok.Data;
import org.springframework.data.domain.Slice;

import java.util.ArrayList;
import java.util.List;

@Data
public class VideoInfoResponse {
    private List<VideoPlayDto> videoList=new ArrayList<>();
    private int number;
    private boolean first;
    private boolean last;
    private int numberOfElements;
    private boolean empty;

    public VideoInfoResponse(Slice<Video> videos, List<Like> likes) {
        for (Video video : videos) {
            videoList.add(new VideoPlayDto(video,likes));
        }
        number= videos.getNumber();
        first=videos.isFirst();
        last=videos.isLast();
        numberOfElements=videos.getNumberOfElements();
        empty=videos.isEmpty();
    }
}
