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
    
    public Slice<Ranking> getRanking() {
        Pageable pageable= PageRequest.of(0,10);
        return rankingRepo.findByOrderByClearCntDesc(pageable);
    }

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
