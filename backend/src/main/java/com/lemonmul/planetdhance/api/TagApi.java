package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.MusicService;
import com.lemonmul.planetdhance.service.TagService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/tag")
public class TagApi {

    private final TagService tagService;
    private final MusicService musicService;
    private final VideoService videoService;

    private static final int tagSize=5;
    private static final int videoSize=18;

    /**
     * 연관 검색어 리스트 반환 (검색 빈도순)
     *
     * 요청 파라미터 예시: /tag/{입력한 검색어}
     * 검색 빈도가 높은 검색어 순으로 정렬
     * size는 기본값 5
     */
    @GetMapping("/{searchStr}")
    public Slice<TagDto> searchTagList(@PathVariable String searchStr){
        Slice<Tag> tagList = tagService.findTagByNameContaining(searchStr,tagSize);
        return tagList.map(TagDto::new);
    }

    /**
     * 가수 태그의 곡 리스트,영상 리스트 반환 (hit&like순) - 가수 검색 페이지 진입
     *
     * 요청 파라미터 예시: /tag/artist/{해시태그 아이디}
     * 곡 리스트는 전체
     * 영상 리스트 size는 기본값 18
     */
    @GetMapping("/artist/{tag_id}")
    public TagPageResponse musicsAndArtistVideos(@PathVariable Long tag_id){
        Tag tag = tagService.findTagById(tag_id);
        List<Music> musicList = musicService.findArtistVideoList(tag.getName());
        int page=0;
        Slice<Video> videoList = videoService.findHitLikeVideoListByMusicList(page, videoSize, musicList, VideoScope.PUBLIC);
        return new TagPageResponse(musicList,videoList);
    }

    /**
     * 가수 태그의 영상 리스트 반환 (hit&like순) - 가수 검색 페이지 무한 스크롤
     *
     * 요청 파라미터 예시: /tag/artist/{해시태그 아이디}/{page번호}
     * 영상 리스트 size는 기본값 18
     */
    @GetMapping("/artist/{tag_id}/{page}")
    public Slice<VideoDto> artistVideos(@PathVariable Long tag_id,@PathVariable int page){
        Tag tag = tagService.findTagById(tag_id);
        List<Music> musicList = musicService.findArtistVideoList(tag.getName());
        Slice<Video> videoList = videoService.findHitLikeVideoListByMusicList(page, videoSize, musicList, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
    }

    /**
     * 곡 태그의 곡 리스트,영상 리스트 반환 (hit&like순) - 곡 검색 페이지 진입
     *
     * 요청 파라미터 예시: /tag/music/{해시태그 아이디}
     * 곡 리스트는 전체
     * 영상 리스트 size는 기본값 18
     */
    @GetMapping("/music/{tag_id}")
    public TagPageResponse musicsAndMusicVideos(@PathVariable Long tag_id){
        Tag tag = tagService.findTagById(tag_id);
        List<Music> musicList = musicService.findTitleVideoList(tag.getName());
        int page=0;
        Slice<Video> videoList = videoService.findHitLikeVideoListByMusicList(page, videoSize, musicList, VideoScope.PUBLIC);
        return new TagPageResponse(musicList,videoList);
    }

    /**
     * 곡 태그의 영상 리스트 반환 (hit&like순) - 곡 검색 페이지 무한 스크롤
     *
     * 요청 파라미터 예시: /tag/music/{해시태그 아이디}/{page번호}
     * 영상 리스트 size는 기본값 18
     */
    @GetMapping("/music/{tag_id}/{page}")
    public Slice<VideoDto> musicVideos(@PathVariable Long tag_id,@PathVariable int page){
        Tag tag = tagService.findTagById(tag_id);
        List<Music> musicList = musicService.findTitleVideoList(tag.getName());
        Slice<Video> videoList = videoService.findHitLikeVideoListByMusicList(page, videoSize, musicList, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
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

    @Data
    static class TagPageResponse{
        List<MusicDto> musicList;
        Slice<VideoDto> videoList;

        public TagPageResponse(List<Music> musicList, Slice<Video> videoList) {
            this.musicList = musicList.stream().map(MusicDto::new).collect(Collectors.toList());
            this.videoList = videoList.map(VideoDto::new);
        }
    }

    @Data
    static class MusicDto{
        private Long id;
        private String title;
        private String artist;
        private String imgUrl;

        public MusicDto(Music music) {
            id=music.getId();
            title=music.getTitle();
            artist=music.getArtist();
            imgUrl=music.getImgUrl();
        }
    }
}
