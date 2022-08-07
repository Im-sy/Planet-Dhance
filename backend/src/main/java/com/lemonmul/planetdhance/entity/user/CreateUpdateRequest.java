package com.lemonmul.planetdhance.entity.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUpdateRequest {

    private String email;
    private String introduce;
    private String imgUrl;
    private String nationName;
}
