package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.service.TagService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/tag")
public class TagApi {

    private final TagService tagService;

    /**
     * 연관 검색어 리스트 반환 (검색 빈도순)
     *
     * 요청 파라미터 예시: /tag/{입력한 검색어}
     * 검색 빈도가 높은 검색어 순으로 정렬
     * size는 기본값 5
     */
    @GetMapping("/{searchStr}")
    public Slice<TagDto> searchTagList(@PathVariable String searchStr){
        //반환할 태그 개수
        int size=5;
        Slice<Tag> tagList = tagService.findTagByNameContaining(searchStr,size);
        return tagList.map(TagDto::new);
    }

    @Data
    static class TagDto{
        private Long id;
        private String name;
        private TagType type;
        private String imgUrl;

        public TagDto(Tag tag) {
            id=tag.getId();
            name=tag.getName();
            type=tag.getType();
            imgUrl=tag.getImgUrl();
        }
    }
}
