package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.user.Social;
import com.lemonmul.planetdhance.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    @Query("from Social")
    Optional<Social> findByOauth2Sub(String oauth2Sub);
}
