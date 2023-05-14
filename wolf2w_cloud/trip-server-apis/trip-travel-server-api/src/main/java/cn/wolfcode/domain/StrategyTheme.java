package cn.wolfcode.domain;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * 攻略主题
 */
@Setter
@Getter
@TableName("strategy_theme")
public class StrategyTheme extends BaseDomain {
    public static final int STATE_NORMAL = 0; //正常
    public static final int STATE_DISABLE = 1; //禁用

    private String name;  //主题名称
    private int state = STATE_NORMAL; //主题状态

    private int seq; //序号
}
