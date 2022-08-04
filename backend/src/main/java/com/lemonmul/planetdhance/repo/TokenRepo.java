package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Long> {
    Optional<Token> findByEmail(String email);
    Optional<Token> findByToken(String token);
    @Transactional
    void deleteByEmail(String email);
}
