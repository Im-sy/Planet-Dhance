package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.video.VideoScope;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeRequest{
    private VideoScope scope;
    private Long userId;
    private Long musicId;
    private boolean clear;
    private List<TagRequestDto> tagList;
}