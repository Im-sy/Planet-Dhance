package com.lemonmul.planetdhance.security.oauth2.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class JwtToken {
    private String email;
    private String nickname;
    private String nationName;

    public JwtToken(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }
}
