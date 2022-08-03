package com.lemonmul.planetdhance.security.oauth2.user;

import com.lemonmul.planetdhance.entity.Social;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpData {
    private final String oauthId;
    private final String email;
    private final String nationName;
    private final String signupType;

//    public Social toSocial() {
//        return new Social(oauthId, email, nationName);
//    }

    public Social toSocial() {
        return new Social(oauthId, email);
    }
}
