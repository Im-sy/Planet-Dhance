package com.lemonmul.planetdhance.dto;

import com.lemonmul.planetdhance.entity.Clear;
import lombok.Data;

@Data
public class ClearDto {
    private String imgUrl;

    public ClearDto(Clear clear) {
        imgUrl=clear.getMusic().getImgUrl();
    }
}
