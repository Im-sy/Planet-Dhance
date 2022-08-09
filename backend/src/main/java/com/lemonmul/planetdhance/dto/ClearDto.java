package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.Clear;
import lombok.Data;

@Data
public class ClearDto {
    private String title;
    private String imgUrl;

    public ClearDto(Clear clear) {
        title=clear.getMusic().getTitle();
        imgUrl=clear.getMusic().getImgUrl();
    }
}
