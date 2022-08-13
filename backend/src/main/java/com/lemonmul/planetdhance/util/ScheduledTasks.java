package com.lemonmul.planetdhance.util;

import com.lemonmul.planetdhance.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {

    private final RankingService rankingService;

    @Scheduled(cron = "0 0 4 * * *")
    public void reNewRanking(){
        rankingService.ranking();
    }
}
