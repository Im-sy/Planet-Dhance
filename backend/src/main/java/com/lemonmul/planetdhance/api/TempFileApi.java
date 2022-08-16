package com.lemonmul.planetdhance.api;


import com.lemonmul.planetdhance.service.TempFileService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@Slf4j
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

    @PostMapping(value = "/upload/file_json",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public boolean uploadFileAndJson(@RequestPart MultipartFile inputFile,@RequestPart SampleJson sampleJson) throws IOException{
        return tempFileService.uploadFileAndJson(inputFile,sampleJson.content);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class SampleJson{
        private String content;
    }
}
