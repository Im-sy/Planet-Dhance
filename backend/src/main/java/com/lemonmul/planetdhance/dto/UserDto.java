package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.user.User;
import lombok.Data;

@Data
public class UserDto {
    private String nickname;
    private String introduce;
    private String imgUrl;
    private String nationFlag;
    private int followingCnt;
    private int followerCnt;

    public UserDto(User user) {
        nickname=user.getNickname();
        introduce=user.getIntroduce();
        imgUrl=user.getImgUrl();
        nationFlag=user.getNation().getFlag();
        followingCnt=user.getFroms().size();
        followerCnt=user.getTos().size();
    }
}
