package com.lemonmul.planetdhance.config;

import com.lemonmul.planetdhance.service.OAuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

//@EnableWebSecurity
//@Configuration
//@ConditionalOnDefaultWebSecurity
//@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class SecurityConfig {

    private final OAuthService oAuthService;

    public SecurityConfig(OAuthService oAuthService){
        this.oAuthService = oAuthService;
    }

    @Bean
//    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception {

        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(oAuthService);

        return http.build();
    }
}
