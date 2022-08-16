package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArtistRepo extends JpaRepository<Artist,Long> {

    Optional<Artist> findByName(String name);

    List<Artist> findTop5ByOrderByOrderWeightDesc();
}
