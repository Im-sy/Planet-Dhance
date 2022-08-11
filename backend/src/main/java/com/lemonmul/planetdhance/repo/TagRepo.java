package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepo extends JpaRepository<Tag,Long> {

    //해당 검색어 포함한 태그 리스트 (검색 빈도 순)
    Slice<Tag> findByNameContainingOrderByHitDesc(String searchStr, Pageable pageable);

    //TODO 여러 값 반환 가능한 점 수정
    Tag findByNameAndType(String name, TagType type);

    Optional<Tag> findByName(String name);
}
