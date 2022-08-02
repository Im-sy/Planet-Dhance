package com.lemonmul.planetdhance.security.oauth2.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtToken {
    private String email;
    private String nickname;
    private String nation;

}
