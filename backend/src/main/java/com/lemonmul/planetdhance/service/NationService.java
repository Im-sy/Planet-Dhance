package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.repo.NationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NationService {

    private final NationRepo nationRepo;

    /**
     * 국가 정보 조회 - 이름
     *
     * 파라미터
     *      nationName: 조회할 국가 이름
     *
     * 반환값
     *      조회 성공: 조회된 국가 객체
     *      TODO: 예외 처리
     *      조회 실패: "Nation Not Found" 예외 발생
     */
    public Nation findByName(String nationName){
        return nationRepo.findByName(nationName).get();
    }

//    public List<Nation> findAllNation(){
//        List<Nation> nations = nationRepo.findAll();
//        for (Nation nation : nations) {
//
//        }
//    }
}
