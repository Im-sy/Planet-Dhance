package com.lemonmul.planetdhance.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="ranking_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Nation nation;

    private int clearCnt;

    public Ranking(Nation nation, int clearCnt) {
        this.nation = nation;
        this.clearCnt = clearCnt;
    }

    public void setClearCnt(int clearCnt) {
        this.clearCnt = clearCnt;
    }
}
