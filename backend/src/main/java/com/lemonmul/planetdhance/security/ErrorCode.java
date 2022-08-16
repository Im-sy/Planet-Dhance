package com.lemonmul.planetdhance.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    EXPIRED_TOKEN(1000, "토큰의 유효기간이 만료되었습니다.");

    private final int code;
    private final String message;
}
