package cn.wolfcode.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleStatVo {

    public static final String VIEW_NUM = "viewnum";
    public static final String REPLAY_NUM = "replynum";
    public static final String FAVOR_NUM = "favornum";
    public static final String SHARE_NUM = "sharenum";
    public static final String THUMBS_NUM = "thumbsupnum";

    private Long articleId;
    private int viewnum; // 阅读数
    private int replynum; // 评论数
    private int favornum; // 收藏数
    private int sharenum; // 分享数
    private int thumbsupnum; // 置顶数
}
