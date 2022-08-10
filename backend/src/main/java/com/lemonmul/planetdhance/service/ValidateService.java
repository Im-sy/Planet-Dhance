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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletRequest;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ValidateService {

    private final ValidateRepo validateRepo;
    private final UserRepo userRepo;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public boolean login(Validate validate) throws Exception {
        Validate findValidate = validateRepo.findByUserid(validate.getUserid()).orElse(null);

        ServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

        if(findValidate == null){
            validateRepo.save(validate);
            return true;
        }else{
            if(!jwtTokenProvider.validateToken(findValidate.getToken(), request)){
                User findUser = userRepo.findById(validate.getUserid()).orElse(null);

                validateRepo.deleteByUserid(validate.getUserid());

                if(findUser != null){
                    CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
                    JwtToken jwtToken = customUserDetails.toJwtToken();
                    String tokenString = jwtTokenProvider.createToken(jwtToken.getUserId(), jwtToken);
                    Validate newValidate = new Validate(jwtToken.getUserId(), tokenString);
                    validateRepo.save(newValidate);
                }
                return true;
            }
            throw new Exception("Duplicated Login");
        }
    }

    @Transactional
    public boolean logout(Long id){
        if(validateRepo.findById(id).orElse(null) != null){
            validateRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
