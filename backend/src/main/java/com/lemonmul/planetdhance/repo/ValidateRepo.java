package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Validate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ValidateRepo extends JpaRepository<Validate, Long> {
    Optional<Validate> findByEmail(String email);
    Optional<Validate> findByToken(String validate);
    @Transactional
    void deleteByEmail(String email);
}
