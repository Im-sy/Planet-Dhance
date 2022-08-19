package com.lemonmul.planetdhance.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class FileUtil {

    /**
     * 파일 생성용 유틸 함수
     *
     * inputFile: 저장하고 싶은 파일
     * path: 파일을 저장할 경로
     *
     * 사용 예시
     * String separator = File.separator;
     * String path = "tag" + separator + "img";
     *
     * String filePath = createFile(inputFile, path)
     */

    public static String createFilePath(MultipartFile inputFile, String path) throws IOException {
        String separator = File.separator;

        File tempFile = new File("");
        //TODO: separator 빼기
        String rootPath = tempFile.getAbsolutePath().split("src")[0] + separator + "resource";

        String savePath = rootPath + separator + path;

        if(!new File(savePath).exists()) {
            try {
                new File(savePath).mkdirs();
            }catch (Exception e) {
                e.printStackTrace();
            }
        }

        String originFileName = inputFile.getOriginalFilename();
        String saveFileName = UUID.randomUUID() + originFileName.substring(originFileName.lastIndexOf("."));

        String filePath = savePath + separator + saveFileName;
        inputFile.transferTo(new File(filePath));

        return filePath;
    }
}
