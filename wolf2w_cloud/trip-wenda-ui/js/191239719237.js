M.define("/js/pageletcommon/pageHeadUserInfoWWWDark", function (b) {
    var a = window.Env || {};
    return {
        events: {}, init: function () {
            $("._j_hoverclass").hover(function (h) {
                var i = $(h.currentTarget);
                i.addClass(i.data("hoverclass"))
            }, function (h) {
                var i = $(h.currentTarget);
                i.removeClass(i.data("hoverclass"))
            });
            M.Event.on("afterDaka", function () {
                $("#_j_dakabtn").addClass("daka_complete")
            });
            var g = 0, f = $("#head-new-msg"), e = $("#head-msg-box");
            M.Event.on("get new msg", function (h) {
                if (h.msg || g > 0) {
                    f.html(h.msg);
                    e.html(h.menu)
                }
            });
            f.on("click", "p a", function (h) {
                M.Event.fire("update msg")
            });
            f.on("click", ".new-msg-close", d);
            f.delegate("._j_popcloser", "click", function (h) {
                h.preventDefault();
                var i = $(h.currentTarget);
                if (i.data("popclass")) {
                    i.closest("." + i.data("popclass")).hide()
                }
            });

            function d() {
                f.remove();
                $.ajax({
                    url: "http://" + a.WWW_HOST + "/ajax/ajax_msg.php", dataType: "jsonp", data: {a: "ignore", from: "1"}, success: function (h) {
                        M.Event.fire("update msg")
                    }
                })
            }

            function c() {
                g = 0;
                f.find("p a").each(function (h, j) {
                    var i = $(j);
                    g += Number(i.data("num"))
                })
            }

            c()
        }
    }
});
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function (i, f) {
    var t = i.fn.domManip, h = "_tmplitem", u = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, p = {}, e = {}, y, x = {key: 0, data: {}}, w = 0, q = 0, g = [];

    function k(B, A, D, E) {
        var C = {
            data: E || (E === 0 || E === false) ? E : (A ? A.data : {}),
            _wrap: A ? A._wrap : null,
            tmpl: null,
            parent: A || null,
            nodes: [],
            calls: c,
            nest: b,
            wrap: n,
            html: r,
            update: z
        };
        if (B) {
            i.extend(C, B, {nodes: [], parent: A})
        }
        if (D) {
            C.tmpl = D;
            C._ctnt = C._ctnt || C.tmpl(i, C);
            C.key = ++w;
            (g.length ? e : p)[w] = C
        }
        return C
    }

    i.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (A, B) {
        i.fn[A] = function (C) {
            var F = [], I = i(C), E, G, D, J, H = this.length === 1 && this[0].parentNode;
            y = p || {};
            if (H && H.nodeType === 11 && H.childNodes.length === 1 && I.length === 1) {
                I[B](this[0]);
                F = this
            } else {
                for (G = 0, D = I.length; G < D; G++) {
                    q = G;
                    E = (G > 0 ? this.clone(true) : this).get();
                    i(I[G])[B](E);
                    F = F.concat(E)
                }
                q = 0;
                F = this.pushStack(F, A, I.selector)
            }
            J = y;
            y = null;
            i.tmpl.complete(J);
            return F
        }
    });
    i.fn.extend({
        tmpl: function (C, B, A) {
            return i.tmpl(this[0], C, B, A)
        }, tmplItem: function () {
            return i.tmplItem(this[0])
        }, template: function (A) {
            return i.template(A, this[0])
        }, domManip: function (E, H, G, I) {
            if (E[0] && i.isArray(E[0])) {
                var B = i.makeArray(arguments), A = E[0], F = A.length, C = 0, D;
                while (C < F && !(D = i.data(A[C++], "tmplItem"))) {
                }
                if (D && q) {
                    B[2] = function (J) {
                        i.tmpl.afterManip(this, J, G)
                    }
                }
                t.apply(this, B)
            } else {
                t.apply(this, arguments)
            }
            q = 0;
            if (!y) {
                i.tmpl.complete(p)
            }
            return this
        }
    });
    i.extend({
        tmpl: function (C, F, E, B) {
            var D, A = !B;
            if (A) {
                B = x;
                C = i.template[C] || i.template(null, C);
                e = {}
            } else {
                if (!C) {
                    C = B.tmpl;
                    p[B.key] = B;
                    B.nodes = [];
                    if (B.wrapped) {
                        s(B, B.wrapped)
                    }
                    return i(m(B, null, B.tmpl(i, B)))
                }
            }
            if (!C) {
                return []
            }
            if (typeof F === "function") {
                F = F.call(B || {})
            }
            if (E && E.wrapped) {
                s(E, E.wrapped)
            }
            D = i.isArray(F) ? i.map(F, function (G) {
                return G ? k(E, B, C, G) : null
            }) : [k(E, B, C, F)];
            return A ? i(m(B, null, D)) : D
        }, tmplItem: function (B) {
            var A;
            if (B instanceof i) {
                B = B[0]
            }
            while (B && B.nodeType === 1 && !(A = i.data(B, "tmplItem")) && (B = B.parentNode)) {
            }
            return A || x
        }, template: function (B, A) {
            if (A) {
                if (typeof A === "string") {
                    A = l(A)
                } else {
                    if (A instanceof i) {
                        A = A[0] || {}
                    }
                }
                if (A.nodeType) {
                    A = i.data(A, "tmpl") || i.data(A, "tmpl", l(A.innerHTML))
                }
                return typeof B === "string" ? (i.template[B] = A) : A
            }
            return B ? (typeof B !== "string" ? i.template(null, B) : (i.template[B] || i.template(null, u.test(B) ? B : i(B)))) : null
        }, encode: function (A) {
            return ("" + A).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    i.extend(i.tmpl, {
        tag: {
            tmpl: {_default: {$2: "null"}, open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"},
            wrap: {_default: {$2: "null"}, open: "$item.calls(__,$1,$2);__=[];", close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"},
            each: {_default: {$2: "$index, $value"}, open: "if($notnull_1){$.each($1a,function($2){with(this){", close: "}});}"},
            "if": {open: "if(($notnull_1) && $1a){", close: "}"},
            "else": {_default: {$1: "true"}, open: "}else if(($notnull_1) && $1a){"},
            html: {open: "if($notnull_1){__.push($1a);}"},
            "=": {_default: {$1: "$data"}, open: "if($notnull_1){__.push($.encode($1a));}"},
            "!": {open: ""}
        }, complete: function (A) {
            p = {}
        }, afterManip: function v(C, A, D) {
            var B = A.nodeType === 11 ? i.makeArray(A.childNodes) : A.nodeType === 1 ? [A] : [];
            D.call(C, A);
            o(B);
            q++
        }
    });

    function m(A, E, C) {
        var D, B = C ? i.map(C, function (F) {
            return (typeof F === "string") ? (A.key ? F.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + h + '="' + A.key + '" $2') : F) : m(F, A, F._ctnt)
        }) : A;
        if (E) {
            return B
        }
        B = B.join("");
        B.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (G, H, F, I) {
            D = i(F).get();
            o(D);
            if (H) {
                D = a(H).concat(D)
            }
            if (I) {
                D = D.concat(a(I))
            }
        });
        return D ? D : a(B)
    }

    function a(B) {
        var A = document.createElement("div");
        A.innerHTML = B;
        return i.makeArray(A.childNodes)
    }

    function l(A) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + i.trim(A).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (I, C, G, D, E, J, F) {
            var L = i.tmpl.tag[G], B, H, K;
            if (!L) {
                throw"Unknown template tag: " + G
            }
            B = L._default || [];
            if (J && !/\w$/.test(E)) {
                E += J;
                J = ""
            }
            if (E) {
                E = j(E);
                F = F ? ("," + j(F) + ")") : (J ? ")" : "");
                H = J ? (E.indexOf(".") > -1 ? E + j(J) : ("(" + E + ").call($item" + F)) : E;
                K = J ? H : "(typeof(" + E + ")==='function'?(" + E + ").call($item):(" + E + "))"
            } else {
                K = H = B.$1 || "null"
            }
            D = j(D);
            return "');" + L[C ? "close" : "open"].split("$notnull_1").join(E ? "typeof(" + E + ")!=='undefined' && (" + E + ")!=null" : "true").split("$1a").join(K).split("$1").join(H).split("$2").join(D || B.$2 || "") + "__.push('"
        }) + "');}return __;")
    }

    function s(B, A) {
        B._wrap = m(B, true, i.isArray(A) ? A : [u.test(A) ? A : i(A).html()]).join("")
    }

    function j(A) {
        return A ? A.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function d(A) {
        var B = document.createElement("div");
        B.appendChild(A.cloneNode(true));
        return B.innerHTML
    }

    function o(G) {
        var I = "_" + q, B, A, E = {}, F, D, C;
        for (F = 0, D = G.length; F < D; F++) {
            if ((B = G[F]).nodeType !== 1) {
                continue
            }
            A = B.getElementsByTagName("*");
            for (C = A.length - 1; C >= 0; C--) {
                H(A[C])
            }
            H(B)
        }

        function H(P) {
            var L, O = P, N, J, K;
            if ((K = P.getAttribute(h))) {
                while (O.parentNode && (O = O.parentNode).nodeType === 1 && !(L = O.getAttribute(h))) {
                }
                if (L !== K) {
                    O = O.parentNode ? (O.nodeType === 11 ? 0 : (O.getAttribute(h) || 0)) : 0;
                    if (!(J = p[K])) {
                        J = e[K];
                        J = k(J, p[O] || e[O]);
                        J.key = ++w;
                        p[w] = J
                    }
                    if (q) {
                        Q(K)
                    }
                }
                P.removeAttribute(h)
            } else {
                if (q && (J = i.data(P, "tmplItem"))) {
                    Q(J.key);
                    p[J.key] = J;
                    O = i.data(P.parentNode, "tmplItem");
                    O = O ? O.key : 0
                }
            }
            if (J) {
                N = J;
                while (N && N.key != O) {
                    N.nodes.push(P);
                    N = N.parent
                }
                delete J._ctnt;
                delete J._wrap;
                i.data(P, "tmplItem", J)
            }

            function Q(R) {
                R = R + I;
                J = E[R] = (E[R] || k(J, p[J.parent.key + I] || J.parent))
            }
        }
    }

    function c(C, A, D, B) {
        if (!C) {
            return g.pop()
        }
        g.push({_: C, tmpl: A, item: this, data: D, options: B})
    }

    function b(A, C, B) {
        return i.tmpl(i.template(A), C, B, this)
    }

    function n(C, A) {
        var B = C.options || {};
        B.wrapped = A;
        return i.tmpl(i.template(C.tmpl), C.data, B, C.item)
    }

    function r(B, C) {
        var A = this._wrap;
        return i.map(i(i.isArray(A) ? A.join("") : A).filter(B || "*"), function (D) {
            return C ? D.innerText || D.textContent : D.outerHTML || d(D)
        })
    }

    function z() {
        var A = this.nodes;
        i.tmpl(null, null, null, this).insertBefore(A[0]);
        i(A).remove()
    }

    if (window.M && typeof M.define == "function") {
        M.define("jq-tmpl", function () {
            return i
        })
    }
})(jQuery);
M.define("Pagination", function (b, a, c) {
    b("jq-tmpl");

    function d(e) {
        this.total = null;
        this.pageSize = null;
        this.currPage = null;
        this.pageDisplayNum = null;
        this.callback = null;
        this.tmpl = null;
        this.container = null;
        this.pageItemClass = "_j_pageitem";
        this.jumperBtnClass = "_j_jumperbtn";
        this.jumperInputClass = "_j_jumperinput";
        this.loadInitPage = false;
        this.evenOffset = -1;
        M.mix(this, e);
        this.total = +this.total;
        this.pageSize = this.pageSize > 0 ? (+this.pageSize) : 10;
        this.currPage = this.currPage > 0 ? (+this.currPage) : 1;
        this.pageDisplayNum = this.pageDisplayNum > 0 ? (+this.pageDisplayNum) : 5;
        this.container = $(this.container);
        if (this.total < 0 || !this.tmpl.length || !this.container.length) {
            M.error("pagination param invalid")
        }
        this.init()
    }

    M.mix(d.prototype, {
        init: function () {
            if (this.loadInitPage) {
                this.loadPage(this.currPage)
            } else {
                this.drawPage()
            }
            this.bindEvents()
        }, drawPage: function () {
            var g = {total: this.total, currPage: this.currPage, pageSize: this.pageSize, pageDisplayNum: this.pageDisplayNum};
            var e = Math.ceil(this.total / this.pageSize);
            g.pageTotal = e;
            if (e <= this.pageDisplayNum) {
                g.indexers = this.makeIndex(1, e)
            } else {
                if (this.currPage > e) {
                    this.currPage = e
                }
                var f = (this.pageDisplayNum - 1) / 2;
                if (f !== parseInt(f, 10)) {
                    f = this.evenOffset > 0 ? Math.floor(f) + this.evenOffset : Math.ceil(f) + this.evenOffset
                }
                var h = this.pageDisplayNum - 1 - f;
                if (this.currPage - f < 1) {
                    f = this.currPage - 1;
                    h = this.pageDisplayNum - 1 - f
                } else {
                    if (this.currPage + h > e) {
                        h = e - this.currPage;
                        f = this.pageDisplayNum - 1 - h
                    }
                }
                g.indexers = this.makeIndex(this.currPage - f, this.pageDisplayNum)
            }
            this.container.empty().append($(this.tmpl).tmpl(g))
        }, loadPage: function (e) {
            this.currPage = e;
            this.drawPage();
            this.container.trigger("pagechanged", [{index: e}]);
            if (typeof this.callback == "function") {
                this.callback(e)
            }
        }, bindEvents: function () {
            this.container.undelegate("click");
            this.container.undelegate("keydown");
            this.container.on("click", "." + this.pageItemClass, M.bind(function (f) {
                var g = $(f.currentTarget), e = g.data("page");
                this.loadPage(e);
                f.preventDefault()
            }, this));
            this.container.on("click", "." + this.jumperBtnClass, M.bind(function (f) {
                var g = $(f.currentTarget), e = +this.container.find("." + this.jumperInputClass).val();
                f.preventDefault();
                if (e <= 0 || e > Math.ceil(this.total / this.pageSize)) {
                    alert("请输入有效的页码");
                    return false
                }
                this.loadPage(e)
            }, this));
            this.container.on("keydown", "." + this.jumperInputClass, M.bind(function (e) {
                if (e.keyCode == 13) {
                    this.container.find("." + this.jumperBtnClass).trigger("click")
                }
            }, this))
        }, makeIndex: function (h, f) {
            var e = [];
            for (var g = h; g < h + f; g++) {
                e.push(g)
            }
            return e
        }
    });
    c.exports = d
});
M.define("dialog/Layer", function (a) {
    var g = 0, f = 550, d = (function () {
        return $.browser && $.browser.msie && parseInt($.browser.version, 10) == 7
    }()), c = (function () {
        return $.browser && $.browser.msie && parseInt($.browser.version, 10) < 7
    }());

    function b() {
        return g++
    }

    function e(h) {
        this.opacity = 0.8;
        this.background = "#fff";
        this.impl = "Dialog";
        this.fixed = true;
        M.mix(this, h);
        this.id = "_j_layer_" + b();
        this.stacks = [];
        this.activeStackId = null;
        this.overflow = false;
        this.changeFixed = false;
        e.instances[this.id] = this;
        if (!e[this.impl]) {
            e[this.impl] = []
        }
        e[this.impl].push(this.id);
        this.init()
    }

    e.prototype = {
        init: function () {
            this._createPanel()
        }, _createPanel: function () {
            f++;
            var h = {position: (!c && this.fixed) ? "fixed" : "absolute", width: "100%", height: "100%", top: 0, left: 0}, j = M.mix({}, h, {"z-index": f, display: "none"}),
                k = M.mix({}, h, {position: !c ? "fixed" : "absolute", background: this.background, opacity: this.opacity, "z-index": -1}),
                i = M.mix({}, h, {"z-index": 0}, (!c && this.fixed) ? {"overflow-x": "hidden", "overflow-y": "hidden"} : {overflow: "visible"});
            this._panel = $('<div id="' + this.id + '" class="layer _j_layer">                                <div class="layer_mask _j_mask"></div>                                <div class="layer_content _j_content"></div>                            </div>').css(j).appendTo("body");
            this._mask = this._panel.children("._j_mask").css(k);
            this._content = this._panel.children("._j_content").css(i)
        }, setZIndex: function (h) {
            f = h;
            this._panel.css("z-index", f)
        }, getZIndex: function () {
            return +this._panel.css("z-index")
        }, toFront: function () {
            this.setZIndex(f + 1)
        }, setFixed: function (h) {
            h = !!h;
            if (this.fixed != h) {
                this.changeFixed = true;
                this.fixed = h;
                if (!c && this.fixed) {
                    this._panel.css("position", "fixed");
                    this._content.css({position: "fixed", "overflow-x": "hidden", "overflow-y": "hidden"})
                } else {
                    this._panel.css("position", "absolute");
                    this._content.css({position: "absolute", "overflow-x": "", "overflow-y": "", overflow: "visible"})
                }
            } else {
                this.changeFixed = false
            }
        }, newStack: function (i) {
            var h = $(i).appendTo(this._content);
            this.stacks.push(h);
            return this.stacks.length - 1
        }, getStack: function (h) {
            return this.stacks[h]
        }, getActiveStack: function () {
            return this.stacks[this.activeStackId]
        }, setActiveStack: function (h) {
            this.activeStackId = h
        }, getPanel: function () {
            return this._panel
        }, getMask: function () {
            return this._mask
        }, getContent: function () {
            return this._content
        }, show: function (j) {
            var i = this;
            if (this.visible) {
                typeof j === "function" && j();
                return
            }
            e.activeId = this.id;
            this.visible = true;
            if (c) {
                var h = document.documentElement && document.documentElement.scrollHeight || document.body.scrollHeight;
                this._panel.css("height", h);
                this._mask.css("height", h)
            }
            this._panel.fadeIn(200, function () {
                typeof j === "function" && j()
            })
        }, hide: function (i) {
            var h = this;
            if (!this.visible) {
                typeof i === "function" && i();
                return
            }
            this.visible = false;
            if (c) {
                this._panel.css("height", "");
                this._mask.css("height", "")
            }
            this._panel.fadeOut(200, function () {
                typeof i === "function" && i();
                h._recoverTopScroller()
            })
        }, setOverFlow: function (h) {
            this.overflow = h;
            if (h) {
                if (!c && this.fixed) {
                    this._hideTopScroller();
                    this._content.css("overflow-y", "auto")
                }
            } else {
                if (!c && this.fixed) {
                    this._content.css("overflow-y", "hidden")
                }
            }
        }, _hideTopScroller: function () {
            if (d) {
                $("html").css("overflow", "hidden")
            } else {
                if (!c) {
                    $("body").css("overflow", "hidden")
                } else {
                    $("body").css("overflow-x", "hidden");
                    this._panel.height($(document).height() + 20)
                }
            }
        }, _recoverTopScroller: function () {
            if (d) {
                $("html").css("overflow", "")
            } else {
                if (!c) {
                    $("body").css("overflow", "")
                } else {
                    $("body").css("overflow-x", "")
                }
            }
        }, destroy: function () {
            this.hide($.proxy(function () {
                this._panel && this._panel.remove();
                this._panel = null;
                if (M.indexOf(e[this.impl], this.id) != -1) {
                    e[this.impl].splice(M.indexOf(e[this.impl], this.id), 1)
                }
                delete e.instances[this.id]
            }, this))
        }, clear: function () {
            this._content.empty();
            this.stacks = [];
            this.activeStackId = null
        }
    };
    e.instances = {};
    e.activeId = null;
    e.getInstance = function (h) {
        return e.instances[h]
    };
    e.getActive = function (h) {
        var i = e.getInstance(e.activeId);
        if (h && i) {
            i = i.impl === h ? i : null
        }
        return i
    };
    e.getImplInstance = function (i) {
        var h = e.getActive(i);
        if (!h && M.is(e[i], "Array") && e[i].length) {
            h = e.getInstance(e[i][e[i].length - 1])
        }
        return h
    };
    e.closeActive = function () {
        var h = e.getActive();
        if (h && h.getActiveStack()) {
            h.getActiveStack().trigger("close")
        }
    };
    $(document).keyup(function (h) {
        if (h.keyCode == 27) {
            e.closeActive()
        }
    });
    $(document).unload(function () {
        M.forEach(e.instances, function () {
            e.destroy()
        })
    });
    return e
});
M.define("dialog/DialogBase", function (b) {
    var e = b("dialog/Layer"), a = M.Event, d = (function () {
        return $.browser && $.browser.msie && parseInt($.browser.version, 10) < 7
    }());

    function c(f) {
        this.newLayer = false;
        this.width = "";
        this.height = "";
        this.background = "#000";
        this.panelBackground = "#fff";
        this.bgOpacity = 0.7;
        this.stackable = true;
        this.fixed = true;
        this.reposition = false;
        this.autoPosition = true;
        this.minTopOffset = 20;
        this.layerZIndex = -1;
        this.impl = "Dialog";
        M.mix(this, f);
        this.visible = false;
        this.destroyed = false;
        this.positioned = false;
        this.resizeTimer = 0;
        this.init()
    }

    c.prototype = {
        tpl: "<div />", init: function () {
            this._createDialog();
            this._bindEvents()
        }, _createDialog: function () {
            this._panel = $(this.tpl).css({position: "absolute", opacity: 0, display: "none", background: this.panelBackground, "z-index": 0});
            this.setRect({width: this.width, height: this.height});
            this._layer = !this.newLayer && e.getImplInstance(this.impl) || new e({impl: this.impl});
            if (this.layerZIndex >= 0) {
                this._layer.setZIndex(this.layerZIndex)
            }
            this._layer.setFixed(this.fixed);
            this._layer.getMask().css({background: this.background, opacity: this.bgOpacity});
            this._stackId = this._layer.newStack(this._panel);
            this.setPanelContent()
        }, _bindEvents: function () {
            var f = this;
            $(window).resize($.proxy(this.resizePosition, this));
            M.Event(this).on("resize", $.proxy(this.resizePosition, this));
            this._panel.delegate("._j_close, a[data-dialog-button]", "click", function (g) {
                var h = $(g.currentTarget).attr("data-dialog-button");
                if (h == "hide") {
                    f.hide()
                } else {
                    f.close()
                }
                g.preventDefault()
            });
            this._panel.bind("close", function (g, h) {
                f.close(h)
            })
        }, resizePosition: function () {
            var f = this;
            clearTimeout(this.resizeTimer);
            if (f.visible && f.autoPosition) {
                this.resizeTimer = setTimeout(function () {
                    f.setPosition()
                }, 100)
            }
        }, addClass: function (f) {
            this._panel.addClass(f)
        }, removeClass: function (f) {
            this._panel.removeClass(f)
        }, setRect: function (f) {
            if (f.width) {
                this._panel.css("width", f.width);
                this.width = f.width
            }
            if (f.height) {
                this._panel.css("height", f.height);
                this.height = f.height
            }
        }, getPanel: function () {
            return this._panel
        }, getLayer: function () {
            return this._layer
        }, getMask: function () {
            return this._layer && this._layer.getMask()
        }, setPanelContent: function () {
        }, _getPanelRect: function () {
            var f = this.getPanel(), g = f.outerHeight(), h = f.outerWidth();
            if (!f.is(":visible")) {
                f.css({visibility: "hidden", display: "block"});
                var g = f.outerHeight(), h = f.outerWidth();
                f.css({visibility: "", display: ""})
            }
            return {height: g, width: h}
        }, _getNumric: function (f) {
            f = parseInt(f, 10);
            return isNaN(f) ? 0 : f
        }, setPosition: function (f) {
            var g = this._getPanelRect(), h = {width: $(window).width(), height: $(window).height()};
            var k = (h.width - (this._getNumric(this.width) > 0 ? this._getNumric(this.width) : g.width)) / 2,
                j = (h.height - (this._getNumric(this.height) > 0 ? this._getNumric(this.height) : g.height)) * 4 / 9;
            j = j < this.minTopOffset ? this.minTopOffset : j;
            if (d || !this.fixed) {
                var i = $(window).scrollTop();
                if (i > 0) {
                    j += i
                }
            }
            f = {left: (f && f.left) || k, top: (f && f.top) || j};
            if (!d && this.fixed) {
                if (h.height - g.height <= f.top) {
                    this.getPanel().addClass("dialog_overflow");
                    this._layer.setOverFlow(true)
                } else {
                    this.getPanel().removeClass("dialog_overflow");
                    this._layer.setOverFlow(false)
                }
            }
            var l = this.positioned ? "animate" : "css";
            $.fn[l].call(this.getPanel(), f, 200);
            this.positioned = true;
            this.position = f
        }, setFixed: function (f) {
            this.fixed = !!f;
            this._layer.setFixed(this.fixed)
        }, getPosition: function () {
            return this.position
        }, show: function (f) {
            if (this.visible) {
                return
            }
            var h = this;
            a(this).fire("beforeshow");
            var g;
            if (this._layer.getActiveStack()) {
                g = this._layer.getActiveStack();
                if (!this.reposition && !f && !this._layer.changeFixed) {
                    f = this._layer.getActiveStack().position()
                }
            }
            this._layer.show();
            this.getPanel().css({display: "", "z-index": 1});
            this.setPosition(f);
            g && g.trigger("close", [true]);
            this.visible = true;
            this._layer.setActiveStack(this._stackId);
            this.getPanel().animate({opacity: 1}, {
                queue: false, duration: 200, complete: function () {
                    a(h).fire("aftershow")
                }
            })
        }, close: function () {
            var f = this.stackable ? "hide" : "destroy";
            this[f].apply(this, Array.prototype.slice.call(arguments))
        }, hide: function (g, f) {
            if (typeof g == "function") {
                f = g;
                g = undefined
            }
            if (!this.visible) {
                typeof f == "function" && f();
                return
            }
            a(this).fire("beforeclose");
            a(this).fire("beforehide");
            this._layer.setActiveStack(null);
            this.visible = false;
            if (!g) {
                this._layer.hide()
            }
            this.getPanel().animate({opacity: 0}, {
                queue: false, duration: 200, complete: $.proxy(function () {
                    this.getPanel().css({display: "none", "z-index": 0});
                    a(this).fire("afterhide");
                    a(this).fire("afterclose");
                    typeof f == "function" && f()
                }, this)
            })
        }, destroy: function (g, f) {
            if (typeof g == "function") {
                f = g;
                g = undefined
            }
            if (this.destroyed) {
                M.error("Dialog already destroyed!");
                typeof f == "function" && f();
                return
            }
            a(this).fire("beforeclose");
            a(this).fire("beforedestroy");
            this.destroyed = true;
            this.hide(g, $.proxy(function () {
                if (this._panel.length) {
                    this._panel.undelegate();
                    this._panel.unbind();
                    this._panel.remove();
                    this._panel = null
                }
                this._layer = null;
                a(this).fire("afterdestroy");
                a(this).fire("afterclose");
                typeof f == "function" && f()
            }, this))
        }
    };
    return c
});
M.define("dialog/Dialog", function (c) {
    var d = c("dialog/DialogBase"),
        a = '<div class="popup-box layer_dialog _j_dialog pop_no_margin">                    <div class="dialog_title" style="display:none"><div class="_j_title title"></div></div>                    <div class="dialog_body _j_content"></div>                    <a id="popup_close" class="close-btn _j_close"><i></i></a>                </div>';
    var b = M.extend(function (e) {
        this.content = "";
        this.title = "";
        this.PANEL_CLASS = "";
        this.MASK_CLASS = "";
        b.$parent.call(this, e)
    }, d);
    M.mix(b.prototype, {
        tpl: a, setPanelContent: function () {
            this._dialogTitle = this._panel.find("._j_title");
            this._dialogContent = this._panel.find("._j_content");
            this.setTitle(this.title);
            this.setContent(this.content);
            this.addClass(this.PANEL_CLASS);
            this.getMask().addClass(this.MASK_CLASS)
        }, setTitle: function (e) {
            if (e) {
                this._dialogTitle.html(e).parent().css("display", "")
            } else {
                this._dialogTitle.parent().css("display", "none")
            }
            this.title = e
        }, getTitle: function () {
            return this.title
        }, setContent: function (e) {
            this._dialogContent.empty().append(e)
        }
    });
    return b
});
M.define("dialog/alert", function (e, d) {
    var b = e("dialog/Dialog"),
        a = '<div id="popup_container" class="popup-box new-popbox"><a class="close-btn _j_close"><i></i></a><div class="pop-ico" id="_j_alertpopicon"><i class="i1"></i></div><div class="pop-ctn"><p class="hd _j_content"></p><p class="bd _j_detail"></p></div><div class="pop-btns"><a role="button" tabindex="0" class="popbtn popbtn-submit _j_close">&nbsp;确定&nbsp;</a></div></div>',
        f = M.extend(function (j) {
            var i = {width: 420, content: "请输入内容", background: "#000", bgOpacity: 0.7, PANEL_CLASS: "pop_no_margin", reposition: true, impl: "Alert", layerZIndex: 10000};
            j = M.mix(i, j);
            f.$parent.call(this, j);
            this.bindEvents()
        }, b), g = null, h = $.noop;
    M.mix(f.prototype, {
        tpl: a, setAlertTitle: function (i) {
            this.setContent(i)
        }, setAlertContent: function (i) {
            this.getPanel().find("._j_detail").text(i)
        }, setAssureWords: function (i) {
            this.getPanel().find(".popbtn-submit").text(i)
        }, setCloserHide: function (i) {
            if (i) {
                this.getPanel().find(".close-btn").hide()
            } else {
                this.getPanel().find(".close-btn").show()
            }
        }, bindEvents: function () {
            var i = this.getPanel();
            i.on("keydown", ".pop-btns ._j_close", function (j) {
                if (j.keyCode == 13) {
                    $(this).trigger("click")
                }
            }).on("click", ".pop-btns ._j_close", function (j) {
                i.data("btn_trigger", true)
            })
        }
    });
    var c = function (i, k, j) {
        if (!g) {
            g = new f();
            M.Event(g).on("afterhide", function () {
                var l = g.getPanel();
                if (typeof h == "function") {
                    h.call(g, l)
                }
                l.data("btn_trigger", false)
            });
            M.Event(g).on("aftershow", function () {
                g.getPanel().find(".pop-btns ._j_close").focus()
            })
        }
        g.getLayer().toFront();
        if (M.isObject(i)) {
            g.setAlertTitle(i.title);
            g.setAlertContent(i.content)
        } else {
            g.setAlertTitle(i);
            g.setAlertContent("")
        }
        if (M.isObject(i)) {
            if (i.assureWords) {
                g.setAssureWords(i.assureWords)
            } else {
                g.setAssureWords("确定")
            }
            if (i.hideCloser) {
                g.setCloserHide(true)
            } else {
                g.setCloserHide(false)
            }
        } else {
            g.setAssureWords("确定");
            g.setCloserHide(false)
        }
        if (typeof k == "function") {
            h = k
        } else {
            h = $.noop
        }
        if (j) {
            $("#_j_alertpopicon").children("i").attr("class", "i" + j)
        } else {
            $("#_j_alertpopicon").children("i").attr("class", "i" + 1)
        }
        g.show();
        return g
    };
    d.pop = c;
    d.warning = function (i, j) {
        c(i, j, 1)
    };
    d.tip = function (i, j) {
        c(i, j, 3)
    }
});
M.closure(function (a) {
    var l = a("Pagination"), e = a("dialog/alert"), i = $("#_j_param").data("type"), h = $("#_j_param").data("flag"), k = $("#_j_param").data("total"),
        f = $("#_j_param").data("uid"), c = 0, g = 0, m = new l({
            container: "#smallpager", tmpl: "#_j_pagitmpl", total: k, pageSize: 10, callback: function (n) {
                j(n - 1)
            }
        });
    m.drawPage();
    if (i == 1 && h > 0) {
        b()
    }
    if (i == 2 || i == 1) {
        $.get("/qa/ajax_qa/homeFilter", {uid: f, type: i, flag: h, mddid: c, page: g}, function (n) {
            if (!n.error) {
                $("._j_cange_type_dropdown").append(n.data.filter_html)
            }
        }, "json")
    }
    $("._j_change_type_div").click(function (n) {
        n.stopPropagation();
        if ($("._j_change_type_ul").hasClass("hide")) {
            $("._j_change_type_ul").removeClass("hide");
            b()
        } else {
            $("._j_change_type_ul").addClass("hide")
        }
    });
    $("._j_cange_type_dropdown").delegate("._j_change_flag", "click", function (n) {
        h = $(n.currentTarget).data("flag");
        c = 0;
        g = 0;
        $("._j_change_text").html($(n.currentTarget).html()).removeClass("hide");
        $("._j_change_btn").addClass("hide");
        j(g);
        $("._j_change_type_ul").addClass("hide")
    }).delegate("._j_change_mdd", "click", function (n) {
        c = $(n.currentTarget).data("mddid");
        h = 0;
        g = 0;
        $("._j_change_text").html($(n.currentTarget).data("name")).removeClass("hide");
        $("._j_change_btn").addClass("hide");
        j(g);
        $("._j_change_type_ul").addClass("hide")
    });
    $("body").click(function () {
        $("._j_change_type_ul").addClass("hide")
    });
    $("._j_qa_list").delegate("._j_del_solution_answer", "click", function (o) {
        var p = $(o.currentTarget), n = p.data("qid");
        $.post("/qa/ajax_qa/delSolution", {qid: n, flag: h}, function (q) {
            if (q.error) {
                e.pop(q.error.msg)
            }
            p.parent().slideToggle()
        }, "json")
    }).delegate("._j_cancel_collect", "click", function (o) {
        var p = $(o.currentTarget), n = p.data("aid");
        $.post("/qa/collection/delete", {aid: n}, function (q) {
            if (q.error) {
                e.pop(q.error.msg)
            }
            p.parent().parent().parent().slideToggle()
        }, "json")
    }).delegate("._j_draft_del", "click", function (o) {
        var p = $(o.currentTarget), n = p.data("qid");
        $.post("/qa/ajax_qa/delDraft", {qid: n}, function (q) {
            if (q.error) {
                e.pop(q.error.msg)
            }
            var r = parseInt($("._j_total_item").html());
            if (r == 1) {
                window.location.reload()
            }
            p.parent().parent().parent().slideToggle();
            r && $("._j_total_item").html(r - 1 + "个")
        }, "json")
    });

    function j(n) {
        $.get("/qa/ajax_qa/homeMore", {uid: f, type: i, flag: h, mddid: c, page: n}, function (p) {
            if (!p.error) {
                var o;
                if (i == 1 || i == 4) {
                    o = p.data.total + "条"
                } else {
                    o = p.data.total + "个"
                }
                $("._j_total_item").html(o);
                $("._j_qa_list").html(p.data.html)
            } else {
                if (p.error) {
                    e.pop(p.error.msg)
                }
            }
            d(n + 1, p.data.total);
            b()
        }, "json")
    }

    function d(n, o) {
        m.currPage = n;
        if (o > 0) {
            $("#smallpager").show();
            m.total = o;
            m.drawPage()
        } else {
            $("#smallpager").hide()
        }
    }

    function b() {
        $("html,body").animate({scrollTop: 420}, 700)
    }
});
M.define("dialog/confirm", function (c, e) {
    var g = c("dialog/Dialog"),
        a = '<div id="popup_container" class="popup-box new-popbox"><a class="close-btn _j_close _j_false"><i></i></a><div class="pop-ico" id="popup_icon"><i class="i2"></i></div><div class="pop-ctn"><p class="hd _j_content"></p><p class="bd _j_detail"></p></div><div class="pop-btns"><a role="button" tabindex="0" class="popbtn popbtn-cancel popbtn-half _j_close _j_false">&nbsp;取消&nbsp;</a><a role="button" tabindex="0" class="popbtn popbtn-submit popbtn-half _j_close _j_true">&nbsp;确定&nbsp;</a></div></div>',
        h = M.extend(function (k) {
            var j = {width: 420, content: "请输入内容", background: "#000", bgOpacity: 0.7, PANEL_CLASS: "pop_no_margin", reposition: true, impl: "Confirm", layerZIndex: 10000};
            k = M.mix(j, k);
            h.$parent.call(this, k);
            this.bindEvents()
        }, g), d = null, b = $.noop, i = $.noop, f = false;
    M.mix(h.prototype, {
        tpl: a, setConfirmTitle: function (j) {
            this.setContent(j)
        }, setConfirmContent: function (j) {
            this.getPanel().find("._j_detail").text(j)
        }, setAssureWords: function (j) {
            this.getPanel().find(".popbtn-submit").text(j)
        }, setCancelWords: function (j) {
            this.getPanel().find(".popbtn-cancel").text(j)
        }, bindEvents: function () {
            this.getPanel().on("click", "._j_false", function () {
                f = false
            }).on("click", "._j_true", function () {
                f = true
            }).on("keydown", "._j_false", function (j) {
                if (j.keyCode == 13) {
                    $(this).trigger("click")
                } else {
                    if (j.keyCode == 39) {
                        $(this).next().focus()
                    }
                }
            }).on("keydown", "._j_true", function (j) {
                if (j.keyCode == 13) {
                    $(this).trigger("click")
                } else {
                    if (j.keyCode == 37) {
                        $(this).prev().focus()
                    }
                }
            })
        }
    });
    e.pop = function (k, j, l) {
        if (!d) {
            d = new h();
            M.Event(d).on("afterhide", function () {
                if (f) {
                    b()
                } else {
                    i()
                }
            });
            M.Event(d).on("aftershow", function () {
                d.getPanel().find("._j_true").focus()
            })
        }
        d.getLayer().toFront();
        if (M.isObject(k)) {
            d.setConfirmTitle(k.title);
            d.setConfirmContent(k.content)
        } else {
            d.setConfirmTitle(k);
            d.setConfirmContent("")
        }
        if (M.isObject(k)) {
            if (k.assureWords) {
                d.setAssureWords(k.assureWords)
            } else {
                d.setAssureWords("确定")
            }
            if (k.cancelWords) {
                d.setCancelWords(k.cancelWords)
            } else {
                d.setCancelWords("取消")
            }
        } else {
            d.setAssureWords("确定");
            d.setCancelWords("取消")
        }
        if (typeof j == "function") {
            b = j
        } else {
            b = $.noop
        }
        if (typeof l == "function") {
            i = l
        } else {
            i = $.noop
        }
        d.show();
        return d
    }
});
M.define("FrequencyVerifyControl", function (c, b, d) {
    function a(e) {
        this.container = e.container;
        this.app = e.app;
        this.successHandler = $.noop;
        M.mix(this, e);
        this.init()
    }

    a.prototype = {
        init: function () {
            this.initData();
            this.refreshImg();
            this.verifyCon.delegate("img,._j_change_img", "click", $.proxy(function (e) {
                this.refreshImg()
            }, this));
            this.verifyCon.delegate("._j_fre_confirm", "click", $.proxy(function (h) {
                var g = this.verifyText.val();
                var f = g.length;
                if (f == 0) {
                    this.showErro("您还没有输入验证码!");
                    return false
                } else {
                    if (f !== 6) {
                        this.showErro("请输入正确的验证码!");
                        return false
                    }
                }
                var e = $(h.currentTarget);
                if (e.hasClass("waiting")) {
                    return false
                }
                e.addClass("waiting");
                $.post("/user/captcha/verify", {sCode: g, iApp: this.app}, $.proxy(function (i) {
                    if (i) {
                        if (i.ret === 1) {
                            this.successHandler(this.target);
                            this.verifyCon.hide();
                            this.hideErro()
                        } else {
                            if (i.ret === 0) {
                                this.verifyText.val("");
                                this.verifyText.focus();
                                this.refreshImg();
                                this.showErro("输入的验证码不正确!")
                            } else {
                                if (i.ret === -1) {
                                    this.showErro("错误次数过多，请稍候尝试")
                                }
                            }
                        }
                    }
                    e.removeClass("waiting")
                }, this), "json")
            }, this));
            this.verifyCon.delegate("._j_fre_text", "keyup", $.proxy(function (e) {
                if (e.keyCode == 13) {
                    this.verifyCon.find("._j_fre_confirm").trigger("click")
                }
            }, this))
        }, showErro: function (e) {
            this.errorCon.html(e);
            this.errorCon.show()
        }, hideErro: function () {
            this.errorCon.hide()
        }, initData: function () {
            this.verifyCon = this.container;
            this.verifyPo = this.verifyCon.find(".protectedYZM");
            this.verifyImg = this.verifyCon.find("img");
            this.verifyText = this.verifyCon.find("._j_fre_text");
            this.errorCon = this.verifyPo.find(".n-error")
        }, refreshImg: function () {
            var e = "/user/captcha/code?iApp=" + this.app + "&s=" + new Date().getTime();
            this.verifyImg.attr("src", e)
        }
    };
    d.exports = a
});
M.define("FrequencyAppVerify", function (e, c, f) {
    var b = e("FrequencyVerifyControl");
    var d = 0, g = '<div class="popYzm _j_fre_verify_',
        a = '"><div class="protectedYZM"><p>亲爱的蜂蜂，你发表速度有点像机器人<br>来证明下自己吧~</p><div class="YZMInput"><input class="_j_fre_text" type="text" placeHolder="验证码"></div><div class="YZMInput"><img src="http://images.mafengwo.net/images/home_new2015/verify.gif" width="150px" height="40px"><label><a href="javascript:void(0);" class="_j_change_img">看不清，换一张</a></label></div><div class="YZMSubmit"><a href="javascript:void(0);" class="_j_fre_confirm" title="确定">确定</a><span class="n-error">错误次数过多，请稍候尝试</span></div></div></div>';

    function h(i) {
        this.target = i.target;
        this.content = i.content;
        this.app = i.app;
        this.left = i.left;
        this.top = i.top;
        this.successHandler = $.noop;
        M.mix(this, i);
        this.init()
    }

    h.prototype = {
        init: function () {
            $("body").append(g + d + a);
            this.initData();
            this.initPostion();
            this._baseFrequency = new b({
                container: this.verifyCon, app: this.app, successHandler: $.proxy(function () {
                    M.Event.fire("frequency:app:verify:success");
                    this.verifyCon.remove();
                    this.successHandler(this.target)
                }, this)
            });
            d++
        }, initData: function () {
            this.verifyCon = $("._j_fre_verify_" + d);
            this.verifyCon.find("p").html(this.content);
            this.verifyPo = this.verifyCon.find(".protectedYZM")
        }, initPostion: function () {
            var o = this.target.offset().left;
            if (typeof this.top === "undefined") {
                var i = this.target.offset().top
            } else {
                var i = this.top;
                this.verifyCon.css("position", "fixed")
            }
            var p = this.target.outerHeight();
            var l = this.target.outerWidth();
            this.verifyCon.css({left: o + "px", top: i + "px"});
            var j = $(document).width();
            var k = $(document).height();
            var q = "l";
            if (o > j / 2) {
                q = "r"
            }
            var n = "t";
            if (i > k / 2) {
                n = "b"
            }
            var m = "";
            if (q == "l" && n == "t") {
                if (i > 200) {
                    m = "atTop"
                } else {
                    this.verifyCon.css({top: (i + p + 5) + "px"})
                }
            } else {
                if (q == "r" && n == "t") {
                    if (i > 200) {
                        m = "atTopRight"
                    } else {
                        m = "atRight"
                    }
                    this.verifyCon.css({left: (o + l) + "px"})
                } else {
                    if (q == "r" && n == "b") {
                        m = "atTopRight";
                        this.verifyCon.css({left: (o + l) + "px"})
                    } else {
                        m = "atTop"
                    }
                }
            }
            if (m.length > 0) {
                this.verifyPo.addClass(m)
            }
        }, show: function () {
            this.verifyCon.show();
            return this
        }, hide: function () {
            this.verifyCon.hide();
            return this
        }, refreshImg: function () {
            this._baseFrequency.refreshImg();
            return this
        }, destroy: function () {
            this.verifyCon.undelegate();
            this.verifyCon.remove();
            this.verifyCon = null;
            M.Event(this).fire("afterdestroy")
        }
    };
    f.exports = h
});
M.closure(function (a) {
    var i = a("dialog/confirm"), g = a("dialog/alert"), d = a("FrequencyAppVerify"), j = $("#_j_msgboard_wrap"), k = j.find("._j_msgboard_area"), e = j.find("._j_msgboard_list"),
        b = 0;
    j.on("click", "._j_msgboard_closer", function (l) {
        var m = $(l.currentTarget);
        m.toggleClass("MCClosed");
        if (m.hasClass("MCClosed")) {
            $.post("/home/ajax_index.php", {act: "closeMsgBoard"})
        } else {
            $.post("/home/ajax_index.php", {act: "openMsgBoard"})
        }
    }).on("click", "#_j_msgboard_submit", function (m) {
        var l = $.trim(k.val());
        var n = $(m.currentTarget);
        if (l.length === 0) {
            g.pop("请输入留言内容");
            return false
        }
        c(l, n)
    }).on("click", "._j_prev", function (l) {
        if (b > 0) {
            b -= 5;
            f()
        }
    }).on("click", "._j_next", function (l) {
        var m = $(l.currentTarget);
        if (b + 5 < m.data("count")) {
            b += 5;
            f()
        }
    }).on("click", "._js_viewAll", function (l) {
        var m = $(l.currentTarget), n = m.parent();
        if (m.hasClass("MUpMore")) {
            n.html(n.data("contentbrief") + '...<a role="button" class="MDownMore _js_viewAll" title="全部"></a>')
        } else {
            n.html(n.data("content") + '<a role="button" class="MDownMore MUpMore _js_viewAll" title="全部"></a>')
        }
    }).on("click", "._j_reply", function (o) {
        var p = $(o.currentTarget), q = p.closest("dd"), l = q.closest("li"), m = q.children("._j_replybox"), n = p.data("id");
        if (!m.length) {
            q.append('<div class="MGuestReplyText _j_replybox">                                    <textarea class="_j_reply_area"></textarea>                                    <div class="MGuestReplyBtn clearfix">                                        <a class="link_s _j_reply_submit" title="提交">提交</a><a class="link_s link_cancel _j_reply_cancel" title="取消">取消</a>                                    </div>                                </div>');
            m = q.children("._j_replybox");
            m.on("click", "._j_reply_submit", function (s) {
                var r = $.trim(m.children("._j_reply_area").val());
                if (r.length === 0) {
                    g.pop("请输入回复内容");
                    return false
                }
                h(r, n, $(this), m, l)
            });
            m.on("click", "._j_reply_cancel", function (r) {
                l.removeClass("showGuest")
            })
        }
        l.toggleClass("showGuest")
    }).on("click", "._j_delete", function (l) {
        var m = $(l.currentTarget), n = m.data("id");
        i.pop("确认删除该留言吗？", function () {
            m.closest("li").remove();
            $.post("/home/ajax_index.php", {act: "delMsgBoardMsg", id: n})
        })
    });

    function f() {
        $.get("/home/ajax_index.php", {act: "getMsgBoardList", uid: window.Env.target_uid, offset: b}, function (l) {
            if (l.error) {
                g.pop(l.error.msg)
            } else {
                if (l.data && l.data.html) {
                    e.html(l.data.html)
                }
            }
        }, "json")
    }

    function c(l, m) {
        $.post("/home/ajax_index.php", {act: "postMsgBoard", content: l, uid: window.Env.target_uid}, function (n) {
            if (n.error) {
                if (n.error.code == 10001) {
                    new d({
                        target: m, app: n.error.msg, content: "亲爱的蜂蜂，你发表留言的速度有点像机器人<br>来证明下自己吧~", successHandler: $.proxy(function () {
                            c(l, m)
                        }, this)
                    })
                } else {
                    g.pop(n.error.msg)
                }
            } else {
                if (n.data && n.data.html) {
                    e.prepend(n.data.html);
                    k.val("")
                }
            }
        }, "json")
    }

    function h(o, n, p, m, l) {
        $.post("/home/ajax_index.php", {act: "postMsgBoard", content: o, rid: n, uid: window.Env.target_uid}, function (q) {
            if (q.error) {
                if (q.error.code === 10001) {
                    var r = new d({
                        target: p, app: q.error.msg, content: "亲爱的蜂蜂，你发表留言的速度有点像机器人<br>来证明下自己吧~", successHandler: $.proxy(function () {
                            h(o, n, p, m, l)
                        }, this)
                    })
                } else {
                    g.pop(q.error.msg)
                }
            } else {
                if (q.data && q.data.html) {
                    e.prepend(q.data.html);
                    m.children("._j_reply_area").val("");
                    l.removeClass("showGuest")
                }
            }
        }, "json")
    }
});
M.define("PageAdmin", function (b) {
    var e = {}, c = d();
    e.uuid = window.Env && window.Env.uPageId || a();

    function a() {
        var f = c();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (h) {
            var g = (f + Math.random() * 16) % 16 | 0;
            f = Math.floor(f / 16);
            return (h === "x" ? g : (g & 3 | 8)).toString(16)
        })
    }

    function d() {
        var f = window.performance || {}, g = f.now || f.mozNow || f.msNow || f.oNow || f.webkitNow || Date.now || function () {
            return new Date().getTime()
        };
        if (f.now || f.mozNow || f.msNow || f.oNow || f.webkitNow) {
            return function () {
                return g.call(f)
            }
        }
        return g
    }

    return e
});
M.define("Storage", function (e, g, b) {
    var n = document;
    var d = c();
    var f = {
        _element: null, _expires: null, _file: document.location.hostname, init: function () {
            if (!this._element) {
                try {
                    this._element = n.createElement("input");
                    this._element.type = "hidden";
                    this._element.addBehavior("#default#userData");
                    n.body.appendChild(this._element);
                    this.setItem("__detectUserDataStorage", 1);
                    this.removeItem("__detectUserDataStorage");
                    return {setItem: this.setItem, getItem: this.getItem, removeItem: this.removeItem}
                } catch (p) {
                    M.error(p)
                }
            }
            return true
        }, setItem: function (s, t, q) {
            var p = j(q);
            this._element.expires = p.toUTCString();
            this._element.load(this._file);
            var r = a(this._element.getAttribute(s)), u = i(t, +p);
            this._element.setAttribute(s, u);
            this._element.save(this._file);
            k({key: s, newValue: u, oldValue: r, url: window.location.href})
        }, getItem: function (p) {
            this._element.load(this._file);
            var q = a(this._element.getAttribute(p));
            return q && q.value
        }, removeItem: function (p) {
            this._element.load(this._file);
            this._element.removeAttribute(p);
            this._element.save(this._file)
        }
    };
    var l = {
        setItem: function (r, s, q) {
            if (!d) {
                return
            }
            var p = j(q);
            localStorage.setItem(r, i(s, +p))
        }, getItem: function (p) {
            if (!d) {
                return
            }
            var r = +new Date(), q = a(localStorage.getItem(p));
            if (q) {
                if (r > q.timestamp) {
                    localStorage.removeItem(p);
                    q = null
                } else {
                    q = q.value
                }
            }
            return q
        }, removeItem: function (p) {
            if (!d) {
                return
            }
            localStorage.removeItem(p)
        }
    };
    var h = {}, m = {
        on: function (q, r) {
            var p = h[q] || (h[q] = []);
            p.push(r)
        }, off: function (q, r) {
            var p = h[q];
            if (!!p) {
                if (!!r) {
                    M.forEach(p, function (t, s) {
                        if (t == r) {
                            p.splice(s, 1)
                        }
                    })
                } else {
                    p = []
                }
            }
            return this
        }
    };
    M.mix(f, m);
    M.mix(l, m);
    if (window.addEventListener) {
        window.addEventListener("storage", k, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onstorage", k)
        }
    }

    function k(u) {
        if (!u) {
            u = window.event
        }
        var p = M.mix({}, u), w = u.newValue && a(u.newValue), q = u.oldValue && a(u.oldValue), v = +new Date();
        p.newValue = w && w.value;
        if (!!q && v < q.timestamp) {
            p.oldValue = q.value
        } else {
            p.oldValue = null
        }
        var t = u.key, s = h[t], r = 0;
        if (!t || !s || 0 === s.length) {
            return
        }
        while (r < s.length) {
            s[r++].call(window, p)
        }
    }

    function j(p) {
        if (Object.prototype.toString.call(p) != "[object Date]") {
            var q = typeof p === "number" && p > 0 ? p : 86400;
            p = new Date();
            p.setTime(+p + q * 1000)
        }
        return p
    }

    function i(q, p) {
        var r = {value: q, timestamp: p};
        return JSON.stringify(r)
    }

    function a(p) {
        if (p) {
            try {
                p = JSON.parse(p);
                if (!("value" in p) || !("timestamp" in p)) {
                    p = {value: p, timestamp: +j()}
                }
            } catch (q) {
                p = {value: p, timestamp: +j()}
            }
        }
        return p
    }

    function c() {
        if (window.localStorage) {
            try {
                localStorage.setItem("__detectLocalStorage", 1);
                localStorage.removeItem("__detectLocalStorage");
                return true
            } catch (p) {
                return false
            }
        }
        return false
    }

    var o = window.localStorage ? l : f.init();
    b.exports = M.mix(o, {isAvailable: c, isSupport: window.localStorage ? d : ("setItem" in o)})
});
M.define("Cookie", function (f, h, e) {
    var g = /\+/g;
    var i = navigator.cookieEnabled;
    if (!i) {
        document.cookie = "__detectCookieEnabled=1;";
        i = document.cookie.indexOf("__detectCookieEnabled") != -1 ? true : false;
        if (i) {
            document.cookie = "__detectCookieEnabled=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        }
    }
    if (!i) {
        return {isSupport: false}
    }
    var d = {
        isSupport: true, set: function (m, n, k) {
            k = (typeof k == "object" && k !== null) ? k : {};
            if (typeof k.expires === "number") {
                var o = k.expires, l = k.expires = new Date();
                l.setTime(+l + o * 1000)
            }
            return (document.cookie = [j(m), "=", j(String(n)), k.expires ? "; expires=" + k.expires.toUTCString() : "", k.path ? "; path=" + k.path : "", k.domain ? "; domain=" + k.domain : "", k.secure ? "; secure" : ""].join(""))
        }, get: function (q) {
            var k = q ? undefined : {};
            var r = document.cookie ? document.cookie.split("; ") : [];
            for (var p = 0, m = r.length; p < m; p++) {
                var s = r[p].split("=");
                var n = a(s.shift());
                var o = s.join("=");
                if (q && q === n) {
                    k = b(o);
                    break
                }
                if (!q && (o = b(o)) !== undefined) {
                    k[n] = o
                }
            }
            return k
        }, remove: function (l, k) {
            if (this.get(l) === undefined) {
                return false
            }
            k = (typeof k == "object" && k !== null) ? k : {};
            k.expires = -1;
            this.set(l, "", k)
        }
    };

    function j(k) {
        return encodeURIComponent(k)
    }

    function a(k) {
        return decodeURIComponent(k)
    }

    function c(k) {
        if (k.indexOf('"') === 0) {
            k = k.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            k = decodeURIComponent(k.replace(g, " "));
            return k
        } catch (l) {
        }
    }

    function b(k) {
        var l = c(k);
        return l
    }

    e.exports = d
});
M.define("ResourceKeeper", function (d) {
    var m = b();
    if (!m) {
        return {isSupport: false}
    }
    var c = [];
    if (window.addEventListener) {
        window.addEventListener("onbeforeunload", l, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onbeforeunload", l)
        }
    }

    function l() {
        M.forEach(c, function (n) {
            n.release()
        })
    }

    var e = d("PageAdmin").uuid, j = "default_resource", h = "__resource_keeper", f = 1000, k = 2000;

    function a(n) {
        n = "" + n;
        n = n || j;
        this.keeping = false;
        this.resourceKeeperStorageKey = h + "_" + n;
        this.keepingRefreshInterval = 0;
        this._initStorageListener();
        c.push(this)
    }

    M.mix(a.prototype, {
        keep: function () {
            this._requestKeep();
            return this.keeping
        }, forceKeep: function (n) {
            this._startKeep(n)
        }, release: function () {
            if (this.keeping) {
                var n = +new Date(), o = g(this.resourceKeeperStorageKey);
                if (o.currentKeeperPageUUID == e && o.expire > n) {
                    m.remove(this.resourceKeeperStorageKey);
                    this._setKeeping(false)
                }
            }
        }, _initStorageListener: function () {
            M.Event(m).on("resource_keeper_change", M.bind(function (n) {
                if (this.keeping && n.key == this.resourceKeeperStorageKey && n.pageUUID && n.pageUUID != e) {
                    this._setKeeping(false)
                }
            }, this))
        }, _requestKeep: function () {
            var n = +new Date(), o = g(this.resourceKeeperStorageKey);
            if (!o.currentKeeperPageUUID || o.currentKeeperPageUUID == e || o.expire <= n) {
                this._startKeep(n)
            } else {
                this._setKeeping(false)
            }
        }, _startKeep: function (n) {
            n = n || +new Date();
            var o = n + k;
            m.set(this.resourceKeeperStorageKey, e + ":" + o);
            this._setKeeping(true)
        }, _setKeeping: function (n) {
            this.keeping = n;
            if (this.keeping) {
                this._startKeepingRefreshRequest()
            } else {
                this._stopKeepingRefreshRequest()
            }
        }, _startKeepingRefreshRequest: function () {
            clearInterval(this.keepingRefreshInterval);
            this.keepingRefreshInterval = setInterval(M.bind(this._requestKeep, this), f)
        }, _stopKeepingRefreshRequest: function () {
            clearInterval(this.keepingRefreshInterval)
        }
    });

    function b() {
        var o = null, p = d("Storage");
        if (p && p.isSupport) {
            o = {set: M.bind(p.setItem, p), get: M.bind(p.getItem, p), remove: M.bind(p.removeItem, p)};
            if (window.addEventListener) {
                window.addEventListener("storage", function (r) {
                    var q = r.key;
                    if (q.indexOf(h) === 0) {
                        var t = "";
                        if (r.newValue) {
                            var s = r.newValue.split(":");
                            if (s.length == 2) {
                                t = s[0]
                            }
                        }
                        M.Event(o).fire("resource_keeper_change", {key: q, pageUUID: t})
                    }
                }, false)
            }
        } else {
            var n = d("Cookie");
            if (n && n.isSupport) {
                o = {
                    set: function (q, r) {
                        return n.set(q, r, k)
                    }, get: M.bind(n.get, n), remove: M.bind(n.remove, n)
                }
            }
        }
        return o
    }

    function g(p) {
        var o = {currentKeeperPageUUID: "", expire: 0}, n = m.get(p);
        if (n) {
            n = n.split(":");
            o.currentKeeperPageUUID = n[0];
            o.expire = +n[1]
        }
        return o
    }

    function i(o) {
        var n = new a(o);
        return {keep: M.bind(n.keep, n), forceKeep: M.bind(n.forceKeep, n), release: M.bind(n.release, n)}
    }

    i.isSupport = true;
    return i
});
(function (a) {
    a.jGrowl = function (b, c) {
        if (a("#jGrowl").size() == 0) {
            a('<div id="jGrowl"></div>').addClass((c && c.position) ? c.position : a.jGrowl.defaults.position).appendTo("body")
        }
        a("#jGrowl").jGrowl(b, c)
    };
    a.fn.jGrowl = function (b, d) {
        if (a.isFunction(this.each)) {
            var c = arguments;
            return this.each(function () {
                var e = this;
                if (a(this).data("jGrowl.instance") == undefined) {
                    a(this).data("jGrowl.instance", a.extend(new a.fn.jGrowl(), {notifications: [], element: null, interval: null}));
                    a(this).data("jGrowl.instance").startup(this)
                }
                if (a.isFunction(a(this).data("jGrowl.instance")[b])) {
                    a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(c).slice(1))
                } else {
                    a(this).data("jGrowl.instance").create(b, d)
                }
            })
        }
    };
    a.extend(a.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: "",
            group: "",
            sticky: false,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3000,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: true,
            closeTemplate: "&times;",
            closerTemplate: "<div>[ 关闭 ]</div>",
            log: function (c, b, d) {
            },
            beforeOpen: function (c, b, d) {
            },
            afterOpen: function (c, b, d) {
            },
            open: function (c, b, d) {
            },
            beforeClose: function (c, b, d) {
            },
            close: function (c, b, d) {
            },
            animateOpen: {opacity: "show"},
            animateClose: {opacity: "hide"}
        }, notifications: [], element: null, interval: null, create: function (b, c) {
            var c = a.extend({}, this.defaults, c);
            if (typeof c.speed !== "undefined") {
                c.openDuration = c.speed;
                c.closeDuration = c.speed
            }
            this.notifications.push({message: b, options: c});
            c.log.apply(this.element, [this.element, b, c])
        }, render: function (d) {
            var b = this;
            var c = d.message;
            var e = d.options;
            var d = a('<div class="jGrowl-notification ' + e.themeState + " ui-corner-all" + ((e.group != undefined && e.group != "") ? " " + e.group : "") + '"><div class="jGrowl-close">' + e.closeTemplate + '</div><div class="jGrowl-header">' + e.header + '</div><div class="jGrowl-message">' + c + "</div></div>").data("jGrowl", e).addClass(e.theme).children("div.jGrowl-close").bind("click.jGrowl", function () {
                a(this).parent().trigger("jGrowl.close")
            }).parent();
            a(d).bind("mouseover.jGrowl", function () {
                a("div.jGrowl-notification", b.element).data("jGrowl.pause", true)
            }).bind("mouseout.jGrowl", function () {
                a("div.jGrowl-notification", b.element).data("jGrowl.pause", false)
            }).bind("jGrowl.beforeOpen", function () {
                if (e.beforeOpen.apply(d, [d, c, e, b.element]) != false) {
                    a(this).trigger("jGrowl.open")
                }
            }).bind("jGrowl.open", function () {
                if (e.open.apply(d, [d, c, e, b.element]) != false) {
                    if (e.glue == "after") {
                        a("div.jGrowl-notification:last", b.element).after(d)
                    } else {
                        a("div.jGrowl-notification:first", b.element).before(d)
                    }
                    a(this).animate(e.animateOpen, e.openDuration, e.easing, function () {
                        if (a.browser.msie && (parseInt(a(this).css("opacity"), 10) === 1 || parseInt(a(this).css("opacity"), 10) === 0)) {
                            this.style.removeAttribute("filter")
                        }
                        a(this).data("jGrowl").created = new Date();
                        a(this).trigger("jGrowl.afterOpen")
                    })
                }
            }).bind("jGrowl.afterOpen", function () {
                e.afterOpen.apply(d, [d, c, e, b.element])
            }).bind("jGrowl.beforeClose", function () {
                if (e.beforeClose.apply(d, [d, c, e, b.element]) != false) {
                    a(this).trigger("jGrowl.close")
                }
            }).bind("jGrowl.close", function () {
                a(this).data("jGrowl.pause", true);
                a(this).animate(e.animateClose, e.closeDuration, e.easing, function () {
                    a(this).remove();
                    var f = e.close.apply(d, [d, c, e, b.element]);
                    if (a.isFunction(f)) {
                        f.apply(d, [d, c, e, b.element])
                    }
                })
            }).trigger("jGrowl.beforeOpen");
            if (e.corners != "" && a.fn.corner != undefined) {
                a(d).corner(e.corners)
            }
            if (a("div.jGrowl-notification:parent", b.element).size() > 1 && a("div.jGrowl-closer", b.element).size() == 0 && this.defaults.closer != false) {
                a(this.defaults.closerTemplate).addClass("jGrowl-closer ui-state-highlight ui-corner-all").addClass(this.defaults.theme).appendTo(b.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function () {
                    a(this).siblings().trigger("jGrowl.beforeClose");
                    if (a.isFunction(b.defaults.closer)) {
                        b.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]])
                    }
                })
            }
        }, update: function () {
            a(this.element).find("div.jGrowl-notification:parent").each(function () {
                if (a(this).data("jGrowl") != undefined && a(this).data("jGrowl").created != undefined && (a(this).data("jGrowl").created.getTime() + parseInt(a(this).data("jGrowl").life)) < (new Date()).getTime() && a(this).data("jGrowl").sticky != true && (a(this).data("jGrowl.pause") == undefined || a(this).data("jGrowl.pause") != true)) {
                    a(this).trigger("jGrowl.beforeClose")
                }
            });
            if (this.notifications.length > 0 && (this.defaults.pool == 0 || a(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool)) {
                this.render(this.notifications.shift())
            }
            if (a(this.element).find("div.jGrowl-notification:parent").size() < 2) {
                a(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function () {
                    a(this).remove()
                })
            }
        }, startup: function (b) {
            this.element = a(b).addClass("jGrowl").append('<div class="jGrowl-notification"></div>');
            this.interval = setInterval(function () {
                a(b).data("jGrowl.instance").update()
            }, parseInt(this.defaults.check));
            if (a.browser.msie && parseInt(a.browser.version) < 7 && !window.XMLHttpRequest) {
                a(this.element).addClass("ie6")
            }
        }, shutdown: function () {
            a(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove();
            clearInterval(this.interval)
        }, close: function () {
            a(this.element).find("div.jGrowl-notification").each(function () {
                a(this).trigger("jGrowl.beforeClose")
            })
        }
    });
    a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults
})(jQuery);
if (window.M && typeof window.M.define == "function") {
    window.M.define("jq-jgrowl", function () {
        return jQuery
    })
}
M.closure(function (e) {
    var j = e("ResourceKeeper"), t = j.isSupport ? new j("new_msg_loop") : null, s = e("Storage"), b = 1000, r = 10000, u = 40000, d = 120000;
    var v = (function () {
        if (j.isSupport) {
            return $.proxy(t.keep, t)
        } else {
            return function () {
                return M.windowFocused
            }
        }
    }());
    var k = function () {
        if (j.isSupport) {
            t.forceKeep()
        }
    };
    if ("addEventListener" in window) {
        window.addEventListener("focus", k, false)
    } else {
        if ("attachEvent" in document) {
            document.attachEvent("onfocusin", k)
        }
    }
    $(function () {
        if (window.Env && window.Env.UID > 0 || window.__mfw_uid > 0) {
        } else {
        }
        $("body").delegate(".jGrowl-closer", "click", function (x) {
            $.getJSON("/ajax/ajax_msg.php", {a: "closetip"});
            s.setItem("jgrowl_close_time", +new Date())
        });
        M.Event.on("update msg", function () {
            setTimeout(function () {
                w();
                s.setItem("update_msg", +new Date())
            }, 1)
        });
        s.on("update_msg", function (x) {
            w()
        });

        function w() {
            if (window.Env && window.Env.UID > 0 || window.__mfw_uid > 0) {
                p("msgdisplay")
            } else {
                p("nologinfeed")
            }
        }
    });

    function n() {
        setInterval(function () {
            v() && p("msgdisplay")
        }, u)
    }

    function l() {
        var x, w = 1;
        v() && p("nologinfeed");
        x = setInterval(function () {
            v() && p("nologinfeed");
            w++;
            if (w == 3) {
                clearInterval(x)
            }
        }, d)
    }

    function p(w) {
        $.get("/ajax/ajax_msg.php?a=" + w, function (x) {
            if (x) {
                o(x)
            }
        }, "json")
    }

    function o(w) {
        g();
        M.Event.fire("get new msg", w);
        if (w.msg) {
            m()
        }
        if (w.tips && !i()) {
            a(w)
        }
    }

    e("jq-jgrowl");

    function a(w) {
        var x = w.tips.split(w.split_char);
        M.forEach(x, function (z, y) {
            if (z) {
                setTimeout(function () {
                    $.jGrowl(z, {header: "新鲜事：", closer: false, life: 20000})
                }, 2000 * y + 10)
            }
        })
    }

    function i() {
        var x = s.getItem("jgrowl_close_time"), w = +new Date();
        if (x && w - x < 24 * 60 * 60 * 1000) {
            return true
        }
        return false
    }

    var c, f = 0, h = 1000, q = document.title;

    function m() {
        g();
        c = setInterval(function () {
            if (v()) {
                f++;
                document.title = f % 2 === 0 ? "【　　　】 - " + q : "【新消息】 - " + q
            } else {
                document.title = q
            }
        }, h)
    }

    function g() {
        clearInterval(c);
        document.title = q
    }
});
M.define("FrequencySystemVerify", function (f, e, g) {
    var b = f("dialog/Dialog"), h = f("dialog/Layer"), d = f("FrequencyVerifyControl");
    var a = '<div class="popYzm" style="z-index:inherit;position: relative;width:350px;height: 250px"><div class="protectedYZM" style="border: none;box-shadow: none;padding:25px 15px;"><p>亲爱的蜂蜂，你操作的速度有点像机器人<br>来证明下自己吧~</p><div class="YZMInput"><input class="_j_fre_text" type="text" placeHolder="验证码"></div><div class="YZMInput"><img src="http://images.mafengwo.net/images/home_new2015/verify.gif" width="150px" height="40px"><label><a href="javascript:void(0);" class="_j_change_img">看不清，换一张</a></label></div><div class="YZMSubmit"><a href="javascript:void(0);" class="_j_fre_confirm" title="确定">确定</a><span class="n-error">错误次数过多，请稍候尝试</span></div></div></div>';

    function c(i) {
        this.app = i.app;
        this.init()
    }

    c.prototype = {
        init: function () {
            var i = new b({content: a});
            if (h.getActive()) {
                i.getLayer().setZIndex(h.getActive().getZIndex() + 1)
            }
            i.show();
            var j = i.getPanel().find(".popYzm");
            new d({
                container: j, app: this.app, successHandler: $.proxy(function () {
                    M.Event.fire("frequency:system:verify:success");
                    i.close()
                }, this)
            })
        }
    };
    g.exports = c
});
M.closure(function (d) {
    var b = d("dialog/Dialog"), f = d("dialog/alert"), c = d("FrequencySystemVerify");
    window.show_login = a;
    $.ajaxSetup({
        dataFilter: function (i, h) {
            try {
                var k = $.parseJSON(i);
                if (k && k.unsafe == 1) {
                    window.location.href = "http://www.mafengwo.cn";
                    return "{}"
                }
                if (k && k.error && k.error.msg == "login:required") {
                    M.Event.fire("login:required");
                    return "{}"
                }
                if (k && k.error && k.error.msg == "mobilebind:required") {
                    f.pop({title: "依《网络安全法》要求，你需要在发布内容之前绑定手机号~", assureWords: "去绑定", hideCloser: true}, function (m) {
                        location.href = window.Env.P_HTTP + "/setting/security/mobile/"
                    });
                    return {}
                }
                if (k && k.resource && k.resource.onload && k.resource.onload.length) {
                    if (k.resource.onload[0] == 'K.fire("login:required");') {
                        M.Event.fire("login:required");
                        return "{}"
                    }
                }
                if (k && k.error) {
                    var g = 0;
                    var l = 0;
                    if (typeof (k.error.errno) !== "undefined") {
                        g = k.error.errno;
                        l = k.error.error
                    } else {
                        if (typeof (k.error.code) !== "undefined") {
                            g = k.error.code;
                            l = k.error.msg
                        }
                    }
                    if (g === 10000) {
                        M.Event.fire("frequency:verify", l);
                        return "{}"
                    }
                }
            } catch (j) {
            }
            return i
        }, error: function (g) {
            if (g.status == 401) {
                if (g.responseJSON && g.responseJSON.data && g.responseJSON.data.auth_type == "login") {
                    M.Event.fire("login:required")
                }
            }
        }
    });
    var e = null;

    function a() {
        document.location.href = (window.Env && window.Env.P_HTTP) || "https://passport.mafengwo.cn";
        return;
        if (!e) {
            e = new b({
                PANEL_CLASS: "login_pop",
                content: '<iframe frameborder="no" border="0" scrolling="no" width="580" height="292" allowtransparency="true"></iframe>',
                background: "#aaa",
                bgOpacity: 0.6,
                reposition: true,
                impl: "logindialog"
            })
        }
        e.show();
        if (!e.getPanel().find("iframe").attr("src")) {
            M.Event(e).once("aftershow", function () {
                var g = window.Env.P_HTTP || "https://passport.mafengwo.cn";
                e.getPanel().find("iframe").attr("src", g + "/login-popup.html")
            })
        }
    }

    M.Event.on("login:required", a);
    M.Event.on("frequency:verify", function (g) {
        new c({app: g})
    });
    if (M.Event.isFired("login:required")) {
        a()
    }
});
M.define("ScrollObserver", function (e, g, c) {
    var h = 0, f = {}, a = false, b, d = true;
    g.addObserver = function (k) {
        var j = "ScrollObserver_" + h;
        h++;
        f[j] = k;
        d = false;
        return j
    };
    g.removeObserver = function (j) {
        delete f[j];
        if (M.isEmpty(f)) {
            d = true
        }
    };

    function i() {
        for (var j in f) {
            if (f.hasOwnProperty(j)) {
                f[j]()
            }
        }
    }

    $(window).scroll(function () {
        if (d) {
            return
        }
        if (!a) {
            b = setInterval(function () {
                if (a) {
                    a = false;
                    clearTimeout(b);
                    i()
                }
            }, 50)
        }
        a = true
    });
    return g
});
M.define("QRCode", function (b, a, c) {
    c.exports = {
        gen: function (e, d) {
            var d = {text: e, size: d.size || 200, eclevel: d.evlevel || "H", logo: d.logo || "", __stk__: window.Env.CSTK};
            return "http://" + window.Env.WWW_HOST + "/qrcode.php?" + $.param(d)
        }
    }
});
M.closure(function (b) {
    var l = b("ScrollObserver"), m = b("Storage"), d = window.Env || {}, f = $("#_j_mfwtoolbar"), h = f.height(), a = $(window).height(), k = $(document).height(),
        g = $("#footer"), e = g.outerHeight();
    $("body").css("position", "relative");
    $(window).resize(function () {
        a = $(window).height();
        k = $(document).height()
    });
    setInterval(function () {
        var n = $(document).height();
        if (n != k) {
            k = n;
            $(window).trigger("scroll")
        }
    }, 2000);
    if (!d.hideToolbar) {
        if (!d.showToolbarDownArrow) {
            f.children(".toolbar-item-down").remove()
        } else {
            f.children(".toolbar-item-down").show()
        }
        f.show();
        c();
        l.addObserver(c);
        f.on("click", "._j_gotop", i);
        f.on("click", "._j_gobottom", j);
        f.children(".toolbar-item-code").mouseenter(function () {
            $(this).addClass("hover")
        });
        f.children(".toolbar-item-code").mouseleave(function () {
            $(this).removeClass("hover")
        })
    }

    function c() {
        var n = $(window).scrollTop();
        if (n > 500) {
            f.children(".toolbar-item-top").show()
        } else {
            f.children(".toolbar-item-top").hide()
        }
        if (g.length) {
            if (n + a > g.offset().top) {
                f.css({position: "absolute", bottom: e + 20})
            } else {
                f.css({position: "", bottom: ""})
            }
        }
    }

    function i() {
        $("html, body").animate({scrollTop: 0}, 500, function () {
            M.Event.fire("scroll to top")
        })
    }

    function j() {
        $("html, body").animate({scrollTop: k - a}, 500, function () {
            M.Event.fire("scroll to bottom")
        })
    }
});
(function () {
    var a = document.createElement("script"), b = window.Env && window.Env.CNZZID || 30065558;
    a.type = "text/javascript";
    a.async = true;
    a.charset = "utf-8";
    a.src = document.location.protocol + "//w.cnzz.com/c.php?id=" + b + "&async=1";
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(a, c)
})();
M.closure(function (a) {
    M.log("只要你有梦想，就加入我们\n你即将见证互联网最新趋势的快速成长\n马蜂窝的一切资源都会成为你成长路上的最大助力\n你可以和马蜂窝一起书写互联网的风云奇迹\n在这里有一群和你一样，疯狂地热爱互联网和旅行的人们\n马蜂窝能为你实现梦想提供最广阔的平台");
    M.log("请将简历发送至 %csuperhr@mafengwo.com%c（ 邮件标题请以“_console”结尾）", "color:#4ae;", "color:inherit;");
    M.log("职位介绍：http://www.mafengwo.cn/s/hr.html")
});
M.closure(function (a) {
    $.get("/ajax/ajax_page_onload.php", {href: document.location.href, _t: +new Date()}, function (b) {
        if (b.payload && b.payload.apps) {
            var c = b.payload.apps;
            if (!M.isEmpty(c)) {
                var d = {css_list: c.css || []};
                M.loadCssJsListSeq(d, function () {
                    if (c.html) {
                        $("body").append(c.html)
                    }
                    if (c.js && c.js.length) {
                        M.loadResource(c.js)
                    }
                })
            }
        }
    }, "json")
});
