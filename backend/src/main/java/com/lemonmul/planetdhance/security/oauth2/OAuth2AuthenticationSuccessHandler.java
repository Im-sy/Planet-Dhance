package com.lemonmul.planetdhance.security.oauth2;

import com.lemonmul.planetdhance.entity.user.Social;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenJson;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import com.lemonmul.planetdhance.security.oauth2.user.SignUpData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepo userRepo;

    private final JwtTokenProvider jwtTokenProvider;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        MediaType jsonMimeType = MediaType.APPLICATION_JSON;

        Social findSocial = userRepo.findByOauth2Sub(authentication.getName()).orElse(null);

        if(findSocial != null){
            CustomUserDetails customUserDetails = new CustomUserDetails(findSocial);
            JwtToken jwtToken = customUserDetails.toJwtToken();
            JwtTokenJson jwtTokenJson = new JwtTokenJson("loginSuccess", jwtTokenProvider.createToken(customUserDetails.getUserId(), jwtToken));

            if (jsonConverter.canWrite(jwtTokenJson.getClass(), jsonMimeType)) {
                jsonConverter.write(jwtTokenJson, jsonMimeType, new ServletServerHttpResponse(response));
            }
        }else{
            Map<String, Object> attributes = ((DefaultOAuth2User) authentication.getPrincipal()).getAttributes();
            SignUpData signUpData = OAuthAttributes.extract((String)attributes.get("registrationId"), attributes);

            if (jsonConverter.canWrite(signUpData.getClass(), jsonMimeType)) {
                jsonConverter.write(signUpData, jsonMimeType, new ServletServerHttpResponse(response));
            }
        }
    }
}
