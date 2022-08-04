package com.lemonmul.planetdhance.security.oauth2.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpData {
    private final String state;
    private final String oauthId;
    private final String email;
    private final String nationName;
    private final String signupType;
}
