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

    /**
     * 토큰 테이블에 로그인 정보 추가
     *
     * 파라미터
     *      validate: 토큰 테이블에 저장할 사용자 정보 객체
     *
     * 반환값
     *      TODO: 성공 시 반환값 "Success"? true?
     *      팔로우 성공: "Success"? true?
     *      중복 로그인: "Duplicated Login" 예외 발생
     */
    // TODO: 함수명 변경 고민해보기, 테이블 한글명 변경 고민해보기
    @Transactional
    public boolean login(Validate validate) throws Exception {
        Validate findValidate = validateRepo.findByUserId(validate.getUserId()).orElse(null);

        ServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

        if(findValidate == null){
            validateRepo.save(validate);
            return true;
        }else{
            if(!jwtTokenProvider.validateToken(findValidate.getToken(), request)){
                User findUser = userRepo.findById(validate.getUserId()).orElse(null);

                validateRepo.deleteByUserId(validate.getUserId());

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

    /**
     * 토큰 테이블에서 로그인 정보 삭제
     *
     * 파라미터
     *      userId: 토큰 테이블에서 삭제할 사용자 아이디
     *
     * 반환값
     *      TODO: 성공 시 반환값 "Success"? true?
     *      팔로우 성공: "Success"? true?
     *      TODO: 예외 처리, 예외 메세지 고민해보기
     *      토큰 조회 실패: "Already Logout" 예외 발생
     */
    // TODO: 함수명 변경 고민해보기, 테이블 한글명 변경 고민해보기
    @Transactional
    public boolean logout(Long userId){
        if(validateRepo.findByUserId(userId).isPresent()){
            validateRepo.deleteByUserId(userId);
            return true;
        }
        return false;
    }
}
