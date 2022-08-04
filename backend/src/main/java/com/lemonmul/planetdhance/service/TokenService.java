package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Token;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.TokenRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenRepo tokenRepo;
    private final UserRepo userRepo;
    private final JwtTokenProvider jwtTokenProvider;

    public boolean login(Token token){
        Token findToken = tokenRepo.findByEmail(token.getEmail()).orElse(null);

        ServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();


        if(findToken != null){
            if(!jwtTokenProvider.validateToken(findToken.getToken(), request)){
                User findUser = userRepo.findByEmail(token.getEmail()).orElse(null);

                tokenRepo.deleteByEmail(token.getEmail());

                if(findUser != null){
                    CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
                    JwtToken jwtToken = customUserDetails.toJwtToken();
                    String tokenString = jwtTokenProvider.createToken(jwtToken.getEmail(), jwtToken);
                    Token newToken = new Token(jwtToken.getEmail(), tokenString);
                    tokenRepo.save(newToken);
                }
                return true;
            }
            return false;
        }else{
            tokenRepo.save(token);
            return true;
        }
    }
}
