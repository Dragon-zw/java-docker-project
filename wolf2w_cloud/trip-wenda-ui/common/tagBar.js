var tagBar = Vue.component('tag-counter', {
    template: ` <div class="tags_bar second_tags_bar">
                <div class="center clearfix">
                    <ul class="flt2">
                        <li><a class="tags_link" href="/u/48455706.html" title="我的窝">我的窝</a></li>
                        <li class="mfw-acc-hide"><a class="tags_link" href="/u/48455706/note.html" title="我的游记">我的游记</a></li>
                        <li class="mfw-acc-hide on"><a class="tags_link" href="/wenda/u/48455706/answer.html" title="我的问答">我的问答</a></li>
                        <li class="mfw-acc-hide" id="_j_pathnav"><a class="tags_link" href="/path/48455706.html" title="我的足迹">我的足迹</a></li>
                        <li class="mfw-acc-hide"><a class="tags_link" href="/u/48455706/review.html" title="我的点评">我的点评</a></li>
                        <li class="more mfw-acc-hide ">
                            <span class="tags_link" role="button" title="更多" style="cursor:default">更多<i class="MDownMore"></i></span>
                            <div class="tags_more_list">
                                <ul>
                                    <li data-cs-t="go_to_activity"><a href="/indexactivity/index.php" title="我的活动" data-cs-p="activity"><i class="ico_activity"></i><span>我的活动</span></a></li>
                                    <li><a href="/home/g/my.php" title="我的小组"><i class="ico_group"></i><span>我的小组</span></a></li>
                                    <li><a href="/plan/fav.php" title="我的收藏"><i class="ico_collect"></i><span>我的收藏</span></a></li>
                                    <li><a href="/order_center/" title="我的订单"><i class="ico_order"></i><span>我的订单</span></a></li>
                                    <li><a href="/sales/coupon.php" title="我的优惠券"><i class="ico_ticket"></i><span>我的优惠券</span></a></li>
                                    <li><a href="/mall/my_exchange.php" title="我的兑换"><i class="ico_exchange"></i><span>我的兑换</span></a></li>
                                    <li><a href="/flight/passengers.php" title="常用信息"><i class="ico_information"></i><span>常用信息</span></a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>`
})
export default tagBar