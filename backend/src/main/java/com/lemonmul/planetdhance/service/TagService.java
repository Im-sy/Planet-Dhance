package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.repo.TagRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    /**
     * 태그 조회
     *
     * 해당 아이디의 해시태그 조회 및 검색 횟수 증가
     */
    @Transactional
    public Tag findTagById(Long id,int page){
        //TODO Optional 처리
        Tag tag = tagRepo.findById(id).get();
        //검색 페이지 진입 시, 해시태그 검색 횟수 증가
        if(page==0){
            tag.addHit();
        }
        return tag;
    }

    public Tag findByNameAndType(String name,TagType type){
        return tagRepo.findByNameAndType(name, type);
    }
}
