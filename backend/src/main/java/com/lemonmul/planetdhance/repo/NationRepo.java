package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NationRepo extends JpaRepository<Nation, Long> {

    Optional<Nation> findByName(String name);
}
