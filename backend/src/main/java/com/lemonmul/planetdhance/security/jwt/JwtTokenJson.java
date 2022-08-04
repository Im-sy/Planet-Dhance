package com.lemonmul.planetdhance.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtTokenJson {
    private String state;
    private String token;
}
