package com.lemonmul.planetdhance.entity.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUpdateRequest {

    private String email;
    private String introduce;
    private String nationName;
}
