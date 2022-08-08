package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Validate;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.ValidateRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.security.jwt.CustomUserDetails;
import com.lemonmul.planetdhance.security.jwt.JwtToken;
import com.lemonmul.planetdhance.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletRequest;

@Service
@RequiredArgsConstructor
public class ValidateService {

    private final ValidateRepo validateRepo;
    private final UserRepo userRepo;
    private final JwtTokenProvider jwtTokenProvider;

    public boolean login(Validate validate){
        Validate findValidate = validateRepo.findByEmail(validate.getEmail()).orElse(null);

        ServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();


        if(findValidate != null){
            if(!jwtTokenProvider.validateToken(findValidate.getToken(), request)){
                User findUser = userRepo.findByEmail(validate.getEmail()).orElse(null);

                validateRepo.deleteByEmail(validate.getEmail());

                if(findUser != null){
                    CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
                    JwtToken jwtToken = customUserDetails.toJwtToken();
                    String tokenString = jwtTokenProvider.createToken(jwtToken.getEmail(), jwtToken);
                    Validate newValidate = new Validate(jwtToken.getEmail(), tokenString);
                    validateRepo.save(newValidate);
                }
                return true;
            }
            return false;
        }else{
            validateRepo.save(validate);
            return true;
        }
    }

    public boolean logout(Long id){
        if(validateRepo.findById(id).orElse(null) != null){
            validateRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
