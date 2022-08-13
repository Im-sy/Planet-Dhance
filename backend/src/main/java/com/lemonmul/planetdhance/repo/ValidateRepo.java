package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Validate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ValidateRepo extends JpaRepository<Validate, Long> {
    Optional<Validate> findByUserId(Long userId);
    Optional<Validate> findByToken(String validate);

    void deleteByUserId(Long userId);

}
