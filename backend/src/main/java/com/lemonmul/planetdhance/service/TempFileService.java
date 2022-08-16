package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.TempFile;
import com.lemonmul.planetdhance.repo.TempFileRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class TempFileService {

    private final TempFileRepo tempFileRepo;

    @Transactional
    public boolean upload(MultipartFile inputFile) throws IOException {
        if(inputFile == null)
            return false;

        String filePath = createFile(inputFile);

        TempFile tempFile = new TempFile(filePath);
        tempFileRepo.save(tempFile);

        return true;
    }

    @Transactional
    public boolean uploadFileAndJson(MultipartFile inputFile,String jsonContent) throws IOException{
        log.debug("==============jsonContent: "+jsonContent);
        System.out.println("jsonContent = " + jsonContent);
        return upload(inputFile);
    }

    public String download(Long id) {
        TempFile findFile = tempFileRepo.findById(id).orElse(null);

        if(findFile == null)
            return "file not found";

        return findFile.getFileUrl();
    }

    public static String createFile(MultipartFile inputFile) throws IOException {
        String separator = File.separator;

        File tempFile = new File("");
        String rootPath = tempFile.getAbsolutePath().split("src")[0];

        String savePath = rootPath + "temp";
        
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
