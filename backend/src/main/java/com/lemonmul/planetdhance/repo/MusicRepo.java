package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicRepo extends JpaRepository<Music, Long> {

    // 없는 music 을 반환할 일은 없으니까 Optional 은 아닌가?
    Optional<Music> findById(Integer id);

}
