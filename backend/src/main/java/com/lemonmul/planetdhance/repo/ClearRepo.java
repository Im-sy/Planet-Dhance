package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Clear;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClearRepo extends JpaRepository<Clear, Long> {
    /*
    * mypage -> clear 테이블에서 user_id와 일치하는 거 찾기 -> 해당하는 music 반환
    * */
    List<Clear> findClearsByUserOrderByMusicRelDate();

}
