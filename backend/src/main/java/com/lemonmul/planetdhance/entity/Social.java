package com.lemonmul.planetdhance.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Social extends User{

    private String oauth2Sub;

    public Social(String oauth2Sub, String email, String imgUrl){
        this.oauth2Sub = oauth2Sub;
        this.email = email;
        this.imgUrl = imgUrl;
        this.role = Role.USER;
    }

    public static Social createSocial(String nickname,String introduce,String imgUrl,Nation nation){
        Social social = new Social();
        social.setNickname(nickname);
        social.setIntroduce(introduce);
        social.setImgUrl(imgUrl);
        social.setRegDate(LocalDateTime.now());
        social.setRenewDate(social.getRegDate());
        social.role=Role.USER;
        social.setNation(nation);
        //Tag 테이블에 nickname 추가
        Tag.createTag(social.getNickname(), TagType.NICKNAME,social.imgUrl);
        return social;
    }
}
