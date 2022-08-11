package com.lemonmul.planetdhance.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import java.util.List;

@Getter
@AllArgsConstructor
public class JwtToken {
    private Long userId;
    private String nickname;
    private String nationName;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles;
}
