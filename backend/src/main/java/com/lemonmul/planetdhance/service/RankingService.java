package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.Ranking;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.RankingRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankingService {
    private final UserRepo userRepo;
    private final RankingRepo rankingRepo;

    /**
     * 랭킹 테이블 조회
     *
     * 상위 n개의 팀을 조회해서 반환
     * n의 기본값은 10
     */
    public Slice<Ranking> getRanking() {
        Pageable pageable= PageRequest.of(0,10);
        return rankingRepo.findByOrderByClearCntDesc(pageable);
    }

    /**
     * 랭킹 테이블 갱신
     *
     * 일정 시간마다 랭킹 점수를 계산해서 테이블 갱신
     *
     * 갱신 시간은 매일 4시로 설정
     * -> 관련 설정은 util 패키지의 ScheduledTasks에서 가능
     */
    @Transactional
    public void ranking() {
        Map<Nation, List<User>> nationListMap = userRepo.findAll().stream().collect(Collectors.groupingBy(User::getNation));
        Ranking ranking;

        for (Map.Entry<Nation, List<User>> entry : nationListMap.entrySet()) {
            int point=0;

            for (User user : entry.getValue()) {
                point+=user.getClears().size();
            }

            ranking = rankingRepo.findByNation(entry.getKey()).orElse(new Ranking(entry.getKey(), 0));
            ranking.setClearCnt(point);

            rankingRepo.save(ranking);
        }
    }
}
