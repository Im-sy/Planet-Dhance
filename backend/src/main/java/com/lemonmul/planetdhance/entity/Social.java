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

    public Social(String oauth2Sub, String email){
        this.oauth2Sub = oauth2Sub;
        this.email = email;
        this.role = Role.USER;
    }

    public static Social createSocial(String email, String nickname,String introduce,String imgUrl,Nation nation){
        Social social = new Social();
        social.email = email;
        social.nickname = nickname;
        social.introduce = introduce;
        social.imgUrl = imgUrl;
        social.setRegDate(LocalDateTime.now());
        social.setRenewDate(social.getRegDate());
        social.role=Role.USER;
        social.setNation(nation);
        //Tag 테이블에 nickname 추가
        Tag.createTag(social.getNickname(), TagType.NICKNAME,social.imgUrl);
        return social;
    }

    public void setImgUrl(String imgUrl){
        if(imgUrl==null){
            //TODO 기본 이미지 설정
            imgUrl="default img path";
        }
        this.imgUrl=imgUrl;
    }

    public void setIntroduce(String introduce){
        //기본 자기소개 설정
        if(introduce==null){
            introduce="hello!";
        }
        this.introduce=introduce;
    }
}
