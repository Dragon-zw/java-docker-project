var side = Vue.component('common-side', {
    data: function () {
        return { }
    },
    template:`        <div class="side_bar flt1">
            <div class="MAvatar">
                <div class="MAvaImg hasAva">
                    <img src="../images/CoNFk2NCexAgGyL9AALyM8kOCaE(1).jpeg" height="120" width="120" alt="大菠萝"><a href="/setting/avatar/" class="MAvaUp"><i class="Mphoto"></i></a>
                </div>
                <div class="MAvaName">大菠萝
                    <i class="MGenderMale"></i></div>
                <div class="its_tags">
                    <a href="/home/vip_show.php" target="_blank" title="VIP"><i class="vip"></i></a>
                    <a href="/rudder/info.php" target="_blank" title="分舵"><i class="duo"></i>
                    </a><a href="/qa/expert_apply.php?type=1" target="_blank" title="指路人"><i class="zhiluren"></i></a>
                </div>
                <div class="MAvaInfo clearfix MAvaMyInfo">
                    <span class="MAvaLevel flt1">等级：<a href="/rank/lv.php" title="Lv.3" target="_blank">Lv.3</a></span>
                    <span class="MAvaSet"><a title="设置" href="/setting/" target="_blank"></a></span>
                </div>
                <div class="MAvaMore clearfix">
                    <div class="MAvaNums">
                        <strong><a href="/friend/index/follow?uid=48455706" target="_blank">10</a></strong>
                        <p>关注</p>
                    </div>
                    <div class="MAvaNums">
                        <strong><a href="/friend/index/follow?uid=48455706&amp;flag=1" target="_blank">0</a></strong>
                        <p>粉丝</p>
                    </div>
                    <div class="MAvaNums last">
                        <strong><a href="/mall/" target="_blank">0</a></strong>
                        <p>蜂蜜</p>
                    </div>
                </div>
            </div>
            <div class="MUsers mfw-acc-hide">
                <div class="MUsersTitle">最新访客</div>
                <div class="MUsersDetail">
                    <ul class="clearfix">
                        <li>
                            <a href="/u/52634021.html" target="_blank"><img src="../images/CoNFEWND0wsSxYwCAAExzdENSSw.jpeg" height="48" width="48" alt="微笑" title="微笑"></a>
                            <p><a href="/u/52634021.html" target="_blank" title="微笑">微笑</a></p>
                        </li>
                        <li>
                            <a href="/u/82463101.html" target="_blank"><img src="../images/CoNCvmLhGvsEP_a2AABzt78wPg8.jpeg" height="48" width="48" alt="海纳百川" title="海纳百川"></a>
                            <p><a href="/u/82463101.html" target="_blank" title="海纳百川">海纳百川</a></p>
                        </li>
                    </ul>
                    <!--<div class="MSimplePages"><span class="MPrev" title="上一页"></span><span class="MNext" title="下一页"></span></div>-->
                </div>
                <div class="MUsersBehavior">
                    <span>累计访问<i>4</i></span><span>今日<i>0</i></span>
                </div>
            </div>
            <div class="MGuestbook mfw-acc-hide" id="_j_msgboard_wrap">
                <div class="MGuestTitle">留言板
                    <div class="MCloseFunction _j_msgboard_closer">
                        <i></i>
                        <div class="MTips MTipsRight">关闭我的留言板（不让其他人留言）</div>
                    </div>
                </div>
                <div class="MGuestInput">
                    <textarea class="_j_msgboard_area" placeholder="说点什么..."></textarea>
                    <a role="button" class="MGuestBtn" title="留言" id="_j_msgboard_submit">留言</a>
                </div>
                <div class="MGuestList">
                    <ul class="_j_msgboard_list">

                    </ul>
                </div>
            </div>
        </div>`
})
export default side