package com.lemonmul.planetdhance.security.oauth2.user;

import com.lemonmul.planetdhance.entity.Social;
import lombok.Getter;

@Getter
public class UserProfile {
    private final String oauthId;
    private final String email;
    private final String imgUrl;

    public UserProfile(String oauthId, String name, String email, String imgUrl) {
        this.oauthId = oauthId;
        this.email = email;
        this.imgUrl = imgUrl;
    }

    public Social toSocial() {
        return new Social(oauthId, email, imgUrl);
    }
}
