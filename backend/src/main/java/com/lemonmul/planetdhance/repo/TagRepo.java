package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Tag;
import com.lemonmul.planetdhance.entity.TagType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepo extends JpaRepository<Tag,Integer> {

    Tag findByNameAndType(String name, TagType type);
}
