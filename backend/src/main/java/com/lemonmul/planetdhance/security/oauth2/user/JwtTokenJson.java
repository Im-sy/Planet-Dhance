package com.lemonmul.planetdhance.security.oauth2.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtTokenJson {
    private int state;
    private String token;
}
