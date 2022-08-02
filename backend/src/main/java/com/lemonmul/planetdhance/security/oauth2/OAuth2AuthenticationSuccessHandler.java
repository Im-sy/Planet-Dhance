package com.lemonmul.planetdhance.security.oauth2;

import com.lemonmul.planetdhance.entity.Social;
import com.lemonmul.planetdhance.entity.User;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.security.oauth2.user.JwtToken;
import com.lemonmul.planetdhance.security.oauth2.user.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepo userRepo;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = "";

        Social findSocial = userRepo.findByOauth2Sub(authentication.getName()).orElse(null);
        if(findSocial != null){
            targetUrl = "http://localhost:8080/success.html";

            HttpSession session = request.getSession();
            JwtToken jwtToken = new JwtToken();
            String email = findSocial.getEmail();
            String nickname = findSocial.getNickname();
//            String nation = findSocial.getNation().getName();

            targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("email", email)
                    .queryParam("nickname", nickname)
//                    .queryParam("nation", nation)
                    .build().toUriString();

            clearAuthenticationAttributes(request, response);
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }else{
            Map<String, Object> attributes = ((DefaultOAuth2User) authentication.getPrincipal()).getAttributes();
            UserProfile userProfile = OAuthAttributes.extract((String)attributes.get("registrationId"), attributes);

            MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
            MediaType jsonMimeType = MediaType.APPLICATION_JSON;

            User user = userProfile.toSocial();
            userRepo.save(user);

            if (jsonConverter.canWrite(userProfile.getClass(), jsonMimeType)) {
                jsonConverter.write(userProfile, jsonMimeType, new ServletServerHttpResponse(response));
            }
        }


    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);

    }
}
