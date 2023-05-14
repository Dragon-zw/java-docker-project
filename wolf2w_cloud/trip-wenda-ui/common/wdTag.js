var wdTag = Vue.component('wd-tag-counter', {
    data: function () {
        return {
            rankingList: [{
                img: '/images/wKgBs1ekuy2ARlCKAAp7bpZpj_s50.jpeg',
                name: '大愿尊者',
                Grade: 'LV.39',
                num: 11
            },{
                img: '/images/wKgBEFtNtMOAF2phABK4RfvC81I30(1).jpeg',
                name: '伊丽莎白',
                Grade: 'LV.27',
                num: 4
            },{
                img: '/images/wKgBs1gUWq-AUwLXADW3jeHcKXA49.jpeg',
                name: '蓝天',
                Grade: 'LV.45',
                num: 3
            },{
                img: '/images/CoUBUl6dWAKAccH4AAEIb19Dx6I54(1).jpeg',
                name: '敦煌漠葛旅行',
                Grade: 'LV.40',
                num: 3
            },{
                img: '/images/wKgBs1hDRPSANLqwAAuYhW5lIpQ86.jpeg',
                name: '乐雅派',
                Grade: 'LV.45',
                num: 3
            },{
                img: '/images/CoNGLGL2gY0dmRVAAAHIM8kvXOk.jpeg',
                name: '伊春斌子旅行',
                Grade: 'LV.43',
                num: 2
            },{
                img: '/images/wKgBZ1l0wXeACHSfABtI54gDFdw05.jpeg',
                name: '草本容2',
                Grade: 'LV.37',
                num: 2
            },{
                img: '/images/CoUBUmFec4-ATSQkAASJmE-Vbzo37(1).jpeg',
                name: 'Una8',
                Grade: 'LV.22',
                num: 2
            },{
                img: '/images/wKgED1uaFz2AVr7nAAtsXSVPuDE81.jpeg',
                name: '游走丹猫',
                Grade: 'LV.45',
                num: 2
            },{
                img: '/images/CoNCDGLBrFVx3x9EAATQhL53xVk.jpeg',
                name: '莉漫游',
                Grade: 'LV.36',
                num: 2
            }]
        }
    },
    template: `<div class="col-side">
             <div class="i-ask"><a href="/wenda/publish.html" class="btn-ask btn-ask2" target="_blank"><i></i>我要提问</a></div>
        <div class="i_total">
            <div class="i_total" data-cs-t="wenda">
                <div class="mod mod-slide _j_slide">
                    <ul class="slide-img _j_slide_img" data-cs-p="topic_recommend_pic">
                        <li data-qid="18411223" style="display: none;">
                            <span><a target="_blank" href="/wenda/detail.html"><img src="../images/wKgBs12B9giAUUdaAADar4FZtQk984.jpg"></a></span>
                            <h3><a target="_blank" href="/wenda/detail.html">如何省钱/赚钱保持常年旅行？</a></h3>
                        </li>
                        <li data-qid="15190722" style="display: list-item;">
                            <span><a target="_blank" href="/wenda/detail.html"><img src="../images/wKgEaVx2WNSATa4-AADhkqCkWA468.jpeg"></a></span>
                            <h3><a target="_blank" href="/wenda/detail.html">坐飞机应如何挑选到好座位？</a></h3>
                        </li>
                        <li data-qid="15453646" style="display: none;">
                            <span><a target="_blank" href="/wenda/detail.html"><img src="../images/wKgED12B91uAfmgeAAD8bvp7kT0659.jpg"></a></span>
                            <h3><a target="_blank" href="/wenda/detail.html">有什么APP可以拯救废片？</a></h3>
                        </li>
                    </ul>
                    <div class="slide-trigger" id="_j_slide_btn">
                        <span class="" data="0"></span>
                        <span data="1" class="on"></span>
                        <span data="2" class=""></span>
                    </div>
                </div>
            </div>
            <div class="i_num">共<span id="q_total">5180187</span>问题<span id="u_total">9332719</span>人参与</div>
        </div>
            <dl class="i-tags tag-area _j_tags">
                <dt>问答热门地区</dt>
                <dd class="clearfix">
                    <div class="label">境外</div>
                    <ul class="_j_open_mdd_list">
                    </ul>
                </dd>
                <dd class="clearfix">
                    <div class="label">境内</div>
                    <ul class="_j_open_mdd_list">
                    </ul>
                </dd>
            </dl>
            <div class="rank _j_rank" style="margin-top: 20px;">
                <div class="hd">排行榜
                    <ul class="tab-time">
                        <li class="_j_rank_change_date" data-type="0"><span>今日</span></li>
                        <li class="_j_rank_change_date" data-type="1"><span>本周</span></li>
                        <li class="_j_rank_change_date on" data-type="2"><span>本月</span></li>
                    </ul>
                </div>
                <div class="bd">
                    <ul class="tab-num" data-cs-p="rank_list">
                        <li class="on _j_rank_change_flag" data-rank="0" data-cs-d="金牌数">金牌数</li>
                        <li class="_j_rank_change_flag" data-rank="1" data-cs-d="回答数">回答数</li>
                        <li class="_j_rank_change_flag" data-rank="2" data-cs-d="被顶次数">被顶次数</li>

                    </ul>
                    <ul class="rank-list _j_rank_list">
                        <li class="clearfix" 
                        v-for="(item, index) in rankingList" 
                        :class="{'r-top': index < 3, 'r-top2': index === 1,  'r-top3': index === 2}">
                            <em class="num">{{index+1}}</em>
                            <div class="user no_qid">
                                <a class="avatar" href="/user/answer.html" target="_blank" rel="nofollow"><img :src="item.img"></a>
                                <span class="name"><a href="/user/answer.html" target="_blank" rel="nofollow">{{item.name}}</a></span>
                                <span class="level"><a href="/user/answer.html" target="_blank" rel="nofollow">{{item.Grade}}</a></span>
                            </div>
                            <span class="num">{{item.num}}</span>
                        </li>
                    </ul>
                </div>
            </div>
</div>`
})
export default wdTag