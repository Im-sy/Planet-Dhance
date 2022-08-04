package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.repo.TagRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepo tagRepo;

    /**
     * 태그 리스트 - 검색어 포함
     */
    public Slice<Tag> findTagByNameContaining(String searchStr,int size){
        Pageable pageable= PageRequest.of(0,size);
        return tagRepo.findByNameContainingOrderByHitDesc(searchStr,pageable);
    }

    public Tag findTagById(int id){
        return tagRepo.findById(id).get();
    }

    public Tag findTagByNameAndType(String name, TagType type){
        return tagRepo.findByNameAndType(name,type);
    }
}
