package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.Ranking;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RankingRepo extends JpaRepository<Ranking, Long> {

    Optional<Ranking> findByNation(Nation nation);

    Slice<Ranking> findByOrderByClearCntDesc(Pageable pageable);
}
