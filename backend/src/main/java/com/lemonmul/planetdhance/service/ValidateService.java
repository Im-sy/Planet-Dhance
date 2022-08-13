package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Validate;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.repo.ValidateRepo;
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

    /**
     * 토큰 테이블에 로그인 정보 추가
     *
     * 파라미터
     *      validate: 토큰 테이블에 저장할 사용자 정보 객체
     *
     * 반환값
     *      팔로우 성공: true
     *      중복 로그인: "Duplicated Login" 예외 발생
     */
    @Transactional
    public void login(Validate validate) throws Exception {
        Validate findValidate = validateRepo.findByUserId(validate.getUser().getId()).orElse(null);

        ServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

        if(findValidate == null){
            validateRepo.save(validate);
        }else{
            if(!jwtTokenProvider.validateToken(findValidate.getToken(), request)){
                User findUser = userRepo.findById(validate.getUser().getId()).orElse(null);

                validateRepo.deleteByUserId(validate.getUser().getId());

                if(findUser != null){
                    CustomUserDetails customUserDetails = new CustomUserDetails(findUser);
                    JwtToken jwtToken = customUserDetails.toJwtToken();
                    String tokenString = jwtTokenProvider.createToken(jwtToken.getUserId(), jwtToken);
                    Validate newValidate = new Validate(findUser, tokenString);
                    validateRepo.save(newValidate);
                }
            }
            throw new Exception("Duplicated Login");
        }
    }

    /**
     * 토큰 테이블에서 로그인 정보 삭제
     *
     * 파라미터
     *      userId: 토큰 테이블에서 삭제할 사용자 아이디
     *
     * 반환값
     *      팔로우 성공: true
     *      토큰 조회 실패: "Already Logout" 예외 발생
     */
    @Transactional
    public boolean logout(Long userId) throws Exception {
        validateRepo.findByUserId(userId).orElseThrow(() -> new Exception("Already Logout"));

        validateRepo.deleteByUserId(userId);

        return true;
    }
}
