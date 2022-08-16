package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import lombok.Data;
import org.springframework.data.domain.Slice;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserSearchResponse{
    private UserDto user;
    private List<ClearDto> clearList;
    private int clearCnt;
    private String prevPage="user";
    private Slice<VideoProfileDto> videoList;
    private boolean isFollow;

    public UserSearchResponse(User user, List<Clear> clearList, Slice<Video> videoList, boolean isFollow) {
        this.user=new UserDto(user);
        //최신 클리어 정보 5개
        this.clearList=clearList.stream()
                .sorted(Comparator.comparing(Clear::getId).reversed()).limit(5)
                .map(ClearDto::new).collect(Collectors.toList());
        this.clearCnt=clearList.size();
        this.videoList=videoList.map(VideoProfileDto::new);
        this.isFollow = isFollow;
    }
}