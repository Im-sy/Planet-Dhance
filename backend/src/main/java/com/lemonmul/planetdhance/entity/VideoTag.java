package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoTag {

    @Id @GeneratedValue
    @Column(name ="video_tag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    //==생성 메서드==//
    public static VideoTag createVideoTag(Video video,Tag tag){
        VideoTag videoTag=new VideoTag();
        videoTag.setVideo(video);
        videoTag.setTag(tag);
        return videoTag;
    }

    //==연관관계 메서드==//
    private void setVideo(Video video){
        this.video=video;
        video.getVideoTags().add(this);
    }

    private void setTag(Tag tag){
        this.tag=tag;
        tag.getVideoTags().add(this);
    }
}
