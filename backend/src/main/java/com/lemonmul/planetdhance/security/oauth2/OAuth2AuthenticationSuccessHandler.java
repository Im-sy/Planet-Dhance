package com.lemonmul.planetdhance.security.oauth2;

import com.lemonmul.planetdhance.entity.Social;
import com.lemonmul.planetdhance.entity.User;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.security.oauth2.user.JwtToken;
import com.lemonmul.planetdhance.security.oauth2.user.JwtTokenJson;
import com.lemonmul.planetdhance.security.oauth2.user.SignUpData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepo userRepo;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        MediaType jsonMimeType = MediaType.APPLICATION_JSON;

        Social findSocial = userRepo.findByOauth2Sub(authentication.getName()).orElse(null);

        if(findSocial != null){
            String email = findSocial.getEmail();
            String nickname = findSocial.getNickname();
//            String nationName = findSocial.getNation().getName();
            JwtToken jwtToken = new JwtToken(email, nickname);
//            JwtToken jwtToken = new JwtToken(email, nickname, nationName);

            if (jsonConverter.canWrite(jwtToken.getClass(), jsonMimeType)) {
                jsonConverter.write(jwtToken, jsonMimeType, new ServletServerHttpResponse(response));
            }

            // TODO: jwtToken에 들어있는 내용을 실제로 토큰화 하고
            //  jwtTokenJson에 타입(loginSuccess)이랑 같이 넣어줘야 함
//            JwtTokenJson jwtTokenJson = JwtTokenJson();

//            if (jsonConverter.canWrite(jwtTokenJson.getClass(), jsonMimeType)) {
//                jsonConverter.write(jwtTokenJson, jsonMimeType, new ServletServerHttpResponse(response));
//            }
        }else{
            Map<String, Object> attributes = ((DefaultOAuth2User) authentication.getPrincipal()).getAttributes();
            SignUpData signUpData = OAuthAttributes.extract((String)attributes.get("registrationId"), attributes);

            User user = signUpData.toSocial();
            userRepo.save(user);

            if (jsonConverter.canWrite(signUpData.getClass(), jsonMimeType)) {
                jsonConverter.write(signUpData, jsonMimeType, new ServletServerHttpResponse(response));
            }
        }
    }
}
