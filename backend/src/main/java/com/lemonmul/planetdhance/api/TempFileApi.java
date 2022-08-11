package com.lemonmul.planetdhance.api;


import com.lemonmul.planetdhance.service.TempFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class TempFileApi {

    private final TempFileService tempFileService;

    @PostMapping("/upload")
    public boolean upload(@RequestPart MultipartFile inputFile) throws IOException {
        return tempFileService.upload(inputFile);
    }

    @GetMapping("/download/{id}")
    public String download(@PathVariable Long id) {
        return tempFileService.download(id);
    }
}
