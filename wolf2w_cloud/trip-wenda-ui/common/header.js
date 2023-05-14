var commomheader = Vue.component('common-header', {
           data: function () {
               return {
                   navData: [
                       {name: '首页', url: '#'},
                       {name: '目的地', url: '#'},
                       {name: '攻略', url: '#'},
                       {name: '游记', url: '#'},
                       {name: '问答', url: '/wenda/hot.html'},
                       {name: '周边', url: '#'}],
                   moreMsg: false, // 消息下拉更多选项
                   userSet: false, // 用户头像下拉选项
               }

           },
    template:`<div class="topBarC">
            <div class="logo"><a title="狼行天下自由行" href="/">狼行天下自由行</a></div>
            <div class="t_nav mfw-acc-hide">
                <ul id="pnl_nav">
                    <li v-for="(item, index) in navData" :key="index">
                        <strong class="t"><a :href="item.url">{{item.name}}</a></strong>
                    </li>
                </ul>
            </div>
            <div class="t_search mfw-acc-hide">
                <form method="GET" action="/search/q" name="search">
                    <input type="text" class="key" value="" name="q" id="word">
                    <input type="submit" value="" class="btn">
                </form>
            </div>
            <div class="t_info">
                <div id="pagelet-block-55d3a63a50ab3053857a2aa22b8257c0" class="pagelet-block"
                     data-api="apps:user:pagelet:pageViewHeadInfo" data-params="{&quot;type&quot;:2}"
                     data-async="1" data-controller="/js/pageletcommon/pageHeadUserInfoWWWDark">
                    <ul class="user_info">
                        <li class="daka mfw-acc-hide">
                        <span class="daka_btn" id="_j_dakabtn" data-japp="daka">
                            <a role="button" title="打卡" class="daka_before">打卡</a>
                            <a role="button" title="打卡推荐" class="daka_after">打卡推荐</a>
                        </span>
                        </li>
                        <li id="pnl_user_msg" data-hoverclass="on" class="msg _j_hoverclass mfw-acc-hide" @mouseleave="moreMsg = false">
                            <span class="oldmsg" @mouseenter="moreMsg = true"><a href="javascript:" class="infoItem">消息<b></b></a></span>
                            <ul class="drop-bd" v-if="moreMsg">
                                <li><a href="/msg/sms/index" rel="nofollow">私信</a></li>
                                <li><a href="/msg/entry/group" rel="nofollow">小组消息</a></li>
                                <li><a href="/msg/entry/sys" rel="nofollow">系统通知</a></li>
                                <li><a href="/msg/entry/ask" rel="nofollow">问答消息</a></li>
                                <li><a href="/msg/entry/reply" rel="nofollow">回复消息</a></li>
                                <li><a href="/msg/entry/fav" rel="nofollow">喜欢与收藏</a></li>
                                <li><a href="/msg/entry/friends" rel="nofollow">好友动态</a></li>
                            </ul>
                        </li>
                        <li class="ub-item ub-new-msg mfw-acc-hide" id="head-new-msg"></li>
                        <li class="account _j_hoverclass" data-hoverclass="on" id="pnl_user_set" @mouseleave="userSet = false">
                        <span class="t" @mouseenter="userSet = true">
                            <a class="infoItem" href="/user/wo.html">
                                <img src="/images/CoNFk2NCexAgGyL9AALyM8kOCaE.jpeg" width="32" height="32" align="absmiddle">
                                <b></b>
                            </a>
                        </span>
                            <div class="uSet c" v-if="userSet">
                                <div class="asset mfw-acc-hide">
                                    <a class="coin" href="/user/coin" target="_blank" id="head-my-honey" rel="nofollow" data-cs-p="coin">金币 2297</a>
                                </div>
                                <a class="mfw-acc-hide" href="/user/wo.html">我的窝<b class="tb-level">LV.3</b></a>
                                <a href="/travel/create_index.html" target="_blank">写游记</a>
                                <a class="mfw-acc-hide" href="/path/48455706.html" target="_blank">我的足迹</a>
                                <a class="mfw-acc-hide" href="/user/question.html" target="_blank">我的问答</a>
                                <a class="mfw-acc-hide" href="/user/friend.html" target="_blank">我的好友</a>
                                <a class="mfw-acc-hide" href="/user/fav.html" target="_blank">我的收藏</a>
                                <a class="mfw-acc-hide" href="/user/route.html" target="_blank">我的路线</a>
                                <a href="/user/setting.html" target="_blank">设置</a>
                                <a href="logout.html">退出</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`
})
export default commomheader