package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClearRepo extends JpaRepository<Clear, Long> {
    /*
     * myPage -> clear 테이블에서 user_id와 일치하는 거 찾기 -> 해당하는 music 반환
     * */
    List<Clear> findClearsByUserOrderByIdDesc(User user);

}
