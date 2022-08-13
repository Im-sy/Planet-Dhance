package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LikeApi {

    private final LikeService likeService;

    /**
     * 좋아요 추가
     *
     * 요청 파라미터 예시: /like/{로그인 사용자 아이디}/{비디오 아이디}
     * TODO 마지막에 나가는 update video 쿼리 뭐때문인지 확인하기
     */
    @PostMapping("/like/{user_id}/{video_id}")
    public ResponseEntity<?> addLike(@PathVariable Long user_id, @PathVariable Long video_id){
        try {
            return new ResponseEntity<>(likeService.addLike(user_id,video_id), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 좋아요 취소
     *
     * 요청 파라미터 예시: /unlike/{로그인 사용자 아이디}/{비디오 아이디}
     */
    @DeleteMapping("/unlike/{user_id}/{video_id}")
    public ResponseEntity<?> removeLike(@PathVariable Long user_id,@PathVariable Long video_id){
        try {
            return new ResponseEntity<>(likeService.removeLike(user_id,video_id), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
