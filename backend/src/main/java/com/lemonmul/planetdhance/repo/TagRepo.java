package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Tag;
import com.lemonmul.planetdhance.entity.TagType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepo extends JpaRepository<Tag,Integer> {

    //해당 검색어 포함한 태그 리스트 (검색 빈도 순)
    Slice<Tag> findByNameContainingOrderByHitDesc(String searchStr, Pageable pageable);

    Tag findByNameAndType(String name, TagType type);
}
