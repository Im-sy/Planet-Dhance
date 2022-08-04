package com.lemonmul.planetdhance.security.oauth2;

import com.lemonmul.planetdhance.security.oauth2.user.SignUpData;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuthAttributes {
    GOOGLE("google", (attributes) -> {
        return new SignUpData(
                "signup",
                String.valueOf(attributes.get("sub")),
                (String) attributes.get("email"),
                (String) attributes.get("locale"),
                "social"
        );
    });

    private final String registrationId;
    private final Function<Map<String, Object>, SignUpData> of;

    OAuthAttributes(String registrationId, Function<Map<String, Object>, SignUpData> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static SignUpData extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}
