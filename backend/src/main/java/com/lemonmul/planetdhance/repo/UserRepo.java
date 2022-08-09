package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.user.Social;
import com.lemonmul.planetdhance.entity.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    @Query("from Social")
    Optional<Social> findByOauth2Sub(String oauth2Sub);

    //팔로우한 유저 정보 (영상 갱신일 순)
    Slice<User> findByTosInOrderByRenewDateDesc(List<Follow> tos, Pageable pageable);
}
