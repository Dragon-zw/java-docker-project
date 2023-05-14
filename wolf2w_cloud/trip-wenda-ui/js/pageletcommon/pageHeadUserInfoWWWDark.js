/* global unescape */
M.define('/js/pageletcommon/pageHeadUserInfoWWWDark', function(require) {
    var Env = window.Env || {};
    return {
        events: {},
        init: function() {
            $('._j_hoverclass').hover(function(ev) {
                var target = $(ev.currentTarget);
                target.addClass(target.data('hoverclass'));
            }, function(ev) {
                var target = $(ev.currentTarget);
                target.removeClass(target.data('hoverclass'));
            });

            // 打卡
            M.Event.on('afterDaka', function() {
                $('#_j_dakabtn').addClass('daka_complete');
            });

            var msgNum = 0,
                newMsgDOM = $("#head-new-msg"),
                msgBoxDOM = $('#head-msg-box');
            M.Event.on('get new msg', function(res) {
                if(res.msg || msgNum > 0) {
                    newMsgDOM.html(res.msg);
                    msgBoxDOM.html(res.menu);
                }
            });
            newMsgDOM.on('click', 'p a', function(ev) {
                M.Event.fire('update msg');
            });
            newMsgDOM.on('click', '.new-msg-close', close_msg_tips);
            newMsgDOM.delegate('._j_popcloser', 'click', function(ev) {
                ev.preventDefault();
                var target = $(ev.currentTarget);
                if(target.data('popclass')) {
                    target.closest('.'+target.data('popclass')).hide();
                }
            });
            function close_msg_tips(){
                newMsgDOM.remove();
                $.ajax({
                    'url': 'http://'+Env.WWW_HOST+'/ajax/ajax_msg.php',
                    'dataType': 'jsonp',
                    'data': {'a': 'ignore', 'from': '1'},
                    'success': function(res) {
                        //msgBoxDOM.html(res.html);
                        M.Event.fire('update msg');
                    }
                });
            }
            // 更新消息数量与消息浮窗
            function updateMsg() {
                msgNum = 0;
                newMsgDOM.find('p a').each(function(idx, ele) {
                    var $link = $(ele);
                    msgNum += Number($link.data('num'));
                });
            }
            updateMsg();
        }
    };
});
