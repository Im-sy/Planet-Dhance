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

    private String oAuth2Sub;

    public Social(String oauth2Sub, String email){
        this.oAuth2Sub = oauth2Sub;
        this.email = email;
        this.role = Role.USER;
    }

    public Social(String email, String nickname,String introduce,String imgUrl,Nation nation, Role role) {
        super(email, nickname, introduce, imgUrl, nation, role);
    }

    //==생성 메서드==//
    public static Social createSocial(String email, String nickname,String introduce,String imgUrl,Nation nation, Role role, String oAuth2Sub){
        Social social = new Social(email, nickname, introduce, imgUrl, nation, role);
        social.oAuth2Sub = oAuth2Sub;
        return social;
    }
}
