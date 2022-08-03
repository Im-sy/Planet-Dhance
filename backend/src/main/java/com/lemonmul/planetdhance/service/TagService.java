package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Tag;
import com.lemonmul.planetdhance.entity.TagType;
import com.lemonmul.planetdhance.repo.TagRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepo tagRepo;

    public Tag findTagById(int id){
        return tagRepo.findById(id).get();
    }

    public Tag findTagByNameAndType(String name, TagType type){
        return tagRepo.findByNameAndType(name,type);
    }
}
