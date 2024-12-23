!function(B, g) {
    "object" == typeof exports && "object" == typeof module ? module.exports = g() : "function" == typeof define && define.amd ? define([], g) : "object" == typeof exports ? exports.Quill = g() : B.Quill = g()
}(typeof self < "u" ? self : this, function() {
    return function(B) {
        function g(w) {
            if (d[w])
                return d[w].exports;
            var T = d[w] = {
                i: w,
                l: !1,
                exports: {}
            };
            return B[w].call(T.exports, T, T.exports, g),
            T.l = !0,
            T.exports
        }
        var d = {};
        return g.m = B,
        g.c = d,
        g.d = function(w, T, k) {
            g.o(w, T) || Object.defineProperty(w, T, {
                configurable: !1,
                enumerable: !0,
                get: k
            })
        }
        ,
        g.n = function(w) {
            var T = w && w.__esModule ? function() {
                return w.default
            }
            : function() {
                return w
            }
            ;
            return g.d(T, "a", T),
            T
        }
        ,
        g.o = function(w, T) {
            return Object.prototype.hasOwnProperty.call(w, T)
        }
        ,
        g.p = "",
        g(g.s = 45)
    }([function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var w = d(17)
          , T = d(18)
          , k = d(19)
          , _ = d(48)
          , f = d(49)
          , u = d(50)
          , e = d(51)
          , t = d(52)
          , n = d(11)
          , o = d(29)
          , s = d(30)
          , i = d(28)
          , r = d(1);
        g.default = {
            Scope: r.Scope,
            create: r.create,
            find: r.find,
            query: r.query,
            register: r.register,
            Container: w.default,
            Format: T.default,
            Leaf: k.default,
            Embed: e.default,
            Scroll: _.default,
            Block: u.default,
            Inline: f.default,
            Text: t.default,
            Attributor: {
                Attribute: n.default,
                Class: o.default,
                Style: s.default,
                Store: i.default
            }
        }
    }
    , function(B, g, d) {
        "use strict";
        function k(i, r) {
            var a;
            if (void 0 === r && (r = s.ANY),
            "string" == typeof i)
                a = o[i] || e[i];
            else if (i instanceof Text || i.nodeType === Node.TEXT_NODE)
                a = o.text;
            else if ("number" == typeof i)
                i & s.LEVEL & s.BLOCK ? a = o.block : i & s.LEVEL & s.INLINE && (a = o.inline);
            else if (i instanceof HTMLElement) {
                var h = (i.getAttribute("class") || "").split(/\s+/);
                for (var l in h)
                    if (a = t[h[l]])
                        break;
                a = a || n[i.tagName]
            }
            return null == a ? null : r & s.LEVEL & a.scope && r & s.TYPE & a.scope ? a : null
        }
        var i, f = this && this.__extends || (i = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(r, a) {
            r.__proto__ = a
        }
        || function(r, a) {
            for (var h in a)
                a.hasOwnProperty(h) && (r[h] = a[h])
        }
        ,
        function(r, a) {
            function h() {
                this.constructor = r
            }
            i(r, a),
            r.prototype = null === a ? Object.create(a) : (h.prototype = a.prototype,
            new h)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var u = function(i) {
            function r(a) {
                var h = this;
                return (h = i.call(this, a = "[Parchment] " + a) || this).message = a,
                h.name = h.constructor.name,
                h
            }
            return f(r, i),
            r
        }(Error);
        g.ParchmentError = u;
        var s, e = {}, t = {}, n = {}, o = {};
        g.DATA_KEY = "__blot",
        function(i) {
            i[i.TYPE = 3] = "TYPE",
            i[i.LEVEL = 12] = "LEVEL",
            i[i.ATTRIBUTE = 13] = "ATTRIBUTE",
            i[i.BLOT = 14] = "BLOT",
            i[i.INLINE = 7] = "INLINE",
            i[i.BLOCK = 11] = "BLOCK",
            i[i.BLOCK_BLOT = 10] = "BLOCK_BLOT",
            i[i.INLINE_BLOT = 6] = "INLINE_BLOT",
            i[i.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE",
            i[i.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE",
            i[i.ANY = 15] = "ANY"
        }(s = g.Scope || (g.Scope = {})),
        g.create = function w(i, r) {
            var a = k(i);
            if (null == a)
                throw new u("Unable to create " + i + " blot");
            return new a(i instanceof Node || i.nodeType === Node.TEXT_NODE ? i : a.create(r),r)
        }
        ,
        g.find = function T(i, r) {
            return void 0 === r && (r = !1),
            null == i ? null : null != i[g.DATA_KEY] ? i[g.DATA_KEY].blot : r ? T(i.parentNode, r) : null
        }
        ,
        g.query = k,
        g.register = function _() {
            for (var i = [], r = 0; r < arguments.length; r++)
                i[r] = arguments[r];
            if (i.length > 1)
                return i.map(function(l) {
                    return _(l)
                });
            var a = i[0];
            if ("string" != typeof a.blotName && "string" != typeof a.attrName)
                throw new u("Invalid definition");
            if ("abstract" === a.blotName)
                throw new u("Cannot register abstract class");
            return o[a.blotName || a.attrName] = a,
            "string" == typeof a.keyName ? e[a.keyName] = a : (null != a.className && (t[a.className] = a),
            null != a.tagName && (a.tagName = Array.isArray(a.tagName) ? a.tagName.map(function(l) {
                return l.toUpperCase()
            }) : a.tagName.toUpperCase(),
            (Array.isArray(a.tagName) ? a.tagName : [a.tagName]).forEach(function(l) {
                null != n[l] && null != a.className || (n[l] = a)
            }))),
            a
        }
    }
    , function(B, g) {
        "use strict";
        var d = Object.prototype.hasOwnProperty
          , w = Object.prototype.toString
          , T = Object.defineProperty
          , k = Object.getOwnPropertyDescriptor
          , _ = function(t) {
            return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === w.call(t)
        }
          , f = function(t) {
            if (!t || "[object Object]" !== w.call(t))
                return !1;
            var s, n = d.call(t, "constructor"), o = t.constructor && t.constructor.prototype && d.call(t.constructor.prototype, "isPrototypeOf");
            if (t.constructor && !n && !o)
                return !1;
            for (s in t)
                ;
            return void 0 === s || d.call(t, s)
        }
          , u = function(t, n) {
            T && "__proto__" === n.name ? T(t, n.name, {
                enumerable: !0,
                configurable: !0,
                value: n.newValue,
                writable: !0
            }) : t[n.name] = n.newValue
        }
          , e = function(t, n) {
            if ("__proto__" === n) {
                if (!d.call(t, n))
                    return;
                if (k)
                    return k(t, n).value
            }
            return t[n]
        };
        B.exports = function t() {
            var n, o, s, i, r, a, h = arguments[0], l = 1, y = arguments.length, x = !1;
            for ("boolean" == typeof h && (x = h,
            h = arguments[1] || {},
            l = 2),
            (null == h || "object" != typeof h && "function" != typeof h) && (h = {}); l < y; ++l)
                if (null != (n = arguments[l]))
                    for (o in n)
                        s = e(h, o),
                        h !== (i = e(n, o)) && (x && i && (f(i) || (r = _(i))) ? (r ? (r = !1,
                        a = s && _(s) ? s : []) : a = s && f(s) ? s : {},
                        u(h, {
                            name: o,
                            newValue: t(x, a, i)
                        })) : void 0 !== i && u(h, {
                            name: o,
                            newValue: i
                        }));
            return h
        }
    }
    , function(B, g, d) {
        "use strict";
        function w(b) {
            return b && b.__esModule ? b : {
                default: b
            }
        }
        function T(b, c) {
            if (!(b instanceof c))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(b, c) {
            if (!b)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !c || "object" != typeof c && "function" != typeof c ? b : c
        }
        function _(b, c) {
            if ("function" != typeof c && null !== c)
                throw new TypeError("Super expression must either be null or a function, not " + typeof c);
            b.prototype = Object.create(c && c.prototype, {
                constructor: {
                    value: b,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            c && (Object.setPrototypeOf ? Object.setPrototypeOf(b, c) : b.__proto__ = c)
        }
        function f(b) {
            var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return null == b ? c : ("function" == typeof b.formats && (c = (0,
            n.default)(c, b.formats())),
            null == b.parent || "scroll" == b.parent.blotName || b.parent.statics.scope !== b.statics.scope ? c : f(b.parent, c))
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.BlockEmbed = g.bubbleFormats = void 0;
        var u = function() {
            function b(c, p) {
                for (var N = 0; N < p.length; N++) {
                    var q = p[N];
                    q.enumerable = q.enumerable || !1,
                    q.configurable = !0,
                    "value"in q && (q.writable = !0),
                    Object.defineProperty(c, q.key, q)
                }
            }
            return function(c, p, N) {
                return p && b(c.prototype, p),
                N && b(c, N),
                c
            }
        }()
          , e = function b(c, p, N) {
            null === c && (c = Function.prototype);
            var q = Object.getOwnPropertyDescriptor(c, p);
            if (void 0 === q) {
                var L = Object.getPrototypeOf(c);
                return null === L ? void 0 : b(L, p, N)
            }
            if ("value"in q)
                return q.value;
            var U = q.get;
            return void 0 !== U ? U.call(N) : void 0
        }
          , n = w(d(2))
          , s = w(d(4))
          , r = w(d(0))
          , h = w(d(14))
          , y = w(d(5))
          , O = w(d(8))
          , E = function(b) {
            function c() {
                return T(this, c),
                k(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments))
            }
            return _(c, b),
            u(c, [{
                key: "attach",
                value: function() {
                    e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "attach", this).call(this),
                    this.attributes = new r.default.Attributor.Store(this.domNode)
                }
            }, {
                key: "delta",
                value: function() {
                    return (new s.default).insert(this.value(), (0,
                    n.default)(this.formats(), this.attributes.values()))
                }
            }, {
                key: "format",
                value: function(p, N) {
                    var q = r.default.query(p, r.default.Scope.BLOCK_ATTRIBUTE);
                    null != q && this.attributes.attribute(q, N)
                }
            }, {
                key: "formatAt",
                value: function(p, N, q, L) {
                    this.format(q, L)
                }
            }, {
                key: "insertAt",
                value: function(p, N, q) {
                    if ("string" == typeof N && N.endsWith("\n")) {
                        var L = r.default.create(v.blotName);
                        this.parent.insertBefore(L, 0 === p ? this : this.next),
                        L.insertAt(0, N.slice(0, -1))
                    } else
                        e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "insertAt", this).call(this, p, N, q)
                }
            }]),
            c
        }(r.default.Embed);
        E.scope = r.default.Scope.BLOCK_BLOT;
        var v = function(b) {
            function c(p) {
                T(this, c);
                var N = k(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, p));
                return N.cache = {},
                N
            }
            return _(c, b),
            u(c, [{
                key: "delta",
                value: function() {
                    return null == this.cache.delta && (this.cache.delta = this.descendants(r.default.Leaf).reduce(function(p, N) {
                        return 0 === N.length() ? p : p.insert(N.value(), f(N))
                    }, new s.default).insert("\n", f(this))),
                    this.cache.delta
                }
            }, {
                key: "deleteAt",
                value: function(p, N) {
                    e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "deleteAt", this).call(this, p, N),
                    this.cache = {}
                }
            }, {
                key: "formatAt",
                value: function(p, N, q, L) {
                    N <= 0 || (r.default.query(q, r.default.Scope.BLOCK) ? p + N === this.length() && this.format(q, L) : e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "formatAt", this).call(this, p, Math.min(N, this.length() - p - 1), q, L),
                    this.cache = {})
                }
            }, {
                key: "insertAt",
                value: function(p, N, q) {
                    if (null != q)
                        return e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "insertAt", this).call(this, p, N, q);
                    if (0 !== N.length) {
                        var L = N.split("\n")
                          , U = L.shift();
                        U.length > 0 && (p < this.length() - 1 || null == this.children.tail ? e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "insertAt", this).call(this, Math.min(p, this.length() - 1), U) : this.children.tail.insertAt(this.children.tail.length(), U),
                        this.cache = {});
                        var z = this;
                        L.reduce(function(F, I) {
                            return (z = z.split(F, !0)).insertAt(0, I),
                            I.length
                        }, p + U.length)
                    }
                }
            }, {
                key: "insertBefore",
                value: function(p, N) {
                    var q = this.children.head;
                    e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "insertBefore", this).call(this, p, N),
                    q instanceof h.default && q.remove(),
                    this.cache = {}
                }
            }, {
                key: "length",
                value: function() {
                    return null == this.cache.length && (this.cache.length = e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "length", this).call(this) + 1),
                    this.cache.length
                }
            }, {
                key: "moveChildren",
                value: function(p, N) {
                    e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "moveChildren", this).call(this, p, N),
                    this.cache = {}
                }
            }, {
                key: "optimize",
                value: function(p) {
                    e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "optimize", this).call(this, p),
                    this.cache = {}
                }
            }, {
                key: "path",
                value: function(p) {
                    return e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "path", this).call(this, p, !0)
                }
            }, {
                key: "removeChild",
                value: function(p) {
                    e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "removeChild", this).call(this, p),
                    this.cache = {}
                }
            }, {
                key: "split",
                value: function(p) {
                    var N = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (N && (0 === p || p >= this.length() - 1)) {
                        var q = this.clone();
                        return 0 === p ? (this.parent.insertBefore(q, this),
                        this) : (this.parent.insertBefore(q, this.next),
                        q)
                    }
                    var L = e(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "split", this).call(this, p, N);
                    return this.cache = {},
                    L
                }
            }]),
            c
        }(r.default.Block);
        v.blotName = "block",
        v.tagName = "P",
        v.defaultChild = "break",
        v.allowedChildren = [y.default, r.default.Embed, O.default],
        g.bubbleFormats = f,
        g.BlockEmbed = E,
        g.default = v
    }
    , function(B, g, d) {
        var w = d(54)
          , T = d(12)
          , k = d(2)
          , _ = d(20)
          , f = String.fromCharCode(0)
          , u = function(e) {
            this.ops = Array.isArray(e) ? e : null != e && Array.isArray(e.ops) ? e.ops : []
        };
        u.prototype.insert = function(e, t) {
            var n = {};
            return 0 === e.length ? this : (n.insert = e,
            null != t && "object" == typeof t && Object.keys(t).length > 0 && (n.attributes = t),
            this.push(n))
        }
        ,
        u.prototype.delete = function(e) {
            return e <= 0 ? this : this.push({
                delete: e
            })
        }
        ,
        u.prototype.retain = function(e, t) {
            if (e <= 0)
                return this;
            var n = {
                retain: e
            };
            return null != t && "object" == typeof t && Object.keys(t).length > 0 && (n.attributes = t),
            this.push(n)
        }
        ,
        u.prototype.push = function(e) {
            var t = this.ops.length
              , n = this.ops[t - 1];
            if (e = k(!0, {}, e),
            "object" == typeof n) {
                if ("number" == typeof e.delete && "number" == typeof n.delete)
                    return this.ops[t - 1] = {
                        delete: n.delete + e.delete
                    },
                    this;
                if ("number" == typeof n.delete && null != e.insert && "object" != typeof (n = this.ops[(t -= 1) - 1]))
                    return this.ops.unshift(e),
                    this;
                if (T(e.attributes, n.attributes)) {
                    if ("string" == typeof e.insert && "string" == typeof n.insert)
                        return this.ops[t - 1] = {
                            insert: n.insert + e.insert
                        },
                        "object" == typeof e.attributes && (this.ops[t - 1].attributes = e.attributes),
                        this;
                    if ("number" == typeof e.retain && "number" == typeof n.retain)
                        return this.ops[t - 1] = {
                            retain: n.retain + e.retain
                        },
                        "object" == typeof e.attributes && (this.ops[t - 1].attributes = e.attributes),
                        this
                }
            }
            return t === this.ops.length ? this.ops.push(e) : this.ops.splice(t, 0, e),
            this
        }
        ,
        u.prototype.chop = function() {
            var e = this.ops[this.ops.length - 1];
            return e && e.retain && !e.attributes && this.ops.pop(),
            this
        }
        ,
        u.prototype.filter = function(e) {
            return this.ops.filter(e)
        }
        ,
        u.prototype.forEach = function(e) {
            this.ops.forEach(e)
        }
        ,
        u.prototype.map = function(e) {
            return this.ops.map(e)
        }
        ,
        u.prototype.partition = function(e) {
            var t = []
              , n = [];
            return this.forEach(function(o) {
                (e(o) ? t : n).push(o)
            }),
            [t, n]
        }
        ,
        u.prototype.reduce = function(e, t) {
            return this.ops.reduce(e, t)
        }
        ,
        u.prototype.changeLength = function() {
            return this.reduce(function(e, t) {
                return t.insert ? e + _.length(t) : t.delete ? e - t.delete : e
            }, 0)
        }
        ,
        u.prototype.length = function() {
            return this.reduce(function(e, t) {
                return e + _.length(t)
            }, 0)
        }
        ,
        u.prototype.slice = function(e, t) {
            e = e || 0,
            "number" != typeof t && (t = 1 / 0);
            for (var n = [], o = _.iterator(this.ops), s = 0; s < t && o.hasNext(); ) {
                var i;
                s < e ? i = o.next(e - s) : (i = o.next(t - s),
                n.push(i)),
                s += _.length(i)
            }
            return new u(n)
        }
        ,
        u.prototype.compose = function(e) {
            var t = _.iterator(this.ops)
              , n = _.iterator(e.ops)
              , o = []
              , s = n.peek();
            if (null != s && "number" == typeof s.retain && null == s.attributes) {
                for (var i = s.retain; "insert" === t.peekType() && t.peekLength() <= i; )
                    i -= t.peekLength(),
                    o.push(t.next());
                s.retain - i > 0 && n.next(s.retain - i)
            }
            for (var r = new u(o); t.hasNext() || n.hasNext(); )
                if ("insert" === n.peekType())
                    r.push(n.next());
                else if ("delete" === t.peekType())
                    r.push(t.next());
                else {
                    var a = Math.min(t.peekLength(), n.peekLength())
                      , h = t.next(a)
                      , l = n.next(a);
                    if ("number" == typeof l.retain) {
                        var y = {};
                        "number" == typeof h.retain ? y.retain = a : y.insert = h.insert;
                        var x = _.attributes.compose(h.attributes, l.attributes, "number" == typeof h.retain);
                        if (x && (y.attributes = x),
                        r.push(y),
                        !n.hasNext() && T(r.ops[r.ops.length - 1], y)) {
                            var O = new u(t.rest());
                            return r.concat(O).chop()
                        }
                    } else
                        "number" == typeof l.delete && "number" == typeof h.retain && r.push(l)
                }
            return r.chop()
        }
        ,
        u.prototype.concat = function(e) {
            var t = new u(this.ops.slice());
            return e.ops.length > 0 && (t.push(e.ops[0]),
            t.ops = t.ops.concat(e.ops.slice(1))),
            t
        }
        ,
        u.prototype.diff = function(e, t) {
            if (this.ops === e.ops)
                return new u;
            var n = [this, e].map(function(a) {
                return a.map(function(h) {
                    if (null != h.insert)
                        return "string" == typeof h.insert ? h.insert : f;
                    throw new Error("diff() called " + (a === e ? "on" : "with") + " non-document")
                }).join("")
            })
              , o = new u
              , s = w(n[0], n[1], t)
              , i = _.iterator(this.ops)
              , r = _.iterator(e.ops);
            return s.forEach(function(a) {
                for (var h = a[1].length; h > 0; ) {
                    var l = 0;
                    switch (a[0]) {
                    case w.INSERT:
                        l = Math.min(r.peekLength(), h),
                        o.push(r.next(l));
                        break;
                    case w.DELETE:
                        l = Math.min(h, i.peekLength()),
                        i.next(l),
                        o.delete(l);
                        break;
                    case w.EQUAL:
                        l = Math.min(i.peekLength(), r.peekLength(), h);
                        var y = i.next(l)
                          , x = r.next(l);
                        T(y.insert, x.insert) ? o.retain(l, _.attributes.diff(y.attributes, x.attributes)) : o.push(x).delete(l)
                    }
                    h -= l
                }
            }),
            o.chop()
        }
        ,
        u.prototype.eachLine = function(e, t) {
            t = t || "\n";
            for (var n = _.iterator(this.ops), o = new u, s = 0; n.hasNext(); ) {
                if ("insert" !== n.peekType())
                    return;
                var i = n.peek()
                  , r = _.length(i) - n.peekLength()
                  , a = "string" == typeof i.insert ? i.insert.indexOf(t, r) - r : -1;
                if (a < 0)
                    o.push(n.next());
                else if (a > 0)
                    o.push(n.next(a));
                else {
                    if (!1 === e(o, n.next(1).attributes || {}, s))
                        return;
                    s += 1,
                    o = new u
                }
            }
            o.length() > 0 && e(o, {}, s)
        }
        ,
        u.prototype.transform = function(e, t) {
            if (t = !!t,
            "number" == typeof e)
                return this.transformPosition(e, t);
            for (var n = _.iterator(this.ops), o = _.iterator(e.ops), s = new u; n.hasNext() || o.hasNext(); )
                if ("insert" !== n.peekType() || !t && "insert" === o.peekType())
                    if ("insert" === o.peekType())
                        s.push(o.next());
                    else {
                        var i = Math.min(n.peekLength(), o.peekLength())
                          , r = n.next(i)
                          , a = o.next(i);
                        if (r.delete)
                            continue;
                        a.delete ? s.push(a) : s.retain(i, _.attributes.transform(r.attributes, a.attributes, t))
                    }
                else
                    s.retain(_.length(n.next()));
            return s.chop()
        }
        ,
        u.prototype.transformPosition = function(e, t) {
            t = !!t;
            for (var n = _.iterator(this.ops), o = 0; n.hasNext() && o <= e; ) {
                var s = n.peekLength()
                  , i = n.peekType();
                n.next(),
                "delete" !== i ? ("insert" === i && (o < e || !t) && (e += s),
                o += s) : e -= Math.min(s, e - o)
            }
            return e
        }
        ,
        B.exports = u
    }
    , function(B, g, d) {
        "use strict";
        function w(i) {
            return i && i.__esModule ? i : {
                default: i
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var f = function() {
            function i(r, a) {
                for (var h = 0; h < a.length; h++) {
                    var l = a[h];
                    l.enumerable = l.enumerable || !1,
                    l.configurable = !0,
                    "value"in l && (l.writable = !0),
                    Object.defineProperty(r, l.key, l)
                }
            }
            return function(r, a, h) {
                return a && i(r.prototype, a),
                h && i(r, h),
                r
            }
        }()
          , u = function i(r, a, h) {
            null === r && (r = Function.prototype);
            var l = Object.getOwnPropertyDescriptor(r, a);
            if (void 0 === l) {
                var y = Object.getPrototypeOf(r);
                return null === y ? void 0 : i(y, a, h)
            }
            if ("value"in l)
                return l.value;
            var x = l.get;
            return void 0 !== x ? x.call(h) : void 0
        }
          , t = w(d(8))
          , o = w(d(0))
          , s = function(i) {
            function r() {
                return function T(i, r) {
                    if (!(i instanceof r))
                        throw new TypeError("Cannot call a class as a function")
                }(this, r),
                function k(i, r) {
                    if (!i)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !r || "object" != typeof r && "function" != typeof r ? i : r
                }(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments))
            }
            return function _(i, r) {
                if ("function" != typeof r && null !== r)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
                i.prototype = Object.create(r && r.prototype, {
                    constructor: {
                        value: i,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                r && (Object.setPrototypeOf ? Object.setPrototypeOf(i, r) : i.__proto__ = r)
            }(r, i),
            f(r, [{
                key: "formatAt",
                value: function(a, h, l, y) {
                    if (r.compare(this.statics.blotName, l) < 0 && o.default.query(l, o.default.Scope.BLOT)) {
                        var x = this.isolate(a, h);
                        y && x.wrap(l, y)
                    } else
                        u(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "formatAt", this).call(this, a, h, l, y)
                }
            }, {
                key: "optimize",
                value: function(a) {
                    if (u(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "optimize", this).call(this, a),
                    this.parent instanceof r && r.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                        var h = this.parent.isolate(this.offset(), this.length());
                        this.moveChildren(h),
                        h.wrap(this)
                    }
                }
            }], [{
                key: "compare",
                value: function(a, h) {
                    var l = r.order.indexOf(a)
                      , y = r.order.indexOf(h);
                    return l >= 0 || y >= 0 ? l - y : a === h ? 0 : a < h ? -1 : 1
                }
            }]),
            r
        }(o.default.Inline);
        s.allowedChildren = [s, o.default.Embed, t.default],
        s.order = ["cursor", "inline", "underline", "strike", "italic", "bold", "script", "link", "code"],
        g.default = s
    }
    , function(B, g, d) {
        "use strict";
        function w(I) {
            return I && I.__esModule ? I : {
                default: I
            }
        }
        function T(I, m, A) {
            return m in I ? Object.defineProperty(I, m, {
                value: A,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : I[m] = A,
            I
        }
        function _(I, m) {
            if ((m = (0,
            p.default)(!0, {
                container: I,
                modules: {
                    clipboard: !0,
                    keyboard: !0,
                    history: !0
                }
            }, m)).theme && m.theme !== F.DEFAULTS.theme) {
                if (m.theme = F.import("themes/" + m.theme),
                null == m.theme)
                    throw new Error("Invalid theme " + m.theme + ". Did you register it?")
            } else
                m.theme = U.default;
            var A = (0,
            p.default)(!0, {}, m.theme.DEFAULTS);
            [A, m].forEach(function(R) {
                R.modules = R.modules || {},
                Object.keys(R.modules).forEach(function(M) {
                    !0 === R.modules[M] && (R.modules[M] = {})
                })
            });
            var S = Object.keys(A.modules).concat(Object.keys(m.modules)).reduce(function(R, M) {
                var j = F.import("modules/" + M);
                return null == j ? z.error("Cannot load " + M + " module. Are you sure you registered it?") : R[M] = j.DEFAULTS || {},
                R
            }, {});
            return null != m.modules && m.modules.toolbar && m.modules.toolbar.constructor !== Object && (m.modules.toolbar = {
                container: m.modules.toolbar
            }),
            m = (0,
            p.default)(!0, {}, F.DEFAULTS, {
                modules: S
            }, A, m),
            ["bounds", "container", "scrollingContainer"].forEach(function(R) {
                "string" == typeof m[R] && (m[R] = document.querySelector(m[R]))
            }),
            m.modules = Object.keys(m.modules).reduce(function(R, M) {
                return m.modules[M] && (R[M] = m.modules[M]),
                R
            }, {}),
            m
        }
        function f(I, m, A, P) {
            if (this.options.strict && !this.isEnabled() && m === l.default.sources.USER)
                return new i.default;
            var S = null == A ? null : this.getSelection()
              , R = this.editor.delta
              , M = I();
            if (null != S && (!0 === A && (A = S.index),
            null == P ? S = e(S, M, m) : 0 !== P && (S = e(S, A, P, m)),
            this.setSelection(S, l.default.sources.SILENT)),
            M.length() > 0) {
                var j, D, C = [l.default.events.TEXT_CHANGE, M, R, m];
                (j = this.emitter).emit.apply(j, [l.default.events.EDITOR_CHANGE].concat(C)),
                m !== l.default.sources.SILENT && (D = this.emitter).emit.apply(D, C)
            }
            return M
        }
        function u(I, m, A, P, S) {
            var R = {};
            return "number" == typeof I.index && "number" == typeof I.length ? "number" != typeof m ? (S = P,
            P = A,
            A = m,
            m = I.length,
            I = I.index) : (m = I.length,
            I = I.index) : "number" != typeof m && (S = P,
            P = A,
            A = m,
            m = 0),
            "object" === (void 0 === A ? "undefined" : t(A)) ? (R = A,
            S = P) : "string" == typeof A && (null != P ? R[A] = P : S = A),
            [I, m, R, S = S || l.default.sources.API]
        }
        function e(I, m, A, P) {
            if (null == I)
                return null;
            var S = void 0
              , R = void 0;
            if (m instanceof i.default) {
                var M = [I.index, I.index + I.length].map(function(Z) {
                    return m.transformPosition(Z, P !== l.default.sources.USER)
                })
                  , j = n(M, 2);
                S = j[0],
                R = j[1]
            } else {
                var C = [I.index, I.index + I.length].map(function(Z) {
                    return Z < m || Z === m && P === l.default.sources.USER ? Z : A >= 0 ? Z + A : Math.max(m, Z + A)
                })
                  , D = n(C, 2);
                S = D[0],
                R = D[1]
            }
            return new v.Range(S,R - S)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.overload = g.expandConfig = void 0;
        var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(I) {
            return typeof I
        }
        : function(I) {
            return I && "function" == typeof Symbol && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I
        }
          , n = function(m, A) {
            if (Array.isArray(m))
                return m;
            if (Symbol.iterator in Object(m))
                return function I(m, A) {
                    var P = []
                      , S = !0
                      , R = !1
                      , M = void 0;
                    try {
                        for (var j, C = m[Symbol.iterator](); !(S = (j = C.next()).done) && (P.push(j.value),
                        !A || P.length !== A); S = !0)
                            ;
                    } catch (D) {
                        R = !0,
                        M = D
                    } finally {
                        try {
                            !S && C.return && C.return()
                        } finally {
                            if (R)
                                throw M
                        }
                    }
                    return P
                }(m, A);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , o = function() {
            function I(m, A) {
                for (var P = 0; P < A.length; P++) {
                    var S = A[P];
                    S.enumerable = S.enumerable || !1,
                    S.configurable = !0,
                    "value"in S && (S.writable = !0),
                    Object.defineProperty(m, S.key, S)
                }
            }
            return function(m, A, P) {
                return A && I(m.prototype, A),
                P && I(m, P),
                m
            }
        }();
        d(53);
        var i = w(d(4))
          , a = w(d(57))
          , l = w(d(9))
          , x = w(d(7))
          , E = w(d(0))
          , v = d(22)
          , b = w(v)
          , p = w(d(2))
          , q = w(d(10))
          , U = w(d(32))
          , z = (0,
        q.default)("quill")
          , F = function() {
            function I(m) {
                var A = this
                  , P = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (function k(I, m) {
                    if (!(I instanceof m))
                        throw new TypeError("Cannot call a class as a function")
                }(this, I),
                this.options = _(m, P),
                this.container = this.options.container,
                null == this.container)
                    return z.error("Invalid Quill container", m);
                this.options.debug && I.debug(this.options.debug);
                var S = this.container.innerHTML.trim();
                this.container.classList.add("ql-container"),
                this.container.innerHTML = "",
                this.container.__quill = this,
                this.root = this.addContainer("ql-editor"),
                this.root.classList.add("ql-blank"),
                this.root.setAttribute("data-gramm", !1),
                this.scrollingContainer = this.options.scrollingContainer || this.root,
                this.emitter = new l.default,
                this.scroll = E.default.create(this.root, {
                    emitter: this.emitter,
                    whitelist: this.options.formats
                }),
                this.editor = new a.default(this.scroll),
                this.selection = new b.default(this.scroll,this.emitter),
                this.theme = new this.options.theme(this,this.options),
                this.keyboard = this.theme.addModule("keyboard"),
                this.clipboard = this.theme.addModule("clipboard"),
                this.history = this.theme.addModule("history"),
                this.theme.init(),
                this.emitter.on(l.default.events.EDITOR_CHANGE, function(M) {
                    M === l.default.events.TEXT_CHANGE && A.root.classList.toggle("ql-blank", A.editor.isBlank())
                }),
                this.emitter.on(l.default.events.SCROLL_UPDATE, function(M, j) {
                    var C = A.selection.lastRange
                      , D = C && 0 === C.length ? C.index : void 0;
                    f.call(A, function() {
                        return A.editor.update(null, j, D)
                    }, M)
                });
                var R = this.clipboard.convert("<div class='ql-editor' style=\"white-space: normal;\">" + S + "<p><br></p></div>");
                this.setContents(R),
                this.history.clear(),
                this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder),
                this.options.readOnly && this.disable()
            }
            return o(I, null, [{
                key: "debug",
                value: function(m) {
                    !0 === m && (m = "log"),
                    q.default.level(m)
                }
            }, {
                key: "find",
                value: function(m) {
                    return m.__quill || E.default.find(m)
                }
            }, {
                key: "import",
                value: function(m) {
                    return null == this.imports[m] && z.error("Cannot import " + m + ". Are you sure it was registered?"),
                    this.imports[m]
                }
            }, {
                key: "register",
                value: function(m, A) {
                    var P = this
                      , S = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if ("string" != typeof m) {
                        var R = m.attrName || m.blotName;
                        "string" == typeof R ? this.register("formats/" + R, m, A) : Object.keys(m).forEach(function(M) {
                            P.register(M, m[M], A)
                        })
                    } else
                        null == this.imports[m] || S || z.warn("Overwriting " + m + " with", A),
                        this.imports[m] = A,
                        (m.startsWith("blots/") || m.startsWith("formats/")) && "abstract" !== A.blotName ? E.default.register(A) : m.startsWith("modules") && "function" == typeof A.register && A.register()
                }
            }]),
            o(I, [{
                key: "addContainer",
                value: function(m) {
                    var A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    if ("string" == typeof m) {
                        var P = m;
                        (m = document.createElement("div")).classList.add(P)
                    }
                    return this.container.insertBefore(m, A),
                    m
                }
            }, {
                key: "blur",
                value: function() {
                    this.selection.setRange(null)
                }
            }, {
                key: "deleteText",
                value: function(m, A, P) {
                    var S = this
                      , R = u(m, A, P)
                      , M = n(R, 4);
                    return f.call(this, function() {
                        return S.editor.deleteText(m, A)
                    }, P = M[3], m = M[0], -1 * (A = M[1]))
                }
            }, {
                key: "disable",
                value: function() {
                    this.enable(!1)
                }
            }, {
                key: "enable",
                value: function() {
                    var m = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    this.scroll.enable(m),
                    this.container.classList.toggle("ql-disabled", !m)
                }
            }, {
                key: "focus",
                value: function() {
                    var m = this.scrollingContainer.scrollTop;
                    this.selection.focus(),
                    this.scrollingContainer.scrollTop = m,
                    this.scrollIntoView()
                }
            }, {
                key: "format",
                value: function(m, A) {
                    var P = this;
                    return f.call(this, function() {
                        var R = P.getSelection(!0)
                          , M = new i.default;
                        if (null == R)
                            return M;
                        if (E.default.query(m, E.default.Scope.BLOCK))
                            M = P.editor.formatLine(R.index, R.length, T({}, m, A));
                        else {
                            if (0 === R.length)
                                return P.selection.format(m, A),
                                M;
                            M = P.editor.formatText(R.index, R.length, T({}, m, A))
                        }
                        return P.setSelection(R, l.default.sources.SILENT),
                        M
                    }, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.default.sources.API)
                }
            }, {
                key: "formatLine",
                value: function(m, A, P, S, R) {
                    var j, M = this, C = u(m, A, P, S, R), D = n(C, 4);
                    return A = D[1],
                    j = D[2],
                    f.call(this, function() {
                        return M.editor.formatLine(m, A, j)
                    }, R = D[3], m = D[0], 0)
                }
            }, {
                key: "formatText",
                value: function(m, A, P, S, R) {
                    var j, M = this, C = u(m, A, P, S, R), D = n(C, 4);
                    return A = D[1],
                    j = D[2],
                    f.call(this, function() {
                        return M.editor.formatText(m, A, j)
                    }, R = D[3], m = D[0], 0)
                }
            }, {
                key: "getBounds",
                value: function(m) {
                    var P;
                    P = "number" == typeof m ? this.selection.getBounds(m, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0) : this.selection.getBounds(m.index, m.length);
                    var S = this.container.getBoundingClientRect();
                    return {
                        bottom: P.bottom - S.top,
                        height: P.height,
                        left: P.left - S.left,
                        right: P.right - S.left,
                        top: P.top - S.top,
                        width: P.width
                    }
                }
            }, {
                key: "getContents",
                value: function() {
                    var m = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - m
                      , P = u(m, A)
                      , S = n(P, 2);
                    return this.editor.getContents(m = S[0], A = S[1])
                }
            }, {
                key: "getFormat",
                value: function() {
                    var m = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getSelection(!0);
                    return "number" == typeof m ? this.editor.getFormat(m, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0) : this.editor.getFormat(m.index, m.length)
                }
            }, {
                key: "getIndex",
                value: function(m) {
                    return m.offset(this.scroll)
                }
            }, {
                key: "getLength",
                value: function() {
                    return this.scroll.length()
                }
            }, {
                key: "getLeaf",
                value: function(m) {
                    return this.scroll.leaf(m)
                }
            }, {
                key: "getLine",
                value: function(m) {
                    return this.scroll.line(m)
                }
            }, {
                key: "getLines",
                value: function() {
                    var m = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
                    return "number" != typeof m ? this.scroll.lines(m.index, m.length) : this.scroll.lines(m, A)
                }
            }, {
                key: "getModule",
                value: function(m) {
                    return this.theme.modules[m]
                }
            }, {
                key: "getSelection",
                value: function() {
                    return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.focus(),
                    this.update(),
                    this.selection.getRange()[0]
                }
            }, {
                key: "getText",
                value: function() {
                    var m = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - m
                      , P = u(m, A)
                      , S = n(P, 2);
                    return this.editor.getText(m = S[0], A = S[1])
                }
            }, {
                key: "hasFocus",
                value: function() {
                    return this.selection.hasFocus()
                }
            }, {
                key: "insertEmbed",
                value: function(m, A, P) {
                    var S = this;
                    return f.call(this, function() {
                        return S.editor.insertEmbed(m, A, P)
                    }, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : I.sources.API, m)
                }
            }, {
                key: "insertText",
                value: function(m, A, P, S, R) {
                    var j, M = this, C = u(m, 0, P, S, R), D = n(C, 4);
                    return j = D[2],
                    f.call(this, function() {
                        return M.editor.insertText(m, A, j)
                    }, R = D[3], m = D[0], A.length)
                }
            }, {
                key: "isEnabled",
                value: function() {
                    return !this.container.classList.contains("ql-disabled")
                }
            }, {
                key: "off",
                value: function() {
                    return this.emitter.off.apply(this.emitter, arguments)
                }
            }, {
                key: "on",
                value: function() {
                    return this.emitter.on.apply(this.emitter, arguments)
                }
            }, {
                key: "once",
                value: function() {
                    return this.emitter.once.apply(this.emitter, arguments)
                }
            }, {
                key: "pasteHTML",
                value: function(m, A, P) {
                    this.clipboard.dangerouslyPasteHTML(m, A, P)
                }
            }, {
                key: "removeFormat",
                value: function(m, A, P) {
                    var S = this
                      , R = u(m, A, P)
                      , M = n(R, 4);
                    return A = M[1],
                    f.call(this, function() {
                        return S.editor.removeFormat(m, A)
                    }, P = M[3], m = M[0])
                }
            }, {
                key: "scrollIntoView",
                value: function() {
                    this.selection.scrollIntoView(this.scrollingContainer)
                }
            }, {
                key: "setContents",
                value: function(m) {
                    var A = this;
                    return f.call(this, function() {
                        m = new i.default(m);
                        var S = A.getLength()
                          , R = A.editor.deleteText(0, S)
                          , M = A.editor.applyDelta(m)
                          , j = M.ops[M.ops.length - 1];
                        return null != j && "string" == typeof j.insert && "\n" === j.insert[j.insert.length - 1] && (A.editor.deleteText(A.getLength() - 1, 1),
                        M.delete(1)),
                        R.compose(M)
                    }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.default.sources.API)
                }
            }, {
                key: "setSelection",
                value: function(m, A, P) {
                    if (null == m)
                        this.selection.setRange(null, A || I.sources.API);
                    else {
                        var S = u(m, A, P)
                          , R = n(S, 4);
                        P = R[3],
                        this.selection.setRange(new v.Range(m = R[0],A = R[1]), P),
                        P !== l.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer)
                    }
                }
            }, {
                key: "setText",
                value: function(m) {
                    var A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.default.sources.API
                      , P = (new i.default).insert(m);
                    return this.setContents(P, A)
                }
            }, {
                key: "update",
                value: function() {
                    var m = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l.default.sources.USER
                      , A = this.scroll.update(m);
                    return this.selection.update(m),
                    A
                }
            }, {
                key: "updateContents",
                value: function(m) {
                    var A = this
                      , P = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.default.sources.API;
                    return f.call(this, function() {
                        return m = new i.default(m),
                        A.editor.applyDelta(m, P)
                    }, P, !0)
                }
            }]),
            I
        }();
        F.DEFAULTS = {
            bounds: null,
            formats: null,
            modules: {},
            placeholder: "",
            readOnly: !1,
            scrollingContainer: null,
            strict: !0,
            theme: "default"
        },
        F.events = l.default.events,
        F.sources = l.default.sources,
        F.version = "1.3.7",
        F.imports = {
            delta: i.default,
            parchment: E.default,
            "core/module": x.default,
            "core/theme": U.default
        },
        g.expandConfig = _,
        g.overload = u,
        g.default = F
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = function k(_) {
            var f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            (function w(k, _) {
                if (!(k instanceof _))
                    throw new TypeError("Cannot call a class as a function")
            }
            )(this, k),
            this.quill = _,
            this.options = f
        };
        T.DEFAULTS = {},
        g.default = T
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var e, u = function(e) {
            function t() {
                return function w(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function T(e, t) {
                    if (!e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function k(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e),
            t
        }(((e = d(0)) && e.__esModule ? e : {
            default: e
        }).default.Text);
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        function w(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var f = function() {
            function r(a, h) {
                for (var l = 0; l < h.length; l++) {
                    var y = h[l];
                    y.enumerable = y.enumerable || !1,
                    y.configurable = !0,
                    "value"in y && (y.writable = !0),
                    Object.defineProperty(a, y.key, y)
                }
            }
            return function(a, h, l) {
                return h && r(a.prototype, h),
                l && r(a, l),
                a
            }
        }()
          , u = function r(a, h, l) {
            null === a && (a = Function.prototype);
            var y = Object.getOwnPropertyDescriptor(a, h);
            if (void 0 === y) {
                var x = Object.getPrototypeOf(a);
                return null === x ? void 0 : r(x, h, l)
            }
            if ("value"in y)
                return y.value;
            var O = y.get;
            return void 0 !== O ? O.call(l) : void 0
        }
          , t = w(d(58))
          , s = (0,
        w(d(10)).default)("quill:events");
        ["selectionchange", "mousedown", "mouseup", "click"].forEach(function(r) {
            document.addEventListener(r, function() {
                for (var a = arguments.length, h = Array(a), l = 0; l < a; l++)
                    h[l] = arguments[l];
                [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(y) {
                    var x;
                    y.__quill && y.__quill.emitter && (x = y.__quill.emitter).handleDOM.apply(x, h)
                })
            })
        });
        var i = function(r) {
            function a() {
                !function T(r, a) {
                    if (!(r instanceof a))
                        throw new TypeError("Cannot call a class as a function")
                }(this, a);
                var h = function k(r, a) {
                    if (!r)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !a || "object" != typeof a && "function" != typeof a ? r : a
                }(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
                return h.listeners = {},
                h.on("error", s.error),
                h
            }
            return function _(r, a) {
                if ("function" != typeof a && null !== a)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof a);
                r.prototype = Object.create(a && a.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                a && (Object.setPrototypeOf ? Object.setPrototypeOf(r, a) : r.__proto__ = a)
            }(a, r),
            f(a, [{
                key: "emit",
                value: function() {
                    s.log.apply(s, arguments),
                    u(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "emit", this).apply(this, arguments)
                }
            }, {
                key: "handleDOM",
                value: function(h) {
                    for (var l = arguments.length, y = Array(l > 1 ? l - 1 : 0), x = 1; x < l; x++)
                        y[x - 1] = arguments[x];
                    (this.listeners[h.type] || []).forEach(function(O) {
                        var E = O.node
                          , v = O.handler;
                        (h.target === E || E.contains(h.target)) && v.apply(void 0, [h].concat(y))
                    })
                }
            }, {
                key: "listenDOM",
                value: function(h, l, y) {
                    this.listeners[h] || (this.listeners[h] = []),
                    this.listeners[h].push({
                        node: l,
                        handler: y
                    })
                }
            }]),
            a
        }(t.default);
        i.events = {
            EDITOR_CHANGE: "editor-change",
            SCROLL_BEFORE_UPDATE: "scroll-before-update",
            SCROLL_OPTIMIZE: "scroll-optimize",
            SCROLL_UPDATE: "scroll-update",
            SELECTION_CHANGE: "selection-change",
            TEXT_CHANGE: "text-change"
        },
        i.sources = {
            API: "api",
            SILENT: "silent",
            USER: "user"
        },
        g.default = i
    }
    , function(B, g, d) {
        "use strict";
        function w(f) {
            if (k.indexOf(f) <= k.indexOf(_)) {
                for (var u, e = arguments.length, t = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
                    t[n - 1] = arguments[n];
                (u = console)[f].apply(u, t)
            }
        }
        function T(f) {
            return k.reduce(function(u, e) {
                return u[e] = w.bind(console, e, f),
                u
            }, {})
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var k = ["error", "warn", "log", "info"]
          , _ = "warn";
        w.level = T.level = function(f) {
            _ = f
        }
        ,
        g.default = T
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var w = d(1)
          , T = function() {
            function k(_, f, u) {
                void 0 === u && (u = {}),
                this.attrName = _,
                this.keyName = f,
                this.scope = null != u.scope ? u.scope & w.Scope.LEVEL | w.Scope.TYPE & w.Scope.ATTRIBUTE : w.Scope.ATTRIBUTE,
                null != u.whitelist && (this.whitelist = u.whitelist)
            }
            return k.keys = function(_) {
                return [].map.call(_.attributes, function(f) {
                    return f.name
                })
            }
            ,
            k.prototype.add = function(_, f) {
                return !!this.canAdd(_, f) && (_.setAttribute(this.keyName, f),
                !0)
            }
            ,
            k.prototype.canAdd = function(_, f) {
                return null != w.query(_, w.Scope.BLOT & (this.scope | w.Scope.TYPE)) && (null == this.whitelist || ("string" == typeof f ? this.whitelist.indexOf(f.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(f) > -1))
            }
            ,
            k.prototype.remove = function(_) {
                _.removeAttribute(this.keyName)
            }
            ,
            k.prototype.value = function(_) {
                var f = _.getAttribute(this.keyName);
                return this.canAdd(_, f) && f ? f : ""
            }
            ,
            k
        }();
        g.default = T
    }
    , function(B, g, d) {
        function w(t) {
            return null == t
        }
        function T(t) {
            return !(!t || "object" != typeof t || "number" != typeof t.length || "function" != typeof t.copy || "function" != typeof t.slice || t.length > 0 && "number" != typeof t[0])
        }
        var _ = Array.prototype.slice
          , f = d(55)
          , u = d(56)
          , e = B.exports = function(t, n, o) {
            return o || (o = {}),
            t === n || (t instanceof Date && n instanceof Date ? t.getTime() === n.getTime() : !t || !n || "object" != typeof t && "object" != typeof n ? o.strict ? t === n : t == n : function k(t, n, o) {
                var s, i;
                if (w(t) || w(n) || t.prototype !== n.prototype)
                    return !1;
                if (u(t))
                    return !!u(n) && (t = _.call(t),
                    n = _.call(n),
                    e(t, n, o));
                if (T(t)) {
                    if (!T(n) || t.length !== n.length)
                        return !1;
                    for (s = 0; s < t.length; s++)
                        if (t[s] !== n[s])
                            return !1;
                    return !0
                }
                try {
                    var r = f(t)
                      , a = f(n)
                } catch {
                    return !1
                }
                if (r.length != a.length)
                    return !1;
                for (r.sort(),
                a.sort(),
                s = r.length - 1; s >= 0; s--)
                    if (r[s] != a[s])
                        return !1;
                for (s = r.length - 1; s >= 0; s--)
                    if (!e(t[i = r[s]], n[i], o))
                        return !1;
                return typeof t == typeof n
            }(t, n, o))
        }
    }
    , function(B, g, d) {
        "use strict";
        function w(E) {
            return E && E.__esModule ? E : {
                default: E
            }
        }
        function T(E, v) {
            if (!(E instanceof v))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(E, v) {
            if (!E)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !v || "object" != typeof v && "function" != typeof v ? E : v
        }
        function _(E, v) {
            if ("function" != typeof v && null !== v)
                throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            E.prototype = Object.create(v && v.prototype, {
                constructor: {
                    value: E,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            v && (Object.setPrototypeOf ? Object.setPrototypeOf(E, v) : E.__proto__ = v)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.Code = void 0;
        var f = function(v, b) {
            if (Array.isArray(v))
                return v;
            if (Symbol.iterator in Object(v))
                return function E(v, b) {
                    var c = []
                      , p = !0
                      , N = !1
                      , q = void 0;
                    try {
                        for (var L, U = v[Symbol.iterator](); !(p = (L = U.next()).done) && (c.push(L.value),
                        !b || c.length !== b); p = !0)
                            ;
                    } catch (z) {
                        N = !0,
                        q = z
                    } finally {
                        try {
                            !p && U.return && U.return()
                        } finally {
                            if (N)
                                throw q
                        }
                    }
                    return c
                }(v, b);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , u = function() {
            function E(v, b) {
                for (var c = 0; c < b.length; c++) {
                    var p = b[c];
                    p.enumerable = p.enumerable || !1,
                    p.configurable = !0,
                    "value"in p && (p.writable = !0),
                    Object.defineProperty(v, p.key, p)
                }
            }
            return function(v, b, c) {
                return b && E(v.prototype, b),
                c && E(v, c),
                v
            }
        }()
          , e = function E(v, b, c) {
            null === v && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, b);
            if (void 0 === p) {
                var N = Object.getPrototypeOf(v);
                return null === N ? void 0 : E(N, b, c)
            }
            if ("value"in p)
                return p.value;
            var q = p.get;
            return void 0 !== q ? q.call(c) : void 0
        }
          , n = w(d(4))
          , s = w(d(0))
          , r = w(d(3))
          , h = w(d(5))
          , y = w(d(8))
          , x = function(E) {
            function v() {
                return T(this, v),
                k(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments))
            }
            return _(v, E),
            v
        }(h.default);
        x.blotName = "code",
        x.tagName = "CODE";
        var O = function(E) {
            function v() {
                return T(this, v),
                k(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments))
            }
            return _(v, E),
            u(v, [{
                key: "delta",
                value: function() {
                    var b = this
                      , c = this.domNode.textContent;
                    return c.endsWith("\n") && (c = c.slice(0, -1)),
                    c.split("\n").reduce(function(p, N) {
                        return p.insert(N).insert("\n", b.formats())
                    }, new n.default)
                }
            }, {
                key: "format",
                value: function(b, c) {
                    if (b !== this.statics.blotName || !c) {
                        var p = this.descendant(y.default, this.length() - 1)
                          , q = f(p, 1)[0];
                        q?.deleteAt(q.length() - 1, 1),
                        e(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "format", this).call(this, b, c)
                    }
                }
            }, {
                key: "formatAt",
                value: function(b, c, p, N) {
                    if (0 !== c && null != s.default.query(p, s.default.Scope.BLOCK) && (p !== this.statics.blotName || N !== this.statics.formats(this.domNode))) {
                        var q = this.newlineIndex(b);
                        if (!(q < 0 || q >= b + c)) {
                            var L = this.newlineIndex(b, !0) + 1
                              , U = q - L + 1
                              , z = this.isolate(L, U)
                              , F = z.next;
                            z.format(p, N),
                            F instanceof v && F.formatAt(0, b - L + c - U, p, N)
                        }
                    }
                }
            }, {
                key: "insertAt",
                value: function(b, c, p) {
                    if (null == p) {
                        var N = this.descendant(y.default, b)
                          , q = f(N, 2);
                        q[0].insertAt(q[1], c)
                    }
                }
            }, {
                key: "length",
                value: function() {
                    var b = this.domNode.textContent.length;
                    return this.domNode.textContent.endsWith("\n") ? b : b + 1
                }
            }, {
                key: "newlineIndex",
                value: function(b) {
                    if (arguments.length > 1 && void 0 !== arguments[1] && arguments[1])
                        return this.domNode.textContent.slice(0, b).lastIndexOf("\n");
                    var c = this.domNode.textContent.slice(b).indexOf("\n");
                    return c > -1 ? b + c : -1
                }
            }, {
                key: "optimize",
                value: function(b) {
                    this.domNode.textContent.endsWith("\n") || this.appendChild(s.default.create("text", "\n")),
                    e(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "optimize", this).call(this, b);
                    var c = this.next;
                    null != c && c.prev === this && c.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === c.statics.formats(c.domNode) && (c.optimize(b),
                    c.moveChildren(this),
                    c.remove())
                }
            }, {
                key: "replace",
                value: function(b) {
                    e(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "replace", this).call(this, b),
                    [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(c) {
                        var p = s.default.find(c);
                        null == p ? c.parentNode.removeChild(c) : p instanceof s.default.Embed ? p.remove() : p.unwrap()
                    })
                }
            }], [{
                key: "create",
                value: function(b) {
                    var c = e(v.__proto__ || Object.getPrototypeOf(v), "create", this).call(this, b);
                    return c.setAttribute("spellcheck", !1),
                    c
                }
            }, {
                key: "formats",
                value: function() {
                    return !0
                }
            }]),
            v
        }(r.default);
        O.blotName = "code-block",
        O.tagName = "PRE",
        O.TAB = "  ",
        g.Code = x,
        g.default = O
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var n, _ = function() {
            function n(o, s) {
                for (var i = 0; i < s.length; i++) {
                    var r = s[i];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(o, r.key, r)
                }
            }
            return function(o, s, i) {
                return s && n(o.prototype, s),
                i && n(o, i),
                o
            }
        }(), f = function n(o, s, i) {
            null === o && (o = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(o, s);
            if (void 0 === r) {
                var a = Object.getPrototypeOf(o);
                return null === a ? void 0 : n(a, s, i)
            }
            if ("value"in r)
                return r.value;
            var h = r.get;
            return void 0 !== h ? h.call(i) : void 0
        }, t = function(n) {
            function o() {
                return function w(n, o) {
                    if (!(n instanceof o))
                        throw new TypeError("Cannot call a class as a function")
                }(this, o),
                function T(n, o) {
                    if (!n)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !o || "object" != typeof o && "function" != typeof o ? n : o
                }(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
            }
            return function k(n, o) {
                if ("function" != typeof o && null !== o)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof o);
                n.prototype = Object.create(o && o.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                o && (Object.setPrototypeOf ? Object.setPrototypeOf(n, o) : n.__proto__ = o)
            }(o, n),
            _(o, [{
                key: "insertInto",
                value: function(s, i) {
                    0 === s.children.length ? f(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "insertInto", this).call(this, s, i) : this.remove()
                }
            }, {
                key: "length",
                value: function() {
                    return 0
                }
            }, {
                key: "value",
                value: function() {
                    return ""
                }
            }], [{
                key: "value",
                value: function() {}
            }]),
            o
        }(((n = d(0)) && n.__esModule ? n : {
            default: n
        }).default.Embed);
        t.blotName = "break",
        t.tagName = "BR",
        g.default = t
    }
    , function(B, g, d) {
        "use strict";
        function _(o, s) {
            var i = document.createElement("a");
            i.href = o;
            var r = i.href.slice(0, i.href.indexOf(":"));
            return s.indexOf(r) > -1
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.sanitize = g.default = void 0;
        var o, f = function() {
            function o(s, i) {
                for (var r = 0; r < i.length; r++) {
                    var a = i[r];
                    a.enumerable = a.enumerable || !1,
                    a.configurable = !0,
                    "value"in a && (a.writable = !0),
                    Object.defineProperty(s, a.key, a)
                }
            }
            return function(s, i, r) {
                return i && o(s.prototype, i),
                r && o(s, r),
                s
            }
        }(), u = function o(s, i, r) {
            null === s && (s = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(s, i);
            if (void 0 === a) {
                var h = Object.getPrototypeOf(s);
                return null === h ? void 0 : o(h, i, r)
            }
            if ("value"in a)
                return a.value;
            var l = a.get;
            return void 0 !== l ? l.call(r) : void 0
        }, n = function(o) {
            function s() {
                return function w(o, s) {
                    if (!(o instanceof s))
                        throw new TypeError("Cannot call a class as a function")
                }(this, s),
                function T(o, s) {
                    if (!o)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !s || "object" != typeof s && "function" != typeof s ? o : s
                }(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments))
            }
            return function k(o, s) {
                if ("function" != typeof s && null !== s)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof s);
                o.prototype = Object.create(s && s.prototype, {
                    constructor: {
                        value: o,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                s && (Object.setPrototypeOf ? Object.setPrototypeOf(o, s) : o.__proto__ = s)
            }(s, o),
            f(s, [{
                key: "format",
                value: function(i, r) {
                    if (i !== this.statics.blotName || !r)
                        return u(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "format", this).call(this, i, r);
                    r = this.constructor.sanitize(r),
                    this.domNode.setAttribute("href", r)
                }
            }], [{
                key: "create",
                value: function(i) {
                    var r = u(s.__proto__ || Object.getPrototypeOf(s), "create", this).call(this, i);
                    return i = this.sanitize(i),
                    r.setAttribute("href", i),
                    r.setAttribute("rel", "noopener noreferrer"),
                    r.setAttribute("target", "_blank"),
                    r
                }
            }, {
                key: "formats",
                value: function(i) {
                    return i.getAttribute("href")
                }
            }, {
                key: "sanitize",
                value: function(i) {
                    return _(i, this.PROTOCOL_WHITELIST) ? i : this.SANITIZED_URL
                }
            }]),
            s
        }(((o = d(5)) && o.__esModule ? o : {
            default: o
        }).default);
        n.blotName = "link",
        n.tagName = "A",
        n.SANITIZED_URL = "about:blank",
        n.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"],
        g.default = n,
        g.sanitize = _
    }
    , function(B, g, d) {
        "use strict";
        function w(i) {
            return i && i.__esModule ? i : {
                default: i
            }
        }
        function k(i, r) {
            i.setAttribute(r, "true" !== i.getAttribute(r))
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var _ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(i) {
            return typeof i
        }
        : function(i) {
            return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i
        }
          , f = function() {
            function i(r, a) {
                for (var h = 0; h < a.length; h++) {
                    var l = a[h];
                    l.enumerable = l.enumerable || !1,
                    l.configurable = !0,
                    "value"in l && (l.writable = !0),
                    Object.defineProperty(r, l.key, l)
                }
            }
            return function(r, a, h) {
                return a && i(r.prototype, a),
                h && i(r, h),
                r
            }
        }()
          , e = w(d(25))
          , n = w(d(106))
          , o = 0
          , s = function() {
            function i(r) {
                var a = this;
                (function T(i, r) {
                    if (!(i instanceof r))
                        throw new TypeError("Cannot call a class as a function")
                }
                )(this, i),
                this.select = r,
                this.container = document.createElement("span"),
                this.buildPicker(),
                this.select.style.display = "none",
                this.select.parentNode.insertBefore(this.container, this.select),
                this.label.addEventListener("mousedown", function() {
                    a.togglePicker()
                }),
                this.label.addEventListener("keydown", function(h) {
                    switch (h.keyCode) {
                    case e.default.keys.ENTER:
                        a.togglePicker();
                        break;
                    case e.default.keys.ESCAPE:
                        a.escape(),
                        h.preventDefault()
                    }
                }),
                this.select.addEventListener("change", this.update.bind(this))
            }
            return f(i, [{
                key: "togglePicker",
                value: function() {
                    this.container.classList.toggle("ql-expanded"),
                    k(this.label, "aria-expanded"),
                    k(this.options, "aria-hidden")
                }
            }, {
                key: "buildItem",
                value: function(r) {
                    var a = this
                      , h = document.createElement("span");
                    return h.tabIndex = "0",
                    h.setAttribute("role", "button"),
                    h.classList.add("ql-picker-item"),
                    r.hasAttribute("value") && h.setAttribute("data-value", r.getAttribute("value")),
                    r.textContent && h.setAttribute("data-label", r.textContent),
                    h.addEventListener("click", function() {
                        a.selectItem(h, !0)
                    }),
                    h.addEventListener("keydown", function(l) {
                        switch (l.keyCode) {
                        case e.default.keys.ENTER:
                            a.selectItem(h, !0),
                            l.preventDefault();
                            break;
                        case e.default.keys.ESCAPE:
                            a.escape(),
                            l.preventDefault()
                        }
                    }),
                    h
                }
            }, {
                key: "buildLabel",
                value: function() {
                    var r = document.createElement("span");
                    return r.classList.add("ql-picker-label"),
                    r.innerHTML = n.default,
                    r.tabIndex = "0",
                    r.setAttribute("role", "button"),
                    r.setAttribute("aria-expanded", "false"),
                    this.container.appendChild(r),
                    r
                }
            }, {
                key: "buildOptions",
                value: function() {
                    var r = this
                      , a = document.createElement("span");
                    a.classList.add("ql-picker-options"),
                    a.setAttribute("aria-hidden", "true"),
                    a.tabIndex = "-1",
                    a.id = "ql-picker-options-" + o,
                    o += 1,
                    this.label.setAttribute("aria-controls", a.id),
                    this.options = a,
                    [].slice.call(this.select.options).forEach(function(h) {
                        var l = r.buildItem(h);
                        a.appendChild(l),
                        !0 === h.selected && r.selectItem(l)
                    }),
                    this.container.appendChild(a)
                }
            }, {
                key: "buildPicker",
                value: function() {
                    var r = this;
                    [].slice.call(this.select.attributes).forEach(function(a) {
                        r.container.setAttribute(a.name, a.value)
                    }),
                    this.container.classList.add("ql-picker"),
                    this.label = this.buildLabel(),
                    this.buildOptions()
                }
            }, {
                key: "escape",
                value: function() {
                    var r = this;
                    this.close(),
                    setTimeout(function() {
                        return r.label.focus()
                    }, 1)
                }
            }, {
                key: "close",
                value: function() {
                    this.container.classList.remove("ql-expanded"),
                    this.label.setAttribute("aria-expanded", "false"),
                    this.options.setAttribute("aria-hidden", "true")
                }
            }, {
                key: "selectItem",
                value: function(r) {
                    var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                      , h = this.container.querySelector(".ql-selected");
                    if (r !== h && (h?.classList.remove("ql-selected"),
                    null != r && (r.classList.add("ql-selected"),
                    this.select.selectedIndex = [].indexOf.call(r.parentNode.children, r),
                    r.hasAttribute("data-value") ? this.label.setAttribute("data-value", r.getAttribute("data-value")) : this.label.removeAttribute("data-value"),
                    r.hasAttribute("data-label") ? this.label.setAttribute("data-label", r.getAttribute("data-label")) : this.label.removeAttribute("data-label"),
                    a))) {
                        if ("function" == typeof Event)
                            this.select.dispatchEvent(new Event("change"));
                        else if ("object" === (typeof Event > "u" ? "undefined" : _(Event))) {
                            var l = document.createEvent("Event");
                            l.initEvent("change", !0, !0),
                            this.select.dispatchEvent(l)
                        }
                        this.close()
                    }
                }
            }, {
                key: "update",
                value: function() {
                    var r = void 0;
                    if (this.select.selectedIndex > -1) {
                        var a = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                        r = this.select.options[this.select.selectedIndex],
                        this.selectItem(a)
                    } else
                        this.selectItem(null);
                    var h = null != r && r !== this.select.querySelector("option[selected]");
                    this.label.classList.toggle("ql-active", h)
                }
            }]),
            i
        }();
        g.default = s
    }
    , function(B, g, d) {
        "use strict";
        function w(e) {
            var t = f.find(e);
            if (null == t)
                try {
                    t = f.create(e)
                } catch {
                    t = f.create(f.Scope.INLINE),
                    [].slice.call(e.childNodes).forEach(function(o) {
                        t.domNode.appendChild(o)
                    }),
                    e.parentNode && e.parentNode.replaceChild(t.domNode, e),
                    t.attach()
                }
            return t
        }
        var e, T = this && this.__extends || (e = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, n) {
            t.__proto__ = n
        }
        || function(t, n) {
            for (var o in n)
                n.hasOwnProperty(o) && (t[o] = n[o])
        }
        ,
        function(t, n) {
            function o() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
            new o)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var k = d(47)
          , _ = d(27)
          , f = d(1)
          , u = function(e) {
            function t(n) {
                var o = e.call(this, n) || this;
                return o.build(),
                o
            }
            return T(t, e),
            t.prototype.appendChild = function(n) {
                this.insertBefore(n)
            }
            ,
            t.prototype.attach = function() {
                e.prototype.attach.call(this),
                this.children.forEach(function(n) {
                    n.attach()
                })
            }
            ,
            t.prototype.build = function() {
                var n = this;
                this.children = new k.default,
                [].slice.call(this.domNode.childNodes).reverse().forEach(function(o) {
                    try {
                        var s = w(o);
                        n.insertBefore(s, n.children.head || void 0)
                    } catch (i) {
                        if (i instanceof f.ParchmentError)
                            return;
                        throw i
                    }
                })
            }
            ,
            t.prototype.deleteAt = function(n, o) {
                if (0 === n && o === this.length())
                    return this.remove();
                this.children.forEachAt(n, o, function(s, i, r) {
                    s.deleteAt(i, r)
                })
            }
            ,
            t.prototype.descendant = function(n, o) {
                var s = this.children.find(o)
                  , i = s[0]
                  , r = s[1];
                return null == n.blotName && n(i) || null != n.blotName && i instanceof n ? [i, r] : i instanceof t ? i.descendant(n, r) : [null, -1]
            }
            ,
            t.prototype.descendants = function(n, o, s) {
                void 0 === o && (o = 0),
                void 0 === s && (s = Number.MAX_VALUE);
                var i = []
                  , r = s;
                return this.children.forEachAt(o, s, function(a, h, l) {
                    (null == n.blotName && n(a) || null != n.blotName && a instanceof n) && i.push(a),
                    a instanceof t && (i = i.concat(a.descendants(n, h, r))),
                    r -= l
                }),
                i
            }
            ,
            t.prototype.detach = function() {
                this.children.forEach(function(n) {
                    n.detach()
                }),
                e.prototype.detach.call(this)
            }
            ,
            t.prototype.formatAt = function(n, o, s, i) {
                this.children.forEachAt(n, o, function(r, a, h) {
                    r.formatAt(a, h, s, i)
                })
            }
            ,
            t.prototype.insertAt = function(n, o, s) {
                var i = this.children.find(n)
                  , r = i[0];
                if (r)
                    r.insertAt(i[1], o, s);
                else {
                    var h = null == s ? f.create("text", o) : f.create(o, s);
                    this.appendChild(h)
                }
            }
            ,
            t.prototype.insertBefore = function(n, o) {
                if (null != this.statics.allowedChildren && !this.statics.allowedChildren.some(function(s) {
                    return n instanceof s
                }))
                    throw new f.ParchmentError("Cannot insert " + n.statics.blotName + " into " + this.statics.blotName);
                n.insertInto(this, o)
            }
            ,
            t.prototype.length = function() {
                return this.children.reduce(function(n, o) {
                    return n + o.length()
                }, 0)
            }
            ,
            t.prototype.moveChildren = function(n, o) {
                this.children.forEach(function(s) {
                    n.insertBefore(s, o)
                })
            }
            ,
            t.prototype.optimize = function(n) {
                if (e.prototype.optimize.call(this, n),
                0 === this.children.length)
                    if (null != this.statics.defaultChild) {
                        var o = f.create(this.statics.defaultChild);
                        this.appendChild(o),
                        o.optimize(n)
                    } else
                        this.remove()
            }
            ,
            t.prototype.path = function(n, o) {
                void 0 === o && (o = !1);
                var s = this.children.find(n, o)
                  , i = s[0]
                  , r = s[1]
                  , a = [[this, n]];
                return i instanceof t ? a.concat(i.path(r, o)) : (null != i && a.push([i, r]),
                a)
            }
            ,
            t.prototype.removeChild = function(n) {
                this.children.remove(n)
            }
            ,
            t.prototype.replace = function(n) {
                n instanceof t && n.moveChildren(this),
                e.prototype.replace.call(this, n)
            }
            ,
            t.prototype.split = function(n, o) {
                if (void 0 === o && (o = !1),
                !o) {
                    if (0 === n)
                        return this;
                    if (n === this.length())
                        return this.next
                }
                var s = this.clone();
                return this.parent.insertBefore(s, this.next),
                this.children.forEachAt(n, this.length(), function(i, r, a) {
                    i = i.split(r, o),
                    s.appendChild(i)
                }),
                s
            }
            ,
            t.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next),
                this.remove()
            }
            ,
            t.prototype.update = function(n, o) {
                var s = this
                  , i = []
                  , r = [];
                n.forEach(function(a) {
                    a.target === s.domNode && "childList" === a.type && (i.push.apply(i, a.addedNodes),
                    r.push.apply(r, a.removedNodes))
                }),
                r.forEach(function(a) {
                    if (!(null != a.parentNode && "IFRAME" !== a.tagName && document.body.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                        var h = f.find(a);
                        null != h && (null != h.domNode.parentNode && h.domNode.parentNode !== s.domNode || h.detach())
                    }
                }),
                i.filter(function(a) {
                    return a.parentNode == s.domNode
                }).sort(function(a, h) {
                    return a === h ? 0 : a.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1
                }).forEach(function(a) {
                    var h = null;
                    null != a.nextSibling && (h = f.find(a.nextSibling));
                    var l = w(a);
                    l.next == h && null != l.next || (null != l.parent && l.parent.removeChild(s),
                    s.insertBefore(l, h || void 0))
                })
            }
            ,
            t
        }(_.default);
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        var e, w = this && this.__extends || (e = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, n) {
            t.__proto__ = n
        }
        || function(t, n) {
            for (var o in n)
                n.hasOwnProperty(o) && (t[o] = n[o])
        }
        ,
        function(t, n) {
            function o() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
            new o)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = d(11)
          , k = d(28)
          , _ = d(17)
          , f = d(1)
          , u = function(e) {
            function t(n) {
                var o = e.call(this, n) || this;
                return o.attributes = new k.default(o.domNode),
                o
            }
            return w(t, e),
            t.formats = function(n) {
                return "string" == typeof this.tagName || (Array.isArray(this.tagName) ? n.tagName.toLowerCase() : void 0)
            }
            ,
            t.prototype.format = function(n, o) {
                var s = f.query(n);
                s instanceof T.default ? this.attributes.attribute(s, o) : o && (null == s || n === this.statics.blotName && this.formats()[n] === o || this.replaceWith(n, o))
            }
            ,
            t.prototype.formats = function() {
                var n = this.attributes.values()
                  , o = this.statics.formats(this.domNode);
                return null != o && (n[this.statics.blotName] = o),
                n
            }
            ,
            t.prototype.replaceWith = function(n, o) {
                var s = e.prototype.replaceWith.call(this, n, o);
                return this.attributes.copy(s),
                s
            }
            ,
            t.prototype.update = function(n, o) {
                var s = this;
                e.prototype.update.call(this, n, o),
                n.some(function(i) {
                    return i.target === s.domNode && "attributes" === i.type
                }) && this.attributes.build()
            }
            ,
            t.prototype.wrap = function(n, o) {
                var s = e.prototype.wrap.call(this, n, o);
                return s instanceof t && s.statics.scope === this.statics.scope && this.attributes.move(s),
                s
            }
            ,
            t
        }(_.default);
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        var f, w = this && this.__extends || (f = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(u, e) {
            u.__proto__ = e
        }
        || function(u, e) {
            for (var t in e)
                e.hasOwnProperty(t) && (u[t] = e[t])
        }
        ,
        function(u, e) {
            function t() {
                this.constructor = u
            }
            f(u, e),
            u.prototype = null === e ? Object.create(e) : (t.prototype = e.prototype,
            new t)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = d(27)
          , k = d(1)
          , _ = function(f) {
            function u() {
                return null !== f && f.apply(this, arguments) || this
            }
            return w(u, f),
            u.value = function(e) {
                return !0
            }
            ,
            u.prototype.index = function(e, t) {
                return this.domNode === e || this.domNode.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1
            }
            ,
            u.prototype.position = function(e, t) {
                var n = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return e > 0 && (n += 1),
                [this.parent.domNode, n]
            }
            ,
            u.prototype.value = function() {
                var e;
                return (e = {})[this.statics.blotName] = this.statics.value(this.domNode) || !0,
                e
            }
            ,
            u.scope = k.Scope.INLINE_BLOT,
            u
        }(T.default);
        g.default = _
    }
    , function(B, g, d) {
        function w(f) {
            this.ops = f,
            this.index = 0,
            this.offset = 0
        }
        var T = d(12)
          , k = d(2)
          , _ = {
            attributes: {
                compose: function(f, u, e) {
                    "object" != typeof f && (f = {}),
                    "object" != typeof u && (u = {});
                    var t = k(!0, {}, u);
                    for (var n in e || (t = Object.keys(t).reduce(function(o, s) {
                        return null != t[s] && (o[s] = t[s]),
                        o
                    }, {})),
                    f)
                        void 0 !== f[n] && void 0 === u[n] && (t[n] = f[n]);
                    return Object.keys(t).length > 0 ? t : void 0
                },
                diff: function(f, u) {
                    "object" != typeof f && (f = {}),
                    "object" != typeof u && (u = {});
                    var e = Object.keys(f).concat(Object.keys(u)).reduce(function(t, n) {
                        return T(f[n], u[n]) || (t[n] = void 0 === u[n] ? null : u[n]),
                        t
                    }, {});
                    return Object.keys(e).length > 0 ? e : void 0
                },
                transform: function(f, u, e) {
                    if ("object" != typeof f)
                        return u;
                    if ("object" == typeof u) {
                        if (!e)
                            return u;
                        var t = Object.keys(u).reduce(function(n, o) {
                            return void 0 === f[o] && (n[o] = u[o]),
                            n
                        }, {});
                        return Object.keys(t).length > 0 ? t : void 0
                    }
                }
            },
            iterator: function(f) {
                return new w(f)
            },
            length: function(f) {
                return "number" == typeof f.delete ? f.delete : "number" == typeof f.retain ? f.retain : "string" == typeof f.insert ? f.insert.length : 1
            }
        };
        w.prototype.hasNext = function() {
            return this.peekLength() < 1 / 0
        }
        ,
        w.prototype.next = function(f) {
            f || (f = 1 / 0);
            var u = this.ops[this.index];
            if (u) {
                var e = this.offset
                  , t = _.length(u);
                if (f >= t - e ? (f = t - e,
                this.index += 1,
                this.offset = 0) : this.offset += f,
                "number" == typeof u.delete)
                    return {
                        delete: f
                    };
                var n = {};
                return u.attributes && (n.attributes = u.attributes),
                "number" == typeof u.retain ? n.retain = f : n.insert = "string" == typeof u.insert ? u.insert.substr(e, f) : u.insert,
                n
            }
            return {
                retain: 1 / 0
            }
        }
        ,
        w.prototype.peek = function() {
            return this.ops[this.index]
        }
        ,
        w.prototype.peekLength = function() {
            return this.ops[this.index] ? _.length(this.ops[this.index]) - this.offset : 1 / 0
        }
        ,
        w.prototype.peekType = function() {
            return this.ops[this.index] ? "number" == typeof this.ops[this.index].delete ? "delete" : "number" == typeof this.ops[this.index].retain ? "retain" : "insert" : "retain"
        }
        ,
        w.prototype.rest = function() {
            if (this.hasNext()) {
                if (0 === this.offset)
                    return this.ops.slice(this.index);
                var f = this.offset
                  , u = this.index
                  , e = this.next()
                  , t = this.ops.slice(this.index);
                return this.offset = f,
                this.index = u,
                [e].concat(t)
            }
            return []
        }
        ,
        B.exports = _
    }
    , function(B, g) {
        var d = function() {
            "use strict";
            function w(s, i) {
                return null != i && s instanceof i
            }
            function T(s, i, r, a, h) {
                "object" == typeof i && (r = i.depth,
                a = i.prototype,
                h = i.includeNonEnumerable,
                i = i.circular);
                var y = []
                  , x = []
                  , O = typeof Buffer < "u";
                return void 0 === i && (i = !0),
                void 0 === r && (r = 1 / 0),
                function l(E, v) {
                    if (null === E)
                        return null;
                    if (0 === v)
                        return E;
                    var b, c;
                    if ("object" != typeof E)
                        return E;
                    if (w(E, t))
                        b = new t;
                    else if (w(E, n))
                        b = new n;
                    else if (w(E, o))
                        b = new o(function(m, A) {
                            E.then(function(P) {
                                m(l(P, v - 1))
                            }, function(P) {
                                A(l(P, v - 1))
                            })
                        }
                        );
                    else if (T.__isArray(E))
                        b = [];
                    else if (T.__isRegExp(E))
                        b = new RegExp(E.source,e(E)),
                        E.lastIndex && (b.lastIndex = E.lastIndex);
                    else if (T.__isDate(E))
                        b = new Date(E.getTime());
                    else {
                        if (O && Buffer.isBuffer(E))
                            return b = Buffer.allocUnsafe ? Buffer.allocUnsafe(E.length) : new Buffer(E.length),
                            E.copy(b),
                            b;
                        w(E, Error) ? b = Object.create(E) : void 0 === a ? (c = Object.getPrototypeOf(E),
                        b = Object.create(c)) : (b = Object.create(a),
                        c = a)
                    }
                    if (i) {
                        var p = y.indexOf(E);
                        if (-1 != p)
                            return x[p];
                        y.push(E),
                        x.push(b)
                    }
                    for (var N in w(E, t) && E.forEach(function(m, A) {
                        var P = l(A, v - 1)
                          , S = l(m, v - 1);
                        b.set(P, S)
                    }),
                    w(E, n) && E.forEach(function(m) {
                        var A = l(m, v - 1);
                        b.add(A)
                    }),
                    E) {
                        var q;
                        c && (q = Object.getOwnPropertyDescriptor(c, N)),
                        q && null == q.set || (b[N] = l(E[N], v - 1))
                    }
                    if (Object.getOwnPropertySymbols) {
                        var L = Object.getOwnPropertySymbols(E);
                        for (N = 0; N < L.length; N++) {
                            var U = L[N];
                            (!(z = Object.getOwnPropertyDescriptor(E, U)) || z.enumerable || h) && (b[U] = l(E[U], v - 1),
                            z.enumerable || Object.defineProperty(b, U, {
                                enumerable: !1
                            }))
                        }
                    }
                    if (h) {
                        var F = Object.getOwnPropertyNames(E);
                        for (N = 0; N < F.length; N++) {
                            var z, I = F[N];
                            (z = Object.getOwnPropertyDescriptor(E, I)) && z.enumerable || (b[I] = l(E[I], v - 1),
                            Object.defineProperty(b, I, {
                                enumerable: !1
                            }))
                        }
                    }
                    return b
                }(s, r)
            }
            function k(s) {
                return Object.prototype.toString.call(s)
            }
            function e(s) {
                var i = "";
                return s.global && (i += "g"),
                s.ignoreCase && (i += "i"),
                s.multiline && (i += "m"),
                i
            }
            var t, n, o;
            try {
                t = Map
            } catch {
                t = function() {}
            }
            try {
                n = Set
            } catch {
                n = function() {}
            }
            try {
                o = Promise
            } catch {
                o = function() {}
            }
            return T.clonePrototype = function(s) {
                if (null === s)
                    return null;
                var i = function() {};
                return i.prototype = s,
                new i
            }
            ,
            T.__objToStr = k,
            T.__isDate = function _(s) {
                return "object" == typeof s && "[object Date]" === k(s)
            }
            ,
            T.__isArray = function f(s) {
                return "object" == typeof s && "[object Array]" === k(s)
            }
            ,
            T.__isRegExp = function u(s) {
                return "object" == typeof s && "[object RegExp]" === k(s)
            }
            ,
            T.__getRegExpFlags = e,
            T
        }();
        "object" == typeof B && B.exports && (B.exports = d)
    }
    , function(B, g, d) {
        "use strict";
        function w(E) {
            return E && E.__esModule ? E : {
                default: E
            }
        }
        function T(E) {
            if (Array.isArray(E)) {
                for (var v = 0, b = Array(E.length); v < E.length; v++)
                    b[v] = E[v];
                return b
            }
            return Array.from(E)
        }
        function k(E, v) {
            if (!(E instanceof v))
                throw new TypeError("Cannot call a class as a function")
        }
        function _(E, v) {
            return v instanceof Text && (v = v.parentNode),
            E.contains(v)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.Range = void 0;
        var f = function(v, b) {
            if (Array.isArray(v))
                return v;
            if (Symbol.iterator in Object(v))
                return function E(v, b) {
                    var c = []
                      , p = !0
                      , N = !1
                      , q = void 0;
                    try {
                        for (var L, U = v[Symbol.iterator](); !(p = (L = U.next()).done) && (c.push(L.value),
                        !b || c.length !== b); p = !0)
                            ;
                    } catch (z) {
                        N = !0,
                        q = z
                    } finally {
                        try {
                            !p && U.return && U.return()
                        } finally {
                            if (N)
                                throw q
                        }
                    }
                    return c
                }(v, b);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , u = function() {
            function E(v, b) {
                for (var c = 0; c < b.length; c++) {
                    var p = b[c];
                    p.enumerable = p.enumerable || !1,
                    p.configurable = !0,
                    "value"in p && (p.writable = !0),
                    Object.defineProperty(v, p.key, p)
                }
            }
            return function(v, b, c) {
                return b && E(v.prototype, b),
                c && E(v, c),
                v
            }
        }()
          , t = w(d(0))
          , o = w(d(21))
          , i = w(d(12))
          , a = w(d(9))
          , y = (0,
        w(d(10)).default)("quill:selection")
          , x = function E(v) {
            var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            k(this, E),
            this.index = v,
            this.length = b
        }
          , O = function() {
            function E(v, b) {
                var c = this;
                k(this, E),
                this.emitter = b,
                this.scroll = v,
                this.composing = !1,
                this.mouseDown = !1,
                this.root = this.scroll.domNode,
                this.cursor = t.default.create("cursor", this),
                this.lastRange = this.savedRange = new x(0,0),
                this.handleComposition(),
                this.handleDragging(),
                this.emitter.listenDOM("selectionchange", document, function() {
                    c.mouseDown || setTimeout(c.update.bind(c, a.default.sources.USER), 1)
                }),
                this.emitter.on(a.default.events.EDITOR_CHANGE, function(p, N) {
                    p === a.default.events.TEXT_CHANGE && N.length() > 0 && c.update(a.default.sources.SILENT)
                }),
                this.emitter.on(a.default.events.SCROLL_BEFORE_UPDATE, function() {
                    if (c.hasFocus()) {
                        var p = c.getNativeRange();
                        null != p && p.start.node !== c.cursor.textNode && c.emitter.once(a.default.events.SCROLL_UPDATE, function() {
                            try {
                                c.setNativeRange(p.start.node, p.start.offset, p.end.node, p.end.offset)
                            } catch {}
                        })
                    }
                }),
                this.emitter.on(a.default.events.SCROLL_OPTIMIZE, function(p, N) {
                    if (N.range) {
                        var q = N.range;
                        c.setNativeRange(q.startNode, q.startOffset, q.endNode, q.endOffset)
                    }
                }),
                this.update(a.default.sources.SILENT)
            }
            return u(E, [{
                key: "handleComposition",
                value: function() {
                    var v = this;
                    this.root.addEventListener("compositionstart", function() {
                        v.composing = !0
                    }),
                    this.root.addEventListener("compositionend", function() {
                        if (v.composing = !1,
                        v.cursor.parent) {
                            var b = v.cursor.restore();
                            if (!b)
                                return;
                            setTimeout(function() {
                                v.setNativeRange(b.startNode, b.startOffset, b.endNode, b.endOffset)
                            }, 1)
                        }
                    })
                }
            }, {
                key: "handleDragging",
                value: function() {
                    var v = this;
                    this.emitter.listenDOM("mousedown", document.body, function() {
                        v.mouseDown = !0
                    }),
                    this.emitter.listenDOM("mouseup", document.body, function() {
                        v.mouseDown = !1,
                        v.update(a.default.sources.USER)
                    })
                }
            }, {
                key: "focus",
                value: function() {
                    this.hasFocus() || (this.root.focus(),
                    this.setRange(this.savedRange))
                }
            }, {
                key: "format",
                value: function(v, b) {
                    if (null == this.scroll.whitelist || this.scroll.whitelist[v]) {
                        this.scroll.update();
                        var c = this.getNativeRange();
                        if (null != c && c.native.collapsed && !t.default.query(v, t.default.Scope.BLOCK)) {
                            if (c.start.node !== this.cursor.textNode) {
                                var p = t.default.find(c.start.node, !1);
                                if (null == p)
                                    return;
                                if (p instanceof t.default.Leaf) {
                                    var N = p.split(c.start.offset);
                                    p.parent.insertBefore(this.cursor, N)
                                } else
                                    p.insertBefore(this.cursor, c.start.node);
                                this.cursor.attach()
                            }
                            this.cursor.format(v, b),
                            this.scroll.optimize(),
                            this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length),
                            this.update()
                        }
                    }
                }
            }, {
                key: "getBounds",
                value: function(v) {
                    var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , c = this.scroll.length();
                    v = Math.min(v, c - 1),
                    b = Math.min(v + b, c - 1) - v;
                    var p = void 0
                      , N = this.scroll.leaf(v)
                      , q = f(N, 2)
                      , L = q[0]
                      , U = q[1];
                    if (null == L)
                        return null;
                    var z = L.position(U, !0)
                      , F = f(z, 2);
                    p = F[0],
                    U = F[1];
                    var I = document.createRange();
                    if (b > 0) {
                        I.setStart(p, U);
                        var m = this.scroll.leaf(v + b)
                          , A = f(m, 2);
                        if (null == (L = A[0]))
                            return null;
                        var P = L.position(U = A[1], !0)
                          , S = f(P, 2);
                        return I.setEnd(p = S[0], U = S[1]),
                        I.getBoundingClientRect()
                    }
                    var R = "left"
                      , M = void 0;
                    return p instanceof Text ? (U < p.data.length ? (I.setStart(p, U),
                    I.setEnd(p, U + 1)) : (I.setStart(p, U - 1),
                    I.setEnd(p, U),
                    R = "right"),
                    M = I.getBoundingClientRect()) : (M = L.domNode.getBoundingClientRect(),
                    U > 0 && (R = "right")),
                    {
                        bottom: M.top + M.height,
                        height: M.height,
                        left: M[R],
                        right: M[R],
                        top: M.top,
                        width: 0
                    }
                }
            }, {
                key: "getNativeRange",
                value: function() {
                    var v = document.getSelection();
                    if (null == v || v.rangeCount <= 0)
                        return null;
                    var b = v.getRangeAt(0);
                    if (null == b)
                        return null;
                    var c = this.normalizeNative(b);
                    return y.info("getNativeRange", c),
                    c
                }
            }, {
                key: "getRange",
                value: function() {
                    var v = this.getNativeRange();
                    return null == v ? [null, null] : [this.normalizedToRange(v), v]
                }
            }, {
                key: "hasFocus",
                value: function() {
                    return document.activeElement === this.root
                }
            }, {
                key: "normalizedToRange",
                value: function(v) {
                    var b = this
                      , c = [[v.start.node, v.start.offset]];
                    v.native.collapsed || c.push([v.end.node, v.end.offset]);
                    var p = c.map(function(L) {
                        var U = f(L, 2)
                          , z = U[0]
                          , F = U[1]
                          , I = t.default.find(z, !0)
                          , m = I.offset(b.scroll);
                        return 0 === F ? m : I instanceof t.default.Container ? m + I.length() : m + I.index(z, F)
                    })
                      , N = Math.min(Math.max.apply(Math, T(p)), this.scroll.length() - 1)
                      , q = Math.min.apply(Math, [N].concat(T(p)));
                    return new x(q,N - q)
                }
            }, {
                key: "normalizeNative",
                value: function(v) {
                    if (!_(this.root, v.startContainer) || !v.collapsed && !_(this.root, v.endContainer))
                        return null;
                    var b = {
                        start: {
                            node: v.startContainer,
                            offset: v.startOffset
                        },
                        end: {
                            node: v.endContainer,
                            offset: v.endOffset
                        },
                        native: v
                    };
                    return [b.start, b.end].forEach(function(c) {
                        for (var p = c.node, N = c.offset; !(p instanceof Text) && p.childNodes.length > 0; )
                            if (p.childNodes.length > N)
                                p = p.childNodes[N],
                                N = 0;
                            else {
                                if (p.childNodes.length !== N)
                                    break;
                                N = (p = p.lastChild)instanceof Text ? p.data.length : p.childNodes.length + 1
                            }
                        c.node = p,
                        c.offset = N
                    }),
                    b
                }
            }, {
                key: "rangeToNative",
                value: function(v) {
                    var b = this
                      , c = v.collapsed ? [v.index] : [v.index, v.index + v.length]
                      , p = []
                      , N = this.scroll.length();
                    return c.forEach(function(q, L) {
                        q = Math.min(N - 1, q);
                        var z = b.scroll.leaf(q)
                          , F = f(z, 2)
                          , m = F[1]
                          , A = F[0].position(m, 0 !== L)
                          , P = f(A, 2);
                        p.push(P[0], m = P[1])
                    }),
                    p.length < 2 && (p = p.concat(p)),
                    p
                }
            }, {
                key: "scrollIntoView",
                value: function(v) {
                    var b = this.lastRange;
                    if (null != b) {
                        var c = this.getBounds(b.index, b.length);
                        if (null != c) {
                            var p = this.scroll.length() - 1
                              , N = this.scroll.line(Math.min(b.index, p))
                              , L = f(N, 1)[0]
                              , U = L;
                            if (b.length > 0) {
                                var z = this.scroll.line(Math.min(b.index + b.length, p));
                                U = f(z, 1)[0]
                            }
                            if (null != L && null != U) {
                                var F = v.getBoundingClientRect();
                                c.top < F.top ? v.scrollTop -= F.top - c.top : c.bottom > F.bottom && (v.scrollTop += c.bottom - F.bottom)
                            }
                        }
                    }
                }
            }, {
                key: "setNativeRange",
                value: function(v, b) {
                    var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : v
                      , p = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : b
                      , N = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                    if (y.info("setNativeRange", v, b, c, p),
                    null == v || null != this.root.parentNode && null != v.parentNode && null != c.parentNode) {
                        var q = document.getSelection();
                        if (null != q)
                            if (null != v) {
                                this.hasFocus() || this.root.focus();
                                var L = (this.getNativeRange() || {}).native;
                                if (null == L || N || v !== L.startContainer || b !== L.startOffset || c !== L.endContainer || p !== L.endOffset) {
                                    "BR" == v.tagName && (b = [].indexOf.call(v.parentNode.childNodes, v),
                                    v = v.parentNode),
                                    "BR" == c.tagName && (p = [].indexOf.call(c.parentNode.childNodes, c),
                                    c = c.parentNode);
                                    var U = document.createRange();
                                    U.setStart(v, b),
                                    U.setEnd(c, p),
                                    q.removeAllRanges(),
                                    q.addRange(U)
                                }
                            } else
                                q.removeAllRanges(),
                                this.root.blur(),
                                document.body.focus()
                    }
                }
            }, {
                key: "setRange",
                value: function(v) {
                    var b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                      , c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a.default.sources.API;
                    if ("string" == typeof b && (c = b,
                    b = !1),
                    y.info("setRange", v),
                    null != v) {
                        var p = this.rangeToNative(v);
                        this.setNativeRange.apply(this, T(p).concat([b]))
                    } else
                        this.setNativeRange(null);
                    this.update(c)
                }
            }, {
                key: "update",
                value: function() {
                    var v = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.default.sources.USER
                      , b = this.lastRange
                      , c = this.getRange()
                      , p = f(c, 2)
                      , q = p[1];
                    if (this.lastRange = p[0],
                    null != this.lastRange && (this.savedRange = this.lastRange),
                    !(0,
                    i.default)(b, this.lastRange)) {
                        var L;
                        !this.composing && null != q && q.native.collapsed && q.start.node !== this.cursor.textNode && this.cursor.restore();
                        var z, U = [a.default.events.SELECTION_CHANGE, (0,
                        o.default)(this.lastRange), (0,
                        o.default)(b), v];
                        (L = this.emitter).emit.apply(L, [a.default.events.EDITOR_CHANGE].concat(U)),
                        v !== a.default.sources.SILENT && (z = this.emitter).emit.apply(z, U)
                    }
                }
            }]),
            E
        }();
        g.Range = x,
        g.default = O
    }
    , function(B, g, d) {
        "use strict";
        function w(o) {
            return o && o.__esModule ? o : {
                default: o
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var u = w(d(0))
          , e = d(3)
          , t = w(e)
          , n = function(o) {
            function s() {
                return function T(o, s) {
                    if (!(o instanceof s))
                        throw new TypeError("Cannot call a class as a function")
                }(this, s),
                function k(o, s) {
                    if (!o)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !s || "object" != typeof s && "function" != typeof s ? o : s
                }(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments))
            }
            return function _(o, s) {
                if ("function" != typeof s && null !== s)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof s);
                o.prototype = Object.create(s && s.prototype, {
                    constructor: {
                        value: o,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                s && (Object.setPrototypeOf ? Object.setPrototypeOf(o, s) : o.__proto__ = s)
            }(s, o),
            s
        }(u.default.Container);
        n.allowedChildren = [t.default, e.BlockEmbed, n],
        g.default = n
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.ColorStyle = g.ColorClass = g.ColorAttributor = void 0;
        var s, _ = function() {
            function s(i, r) {
                for (var a = 0; a < r.length; a++) {
                    var h = r[a];
                    h.enumerable = h.enumerable || !1,
                    h.configurable = !0,
                    "value"in h && (h.writable = !0),
                    Object.defineProperty(i, h.key, h)
                }
            }
            return function(i, r, a) {
                return r && s(i.prototype, r),
                a && s(i, a),
                i
            }
        }(), f = function s(i, r, a) {
            null === i && (i = Function.prototype);
            var h = Object.getOwnPropertyDescriptor(i, r);
            if (void 0 === h) {
                var l = Object.getPrototypeOf(i);
                return null === l ? void 0 : s(l, r, a)
            }
            if ("value"in h)
                return h.value;
            var y = h.get;
            return void 0 !== y ? y.call(a) : void 0
        }, e = (s = d(0)) && s.__esModule ? s : {
            default: s
        }, t = function(s) {
            function i() {
                return function w(s, i) {
                    if (!(s instanceof i))
                        throw new TypeError("Cannot call a class as a function")
                }(this, i),
                function T(s, i) {
                    if (!s)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !i || "object" != typeof i && "function" != typeof i ? s : i
                }(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments))
            }
            return function k(s, i) {
                if ("function" != typeof i && null !== i)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof i);
                s.prototype = Object.create(i && i.prototype, {
                    constructor: {
                        value: s,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                i && (Object.setPrototypeOf ? Object.setPrototypeOf(s, i) : s.__proto__ = i)
            }(i, s),
            _(i, [{
                key: "value",
                value: function(r) {
                    var a = f(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "value", this).call(this, r);
                    return a.startsWith("rgb(") ? "#" + (a = a.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "")).split(",").map(function(h) {
                        return ("00" + parseInt(h).toString(16)).slice(-2)
                    }).join("") : a
                }
            }]),
            i
        }(e.default.Attributor.Style), n = new e.default.Attributor.Class("color","ql-color",{
            scope: e.default.Scope.INLINE
        }), o = new t("color","color",{
            scope: e.default.Scope.INLINE
        });
        g.ColorAttributor = t,
        g.ColorClass = n,
        g.ColorStyle = o
    }
    , function(B, g, d) {
        "use strict";
        function w(j) {
            return j && j.__esModule ? j : {
                default: j
            }
        }
        function T(j, C, D) {
            return C in j ? Object.defineProperty(j, C, {
                value: D,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : j[C] = D,
            j
        }
        function u(j, C) {
            var D;
            return T(D = {
                key: j,
                shiftKey: C,
                altKey: null
            }, j === M.keys.LEFT ? "prefix" : "suffix", /^$/),
            T(D, "handler", function(V) {
                var X = V.index;
                j === M.keys.RIGHT && (X += V.length + 1);
                var Q = this.quill.getLeaf(X);
                return !(h(Q, 1)[0]instanceof U.default.Embed && (j === M.keys.LEFT ? C ? this.quill.setSelection(V.index - 1, V.length + 1, F.default.sources.USER) : this.quill.setSelection(V.index - 1, F.default.sources.USER) : C ? this.quill.setSelection(V.index, V.length + 1, F.default.sources.USER) : this.quill.setSelection(V.index + V.length + 1, F.default.sources.USER),
                1))
            }),
            D
        }
        function e(j, C) {
            if (!(0 === j.index || this.quill.getLength() <= 1)) {
                var D = this.quill.getLine(j.index)
                  , V = h(D, 1)[0]
                  , X = {};
                if (0 === C.offset) {
                    var Q = this.quill.getLine(j.index - 1)
                      , et = h(Q, 1)[0];
                    if (null != et && et.length() > 1) {
                        var at = V.formats()
                          , lt = this.quill.getFormat(j.index - 1, 1);
                        X = q.default.attributes.diff(at, lt) || {}
                    }
                }
                var it = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(C.prefix) ? 2 : 1;
                this.quill.deleteText(j.index - it, it, F.default.sources.USER),
                Object.keys(X).length > 0 && this.quill.formatLine(j.index - it, it, X, F.default.sources.USER),
                this.quill.focus()
            }
        }
        function t(j, C) {
            var D = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(C.suffix) ? 2 : 1;
            if (!(j.index >= this.quill.getLength() - D)) {
                var Z = {}
                  , V = 0
                  , X = this.quill.getLine(j.index)
                  , J = h(X, 1)[0];
                if (C.offset >= J.length() - 1) {
                    var et = this.quill.getLine(j.index + 1)
                      , lt = h(et, 1)[0];
                    if (lt) {
                        var it = J.formats()
                          , H = this.quill.getFormat(j.index, 1);
                        Z = q.default.attributes.diff(it, H) || {},
                        V = lt.length()
                    }
                }
                this.quill.deleteText(j.index, D, F.default.sources.USER),
                Object.keys(Z).length > 0 && this.quill.formatLine(j.index + V - 1, D, Z, F.default.sources.USER)
            }
        }
        function n(j) {
            var C = this.quill.getLines(j)
              , D = {};
            if (C.length > 1) {
                var Z = C[0].formats()
                  , V = C[C.length - 1].formats();
                D = q.default.attributes.diff(V, Z) || {}
            }
            this.quill.deleteText(j, F.default.sources.USER),
            Object.keys(D).length > 0 && this.quill.formatLine(j.index, 1, D, F.default.sources.USER),
            this.quill.setSelection(j.index, F.default.sources.SILENT),
            this.quill.focus()
        }
        function o(j, C) {
            var D = this;
            j.length > 0 && this.quill.scroll.deleteAt(j.index, j.length);
            var Z = Object.keys(C.format).reduce(function(V, X) {
                return U.default.query(X, U.default.Scope.BLOCK) && !Array.isArray(C.format[X]) && (V[X] = C.format[X]),
                V
            }, {});
            this.quill.insertText(j.index, "\n", Z, F.default.sources.USER),
            this.quill.setSelection(j.index + 1, F.default.sources.SILENT),
            this.quill.focus(),
            Object.keys(C.format).forEach(function(V) {
                null == Z[V] && (Array.isArray(C.format[V]) || "link" !== V && D.quill.format(V, C.format[V], F.default.sources.USER))
            })
        }
        function s(j) {
            return {
                key: M.keys.TAB,
                shiftKey: !j,
                format: {
                    "code-block": !0
                },
                handler: function(C) {
                    var D = U.default.query("code-block")
                      , Z = C.index
                      , V = C.length
                      , X = this.quill.scroll.descendant(D, Z)
                      , Q = h(X, 2)
                      , J = Q[0]
                      , et = Q[1];
                    if (null != J) {
                        var at = this.quill.getIndex(J)
                          , lt = J.newlineIndex(et, !0) + 1
                          , it = J.newlineIndex(at + et + V)
                          , H = J.domNode.textContent.slice(lt, it).split("\n");
                        et = 0,
                        H.forEach(function(K, W) {
                            j ? (J.insertAt(lt + et, D.TAB),
                            et += D.TAB.length,
                            0 === W ? Z += D.TAB.length : V += D.TAB.length) : K.startsWith(D.TAB) && (J.deleteAt(lt + et, D.TAB.length),
                            et -= D.TAB.length,
                            0 === W ? Z -= D.TAB.length : V -= D.TAB.length),
                            et += K.length + 1
                        }),
                        this.quill.update(F.default.sources.USER),
                        this.quill.setSelection(Z, V, F.default.sources.SILENT)
                    }
                }
            }
        }
        function i(j) {
            return {
                key: j[0].toUpperCase(),
                shortKey: !0,
                handler: function(C, D) {
                    this.quill.format(j, !D.format[j], F.default.sources.USER)
                }
            }
        }
        function r(j) {
            if ("string" == typeof j || "number" == typeof j)
                return r({
                    key: j
                });
            if ("object" === (void 0 === j ? "undefined" : a(j)) && (j = (0,
            x.default)(j, !1)),
            "string" == typeof j.key)
                if (null != M.keys[j.key.toUpperCase()])
                    j.key = M.keys[j.key.toUpperCase()];
                else {
                    if (1 !== j.key.length)
                        return null;
                    j.key = j.key.toUpperCase().charCodeAt(0)
                }
            return j.shortKey && (j[R] = j.shortKey,
            delete j.shortKey),
            j
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.SHORTKEY = g.default = void 0;
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(j) {
            return typeof j
        }
        : function(j) {
            return j && "function" == typeof Symbol && j.constructor === Symbol && j !== Symbol.prototype ? "symbol" : typeof j
        }
          , h = function(C, D) {
            if (Array.isArray(C))
                return C;
            if (Symbol.iterator in Object(C))
                return function j(C, D) {
                    var Z = []
                      , V = !0
                      , X = !1
                      , Q = void 0;
                    try {
                        for (var J, et = C[Symbol.iterator](); !(V = (J = et.next()).done) && (Z.push(J.value),
                        !D || Z.length !== D); V = !0)
                            ;
                    } catch (at) {
                        X = !0,
                        Q = at
                    } finally {
                        try {
                            !V && et.return && et.return()
                        } finally {
                            if (X)
                                throw Q
                        }
                    }
                    return Z
                }(C, D);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , l = function() {
            function j(C, D) {
                for (var Z = 0; Z < D.length; Z++) {
                    var V = D[Z];
                    V.enumerable = V.enumerable || !1,
                    V.configurable = !0,
                    "value"in V && (V.writable = !0),
                    Object.defineProperty(C, V.key, V)
                }
            }
            return function(C, D, Z) {
                return D && j(C.prototype, D),
                Z && j(C, Z),
                C
            }
        }()
          , x = w(d(21))
          , E = w(d(12))
          , b = w(d(2))
          , p = w(d(4))
          , q = w(d(20))
          , U = w(d(0))
          , F = w(d(6))
          , m = w(d(10))
          , P = w(d(7))
          , S = (0,
        m.default)("quill:keyboard")
          , R = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey"
          , M = function(j) {
            function C(D, Z) {
                !function k(j, C) {
                    if (!(j instanceof C))
                        throw new TypeError("Cannot call a class as a function")
                }(this, C);
                var V = function _(j, C) {
                    if (!j)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !C || "object" != typeof C && "function" != typeof C ? j : C
                }(this, (C.__proto__ || Object.getPrototypeOf(C)).call(this, D, Z));
                return V.bindings = {},
                Object.keys(V.options.bindings).forEach(function(X) {
                    ("list autofill" !== X || null == D.scroll.whitelist || D.scroll.whitelist.list) && V.options.bindings[X] && V.addBinding(V.options.bindings[X])
                }),
                V.addBinding({
                    key: C.keys.ENTER,
                    shiftKey: null
                }, o),
                V.addBinding({
                    key: C.keys.ENTER,
                    metaKey: null,
                    ctrlKey: null,
                    altKey: null
                }, function() {}),
                /Firefox/i.test(navigator.userAgent) ? (V.addBinding({
                    key: C.keys.BACKSPACE
                }, {
                    collapsed: !0
                }, e),
                V.addBinding({
                    key: C.keys.DELETE
                }, {
                    collapsed: !0
                }, t)) : (V.addBinding({
                    key: C.keys.BACKSPACE
                }, {
                    collapsed: !0,
                    prefix: /^.?$/
                }, e),
                V.addBinding({
                    key: C.keys.DELETE
                }, {
                    collapsed: !0,
                    suffix: /^.?$/
                }, t)),
                V.addBinding({
                    key: C.keys.BACKSPACE
                }, {
                    collapsed: !1
                }, n),
                V.addBinding({
                    key: C.keys.DELETE
                }, {
                    collapsed: !1
                }, n),
                V.addBinding({
                    key: C.keys.BACKSPACE,
                    altKey: null,
                    ctrlKey: null,
                    metaKey: null,
                    shiftKey: null
                }, {
                    collapsed: !0,
                    offset: 0
                }, e),
                V.listen(),
                V
            }
            return function f(j, C) {
                if ("function" != typeof C && null !== C)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof C);
                j.prototype = Object.create(C && C.prototype, {
                    constructor: {
                        value: j,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                C && (Object.setPrototypeOf ? Object.setPrototypeOf(j, C) : j.__proto__ = C)
            }(C, j),
            l(C, null, [{
                key: "match",
                value: function(D, Z) {
                    return Z = r(Z),
                    !["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(V) {
                        return !!Z[V] !== D[V] && null !== Z[V]
                    }) && Z.key === (D.which || D.keyCode)
                }
            }]),
            l(C, [{
                key: "addBinding",
                value: function(D) {
                    var Z = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                      , V = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                      , X = r(D);
                    if (null == X || null == X.key)
                        return S.warn("Attempted to add invalid keyboard binding", X);
                    "function" == typeof Z && (Z = {
                        handler: Z
                    }),
                    "function" == typeof V && (V = {
                        handler: V
                    }),
                    X = (0,
                    b.default)(X, Z, V),
                    this.bindings[X.key] = this.bindings[X.key] || [],
                    this.bindings[X.key].push(X)
                }
            }, {
                key: "listen",
                value: function() {
                    var D = this;
                    this.quill.root.addEventListener("keydown", function(Z) {
                        if (!Z.defaultPrevented) {
                            var X = (D.bindings[Z.which || Z.keyCode] || []).filter(function(ot) {
                                return C.match(Z, ot)
                            });
                            if (0 !== X.length) {
                                var Q = D.quill.getSelection();
                                if (null != Q && D.quill.hasFocus()) {
                                    var J = D.quill.getLine(Q.index)
                                      , et = h(J, 2)
                                      , at = et[0]
                                      , lt = et[1]
                                      , it = D.quill.getLeaf(Q.index)
                                      , H = h(it, 2)
                                      , K = H[0]
                                      , W = H[1]
                                      , Y = 0 === Q.length ? [K, W] : D.quill.getLeaf(Q.index + Q.length)
                                      , G = h(Y, 2)
                                      , $ = G[0]
                                      , nt = G[1]
                                      , tt = K instanceof U.default.Text ? K.value().slice(0, W) : ""
                                      , st = $ instanceof U.default.Text ? $.value().slice(nt) : ""
                                      , rt = {
                                        collapsed: 0 === Q.length,
                                        empty: 0 === Q.length && at.length() <= 1,
                                        format: D.quill.getFormat(Q),
                                        offset: lt,
                                        prefix: tt,
                                        suffix: st
                                    };
                                    X.some(function(ot) {
                                        if (null != ot.collapsed && ot.collapsed !== rt.collapsed || null != ot.empty && ot.empty !== rt.empty || null != ot.offset && ot.offset !== rt.offset)
                                            return !1;
                                        if (Array.isArray(ot.format)) {
                                            if (ot.format.every(function(ut) {
                                                return null == rt.format[ut]
                                            }))
                                                return !1
                                        } else if ("object" === a(ot.format) && !Object.keys(ot.format).every(function(ut) {
                                            return !0 === ot.format[ut] ? null != rt.format[ut] : !1 === ot.format[ut] ? null == rt.format[ut] : (0,
                                            E.default)(ot.format[ut], rt.format[ut])
                                        }))
                                            return !1;
                                        return !(null != ot.prefix && !ot.prefix.test(rt.prefix) || null != ot.suffix && !ot.suffix.test(rt.suffix) || !0 === ot.handler.call(D, Q, rt))
                                    }) && Z.preventDefault()
                                }
                            }
                        }
                    })
                }
            }]),
            C
        }(P.default);
        M.keys = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
        },
        M.DEFAULTS = {
            bindings: {
                bold: i("bold"),
                italic: i("italic"),
                underline: i("underline"),
                indent: {
                    key: M.keys.TAB,
                    format: ["blockquote", "indent", "list"],
                    handler: function(j, C) {
                        if (C.collapsed && 0 !== C.offset)
                            return !0;
                        this.quill.format("indent", "+1", F.default.sources.USER)
                    }
                },
                outdent: {
                    key: M.keys.TAB,
                    shiftKey: !0,
                    format: ["blockquote", "indent", "list"],
                    handler: function(j, C) {
                        if (C.collapsed && 0 !== C.offset)
                            return !0;
                        this.quill.format("indent", "-1", F.default.sources.USER)
                    }
                },
                "outdent backspace": {
                    key: M.keys.BACKSPACE,
                    collapsed: !0,
                    shiftKey: null,
                    metaKey: null,
                    ctrlKey: null,
                    altKey: null,
                    format: ["indent", "list"],
                    offset: 0,
                    handler: function(j, C) {
                        null != C.format.indent ? this.quill.format("indent", "-1", F.default.sources.USER) : null != C.format.list && this.quill.format("list", !1, F.default.sources.USER)
                    }
                },
                "indent code-block": s(!0),
                "outdent code-block": s(!1),
                "remove tab": {
                    key: M.keys.TAB,
                    shiftKey: !0,
                    collapsed: !0,
                    prefix: /\t$/,
                    handler: function(j) {
                        this.quill.deleteText(j.index - 1, 1, F.default.sources.USER)
                    }
                },
                tab: {
                    key: M.keys.TAB,
                    handler: function(j) {
                        this.quill.history.cutoff();
                        var C = (new p.default).retain(j.index).delete(j.length).insert("\t");
                        this.quill.updateContents(C, F.default.sources.USER),
                        this.quill.history.cutoff(),
                        this.quill.setSelection(j.index + 1, F.default.sources.SILENT)
                    }
                },
                "list empty enter": {
                    key: M.keys.ENTER,
                    collapsed: !0,
                    format: ["list"],
                    empty: !0,
                    handler: function(j, C) {
                        this.quill.format("list", !1, F.default.sources.USER),
                        C.format.indent && this.quill.format("indent", !1, F.default.sources.USER)
                    }
                },
                "checklist enter": {
                    key: M.keys.ENTER,
                    collapsed: !0,
                    format: {
                        list: "checked"
                    },
                    handler: function(j) {
                        var C = this.quill.getLine(j.index)
                          , D = h(C, 2)
                          , Z = D[0]
                          , V = D[1]
                          , X = (0,
                        b.default)({}, Z.formats(), {
                            list: "checked"
                        })
                          , Q = (new p.default).retain(j.index).insert("\n", X).retain(Z.length() - V - 1).retain(1, {
                            list: "unchecked"
                        });
                        this.quill.updateContents(Q, F.default.sources.USER),
                        this.quill.setSelection(j.index + 1, F.default.sources.SILENT),
                        this.quill.scrollIntoView()
                    }
                },
                "header enter": {
                    key: M.keys.ENTER,
                    collapsed: !0,
                    format: ["header"],
                    suffix: /^$/,
                    handler: function(j, C) {
                        var D = this.quill.getLine(j.index)
                          , Z = h(D, 2)
                          , V = Z[0]
                          , X = Z[1]
                          , Q = (new p.default).retain(j.index).insert("\n", C.format).retain(V.length() - X - 1).retain(1, {
                            header: null
                        });
                        this.quill.updateContents(Q, F.default.sources.USER),
                        this.quill.setSelection(j.index + 1, F.default.sources.SILENT),
                        this.quill.scrollIntoView()
                    }
                },
                "list autofill": {
                    key: " ",
                    collapsed: !0,
                    format: {
                        list: !1
                    },
                    prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                    handler: function(j, C) {
                        var D = C.prefix.length
                          , Z = this.quill.getLine(j.index)
                          , V = h(Z, 2)
                          , X = V[0]
                          , Q = V[1];
                        if (Q > D)
                            return !0;
                        var J = void 0;
                        switch (C.prefix.trim()) {
                        case "[]":
                        case "[ ]":
                            J = "unchecked";
                            break;
                        case "[x]":
                            J = "checked";
                            break;
                        case "-":
                        case "*":
                            J = "bullet";
                            break;
                        default:
                            J = "ordered"
                        }
                        this.quill.insertText(j.index, " ", F.default.sources.USER),
                        this.quill.history.cutoff();
                        var et = (new p.default).retain(j.index - Q).delete(D + 1).retain(X.length() - 2 - Q).retain(1, {
                            list: J
                        });
                        this.quill.updateContents(et, F.default.sources.USER),
                        this.quill.history.cutoff(),
                        this.quill.setSelection(j.index - D, F.default.sources.SILENT)
                    }
                },
                "code exit": {
                    key: M.keys.ENTER,
                    collapsed: !0,
                    format: ["code-block"],
                    prefix: /\n\n$/,
                    suffix: /^\s+$/,
                    handler: function(j) {
                        var C = this.quill.getLine(j.index)
                          , D = h(C, 2)
                          , Z = D[0]
                          , V = D[1]
                          , X = (new p.default).retain(j.index + Z.length() - V - 2).retain(1, {
                            "code-block": null
                        }).delete(1);
                        this.quill.updateContents(X, F.default.sources.USER)
                    }
                },
                "embed left": u(M.keys.LEFT, !1),
                "embed left shift": u(M.keys.LEFT, !0),
                "embed right": u(M.keys.RIGHT, !1),
                "embed right shift": u(M.keys.RIGHT, !0)
            }
        },
        g.default = M,
        g.SHORTKEY = R
    }
    , function(B, g, d) {
        "use strict";
        B.exports = {
            align: {
                "": d(75),
                center: d(76),
                right: d(77),
                justify: d(78)
            },
            background: d(79),
            blockquote: d(80),
            bold: d(81),
            clean: d(82),
            code: d(40),
            "code-block": d(40),
            color: d(83),
            direction: {
                "": d(84),
                rtl: d(85)
            },
            float: {
                center: d(86),
                full: d(87),
                left: d(88),
                right: d(89)
            },
            formula: d(90),
            header: {
                1: d(91),
                2: d(92)
            },
            italic: d(93),
            image: d(94),
            indent: {
                "+1": d(95),
                "-1": d(96)
            },
            link: d(97),
            list: {
                ordered: d(98),
                bullet: d(99),
                check: d(100)
            },
            script: {
                sub: d(101),
                super: d(102)
            },
            strike: d(103),
            underline: d(104),
            video: d(105)
        }
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var w = d(1)
          , T = function() {
            function k(_) {
                this.domNode = _,
                this.domNode[w.DATA_KEY] = {
                    blot: this
                }
            }
            return Object.defineProperty(k.prototype, "statics", {
                get: function() {
                    return this.constructor
                },
                enumerable: !0,
                configurable: !0
            }),
            k.create = function(_) {
                if (null == this.tagName)
                    throw new w.ParchmentError("Blot definition missing tagName");
                var f;
                return Array.isArray(this.tagName) ? ("string" == typeof _ && (_ = _.toUpperCase(),
                parseInt(_).toString() === _ && (_ = parseInt(_))),
                f = "number" == typeof _ ? document.createElement(this.tagName[_ - 1]) : this.tagName.indexOf(_) > -1 ? document.createElement(_) : document.createElement(this.tagName[0])) : f = document.createElement(this.tagName),
                this.className && f.classList.add(this.className),
                f
            }
            ,
            k.prototype.attach = function() {
                null != this.parent && (this.scroll = this.parent.scroll)
            }
            ,
            k.prototype.clone = function() {
                var _ = this.domNode.cloneNode(!1);
                return w.create(_)
            }
            ,
            k.prototype.detach = function() {
                null != this.parent && this.parent.removeChild(this),
                delete this.domNode[w.DATA_KEY]
            }
            ,
            k.prototype.deleteAt = function(_, f) {
                this.isolate(_, f).remove()
            }
            ,
            k.prototype.formatAt = function(_, f, u, e) {
                var t = this.isolate(_, f);
                if (null != w.query(u, w.Scope.BLOT) && e)
                    t.wrap(u, e);
                else if (null != w.query(u, w.Scope.ATTRIBUTE)) {
                    var n = w.create(this.statics.scope);
                    t.wrap(n),
                    n.format(u, e)
                }
            }
            ,
            k.prototype.insertAt = function(_, f, u) {
                var e = null == u ? w.create("text", f) : w.create(f, u)
                  , t = this.split(_);
                this.parent.insertBefore(e, t)
            }
            ,
            k.prototype.insertInto = function(_, f) {
                void 0 === f && (f = null),
                null != this.parent && this.parent.children.remove(this);
                var u = null;
                _.children.insertBefore(this, f),
                null != f && (u = f.domNode),
                this.domNode.parentNode == _.domNode && this.domNode.nextSibling == u || _.domNode.insertBefore(this.domNode, u),
                this.parent = _,
                this.attach()
            }
            ,
            k.prototype.isolate = function(_, f) {
                var u = this.split(_);
                return u.split(f),
                u
            }
            ,
            k.prototype.length = function() {
                return 1
            }
            ,
            k.prototype.offset = function(_) {
                return void 0 === _ && (_ = this.parent),
                null == this.parent || this == _ ? 0 : this.parent.children.offset(this) + this.parent.offset(_)
            }
            ,
            k.prototype.optimize = function(_) {
                null != this.domNode[w.DATA_KEY] && delete this.domNode[w.DATA_KEY].mutations
            }
            ,
            k.prototype.remove = function() {
                null != this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode),
                this.detach()
            }
            ,
            k.prototype.replace = function(_) {
                null != _.parent && (_.parent.insertBefore(this, _.next),
                _.remove())
            }
            ,
            k.prototype.replaceWith = function(_, f) {
                var u = "string" == typeof _ ? w.create(_, f) : _;
                return u.replace(this),
                u
            }
            ,
            k.prototype.split = function(_, f) {
                return 0 === _ ? this : this.next
            }
            ,
            k.prototype.update = function(_, f) {}
            ,
            k.prototype.wrap = function(_, f) {
                var u = "string" == typeof _ ? w.create(_, f) : _;
                return null != this.parent && this.parent.insertBefore(u, this.next),
                u.appendChild(this),
                u
            }
            ,
            k.blotName = "abstract",
            k
        }();
        g.default = T
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var w = d(11)
          , T = d(29)
          , k = d(30)
          , _ = d(1)
          , f = function() {
            function u(e) {
                this.attributes = {},
                this.domNode = e,
                this.build()
            }
            return u.prototype.attribute = function(e, t) {
                t ? e.add(this.domNode, t) && (null != e.value(this.domNode) ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode),
                delete this.attributes[e.attrName])
            }
            ,
            u.prototype.build = function() {
                var e = this;
                this.attributes = {};
                var t = w.default.keys(this.domNode)
                  , n = T.default.keys(this.domNode)
                  , o = k.default.keys(this.domNode);
                t.concat(n).concat(o).forEach(function(s) {
                    var i = _.query(s, _.Scope.ATTRIBUTE);
                    i instanceof w.default && (e.attributes[i.attrName] = i)
                })
            }
            ,
            u.prototype.copy = function(e) {
                var t = this;
                Object.keys(this.attributes).forEach(function(n) {
                    var o = t.attributes[n].value(t.domNode);
                    e.format(n, o)
                })
            }
            ,
            u.prototype.move = function(e) {
                var t = this;
                this.copy(e),
                Object.keys(this.attributes).forEach(function(n) {
                    t.attributes[n].remove(t.domNode)
                }),
                this.attributes = {}
            }
            ,
            u.prototype.values = function() {
                var e = this;
                return Object.keys(this.attributes).reduce(function(t, n) {
                    return t[n] = e.attributes[n].value(e.domNode),
                    t
                }, {})
            }
            ,
            u
        }();
        g.default = f
    }
    , function(B, g, d) {
        "use strict";
        function w(f, u) {
            return (f.getAttribute("class") || "").split(/\s+/).filter(function(e) {
                return 0 === e.indexOf(u + "-")
            })
        }
        var f, T = this && this.__extends || (f = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(u, e) {
            u.__proto__ = e
        }
        || function(u, e) {
            for (var t in e)
                e.hasOwnProperty(t) && (u[t] = e[t])
        }
        ,
        function(u, e) {
            function t() {
                this.constructor = u
            }
            f(u, e),
            u.prototype = null === e ? Object.create(e) : (t.prototype = e.prototype,
            new t)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var _ = function(f) {
            function u() {
                return null !== f && f.apply(this, arguments) || this
            }
            return T(u, f),
            u.keys = function(e) {
                return (e.getAttribute("class") || "").split(/\s+/).map(function(t) {
                    return t.split("-").slice(0, -1).join("-")
                })
            }
            ,
            u.prototype.add = function(e, t) {
                return !!this.canAdd(e, t) && (this.remove(e),
                e.classList.add(this.keyName + "-" + t),
                !0)
            }
            ,
            u.prototype.remove = function(e) {
                w(e, this.keyName).forEach(function(t) {
                    e.classList.remove(t)
                }),
                0 === e.classList.length && e.removeAttribute("class")
            }
            ,
            u.prototype.value = function(e) {
                var n = (w(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
                return this.canAdd(e, n) ? n : ""
            }
            ,
            u
        }(d(11).default);
        g.default = _
    }
    , function(B, g, d) {
        "use strict";
        function w(f) {
            var u = f.split("-")
              , e = u.slice(1).map(function(t) {
                return t[0].toUpperCase() + t.slice(1)
            }).join("");
            return u[0] + e
        }
        var f, T = this && this.__extends || (f = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(u, e) {
            u.__proto__ = e
        }
        || function(u, e) {
            for (var t in e)
                e.hasOwnProperty(t) && (u[t] = e[t])
        }
        ,
        function(u, e) {
            function t() {
                this.constructor = u
            }
            f(u, e),
            u.prototype = null === e ? Object.create(e) : (t.prototype = e.prototype,
            new t)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var _ = function(f) {
            function u() {
                return null !== f && f.apply(this, arguments) || this
            }
            return T(u, f),
            u.keys = function(e) {
                return (e.getAttribute("style") || "").split(";").map(function(t) {
                    return t.split(":")[0].trim()
                })
            }
            ,
            u.prototype.add = function(e, t) {
                return !!this.canAdd(e, t) && (e.style[w(this.keyName)] = t,
                !0)
            }
            ,
            u.prototype.remove = function(e) {
                e.style[w(this.keyName)] = "",
                e.getAttribute("style") || e.removeAttribute("style")
            }
            ,
            u.prototype.value = function(e) {
                var t = e.style[w(this.keyName)];
                return this.canAdd(e, t) ? t : ""
            }
            ,
            u
        }(d(11).default);
        g.default = _
    }
    , function(B, g, d) {
        "use strict";
        function w(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var u = function r(a, h, l) {
            null === a && (a = Function.prototype);
            var y = Object.getOwnPropertyDescriptor(a, h);
            if (void 0 === y) {
                var x = Object.getPrototypeOf(a);
                return null === x ? void 0 : r(x, h, l)
            }
            if ("value"in y)
                return y.value;
            var O = y.get;
            return void 0 !== O ? O.call(l) : void 0
        }
          , e = function() {
            function r(a, h) {
                for (var l = 0; l < h.length; l++) {
                    var y = h[l];
                    y.enumerable = y.enumerable || !1,
                    y.configurable = !0,
                    "value"in y && (y.writable = !0),
                    Object.defineProperty(a, y.key, y)
                }
            }
            return function(a, h, l) {
                return h && r(a.prototype, h),
                l && r(a, l),
                a
            }
        }()
          , n = w(d(0))
          , s = w(d(8))
          , i = function(r) {
            function a(h, l) {
                !function T(r, a) {
                    if (!(r instanceof a))
                        throw new TypeError("Cannot call a class as a function")
                }(this, a);
                var y = function k(r, a) {
                    if (!r)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !a || "object" != typeof a && "function" != typeof a ? r : a
                }(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, h));
                return y.selection = l,
                y.textNode = document.createTextNode(a.CONTENTS),
                y.domNode.appendChild(y.textNode),
                y._length = 0,
                y
            }
            return function _(r, a) {
                if ("function" != typeof a && null !== a)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof a);
                r.prototype = Object.create(a && a.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                a && (Object.setPrototypeOf ? Object.setPrototypeOf(r, a) : r.__proto__ = a)
            }(a, r),
            e(a, null, [{
                key: "value",
                value: function() {}
            }]),
            e(a, [{
                key: "detach",
                value: function() {
                    null != this.parent && this.parent.removeChild(this)
                }
            }, {
                key: "format",
                value: function(h, l) {
                    if (0 !== this._length)
                        return u(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "format", this).call(this, h, l);
                    for (var y = this, x = 0; null != y && y.statics.scope !== n.default.Scope.BLOCK_BLOT; )
                        x += y.offset(y.parent),
                        y = y.parent;
                    null != y && (this._length = a.CONTENTS.length,
                    y.optimize(),
                    y.formatAt(x, a.CONTENTS.length, h, l),
                    this._length = 0)
                }
            }, {
                key: "index",
                value: function(h, l) {
                    return h === this.textNode ? 0 : u(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "index", this).call(this, h, l)
                }
            }, {
                key: "length",
                value: function() {
                    return this._length
                }
            }, {
                key: "position",
                value: function() {
                    return [this.textNode, this.textNode.data.length]
                }
            }, {
                key: "remove",
                value: function() {
                    u(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "remove", this).call(this),
                    this.parent = null
                }
            }, {
                key: "restore",
                value: function() {
                    if (!this.selection.composing && null != this.parent) {
                        var h = this.textNode
                          , l = this.selection.getNativeRange()
                          , y = void 0
                          , x = void 0
                          , O = void 0;
                        if (null != l && l.start.node === h && l.end.node === h) {
                            var E = [h, l.start.offset, l.end.offset];
                            y = E[0],
                            x = E[1],
                            O = E[2]
                        }
                        for (; null != this.domNode.lastChild && this.domNode.lastChild !== this.textNode; )
                            this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                        if (this.textNode.data !== a.CONTENTS) {
                            var v = this.textNode.data.split(a.CONTENTS).join("");
                            this.next instanceof s.default ? (y = this.next.domNode,
                            this.next.insertAt(0, v),
                            this.textNode.data = a.CONTENTS) : (this.textNode.data = v,
                            this.parent.insertBefore(n.default.create(this.textNode), this),
                            this.textNode = document.createTextNode(a.CONTENTS),
                            this.domNode.appendChild(this.textNode))
                        }
                        if (this.remove(),
                        null != x) {
                            var c = function(a, h) {
                                if (Array.isArray(a))
                                    return a;
                                if (Symbol.iterator in Object(a))
                                    return function r(a, h) {
                                        var l = []
                                          , y = !0
                                          , x = !1
                                          , O = void 0;
                                        try {
                                            for (var E, v = a[Symbol.iterator](); !(y = (E = v.next()).done) && (l.push(E.value),
                                            !h || l.length !== h); y = !0)
                                                ;
                                        } catch (b) {
                                            x = !0,
                                            O = b
                                        } finally {
                                            try {
                                                !y && v.return && v.return()
                                            } finally {
                                                if (x)
                                                    throw O
                                            }
                                        }
                                        return l
                                    }(a, h);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            }([x, O].map(function(p) {
                                return Math.max(0, Math.min(y.data.length, p - 1))
                            }), 2);
                            return {
                                startNode: y,
                                startOffset: x = c[0],
                                endNode: y,
                                endOffset: O = c[1]
                            }
                        }
                    }
                }
            }, {
                key: "update",
                value: function(h, l) {
                    var y = this;
                    if (h.some(function(O) {
                        return "characterData" === O.type && O.target === y.textNode
                    })) {
                        var x = this.restore();
                        x && (l.range = x)
                    }
                }
            }, {
                key: "value",
                value: function() {
                    return ""
                }
            }]),
            a
        }(n.default.Embed);
        i.blotName = "cursor",
        i.className = "ql-cursor",
        i.tagName = "span",
        i.CONTENTS = "\ufeff",
        g.default = i
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = function() {
            function _(f, u) {
                for (var e = 0; e < u.length; e++) {
                    var t = u[e];
                    t.enumerable = t.enumerable || !1,
                    t.configurable = !0,
                    "value"in t && (t.writable = !0),
                    Object.defineProperty(f, t.key, t)
                }
            }
            return function(f, u, e) {
                return u && _(f.prototype, u),
                e && _(f, e),
                f
            }
        }()
          , k = function() {
            function _(f, u) {
                (function w(_, f) {
                    if (!(_ instanceof f))
                        throw new TypeError("Cannot call a class as a function")
                }
                )(this, _),
                this.quill = f,
                this.options = u,
                this.modules = {}
            }
            return T(_, [{
                key: "init",
                value: function() {
                    var f = this;
                    Object.keys(this.options.modules).forEach(function(u) {
                        null == f.modules[u] && f.addModule(u)
                    })
                }
            }, {
                key: "addModule",
                value: function(f) {
                    var u = this.quill.constructor.import("modules/" + f);
                    return this.modules[f] = new u(this.quill,this.options.modules[f] || {}),
                    this.modules[f]
                }
            }]),
            _
        }();
        k.DEFAULTS = {
            modules: {}
        },
        k.themes = {
            default: k
        },
        g.default = k
    }
    , function(B, g, d) {
        "use strict";
        function w(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var f = function() {
            function r(a, h) {
                for (var l = 0; l < h.length; l++) {
                    var y = h[l];
                    y.enumerable = y.enumerable || !1,
                    y.configurable = !0,
                    "value"in y && (y.writable = !0),
                    Object.defineProperty(a, y.key, y)
                }
            }
            return function(a, h, l) {
                return h && r(a.prototype, h),
                l && r(a, l),
                a
            }
        }()
          , u = function r(a, h, l) {
            null === a && (a = Function.prototype);
            var y = Object.getOwnPropertyDescriptor(a, h);
            if (void 0 === y) {
                var x = Object.getPrototypeOf(a);
                return null === x ? void 0 : r(x, h, l)
            }
            if ("value"in y)
                return y.value;
            var O = y.get;
            return void 0 !== O ? O.call(l) : void 0
        }
          , t = w(d(0))
          , o = w(d(8))
          , s = "\ufeff"
          , i = function(r) {
            function a(h) {
                !function T(r, a) {
                    if (!(r instanceof a))
                        throw new TypeError("Cannot call a class as a function")
                }(this, a);
                var l = function k(r, a) {
                    if (!r)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !a || "object" != typeof a && "function" != typeof a ? r : a
                }(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, h));
                return l.contentNode = document.createElement("span"),
                l.contentNode.setAttribute("contenteditable", !1),
                [].slice.call(l.domNode.childNodes).forEach(function(y) {
                    l.contentNode.appendChild(y)
                }),
                l.leftGuard = document.createTextNode(s),
                l.rightGuard = document.createTextNode(s),
                l.domNode.appendChild(l.leftGuard),
                l.domNode.appendChild(l.contentNode),
                l.domNode.appendChild(l.rightGuard),
                l
            }
            return function _(r, a) {
                if ("function" != typeof a && null !== a)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof a);
                r.prototype = Object.create(a && a.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                a && (Object.setPrototypeOf ? Object.setPrototypeOf(r, a) : r.__proto__ = a)
            }(a, r),
            f(a, [{
                key: "index",
                value: function(h, l) {
                    return h === this.leftGuard ? 0 : h === this.rightGuard ? 1 : u(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "index", this).call(this, h, l)
                }
            }, {
                key: "restore",
                value: function(h) {
                    var l = void 0
                      , y = void 0
                      , x = h.data.split(s).join("");
                    if (h === this.leftGuard)
                        if (this.prev instanceof o.default) {
                            var O = this.prev.length();
                            this.prev.insertAt(O, x),
                            l = {
                                startNode: this.prev.domNode,
                                startOffset: O + x.length
                            }
                        } else
                            y = document.createTextNode(x),
                            this.parent.insertBefore(t.default.create(y), this),
                            l = {
                                startNode: y,
                                startOffset: x.length
                            };
                    else
                        h === this.rightGuard && (this.next instanceof o.default ? (this.next.insertAt(0, x),
                        l = {
                            startNode: this.next.domNode,
                            startOffset: x.length
                        }) : (y = document.createTextNode(x),
                        this.parent.insertBefore(t.default.create(y), this.next),
                        l = {
                            startNode: y,
                            startOffset: x.length
                        }));
                    return h.data = s,
                    l
                }
            }, {
                key: "update",
                value: function(h, l) {
                    var y = this;
                    h.forEach(function(x) {
                        if ("characterData" === x.type && (x.target === y.leftGuard || x.target === y.rightGuard)) {
                            var O = y.restore(x.target);
                            O && (l.range = O)
                        }
                    })
                }
            }]),
            a
        }(t.default.Embed);
        g.default = i
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.AlignStyle = g.AlignClass = g.AlignAttribute = void 0;
        var e, T = (e = d(0)) && e.__esModule ? e : {
            default: e
        }, k = {
            scope: T.default.Scope.BLOCK,
            whitelist: ["right", "center", "justify"]
        }, _ = new T.default.Attributor.Attribute("align","align",k), f = new T.default.Attributor.Class("align","ql-align",k), u = new T.default.Attributor.Style("align","text-align",k);
        g.AlignAttribute = _,
        g.AlignClass = f,
        g.AlignStyle = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.BackgroundStyle = g.BackgroundClass = void 0;
        var u, T = (u = d(0)) && u.__esModule ? u : {
            default: u
        }, k = d(24), _ = new T.default.Attributor.Class("background","ql-bg",{
            scope: T.default.Scope.INLINE
        }), f = new k.ColorAttributor("background","background-color",{
            scope: T.default.Scope.INLINE
        });
        g.BackgroundClass = _,
        g.BackgroundStyle = f
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.DirectionStyle = g.DirectionClass = g.DirectionAttribute = void 0;
        var e, T = (e = d(0)) && e.__esModule ? e : {
            default: e
        }, k = {
            scope: T.default.Scope.BLOCK,
            whitelist: ["rtl"]
        }, _ = new T.default.Attributor.Attribute("direction","dir",k), f = new T.default.Attributor.Class("direction","ql-direction",k), u = new T.default.Attributor.Style("direction","direction",k);
        g.DirectionAttribute = _,
        g.DirectionClass = f,
        g.DirectionStyle = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.FontClass = g.FontStyle = void 0;
        var i, _ = function() {
            function i(r, a) {
                for (var h = 0; h < a.length; h++) {
                    var l = a[h];
                    l.enumerable = l.enumerable || !1,
                    l.configurable = !0,
                    "value"in l && (l.writable = !0),
                    Object.defineProperty(r, l.key, l)
                }
            }
            return function(r, a, h) {
                return a && i(r.prototype, a),
                h && i(r, h),
                r
            }
        }(), f = function i(r, a, h) {
            null === r && (r = Function.prototype);
            var l = Object.getOwnPropertyDescriptor(r, a);
            if (void 0 === l) {
                var y = Object.getPrototypeOf(r);
                return null === y ? void 0 : i(y, a, h)
            }
            if ("value"in l)
                return l.value;
            var x = l.get;
            return void 0 !== x ? x.call(h) : void 0
        }, e = (i = d(0)) && i.__esModule ? i : {
            default: i
        }, t = {
            scope: e.default.Scope.INLINE,
            whitelist: ["serif", "monospace"]
        }, n = new e.default.Attributor.Class("font","ql-font",t), o = function(i) {
            function r() {
                return function w(i, r) {
                    if (!(i instanceof r))
                        throw new TypeError("Cannot call a class as a function")
                }(this, r),
                function T(i, r) {
                    if (!i)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !r || "object" != typeof r && "function" != typeof r ? i : r
                }(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments))
            }
            return function k(i, r) {
                if ("function" != typeof r && null !== r)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof r);
                i.prototype = Object.create(r && r.prototype, {
                    constructor: {
                        value: i,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                r && (Object.setPrototypeOf ? Object.setPrototypeOf(i, r) : i.__proto__ = r)
            }(r, i),
            _(r, [{
                key: "value",
                value: function(a) {
                    return f(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "value", this).call(this, a).replace(/["']/g, "")
                }
            }]),
            r
        }(e.default.Attributor.Style), s = new o("font","font-family",t);
        g.FontStyle = s,
        g.FontClass = n
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.SizeStyle = g.SizeClass = void 0;
        var f, T = (f = d(0)) && f.__esModule ? f : {
            default: f
        }, k = new T.default.Attributor.Class("size","ql-size",{
            scope: T.default.Scope.INLINE,
            whitelist: ["small", "large", "huge"]
        }), _ = new T.default.Attributor.Style("size","font-size",{
            scope: T.default.Scope.INLINE,
            whitelist: ["10px", "18px", "32px"]
        });
        g.SizeClass = k,
        g.SizeStyle = _
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var n, _ = function() {
            function n(o, s) {
                for (var i = 0; i < s.length; i++) {
                    var r = s[i];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(o, r.key, r)
                }
            }
            return function(o, s, i) {
                return s && n(o.prototype, s),
                i && n(o, i),
                o
            }
        }(), f = function n(o, s, i) {
            null === o && (o = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(o, s);
            if (void 0 === r) {
                var a = Object.getPrototypeOf(o);
                return null === a ? void 0 : n(a, s, i)
            }
            if ("value"in r)
                return r.value;
            var h = r.get;
            return void 0 !== h ? h.call(i) : void 0
        }, t = function(n) {
            function o() {
                return function w(n, o) {
                    if (!(n instanceof o))
                        throw new TypeError("Cannot call a class as a function")
                }(this, o),
                function T(n, o) {
                    if (!n)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !o || "object" != typeof o && "function" != typeof o ? n : o
                }(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
            }
            return function k(n, o) {
                if ("function" != typeof o && null !== o)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof o);
                n.prototype = Object.create(o && o.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                o && (Object.setPrototypeOf ? Object.setPrototypeOf(n, o) : n.__proto__ = o)
            }(o, n),
            _(o, [{
                key: "optimize",
                value: function(s) {
                    f(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "optimize", this).call(this, s),
                    this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName)
                }
            }], [{
                key: "create",
                value: function() {
                    return f(o.__proto__ || Object.getPrototypeOf(o), "create", this).call(this)
                }
            }, {
                key: "formats",
                value: function() {
                    return !0
                }
            }]),
            o
        }(((n = d(5)) && n.__esModule ? n : {
            default: n
        }).default);
        t.blotName = "bold",
        t.tagName = ["STRONG", "B"],
        g.default = t
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>'
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var n, _ = function() {
            function n(o, s) {
                for (var i = 0; i < s.length; i++) {
                    var r = s[i];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(o, r.key, r)
                }
            }
            return function(o, s, i) {
                return s && n(o.prototype, s),
                i && n(o, i),
                o
            }
        }(), f = function n(o, s, i) {
            null === o && (o = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(o, s);
            if (void 0 === r) {
                var a = Object.getPrototypeOf(o);
                return null === a ? void 0 : n(a, s, i)
            }
            if ("value"in r)
                return r.value;
            var h = r.get;
            return void 0 !== h ? h.call(i) : void 0
        }, t = function(n) {
            function o(s, i) {
                !function w(n, o) {
                    if (!(n instanceof o))
                        throw new TypeError("Cannot call a class as a function")
                }(this, o);
                var r = function T(n, o) {
                    if (!n)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !o || "object" != typeof o && "function" != typeof o ? n : o
                }(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, s));
                return r.label.innerHTML = i,
                r.container.classList.add("ql-color-picker"),
                [].slice.call(r.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(a) {
                    a.classList.add("ql-primary")
                }),
                r
            }
            return function k(n, o) {
                if ("function" != typeof o && null !== o)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof o);
                n.prototype = Object.create(o && o.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                o && (Object.setPrototypeOf ? Object.setPrototypeOf(n, o) : n.__proto__ = o)
            }(o, n),
            _(o, [{
                key: "buildItem",
                value: function(s) {
                    var i = f(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "buildItem", this).call(this, s);
                    return i.style.backgroundColor = s.getAttribute("value") || "",
                    i
                }
            }, {
                key: "selectItem",
                value: function(s, i) {
                    f(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "selectItem", this).call(this, s, i);
                    var r = this.label.querySelector(".ql-color-label")
                      , a = s && s.getAttribute("data-value") || "";
                    r && ("line" === r.tagName ? r.style.stroke = a : r.style.fill = a)
                }
            }]),
            o
        }(((n = d(16)) && n.__esModule ? n : {
            default: n
        }).default);
        g.default = t
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var n, _ = function() {
            function n(o, s) {
                for (var i = 0; i < s.length; i++) {
                    var r = s[i];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(o, r.key, r)
                }
            }
            return function(o, s, i) {
                return s && n(o.prototype, s),
                i && n(o, i),
                o
            }
        }(), f = function n(o, s, i) {
            null === o && (o = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(o, s);
            if (void 0 === r) {
                var a = Object.getPrototypeOf(o);
                return null === a ? void 0 : n(a, s, i)
            }
            if ("value"in r)
                return r.value;
            var h = r.get;
            return void 0 !== h ? h.call(i) : void 0
        }, t = function(n) {
            function o(s, i) {
                !function w(n, o) {
                    if (!(n instanceof o))
                        throw new TypeError("Cannot call a class as a function")
                }(this, o);
                var r = function T(n, o) {
                    if (!n)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !o || "object" != typeof o && "function" != typeof o ? n : o
                }(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, s));
                return r.container.classList.add("ql-icon-picker"),
                [].forEach.call(r.container.querySelectorAll(".ql-picker-item"), function(a) {
                    a.innerHTML = i[a.getAttribute("data-value") || ""]
                }),
                r.defaultItem = r.container.querySelector(".ql-selected"),
                r.selectItem(r.defaultItem),
                r
            }
            return function k(n, o) {
                if ("function" != typeof o && null !== o)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof o);
                n.prototype = Object.create(o && o.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                o && (Object.setPrototypeOf ? Object.setPrototypeOf(n, o) : n.__proto__ = o)
            }(o, n),
            _(o, [{
                key: "selectItem",
                value: function(s, i) {
                    f(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "selectItem", this).call(this, s, i),
                    this.label.innerHTML = (s = s || this.defaultItem).innerHTML
                }
            }]),
            o
        }(((n = d(16)) && n.__esModule ? n : {
            default: n
        }).default);
        g.default = t
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = function() {
            function _(f, u) {
                for (var e = 0; e < u.length; e++) {
                    var t = u[e];
                    t.enumerable = t.enumerable || !1,
                    t.configurable = !0,
                    "value"in t && (t.writable = !0),
                    Object.defineProperty(f, t.key, t)
                }
            }
            return function(f, u, e) {
                return u && _(f.prototype, u),
                e && _(f, e),
                f
            }
        }()
          , k = function() {
            function _(f, u) {
                var e = this;
                (function w(_, f) {
                    if (!(_ instanceof f))
                        throw new TypeError("Cannot call a class as a function")
                }
                )(this, _),
                this.quill = f,
                this.boundsContainer = u || document.body,
                this.root = f.addContainer("ql-tooltip"),
                this.root.innerHTML = this.constructor.TEMPLATE,
                this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                    e.root.style.marginTop = -1 * e.quill.root.scrollTop + "px"
                }),
                this.hide()
            }
            return T(_, [{
                key: "hide",
                value: function() {
                    this.root.classList.add("ql-hidden")
                }
            }, {
                key: "position",
                value: function(f) {
                    var u = f.left + f.width / 2 - this.root.offsetWidth / 2
                      , e = f.bottom + this.quill.root.scrollTop;
                    this.root.style.left = u + "px",
                    this.root.style.top = e + "px",
                    this.root.classList.remove("ql-flip");
                    var t = this.boundsContainer.getBoundingClientRect()
                      , n = this.root.getBoundingClientRect()
                      , o = 0;
                    return n.right > t.right && (this.root.style.left = u + (o = t.right - n.right) + "px"),
                    n.left < t.left && (this.root.style.left = u + (o = t.left - n.left) + "px"),
                    n.bottom > t.bottom && (this.root.style.top = e - (f.bottom - f.top + (n.bottom - n.top)) + "px",
                    this.root.classList.add("ql-flip")),
                    o
                }
            }, {
                key: "show",
                value: function() {
                    this.root.classList.remove("ql-editing"),
                    this.root.classList.remove("ql-hidden")
                }
            }]),
            _
        }();
        g.default = k
    }
    , function(B, g, d) {
        "use strict";
        function w(P) {
            return P && P.__esModule ? P : {
                default: P
            }
        }
        function T(P, S) {
            if (!(P instanceof S))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(P, S) {
            if (!P)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !S || "object" != typeof S && "function" != typeof S ? P : S
        }
        function _(P, S) {
            if ("function" != typeof S && null !== S)
                throw new TypeError("Super expression must either be null or a function, not " + typeof S);
            P.prototype = Object.create(S && S.prototype, {
                constructor: {
                    value: P,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            S && (Object.setPrototypeOf ? Object.setPrototypeOf(P, S) : P.__proto__ = S)
        }
        function u(P, S) {
            var R = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            S.forEach(function(M) {
                var j = document.createElement("option");
                M === R ? j.setAttribute("selected", "selected") : j.setAttribute("value", M),
                P.appendChild(j)
            })
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.BaseTooltip = void 0;
        var e = function() {
            function P(S, R) {
                for (var M = 0; M < R.length; M++) {
                    var j = R[M];
                    j.enumerable = j.enumerable || !1,
                    j.configurable = !0,
                    "value"in j && (j.writable = !0),
                    Object.defineProperty(S, j.key, j)
                }
            }
            return function(S, R, M) {
                return R && P(S.prototype, R),
                M && P(S, M),
                S
            }
        }()
          , t = function P(S, R, M) {
            null === S && (S = Function.prototype);
            var j = Object.getOwnPropertyDescriptor(S, R);
            if (void 0 === j) {
                var C = Object.getPrototypeOf(S);
                return null === C ? void 0 : P(C, R, M)
            }
            if ("value"in j)
                return j.value;
            var D = j.get;
            return void 0 !== D ? D.call(M) : void 0
        }
          , o = w(d(2))
          , i = w(d(4))
          , a = w(d(9))
          , l = w(d(25))
          , x = w(d(32))
          , E = w(d(41))
          , b = w(d(42))
          , p = w(d(16))
          , q = w(d(43))
          , L = [!1, "center", "right", "justify"]
          , U = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"]
          , z = [!1, "serif", "monospace"]
          , F = ["1", "2", "3", !1]
          , I = ["small", !1, "large", "huge"]
          , m = function(P) {
            function S(R, M) {
                T(this, S);
                var j = k(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, R, M));
                return R.emitter.listenDOM("click", document.body, function D(Z) {
                    if (!document.body.contains(R.root))
                        return document.body.removeEventListener("click", D);
                    null == j.tooltip || j.tooltip.root.contains(Z.target) || document.activeElement === j.tooltip.textbox || j.quill.hasFocus() || j.tooltip.hide(),
                    null != j.pickers && j.pickers.forEach(function(V) {
                        V.container.contains(Z.target) || V.close()
                    })
                }),
                j
            }
            return _(S, P),
            e(S, [{
                key: "addModule",
                value: function(R) {
                    var M = t(S.prototype.__proto__ || Object.getPrototypeOf(S.prototype), "addModule", this).call(this, R);
                    return "toolbar" === R && this.extendToolbar(M),
                    M
                }
            }, {
                key: "buildButtons",
                value: function(R, M) {
                    R.forEach(function(j) {
                        (j.getAttribute("class") || "").split(/\s+/).forEach(function(C) {
                            if (C.startsWith("ql-") && (C = C.slice(3),
                            null != M[C]))
                                if ("direction" === C)
                                    j.innerHTML = M[C][""] + M[C].rtl;
                                else if ("string" == typeof M[C])
                                    j.innerHTML = M[C];
                                else {
                                    var D = j.value || "";
                                    null != D && M[C][D] && (j.innerHTML = M[C][D])
                                }
                        })
                    })
                }
            }, {
                key: "buildPickers",
                value: function(R, M) {
                    var j = this;
                    this.pickers = R.map(function(D) {
                        if (D.classList.contains("ql-align"))
                            return null == D.querySelector("option") && u(D, L),
                            new b.default(D,M.align);
                        if (D.classList.contains("ql-background") || D.classList.contains("ql-color")) {
                            var Z = D.classList.contains("ql-background") ? "background" : "color";
                            return null == D.querySelector("option") && u(D, U, "background" === Z ? "#ffffff" : "#000000"),
                            new E.default(D,M[Z])
                        }
                        return null == D.querySelector("option") && (D.classList.contains("ql-font") ? u(D, z) : D.classList.contains("ql-header") ? u(D, F) : D.classList.contains("ql-size") && u(D, I)),
                        new p.default(D)
                    }),
                    this.quill.on(a.default.events.EDITOR_CHANGE, function() {
                        j.pickers.forEach(function(D) {
                            D.update()
                        })
                    })
                }
            }]),
            S
        }(x.default);
        m.DEFAULTS = (0,
        o.default)(!0, {}, x.default.DEFAULTS, {
            modules: {
                toolbar: {
                    handlers: {
                        formula: function() {
                            this.quill.theme.tooltip.edit("formula")
                        },
                        image: function() {
                            var P = this
                              , S = this.container.querySelector("input.ql-image[type=file]");
                            null == S && ((S = document.createElement("input")).setAttribute("type", "file"),
                            S.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"),
                            S.classList.add("ql-image"),
                            S.addEventListener("change", function() {
                                if (null != S.files && null != S.files[0]) {
                                    var R = new FileReader;
                                    R.onload = function(M) {
                                        var j = P.quill.getSelection(!0);
                                        P.quill.updateContents((new i.default).retain(j.index).delete(j.length).insert({
                                            image: M.target.result
                                        }), a.default.sources.USER),
                                        P.quill.setSelection(j.index + 1, a.default.sources.SILENT),
                                        S.value = ""
                                    }
                                    ,
                                    R.readAsDataURL(S.files[0])
                                }
                            }),
                            this.container.appendChild(S)),
                            S.click()
                        },
                        video: function() {
                            this.quill.theme.tooltip.edit("video")
                        }
                    }
                }
            }
        });
        var A = function(P) {
            function S(R, M) {
                T(this, S);
                var j = k(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, R, M));
                return j.textbox = j.root.querySelector('input[type="text"]'),
                j.listen(),
                j
            }
            return _(S, P),
            e(S, [{
                key: "listen",
                value: function() {
                    var R = this;
                    this.textbox.addEventListener("keydown", function(M) {
                        l.default.match(M, "enter") ? (R.save(),
                        M.preventDefault()) : l.default.match(M, "escape") && (R.cancel(),
                        M.preventDefault())
                    })
                }
            }, {
                key: "cancel",
                value: function() {
                    this.hide()
                }
            }, {
                key: "edit",
                value: function() {
                    var R = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "link"
                      , M = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    this.root.classList.remove("ql-hidden"),
                    this.root.classList.add("ql-editing"),
                    null != M ? this.textbox.value = M : R !== this.root.getAttribute("data-mode") && (this.textbox.value = ""),
                    this.position(this.quill.getBounds(this.quill.selection.savedRange)),
                    this.textbox.select(),
                    this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + R) || ""),
                    this.root.setAttribute("data-mode", R)
                }
            }, {
                key: "restoreFocus",
                value: function() {
                    var R = this.quill.scrollingContainer.scrollTop;
                    this.quill.focus(),
                    this.quill.scrollingContainer.scrollTop = R
                }
            }, {
                key: "save",
                value: function() {
                    var R = this.textbox.value;
                    switch (this.root.getAttribute("data-mode")) {
                    case "link":
                        var M = this.quill.root.scrollTop;
                        this.linkRange ? (this.quill.formatText(this.linkRange, "link", R, a.default.sources.USER),
                        delete this.linkRange) : (this.restoreFocus(),
                        this.quill.format("link", R, a.default.sources.USER)),
                        this.quill.root.scrollTop = M;
                        break;
                    case "video":
                        R = function f(P) {
                            var S = P.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || P.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
                            return S ? (S[1] || "https") + "://www.youtube.com/embed/" + S[2] + "?showinfo=0" : (S = P.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (S[1] || "https") + "://player.vimeo.com/video/" + S[2] + "/" : P
                        }(R);
                    case "formula":
                        if (!R)
                            break;
                        var j = this.quill.getSelection(!0);
                        if (null != j) {
                            var C = j.index + j.length;
                            this.quill.insertEmbed(C, this.root.getAttribute("data-mode"), R, a.default.sources.USER),
                            "formula" === this.root.getAttribute("data-mode") && this.quill.insertText(C + 1, " ", a.default.sources.USER),
                            this.quill.setSelection(C + 2, a.default.sources.USER)
                        }
                    }
                    this.textbox.value = "",
                    this.hide()
                }
            }]),
            S
        }(q.default);
        g.BaseTooltip = A,
        g.default = m
    }
    , function(B, g, d) {
        "use strict";
        function w($) {
            return $ && $.__esModule ? $ : {
                default: $
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var k = w(d(46))
          , _ = d(34)
          , f = d(36)
          , u = d(62)
          , t = w(d(63))
          , o = w(d(64))
          , s = d(65)
          , i = w(s)
          , r = d(35)
          , a = d(24)
          , h = d(37)
          , l = d(38)
          , x = w(d(39))
          , E = w(d(66))
          , b = w(d(15))
          , p = w(d(67))
          , q = w(d(68))
          , U = w(d(69))
          , F = w(d(70))
          , m = w(d(71))
          , A = d(13)
          , P = w(A)
          , R = w(d(72))
          , j = w(d(73))
          , D = w(d(74))
          , V = w(d(26))
          , Q = w(d(16))
          , et = w(d(41))
          , lt = w(d(42))
          , H = w(d(43))
          , W = w(d(107))
          , G = w(d(108));
        k.default.register({
            "attributors/attribute/direction": f.DirectionAttribute,
            "attributors/class/align": _.AlignClass,
            "attributors/class/background": r.BackgroundClass,
            "attributors/class/color": a.ColorClass,
            "attributors/class/direction": f.DirectionClass,
            "attributors/class/font": h.FontClass,
            "attributors/class/size": l.SizeClass,
            "attributors/style/align": _.AlignStyle,
            "attributors/style/background": r.BackgroundStyle,
            "attributors/style/color": a.ColorStyle,
            "attributors/style/direction": f.DirectionStyle,
            "attributors/style/font": h.FontStyle,
            "attributors/style/size": l.SizeStyle
        }, !0),
        k.default.register({
            "formats/align": _.AlignClass,
            "formats/direction": f.DirectionClass,
            "formats/indent": u.IndentClass,
            "formats/background": r.BackgroundStyle,
            "formats/color": a.ColorStyle,
            "formats/font": h.FontClass,
            "formats/size": l.SizeClass,
            "formats/blockquote": t.default,
            "formats/code-block": P.default,
            "formats/header": o.default,
            "formats/list": i.default,
            "formats/bold": x.default,
            "formats/code": A.Code,
            "formats/italic": E.default,
            "formats/link": b.default,
            "formats/script": p.default,
            "formats/strike": q.default,
            "formats/underline": U.default,
            "formats/image": F.default,
            "formats/video": m.default,
            "formats/list/item": s.ListItem,
            "modules/formula": R.default,
            "modules/syntax": j.default,
            "modules/toolbar": D.default,
            "themes/bubble": W.default,
            "themes/snow": G.default,
            "ui/icons": V.default,
            "ui/picker": Q.default,
            "ui/icon-picker": lt.default,
            "ui/color-picker": et.default,
            "ui/tooltip": H.default
        }, !0),
        g.default = k.default
    }
    , function(B, g, d) {
        "use strict";
        function w(U) {
            return U && U.__esModule ? U : {
                default: U
            }
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var k = w(d(0))
          , f = w(d(6))
          , u = d(3)
          , e = w(u)
          , n = w(d(14))
          , s = w(d(23))
          , r = w(d(31))
          , h = w(d(33))
          , y = w(d(5))
          , O = w(d(59))
          , v = w(d(8))
          , c = w(d(60))
          , N = w(d(61))
          , L = w(d(25));
        f.default.register({
            "blots/block": e.default,
            "blots/block/embed": u.BlockEmbed,
            "blots/break": n.default,
            "blots/container": s.default,
            "blots/cursor": r.default,
            "blots/embed": h.default,
            "blots/inline": y.default,
            "blots/scroll": O.default,
            "blots/text": v.default,
            "modules/clipboard": c.default,
            "modules/history": N.default,
            "modules/keyboard": L.default
        }),
        k.default.register(e.default, n.default, r.default, y.default, O.default, v.default),
        g.default = f.default
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var w = function() {
            function T() {
                this.head = this.tail = null,
                this.length = 0
            }
            return T.prototype.append = function() {
                for (var k = [], _ = 0; _ < arguments.length; _++)
                    k[_] = arguments[_];
                this.insertBefore(k[0], null),
                k.length > 1 && this.append.apply(this, k.slice(1))
            }
            ,
            T.prototype.contains = function(k) {
                for (var _, f = this.iterator(); _ = f(); )
                    if (_ === k)
                        return !0;
                return !1
            }
            ,
            T.prototype.insertBefore = function(k, _) {
                k && (k.next = _,
                null != _ ? (k.prev = _.prev,
                null != _.prev && (_.prev.next = k),
                _.prev = k,
                _ === this.head && (this.head = k)) : null != this.tail ? (this.tail.next = k,
                k.prev = this.tail,
                this.tail = k) : (k.prev = null,
                this.head = this.tail = k),
                this.length += 1)
            }
            ,
            T.prototype.offset = function(k) {
                for (var _ = 0, f = this.head; null != f; ) {
                    if (f === k)
                        return _;
                    _ += f.length(),
                    f = f.next
                }
                return -1
            }
            ,
            T.prototype.remove = function(k) {
                this.contains(k) && (null != k.prev && (k.prev.next = k.next),
                null != k.next && (k.next.prev = k.prev),
                k === this.head && (this.head = k.next),
                k === this.tail && (this.tail = k.prev),
                this.length -= 1)
            }
            ,
            T.prototype.iterator = function(k) {
                return void 0 === k && (k = this.head),
                function() {
                    var _ = k;
                    return null != k && (k = k.next),
                    _
                }
            }
            ,
            T.prototype.find = function(k, _) {
                void 0 === _ && (_ = !1);
                for (var f, u = this.iterator(); f = u(); ) {
                    var e = f.length();
                    if (k < e || _ && k === e && (null == f.next || 0 !== f.next.length()))
                        return [f, k];
                    k -= e
                }
                return [null, 0]
            }
            ,
            T.prototype.forEach = function(k) {
                for (var _, f = this.iterator(); _ = f(); )
                    k(_)
            }
            ,
            T.prototype.forEachAt = function(k, _, f) {
                if (!(_ <= 0))
                    for (var u, e = this.find(k), o = k - e[1], s = this.iterator(e[0]); (u = s()) && o < k + _; ) {
                        var i = u.length();
                        k > o ? f(u, k - o, Math.min(_, o + i - k)) : f(u, 0, Math.min(i, k + _ - o)),
                        o += i
                    }
            }
            ,
            T.prototype.map = function(k) {
                return this.reduce(function(_, f) {
                    return _.push(k(f)),
                    _
                }, [])
            }
            ,
            T.prototype.reduce = function(k, _) {
                for (var f, u = this.iterator(); f = u(); )
                    _ = k(_, f);
                return _
            }
            ,
            T
        }();
        g.default = w
    }
    , function(B, g, d) {
        "use strict";
        var u, w = this && this.__extends || (u = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            u(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = d(17)
          , k = d(1)
          , _ = {
            attributes: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
        }
          , f = function(u) {
            function e(t) {
                var n = u.call(this, t) || this;
                return n.scroll = n,
                n.observer = new MutationObserver(function(o) {
                    n.update(o)
                }
                ),
                n.observer.observe(n.domNode, _),
                n.attach(),
                n
            }
            return w(e, u),
            e.prototype.detach = function() {
                u.prototype.detach.call(this),
                this.observer.disconnect()
            }
            ,
            e.prototype.deleteAt = function(t, n) {
                this.update(),
                0 === t && n === this.length() ? this.children.forEach(function(o) {
                    o.remove()
                }) : u.prototype.deleteAt.call(this, t, n)
            }
            ,
            e.prototype.formatAt = function(t, n, o, s) {
                this.update(),
                u.prototype.formatAt.call(this, t, n, o, s)
            }
            ,
            e.prototype.insertAt = function(t, n, o) {
                this.update(),
                u.prototype.insertAt.call(this, t, n, o)
            }
            ,
            e.prototype.optimize = function(t, n) {
                var o = this;
                void 0 === t && (t = []),
                void 0 === n && (n = {}),
                u.prototype.optimize.call(this, n);
                for (var s = [].slice.call(this.observer.takeRecords()); s.length > 0; )
                    t.push(s.pop());
                for (var i = function(l, y) {
                    void 0 === y && (y = !0),
                    null != l && l !== o && null != l.domNode.parentNode && (null == l.domNode[k.DATA_KEY].mutations && (l.domNode[k.DATA_KEY].mutations = []),
                    y && i(l.parent))
                }, r = function(l) {
                    null != l.domNode[k.DATA_KEY] && null != l.domNode[k.DATA_KEY].mutations && (l instanceof T.default && l.children.forEach(r),
                    l.optimize(n))
                }, a = t, h = 0; a.length > 0; h += 1) {
                    if (h >= 100)
                        throw new Error("[Parchment] Maximum optimize iterations reached");
                    for (a.forEach(function(l) {
                        var y = k.find(l.target, !0);
                        null != y && (y.domNode === l.target && ("childList" === l.type ? (i(k.find(l.previousSibling, !1)),
                        [].forEach.call(l.addedNodes, function(x) {
                            var O = k.find(x, !1);
                            i(O, !1),
                            O instanceof T.default && O.children.forEach(function(E) {
                                i(E, !1)
                            })
                        })) : "attributes" === l.type && i(y.prev)),
                        i(y))
                    }),
                    this.children.forEach(r),
                    s = (a = [].slice.call(this.observer.takeRecords())).slice(); s.length > 0; )
                        t.push(s.pop())
                }
            }
            ,
            e.prototype.update = function(t, n) {
                var o = this;
                void 0 === n && (n = {}),
                (t = t || this.observer.takeRecords()).map(function(s) {
                    var i = k.find(s.target, !0);
                    return null == i ? null : null == i.domNode[k.DATA_KEY].mutations ? (i.domNode[k.DATA_KEY].mutations = [s],
                    i) : (i.domNode[k.DATA_KEY].mutations.push(s),
                    null)
                }).forEach(function(s) {
                    null != s && s !== o && null != s.domNode[k.DATA_KEY] && s.update(s.domNode[k.DATA_KEY].mutations || [], n)
                }),
                null != this.domNode[k.DATA_KEY].mutations && u.prototype.update.call(this, this.domNode[k.DATA_KEY].mutations, n),
                this.optimize(t, n)
            }
            ,
            e.blotName = "scroll",
            e.defaultChild = "block",
            e.scope = k.Scope.BLOCK_BLOT,
            e.tagName = "DIV",
            e
        }(T.default);
        g.default = f
    }
    , function(B, g, d) {
        "use strict";
        var u, T = this && this.__extends || (u = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        ,
        function(e, t) {
            function n() {
                this.constructor = e
            }
            u(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var k = d(18)
          , _ = d(1)
          , f = function(u) {
            function e() {
                return null !== u && u.apply(this, arguments) || this
            }
            return T(e, u),
            e.formats = function(t) {
                if (t.tagName !== e.tagName)
                    return u.formats.call(this, t)
            }
            ,
            e.prototype.format = function(t, n) {
                var o = this;
                t !== this.statics.blotName || n ? u.prototype.format.call(this, t, n) : (this.children.forEach(function(s) {
                    s instanceof k.default || (s = s.wrap(e.blotName, !0)),
                    o.attributes.copy(s)
                }),
                this.unwrap())
            }
            ,
            e.prototype.formatAt = function(t, n, o, s) {
                null != this.formats()[o] || _.query(o, _.Scope.ATTRIBUTE) ? this.isolate(t, n).format(o, s) : u.prototype.formatAt.call(this, t, n, o, s)
            }
            ,
            e.prototype.optimize = function(t) {
                u.prototype.optimize.call(this, t);
                var n = this.formats();
                if (0 === Object.keys(n).length)
                    return this.unwrap();
                var o = this.next;
                o instanceof e && o.prev === this && function w(u, e) {
                    if (Object.keys(u).length !== Object.keys(e).length)
                        return !1;
                    for (var t in u)
                        if (u[t] !== e[t])
                            return !1;
                    return !0
                }(n, o.formats()) && (o.moveChildren(this),
                o.remove())
            }
            ,
            e.blotName = "inline",
            e.scope = _.Scope.INLINE_BLOT,
            e.tagName = "SPAN",
            e
        }(k.default);
        g.default = f
    }
    , function(B, g, d) {
        "use strict";
        var f, w = this && this.__extends || (f = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(u, e) {
            u.__proto__ = e
        }
        || function(u, e) {
            for (var t in e)
                e.hasOwnProperty(t) && (u[t] = e[t])
        }
        ,
        function(u, e) {
            function t() {
                this.constructor = u
            }
            f(u, e),
            u.prototype = null === e ? Object.create(e) : (t.prototype = e.prototype,
            new t)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = d(18)
          , k = d(1)
          , _ = function(f) {
            function u() {
                return null !== f && f.apply(this, arguments) || this
            }
            return w(u, f),
            u.formats = function(e) {
                var t = k.query(u.blotName).tagName;
                if (e.tagName !== t)
                    return f.formats.call(this, e)
            }
            ,
            u.prototype.format = function(e, t) {
                null != k.query(e, k.Scope.BLOCK) && (e !== this.statics.blotName || t ? f.prototype.format.call(this, e, t) : this.replaceWith(u.blotName))
            }
            ,
            u.prototype.formatAt = function(e, t, n, o) {
                null != k.query(n, k.Scope.BLOCK) ? this.format(n, o) : f.prototype.formatAt.call(this, e, t, n, o)
            }
            ,
            u.prototype.insertAt = function(e, t, n) {
                if (null == n || null != k.query(t, k.Scope.INLINE))
                    f.prototype.insertAt.call(this, e, t, n);
                else {
                    var o = this.split(e)
                      , s = k.create(t, n);
                    o.parent.insertBefore(s, o)
                }
            }
            ,
            u.prototype.update = function(e, t) {
                navigator.userAgent.match(/Trident/) ? this.build() : f.prototype.update.call(this, e, t)
            }
            ,
            u.blotName = "block",
            u.scope = k.Scope.BLOCK_BLOT,
            u.tagName = "P",
            u
        }(T.default);
        g.default = _
    }
    , function(B, g, d) {
        "use strict";
        var _, w = this && this.__extends || (_ = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(f, u) {
            f.__proto__ = u
        }
        || function(f, u) {
            for (var e in u)
                u.hasOwnProperty(e) && (f[e] = u[e])
        }
        ,
        function(f, u) {
            function e() {
                this.constructor = f
            }
            _(f, u),
            f.prototype = null === u ? Object.create(u) : (e.prototype = u.prototype,
            new e)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var k = function(_) {
            function f() {
                return null !== _ && _.apply(this, arguments) || this
            }
            return w(f, _),
            f.formats = function(u) {}
            ,
            f.prototype.format = function(u, e) {
                _.prototype.formatAt.call(this, 0, this.length(), u, e)
            }
            ,
            f.prototype.formatAt = function(u, e, t, n) {
                0 === u && e === this.length() ? this.format(t, n) : _.prototype.formatAt.call(this, u, e, t, n)
            }
            ,
            f.prototype.formats = function() {
                return this.statics.formats(this.domNode)
            }
            ,
            f
        }(d(19).default);
        g.default = k
    }
    , function(B, g, d) {
        "use strict";
        var f, w = this && this.__extends || (f = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(u, e) {
            u.__proto__ = e
        }
        || function(u, e) {
            for (var t in e)
                e.hasOwnProperty(t) && (u[t] = e[t])
        }
        ,
        function(u, e) {
            function t() {
                this.constructor = u
            }
            f(u, e),
            u.prototype = null === e ? Object.create(e) : (t.prototype = e.prototype,
            new t)
        }
        );
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var T = d(19)
          , k = d(1)
          , _ = function(f) {
            function u(e) {
                var t = f.call(this, e) || this;
                return t.text = t.statics.value(t.domNode),
                t
            }
            return w(u, f),
            u.create = function(e) {
                return document.createTextNode(e)
            }
            ,
            u.value = function(e) {
                var t = e.data;
                return t.normalize && (t = t.normalize()),
                t
            }
            ,
            u.prototype.deleteAt = function(e, t) {
                this.domNode.data = this.text = this.text.slice(0, e) + this.text.slice(e + t)
            }
            ,
            u.prototype.index = function(e, t) {
                return this.domNode === e ? t : -1
            }
            ,
            u.prototype.insertAt = function(e, t, n) {
                null == n ? (this.text = this.text.slice(0, e) + t + this.text.slice(e),
                this.domNode.data = this.text) : f.prototype.insertAt.call(this, e, t, n)
            }
            ,
            u.prototype.length = function() {
                return this.text.length
            }
            ,
            u.prototype.optimize = function(e) {
                f.prototype.optimize.call(this, e),
                this.text = this.statics.value(this.domNode),
                0 === this.text.length ? this.remove() : this.next instanceof u && this.next.prev === this && (this.insertAt(this.length(), this.next.value()),
                this.next.remove())
            }
            ,
            u.prototype.position = function(e, t) {
                return void 0 === t && (t = !1),
                [this.domNode, e]
            }
            ,
            u.prototype.split = function(e, t) {
                if (void 0 === t && (t = !1),
                !t) {
                    if (0 === e)
                        return this;
                    if (e === this.length())
                        return this.next
                }
                var n = k.create(this.domNode.splitText(e));
                return this.parent.insertBefore(n, this.next),
                this.text = this.statics.value(this.domNode),
                n
            }
            ,
            u.prototype.update = function(e, t) {
                var n = this;
                e.some(function(o) {
                    return "characterData" === o.type && o.target === n.domNode
                }) && (this.text = this.statics.value(this.domNode))
            }
            ,
            u.prototype.value = function() {
                return this.text
            }
            ,
            u.blotName = "text",
            u.scope = k.Scope.INLINE_BLOT,
            u
        }(T.default);
        g.default = _
    }
    , function(B, g, d) {
        "use strict";
        var w = document.createElement("div");
        if (w.classList.toggle("test-class", !1),
        w.classList.contains("test-class")) {
            var T = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(k, _) {
                return arguments.length > 1 && !this.contains(k) == !_ ? _ : T.call(this, k)
            }
        }
        String.prototype.startsWith || (String.prototype.startsWith = function(k, _) {
            return this.substr(_ = _ || 0, k.length) === k
        }
        ),
        String.prototype.endsWith || (String.prototype.endsWith = function(k, _) {
            var f = this.toString();
            ("number" != typeof _ || !isFinite(_) || Math.floor(_) !== _ || _ > f.length) && (_ = f.length);
            var u = f.indexOf(k, _ -= k.length);
            return -1 !== u && u === _
        }
        ),
        Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(k) {
                if (null === this)
                    throw new TypeError("Array.prototype.find called on null or undefined");
                if ("function" != typeof k)
                    throw new TypeError("predicate must be a function");
                for (var _, f = Object(this), u = f.length >>> 0, e = arguments[1], t = 0; t < u; t++)
                    if (k.call(e, _ = f[t], t, f))
                        return _
            }
        }),
        document.addEventListener("DOMContentLoaded", function() {
            document.execCommand("enableObjectResizing", !1, !1),
            document.execCommand("autoUrlDetect", !1, !1)
        })
    }
    , function(B, g) {
        function d(l, y, x) {
            if (l == y)
                return l ? [[a, l]] : [];
            (x < 0 || l.length < x) && (x = null);
            var O = _(l, y)
              , E = l.substring(0, O);
            O = f(l = l.substring(O), y = y.substring(O));
            var v = l.substring(l.length - O)
              , b = function w(l, y) {
                var x;
                if (!l)
                    return [[r, y]];
                if (!y)
                    return [[i, l]];
                var O = l.length > y.length ? l : y
                  , E = l.length > y.length ? y : l
                  , v = O.indexOf(E);
                if (-1 != v)
                    return x = [[r, O.substring(0, v)], [a, E], [r, O.substring(v + E.length)]],
                    l.length > y.length && (x[0][0] = x[2][0] = i),
                    x;
                if (1 == E.length)
                    return [[i, l], [r, y]];
                var b = function u(l, y) {
                    function x(U, z, F) {
                        for (var I, m, A, P, S = U.substring(F, F + Math.floor(U.length / 4)), R = -1, M = ""; -1 != (R = z.indexOf(S, R + 1)); ) {
                            var j = _(U.substring(F), z.substring(R))
                              , C = f(U.substring(0, F), z.substring(0, R));
                            M.length < C + j && (M = z.substring(R - C, R) + z.substring(R, R + j),
                            I = U.substring(0, F - C),
                            m = U.substring(F + j),
                            A = z.substring(0, R - C),
                            P = z.substring(R + j))
                        }
                        return 2 * M.length >= U.length ? [I, m, A, P, M] : null
                    }
                    var O = l.length > y.length ? l : y
                      , E = l.length > y.length ? y : l;
                    if (O.length < 4 || 2 * E.length < O.length)
                        return null;
                    var v, p, N, q, L, b = x(O, E, Math.ceil(O.length / 4)), c = x(O, E, Math.ceil(O.length / 2));
                    return b || c ? (v = c ? b && b[4].length > c[4].length ? b : c : b,
                    l.length > y.length ? (p = v[0],
                    N = v[1],
                    q = v[2],
                    L = v[3]) : (q = v[0],
                    L = v[1],
                    p = v[2],
                    N = v[3]),
                    [p, N, q, L, v[4]]) : null
                }(l, y);
                if (b) {
                    var p = b[1]
                      , q = b[3]
                      , L = b[4]
                      , U = d(b[0], b[2])
                      , z = d(p, q);
                    return U.concat([[a, L]], z)
                }
                return function T(l, y) {
                    for (var x = l.length, O = y.length, E = Math.ceil((x + O) / 2), v = E, b = 2 * E, c = new Array(b), p = new Array(b), N = 0; N < b; N++)
                        c[N] = -1,
                        p[N] = -1;
                    c[v + 1] = 0,
                    p[v + 1] = 0;
                    for (var q = x - O, L = q % 2 != 0, U = 0, z = 0, F = 0, I = 0, m = 0; m < E; m++) {
                        for (var A = -m + U; A <= m - z; A += 2) {
                            for (var S = v + A, R = (P = A == -m || A != m && c[S - 1] < c[S + 1] ? c[S + 1] : c[S - 1] + 1) - A; P < x && R < O && l.charAt(P) == y.charAt(R); )
                                P++,
                                R++;
                            if (c[S] = P,
                            P > x)
                                z += 2;
                            else if (R > O)
                                U += 2;
                            else if (L && (M = v + q - A) >= 0 && M < b && -1 != p[M] && P >= (j = x - p[M]))
                                return k(l, y, P, R)
                        }
                        for (var C = -m + F; C <= m - I; C += 2) {
                            for (var j, M = v + C, D = (j = C == -m || C != m && p[M - 1] < p[M + 1] ? p[M + 1] : p[M - 1] + 1) - C; j < x && D < O && l.charAt(x - j - 1) == y.charAt(O - D - 1); )
                                j++,
                                D++;
                            if (p[M] = j,
                            j > x)
                                I += 2;
                            else if (D > O)
                                F += 2;
                            else if (!L) {
                                var P;
                                if ((S = v + q - C) >= 0 && S < b && -1 != c[S])
                                    if (R = v + (P = c[S]) - S,
                                    P >= (j = x - j))
                                        return k(l, y, P, R)
                            }
                        }
                    }
                    return [[i, l], [r, y]]
                }(l, y)
            }(l = l.substring(0, l.length - O), y = y.substring(0, y.length - O));
            return E && b.unshift([a, E]),
            v && b.push([a, v]),
            e(b),
            null != x && (b = function n(l, y) {
                var x = function t(l, y) {
                    if (0 === y)
                        return [a, l];
                    for (var x = 0, O = 0; O < l.length; O++) {
                        var E = l[O];
                        if (E[0] === i || E[0] === a) {
                            var v = x + E[1].length;
                            if (y === v)
                                return [O + 1, l];
                            if (y < v) {
                                l = l.slice();
                                var b = y - x
                                  , c = [E[0], E[1].slice(0, b)]
                                  , p = [E[0], E[1].slice(b)];
                                return l.splice(O, 1, c, p),
                                [O + 1, l]
                            }
                            x = v
                        }
                    }
                    throw new Error("cursor_pos is out of bounds!")
                }(l, y)
                  , O = x[1]
                  , E = x[0]
                  , v = O[E]
                  , b = O[E + 1];
                if (null == v || v[0] !== a)
                    return l;
                if (null != b && v[1] + b[1] === b[1] + v[1])
                    return O.splice(E, 2, b, v),
                    s(O, E, 2);
                if (null != b && 0 === b[1].indexOf(v[1])) {
                    O.splice(E, 2, [b[0], v[1]], [0, v[1]]);
                    var c = b[1].slice(v[1].length);
                    return c.length > 0 && O.splice(E + 2, 0, [b[0], c]),
                    s(O, E, 3)
                }
                return l
            }(b, x)),
            function o(l) {
                for (var y = !1, x = function(v) {
                    return v.charCodeAt(0) >= 56320 && v.charCodeAt(0) <= 57343
                }, O = 2; O < l.length; O += 1)
                    l[O - 2][0] === a && function(v) {
                        return v.charCodeAt(v.length - 1) >= 55296 && v.charCodeAt(v.length - 1) <= 56319
                    }(l[O - 2][1]) && l[O - 1][0] === i && x(l[O - 1][1]) && l[O][0] === r && x(l[O][1]) && (y = !0,
                    l[O - 1][1] = l[O - 2][1].slice(-1) + l[O - 1][1],
                    l[O][1] = l[O - 2][1].slice(-1) + l[O][1],
                    l[O - 2][1] = l[O - 2][1].slice(0, -1));
                if (!y)
                    return l;
                var E = [];
                for (O = 0; O < l.length; O += 1)
                    l[O][1].length > 0 && E.push(l[O]);
                return E
            }(b)
        }
        function k(l, y, x, O) {
            var E = l.substring(0, x)
              , v = y.substring(0, O)
              , b = l.substring(x)
              , c = y.substring(O)
              , p = d(E, v)
              , N = d(b, c);
            return p.concat(N)
        }
        function _(l, y) {
            if (!l || !y || l.charAt(0) != y.charAt(0))
                return 0;
            for (var x = 0, O = Math.min(l.length, y.length), E = O, v = 0; x < E; )
                l.substring(v, E) == y.substring(v, E) ? v = x = E : O = E,
                E = Math.floor((O - x) / 2 + x);
            return E
        }
        function f(l, y) {
            if (!l || !y || l.charAt(l.length - 1) != y.charAt(y.length - 1))
                return 0;
            for (var x = 0, O = Math.min(l.length, y.length), E = O, v = 0; x < E; )
                l.substring(l.length - E, l.length - v) == y.substring(y.length - E, y.length - v) ? v = x = E : O = E,
                E = Math.floor((O - x) / 2 + x);
            return E
        }
        function e(l) {
            l.push([a, ""]);
            for (var y, x = 0, O = 0, E = 0, v = "", b = ""; x < l.length; )
                switch (l[x][0]) {
                case r:
                    E++,
                    b += l[x][1],
                    x++;
                    break;
                case i:
                    O++,
                    v += l[x][1],
                    x++;
                    break;
                case a:
                    O + E > 1 ? (0 !== O && 0 !== E && (0 !== (y = _(b, v)) && (x - O - E > 0 && l[x - O - E - 1][0] == a ? l[x - O - E - 1][1] += b.substring(0, y) : (l.splice(0, 0, [a, b.substring(0, y)]),
                    x++),
                    b = b.substring(y),
                    v = v.substring(y)),
                    0 !== (y = f(b, v)) && (l[x][1] = b.substring(b.length - y) + l[x][1],
                    b = b.substring(0, b.length - y),
                    v = v.substring(0, v.length - y))),
                    0 === O ? l.splice(x - E, O + E, [r, b]) : 0 === E ? l.splice(x - O, O + E, [i, v]) : l.splice(x - O - E, O + E, [i, v], [r, b]),
                    x = x - O - E + (O ? 1 : 0) + (E ? 1 : 0) + 1) : 0 !== x && l[x - 1][0] == a ? (l[x - 1][1] += l[x][1],
                    l.splice(x, 1)) : x++,
                    E = 0,
                    O = 0,
                    v = "",
                    b = ""
                }
            "" === l[l.length - 1][1] && l.pop();
            var c = !1;
            for (x = 1; x < l.length - 1; )
                l[x - 1][0] == a && l[x + 1][0] == a && (l[x][1].substring(l[x][1].length - l[x - 1][1].length) == l[x - 1][1] ? (l[x][1] = l[x - 1][1] + l[x][1].substring(0, l[x][1].length - l[x - 1][1].length),
                l[x + 1][1] = l[x - 1][1] + l[x + 1][1],
                l.splice(x - 1, 1),
                c = !0) : l[x][1].substring(0, l[x + 1][1].length) == l[x + 1][1] && (l[x - 1][1] += l[x + 1][1],
                l[x][1] = l[x][1].substring(l[x + 1][1].length) + l[x + 1][1],
                l.splice(x + 1, 1),
                c = !0)),
                x++;
            c && e(l)
        }
        function s(l, y, x) {
            for (var O = y + x - 1; O >= 0 && O >= y - 1; O--)
                if (O + 1 < l.length) {
                    var E = l[O]
                      , v = l[O + 1];
                    E[0] === v[1] && l.splice(O, 2, [E[0], E[1] + v[1]])
                }
            return l
        }
        var i = -1
          , r = 1
          , a = 0
          , h = d;
        h.INSERT = r,
        h.DELETE = i,
        h.EQUAL = a,
        B.exports = h
    }
    , function(B, g) {
        function d(w) {
            var T = [];
            for (var k in w)
                T.push(k);
            return T
        }
        (B.exports = "function" == typeof Object.keys ? Object.keys : d).shim = d
    }
    , function(B, g) {
        function d(k) {
            return "[object Arguments]" == Object.prototype.toString.call(k)
        }
        function w(k) {
            return k && "object" == typeof k && "number" == typeof k.length && Object.prototype.hasOwnProperty.call(k, "callee") && !Object.prototype.propertyIsEnumerable.call(k, "callee") || !1
        }
        var T = "[object Arguments]" == function() {
            return Object.prototype.toString.call(arguments)
        }();
        (g = B.exports = T ? d : w).supported = d,
        g.unsupported = w
    }
    , function(B, g, d) {
        "use strict";
        function w(I) {
            return I && I.__esModule ? I : {
                default: I
            }
        }
        function _(I, m) {
            return Object.keys(m).reduce(function(A, P) {
                return null == I[P] || (m[P] === I[P] ? A[P] = m[P] : Array.isArray(m[P]) ? m[P].indexOf(I[P]) < 0 && (A[P] = m[P].concat([I[P]])) : A[P] = [m[P], I[P]]),
                A
            }, {})
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(I) {
            return typeof I
        }
        : function(I) {
            return I && "function" == typeof Symbol && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I
        }
          , e = function(m, A) {
            if (Array.isArray(m))
                return m;
            if (Symbol.iterator in Object(m))
                return function I(m, A) {
                    var P = []
                      , S = !0
                      , R = !1
                      , M = void 0;
                    try {
                        for (var j, C = m[Symbol.iterator](); !(S = (j = C.next()).done) && (P.push(j.value),
                        !A || P.length !== A); S = !0)
                            ;
                    } catch (D) {
                        R = !0,
                        M = D
                    } finally {
                        try {
                            !S && C.return && C.return()
                        } finally {
                            if (R)
                                throw M
                        }
                    }
                    return P
                }(m, A);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , t = function() {
            function I(m, A) {
                for (var P = 0; P < A.length; P++) {
                    var S = A[P];
                    S.enumerable = S.enumerable || !1,
                    S.configurable = !0,
                    "value"in S && (S.writable = !0),
                    Object.defineProperty(m, S.key, S)
                }
            }
            return function(m, A, P) {
                return A && I(m.prototype, A),
                P && I(m, P),
                m
            }
        }()
          , o = w(d(4))
          , i = w(d(20))
          , a = w(d(0))
          , l = w(d(13))
          , x = w(d(31))
          , O = d(3)
          , E = w(O)
          , b = w(d(14))
          , p = w(d(21))
          , q = w(d(12))
          , U = w(d(2))
          , z = /^[ -~]*$/
          , F = function() {
            function I(m) {
                (function k(I, m) {
                    if (!(I instanceof m))
                        throw new TypeError("Cannot call a class as a function")
                }
                )(this, I),
                this.scroll = m,
                this.delta = this.getDelta()
            }
            return t(I, [{
                key: "applyDelta",
                value: function(m) {
                    var A = this
                      , P = !1;
                    this.scroll.update();
                    var S = this.scroll.length();
                    return this.scroll.batchStart(),
                    m = function f(I) {
                        return I.reduce(function(m, A) {
                            if (1 === A.insert) {
                                var P = (0,
                                p.default)(A.attributes);
                                return delete P.image,
                                m.insert({
                                    image: A.attributes.image
                                }, P)
                            }
                            if (null == A.attributes || !0 !== A.attributes.list && !0 !== A.attributes.bullet || ((A = (0,
                            p.default)(A)).attributes.list ? A.attributes.list = "ordered" : (A.attributes.list = "bullet",
                            delete A.attributes.bullet)),
                            "string" == typeof A.insert) {
                                var S = A.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                                return m.insert(S, A.attributes)
                            }
                            return m.push(A)
                        }, new o.default)
                    }(m),
                    m.reduce(function(R, M) {
                        var j = M.retain || M.delete || M.insert.length || 1
                          , C = M.attributes || {};
                        if (null != M.insert) {
                            if ("string" == typeof M.insert) {
                                var D = M.insert;
                                D.endsWith("\n") && P && (P = !1,
                                D = D.slice(0, -1)),
                                R >= S && !D.endsWith("\n") && (P = !0),
                                A.scroll.insertAt(R, D);
                                var Z = A.scroll.line(R)
                                  , V = e(Z, 2)
                                  , X = V[0]
                                  , Q = V[1]
                                  , J = (0,
                                U.default)({}, (0,
                                O.bubbleFormats)(X));
                                if (X instanceof E.default) {
                                    var et = X.descendant(a.default.Leaf, Q)
                                      , at = e(et, 1);
                                    J = (0,
                                    U.default)(J, (0,
                                    O.bubbleFormats)(at[0]))
                                }
                                C = i.default.attributes.diff(J, C) || {}
                            } else if ("object" === u(M.insert)) {
                                var it = Object.keys(M.insert)[0];
                                if (null == it)
                                    return R;
                                A.scroll.insertAt(R, it, M.insert[it])
                            }
                            S += j
                        }
                        return Object.keys(C).forEach(function(H) {
                            A.scroll.formatAt(R, j, H, C[H])
                        }),
                        R + j
                    }, 0),
                    m.reduce(function(R, M) {
                        return "number" == typeof M.delete ? (A.scroll.deleteAt(R, M.delete),
                        R) : R + (M.retain || M.insert.length || 1)
                    }, 0),
                    this.scroll.batchEnd(),
                    this.update(m)
                }
            }, {
                key: "deleteText",
                value: function(m, A) {
                    return this.scroll.deleteAt(m, A),
                    this.update((new o.default).retain(m).delete(A))
                }
            }, {
                key: "formatLine",
                value: function(m, A) {
                    var P = this
                      , S = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.scroll.update(),
                    Object.keys(S).forEach(function(R) {
                        if (null == P.scroll.whitelist || P.scroll.whitelist[R]) {
                            var M = P.scroll.lines(m, Math.max(A, 1))
                              , j = A;
                            M.forEach(function(C) {
                                var D = C.length();
                                if (C instanceof l.default) {
                                    var Z = m - C.offset(P.scroll)
                                      , V = C.newlineIndex(Z + j) - Z + 1;
                                    C.formatAt(Z, V, R, S[R])
                                } else
                                    C.format(R, S[R]);
                                j -= D
                            })
                        }
                    }),
                    this.scroll.optimize(),
                    this.update((new o.default).retain(m).retain(A, (0,
                    p.default)(S)))
                }
            }, {
                key: "formatText",
                value: function(m, A) {
                    var P = this
                      , S = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return Object.keys(S).forEach(function(R) {
                        P.scroll.formatAt(m, A, R, S[R])
                    }),
                    this.update((new o.default).retain(m).retain(A, (0,
                    p.default)(S)))
                }
            }, {
                key: "getContents",
                value: function(m, A) {
                    return this.delta.slice(m, m + A)
                }
            }, {
                key: "getDelta",
                value: function() {
                    return this.scroll.lines().reduce(function(m, A) {
                        return m.concat(A.delta())
                    }, new o.default)
                }
            }, {
                key: "getFormat",
                value: function(m) {
                    var A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , P = []
                      , S = [];
                    0 === A ? this.scroll.path(m).forEach(function(M) {
                        var C = e(M, 1)[0];
                        C instanceof E.default ? P.push(C) : C instanceof a.default.Leaf && S.push(C)
                    }) : (P = this.scroll.lines(m, A),
                    S = this.scroll.descendants(a.default.Leaf, m, A));
                    var R = [P, S].map(function(M) {
                        if (0 === M.length)
                            return {};
                        for (var j = (0,
                        O.bubbleFormats)(M.shift()); Object.keys(j).length > 0; ) {
                            var C = M.shift();
                            if (null == C)
                                return j;
                            j = _((0,
                            O.bubbleFormats)(C), j)
                        }
                        return j
                    });
                    return U.default.apply(U.default, R)
                }
            }, {
                key: "getText",
                value: function(m, A) {
                    return this.getContents(m, A).filter(function(P) {
                        return "string" == typeof P.insert
                    }).map(function(P) {
                        return P.insert
                    }).join("")
                }
            }, {
                key: "insertEmbed",
                value: function(m, A, P) {
                    return this.scroll.insertAt(m, A, P),
                    this.update((new o.default).retain(m).insert(function T(I, m, A) {
                        return m in I ? Object.defineProperty(I, m, {
                            value: A,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : I[m] = A,
                        I
                    }({}, A, P)))
                }
            }, {
                key: "insertText",
                value: function(m, A) {
                    var P = this
                      , S = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return A = A.replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
                    this.scroll.insertAt(m, A),
                    Object.keys(S).forEach(function(R) {
                        P.scroll.formatAt(m, A.length, R, S[R])
                    }),
                    this.update((new o.default).retain(m).insert(A, (0,
                    p.default)(S)))
                }
            }, {
                key: "isBlank",
                value: function() {
                    if (0 == this.scroll.children.length)
                        return !0;
                    if (this.scroll.children.length > 1)
                        return !1;
                    var m = this.scroll.children.head;
                    return m.statics.blotName === E.default.blotName && !(m.children.length > 1) && m.children.head instanceof b.default
                }
            }, {
                key: "removeFormat",
                value: function(m, A) {
                    var P = this.getText(m, A)
                      , S = this.scroll.line(m + A)
                      , R = e(S, 2)
                      , M = R[0]
                      , j = R[1]
                      , C = 0
                      , D = new o.default;
                    null != M && (C = M instanceof l.default ? M.newlineIndex(j) - j + 1 : M.length() - j,
                    D = M.delta().slice(j, j + C - 1).insert("\n"));
                    var V = this.getContents(m, A + C).diff((new o.default).insert(P).concat(D))
                      , X = (new o.default).retain(m).concat(V);
                    return this.applyDelta(X)
                }
            }, {
                key: "update",
                value: function(m) {
                    var A = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
                      , P = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0
                      , S = this.delta;
                    if (1 === A.length && "characterData" === A[0].type && A[0].target.data.match(z) && a.default.find(A[0].target)) {
                        var R = a.default.find(A[0].target)
                          , M = (0,
                        O.bubbleFormats)(R)
                          , j = R.offset(this.scroll)
                          , C = A[0].oldValue.replace(x.default.CONTENTS, "")
                          , D = (new o.default).insert(C)
                          , Z = (new o.default).insert(R.value());
                        m = (new o.default).retain(j).concat(D.diff(Z, P)).reduce(function(V, X) {
                            return X.insert ? V.insert(X.insert, M) : V.push(X)
                        }, new o.default),
                        this.delta = S.compose(m)
                    } else
                        this.delta = this.getDelta(),
                        m && (0,
                        q.default)(S.compose(m), this.delta) || (m = S.diff(this.delta, P));
                    return m
                }
            }]),
            I
        }();
        g.default = F
    }
    , function(B, g) {
        "use strict";
        function d() {}
        function w(f, u, e) {
            this.fn = f,
            this.context = u,
            this.once = e || !1
        }
        function T() {
            this._events = new d,
            this._eventsCount = 0
        }
        var k = Object.prototype.hasOwnProperty
          , _ = "~";
        Object.create && (d.prototype = Object.create(null),
        (new d).__proto__ || (_ = !1)),
        T.prototype.eventNames = function() {
            var f, u, e = [];
            if (0 === this._eventsCount)
                return e;
            for (u in f = this._events)
                k.call(f, u) && e.push(_ ? u.slice(1) : u);
            return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(f)) : e
        }
        ,
        T.prototype.listeners = function(f, u) {
            var t = this._events[_ ? _ + f : f];
            if (u)
                return !!t;
            if (!t)
                return [];
            if (t.fn)
                return [t.fn];
            for (var n = 0, o = t.length, s = new Array(o); n < o; n++)
                s[n] = t[n].fn;
            return s
        }
        ,
        T.prototype.emit = function(f, u, e, t, n, o) {
            var s = _ ? _ + f : f;
            if (!this._events[s])
                return !1;
            var i, r, a = this._events[s], h = arguments.length;
            if (a.fn) {
                switch (a.once && this.removeListener(f, a.fn, void 0, !0),
                h) {
                case 1:
                    return a.fn.call(a.context),
                    !0;
                case 2:
                    return a.fn.call(a.context, u),
                    !0;
                case 3:
                    return a.fn.call(a.context, u, e),
                    !0;
                case 4:
                    return a.fn.call(a.context, u, e, t),
                    !0;
                case 5:
                    return a.fn.call(a.context, u, e, t, n),
                    !0;
                case 6:
                    return a.fn.call(a.context, u, e, t, n, o),
                    !0
                }
                for (r = 1,
                i = new Array(h - 1); r < h; r++)
                    i[r - 1] = arguments[r];
                a.fn.apply(a.context, i)
            } else {
                var l, y = a.length;
                for (r = 0; r < y; r++)
                    switch (a[r].once && this.removeListener(f, a[r].fn, void 0, !0),
                    h) {
                    case 1:
                        a[r].fn.call(a[r].context);
                        break;
                    case 2:
                        a[r].fn.call(a[r].context, u);
                        break;
                    case 3:
                        a[r].fn.call(a[r].context, u, e);
                        break;
                    case 4:
                        a[r].fn.call(a[r].context, u, e, t);
                        break;
                    default:
                        if (!i)
                            for (l = 1,
                            i = new Array(h - 1); l < h; l++)
                                i[l - 1] = arguments[l];
                        a[r].fn.apply(a[r].context, i)
                    }
            }
            return !0
        }
        ,
        T.prototype.on = function(f, u, e) {
            var t = new w(u,e || this)
              , n = _ ? _ + f : f;
            return this._events[n] ? this._events[n].fn ? this._events[n] = [this._events[n], t] : this._events[n].push(t) : (this._events[n] = t,
            this._eventsCount++),
            this
        }
        ,
        T.prototype.once = function(f, u, e) {
            var t = new w(u,e || this,!0)
              , n = _ ? _ + f : f;
            return this._events[n] ? this._events[n].fn ? this._events[n] = [this._events[n], t] : this._events[n].push(t) : (this._events[n] = t,
            this._eventsCount++),
            this
        }
        ,
        T.prototype.removeListener = function(f, u, e, t) {
            var n = _ ? _ + f : f;
            if (!this._events[n])
                return this;
            if (!u)
                return 0 == --this._eventsCount ? this._events = new d : delete this._events[n],
                this;
            var o = this._events[n];
            if (o.fn)
                o.fn !== u || t && !o.once || e && o.context !== e || (0 == --this._eventsCount ? this._events = new d : delete this._events[n]);
            else {
                for (var s = 0, i = [], r = o.length; s < r; s++)
                    (o[s].fn !== u || t && !o[s].once || e && o[s].context !== e) && i.push(o[s]);
                i.length ? this._events[n] = 1 === i.length ? i[0] : i : 0 == --this._eventsCount ? this._events = new d : delete this._events[n]
            }
            return this
        }
        ,
        T.prototype.removeAllListeners = function(f) {
            var u;
            return f ? this._events[u = _ ? _ + f : f] && (0 == --this._eventsCount ? this._events = new d : delete this._events[u]) : (this._events = new d,
            this._eventsCount = 0),
            this
        }
        ,
        T.prototype.off = T.prototype.removeListener,
        T.prototype.addListener = T.prototype.on,
        T.prototype.setMaxListeners = function() {
            return this
        }
        ,
        T.prefixed = _,
        T.EventEmitter = T,
        void 0 !== B && (B.exports = T)
    }
    , function(B, g, d) {
        "use strict";
        function w(b) {
            return b && b.__esModule ? b : {
                default: b
            }
        }
        function f(b) {
            return b instanceof a.default || b instanceof r.BlockEmbed
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var u = function(c, p) {
            if (Array.isArray(c))
                return c;
            if (Symbol.iterator in Object(c))
                return function b(c, p) {
                    var N = []
                      , q = !0
                      , L = !1
                      , U = void 0;
                    try {
                        for (var z, F = c[Symbol.iterator](); !(q = (z = F.next()).done) && (N.push(z.value),
                        !p || N.length !== p); q = !0)
                            ;
                    } catch (I) {
                        L = !0,
                        U = I
                    } finally {
                        try {
                            !q && F.return && F.return()
                        } finally {
                            if (L)
                                throw U
                        }
                    }
                    return N
                }(c, p);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , e = function() {
            function b(c, p) {
                for (var N = 0; N < p.length; N++) {
                    var q = p[N];
                    q.enumerable = q.enumerable || !1,
                    q.configurable = !0,
                    "value"in q && (q.writable = !0),
                    Object.defineProperty(c, q.key, q)
                }
            }
            return function(c, p, N) {
                return p && b(c.prototype, p),
                N && b(c, N),
                c
            }
        }()
          , t = function b(c, p, N) {
            null === c && (c = Function.prototype);
            var q = Object.getOwnPropertyDescriptor(c, p);
            if (void 0 === q) {
                var L = Object.getPrototypeOf(c);
                return null === L ? void 0 : b(L, p, N)
            }
            if ("value"in q)
                return q.value;
            var U = q.get;
            return void 0 !== U ? U.call(N) : void 0
        }
          , o = w(d(0))
          , i = w(d(9))
          , r = d(3)
          , a = w(r)
          , l = w(d(14))
          , x = w(d(13))
          , E = w(d(23))
          , v = function(b) {
            function c(p, N) {
                !function T(b, c) {
                    if (!(b instanceof c))
                        throw new TypeError("Cannot call a class as a function")
                }(this, c);
                var q = function k(b, c) {
                    if (!b)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !c || "object" != typeof c && "function" != typeof c ? b : c
                }(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, p));
                return q.emitter = N.emitter,
                Array.isArray(N.whitelist) && (q.whitelist = N.whitelist.reduce(function(L, U) {
                    return L[U] = !0,
                    L
                }, {})),
                q.domNode.addEventListener("DOMNodeInserted", function() {}),
                q.optimize(),
                q.enable(),
                q
            }
            return function _(b, c) {
                if ("function" != typeof c && null !== c)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof c);
                b.prototype = Object.create(c && c.prototype, {
                    constructor: {
                        value: b,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                c && (Object.setPrototypeOf ? Object.setPrototypeOf(b, c) : b.__proto__ = c)
            }(c, b),
            e(c, [{
                key: "batchStart",
                value: function() {
                    this.batch = !0
                }
            }, {
                key: "batchEnd",
                value: function() {
                    this.batch = !1,
                    this.optimize()
                }
            }, {
                key: "deleteAt",
                value: function(p, N) {
                    var q = this.line(p)
                      , L = u(q, 2)
                      , U = L[0]
                      , z = L[1]
                      , F = this.line(p + N)
                      , m = u(F, 1)[0];
                    if (t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "deleteAt", this).call(this, p, N),
                    null != m && U !== m && z > 0) {
                        if (U instanceof r.BlockEmbed || m instanceof r.BlockEmbed)
                            return void this.optimize();
                        if (U instanceof x.default) {
                            var A = U.newlineIndex(U.length(), !0);
                            if (A > -1 && (U = U.split(A + 1)) === m)
                                return void this.optimize()
                        } else if (m instanceof x.default) {
                            var P = m.newlineIndex(0);
                            P > -1 && m.split(P + 1)
                        }
                        U.moveChildren(m, m.children.head instanceof l.default ? null : m.children.head),
                        U.remove()
                    }
                    this.optimize()
                }
            }, {
                key: "enable",
                value: function() {
                    this.domNode.setAttribute("contenteditable", !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0])
                }
            }, {
                key: "formatAt",
                value: function(p, N, q, L) {
                    (null == this.whitelist || this.whitelist[q]) && (t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "formatAt", this).call(this, p, N, q, L),
                    this.optimize())
                }
            }, {
                key: "insertAt",
                value: function(p, N, q) {
                    if (null == q || null == this.whitelist || this.whitelist[N]) {
                        if (p >= this.length())
                            if (null == q || null == o.default.query(N, o.default.Scope.BLOCK)) {
                                var L = o.default.create(this.statics.defaultChild);
                                this.appendChild(L),
                                null == q && N.endsWith("\n") && (N = N.slice(0, -1)),
                                L.insertAt(0, N, q)
                            } else {
                                var U = o.default.create(N, q);
                                this.appendChild(U)
                            }
                        else
                            t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "insertAt", this).call(this, p, N, q);
                        this.optimize()
                    }
                }
            }, {
                key: "insertBefore",
                value: function(p, N) {
                    if (p.statics.scope === o.default.Scope.INLINE_BLOT) {
                        var q = o.default.create(this.statics.defaultChild);
                        q.appendChild(p),
                        p = q
                    }
                    t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "insertBefore", this).call(this, p, N)
                }
            }, {
                key: "leaf",
                value: function(p) {
                    return this.path(p).pop() || [null, -1]
                }
            }, {
                key: "line",
                value: function(p) {
                    return p === this.length() ? this.line(p - 1) : this.descendant(f, p)
                }
            }, {
                key: "lines",
                value: function() {
                    return function q(L, U, z) {
                        var F = []
                          , I = z;
                        return L.children.forEachAt(U, z, function(m, A, P) {
                            f(m) ? F.push(m) : m instanceof o.default.Container && (F = F.concat(q(m, A, I))),
                            I -= P
                        }),
                        F
                    }(this, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE)
                }
            }, {
                key: "optimize",
                value: function() {
                    var p = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                      , N = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    !0 !== this.batch && (t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "optimize", this).call(this, p, N),
                    p.length > 0 && this.emitter.emit(i.default.events.SCROLL_OPTIMIZE, p, N))
                }
            }, {
                key: "path",
                value: function(p) {
                    return t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "path", this).call(this, p).slice(1)
                }
            }, {
                key: "update",
                value: function(p) {
                    if (!0 !== this.batch) {
                        var N = i.default.sources.USER;
                        "string" == typeof p && (N = p),
                        Array.isArray(p) || (p = this.observer.takeRecords()),
                        p.length > 0 && this.emitter.emit(i.default.events.SCROLL_BEFORE_UPDATE, N, p),
                        t(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "update", this).call(this, p.concat([])),
                        p.length > 0 && this.emitter.emit(i.default.events.SCROLL_UPDATE, N, p)
                    }
                }
            }]),
            c
        }(o.default.Scroll);
        v.blotName = "scroll",
        v.className = "ql-editor",
        v.tagName = "DIV",
        v.defaultChild = "block",
        v.allowedChildren = [a.default, r.BlockEmbed, E.default],
        g.default = v
    }
    , function(B, g, d) {
        "use strict";
        function w(H) {
            return H && H.__esModule ? H : {
                default: H
            }
        }
        function T(H, K, W) {
            return K in H ? Object.defineProperty(H, K, {
                value: W,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : H[K] = W,
            H
        }
        function u(H, K, W) {
            return "object" === (void 0 === K ? "undefined" : v(K)) ? Object.keys(K).reduce(function(Y, G) {
                return u(Y, G, K[G])
            }, H) : H.reduce(function(Y, G) {
                return G.attributes && G.attributes[K] ? Y.push(G) : Y.insert(G.insert, (0,
                N.default)({}, T({}, K, W), G.attributes))
            }, new L.default)
        }
        function e(H) {
            return H.nodeType !== Node.ELEMENT_NODE ? {} : H["__ql-computed-style"] || (H["__ql-computed-style"] = window.getComputedStyle(H))
        }
        function t(H, K) {
            for (var W = "", Y = H.ops.length - 1; Y >= 0 && W.length < K.length; --Y) {
                var G = H.ops[Y];
                if ("string" != typeof G.insert)
                    break;
                W = G.insert + W
            }
            return W.slice(-1 * K.length) === K
        }
        function n(H) {
            return 0 !== H.childNodes.length && ["block", "list-item"].indexOf(e(H).display) > -1
        }
        function o(H, K, W) {
            return H.nodeType === H.TEXT_NODE ? W.reduce(function(Y, G) {
                return G(H, Y)
            }, new L.default) : H.nodeType === H.ELEMENT_NODE ? [].reduce.call(H.childNodes || [], function(Y, G) {
                var $ = o(G, K, W);
                return G.nodeType === H.ELEMENT_NODE && ($ = K.reduce(function(nt, tt) {
                    return tt(G, nt)
                }, $),
                $ = (G[J] || []).reduce(function(nt, tt) {
                    return tt(G, nt)
                }, $)),
                Y.concat($)
            }, new L.default) : new L.default
        }
        function s(H, K, W) {
            return u(W, H, !0)
        }
        function i(H, K) {
            var W = z.default.Attributor.Attribute.keys(H)
              , Y = z.default.Attributor.Class.keys(H)
              , G = z.default.Attributor.Style.keys(H)
              , $ = {};
            return W.concat(Y).concat(G).forEach(function(nt) {
                var tt = z.default.query(nt, z.default.Scope.ATTRIBUTE);
                null != tt && ($[tt.attrName] = tt.value(H),
                $[tt.attrName]) || (null == (tt = at[nt]) || tt.attrName !== nt && tt.keyName !== nt || ($[tt.attrName] = tt.value(H) || void 0),
                null == (tt = lt[nt]) || tt.attrName !== nt && tt.keyName !== nt || ($[(tt = lt[nt]).attrName] = tt.value(H) || void 0))
            }),
            Object.keys($).length > 0 && (K = u(K, $)),
            K
        }
        function r(H, K) {
            var W = z.default.query(H);
            if (null == W)
                return K;
            if (W.prototype instanceof z.default.Embed) {
                var Y = {}
                  , G = W.value(H);
                null != G && (Y[W.blotName] = G,
                K = (new L.default).insert(Y, W.formats(H)))
            } else
                "function" == typeof W.formats && (K = u(K, W.blotName, W.formats(H)));
            return K
        }
        function y(H, K) {
            return t(K, "\n") || (n(H) || K.length() > 0 && H.nextSibling && n(H.nextSibling)) && K.insert("\n"),
            K
        }
        function x(H, K) {
            if (n(H) && null != H.nextElementSibling && !t(K, "\n\n")) {
                var W = H.offsetHeight + parseFloat(e(H).marginTop) + parseFloat(e(H).marginBottom);
                H.nextElementSibling.offsetTop > H.offsetTop + 1.5 * W && K.insert("\n")
            }
            return K
        }
        function E(H, K) {
            var W = H.data;
            if ("O:P" === H.parentNode.tagName)
                return K.insert(W.trim());
            if (0 === W.trim().length && H.parentNode.classList.contains("ql-clipboard"))
                return K;
            if (!e(H.parentNode).whiteSpace.startsWith("pre")) {
                var Y = function(G, $) {
                    return ($ = $.replace(/[^\u00a0]/g, "")).length < 1 && G ? " " : $
                };
                W = (W = W.replace(/\r\n/g, " ").replace(/\n/g, " ")).replace(/\s\s+/g, Y.bind(Y, !0)),
                (null == H.previousSibling && n(H.parentNode) || null != H.previousSibling && n(H.previousSibling)) && (W = W.replace(/^\s+/, Y.bind(Y, !1))),
                (null == H.nextSibling && n(H.parentNode) || null != H.nextSibling && n(H.nextSibling)) && (W = W.replace(/\s+$/, Y.bind(Y, !1)))
            }
            return K.insert(W)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.matchText = g.matchSpacing = g.matchNewline = g.matchBlot = g.matchAttributor = g.default = void 0;
        var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(H) {
            return typeof H
        }
        : function(H) {
            return H && "function" == typeof Symbol && H.constructor === Symbol && H !== Symbol.prototype ? "symbol" : typeof H
        }
          , b = function(K, W) {
            if (Array.isArray(K))
                return K;
            if (Symbol.iterator in Object(K))
                return function H(K, W) {
                    var Y = []
                      , G = !0
                      , $ = !1
                      , nt = void 0;
                    try {
                        for (var tt, st = K[Symbol.iterator](); !(G = (tt = st.next()).done) && (Y.push(tt.value),
                        !W || Y.length !== W); G = !0)
                            ;
                    } catch (rt) {
                        $ = !0,
                        nt = rt
                    } finally {
                        try {
                            !G && st.return && st.return()
                        } finally {
                            if ($)
                                throw nt
                        }
                    }
                    return Y
                }(K, W);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , c = function() {
            function H(K, W) {
                for (var Y = 0; Y < W.length; Y++) {
                    var G = W[Y];
                    G.enumerable = G.enumerable || !1,
                    G.configurable = !0,
                    "value"in G && (G.writable = !0),
                    Object.defineProperty(K, G.key, G)
                }
            }
            return function(K, W, Y) {
                return W && H(K.prototype, W),
                Y && H(K, Y),
                K
            }
        }()
          , N = w(d(2))
          , L = w(d(4))
          , z = w(d(0))
          , I = w(d(6))
          , A = w(d(10))
          , S = w(d(7))
          , R = d(34)
          , M = d(35)
          , C = w(d(13))
          , D = d(24)
          , Z = d(36)
          , V = d(37)
          , X = d(38)
          , Q = (0,
        A.default)("quill:clipboard")
          , J = "__ql-matcher"
          , et = [[Node.TEXT_NODE, E], [Node.TEXT_NODE, y], ["br", function a(H, K) {
            return t(K, "\n") || K.insert("\n"),
            K
        }
        ], [Node.ELEMENT_NODE, y], [Node.ELEMENT_NODE, r], [Node.ELEMENT_NODE, x], [Node.ELEMENT_NODE, i], [Node.ELEMENT_NODE, function O(H, K) {
            var W = {}
              , Y = H.style || {};
            return Y.fontStyle && "italic" === e(H).fontStyle && (W.italic = !0),
            Y.fontWeight && (e(H).fontWeight.startsWith("bold") || parseInt(e(H).fontWeight) >= 700) && (W.bold = !0),
            Object.keys(W).length > 0 && (K = u(K, W)),
            parseFloat(Y.textIndent || 0) > 0 && (K = (new L.default).insert("\t").concat(K)),
            K
        }
        ], ["li", function l(H, K) {
            var W = z.default.query(H);
            if (null == W || "list-item" !== W.blotName || !t(K, "\n"))
                return K;
            for (var Y = -1, G = H.parentNode; !G.classList.contains("ql-clipboard"); )
                "list" === (z.default.query(G) || {}).blotName && (Y += 1),
                G = G.parentNode;
            return Y <= 0 ? K : K.compose((new L.default).retain(K.length() - 1).retain(1, {
                indent: Y
            }))
        }
        ], ["b", s.bind(s, "bold")], ["i", s.bind(s, "italic")], ["style", function h() {
            return new L.default
        }
        ]]
          , at = [R.AlignAttribute, Z.DirectionAttribute].reduce(function(H, K) {
            return H[K.keyName] = K,
            H
        }, {})
          , lt = [R.AlignStyle, M.BackgroundStyle, D.ColorStyle, Z.DirectionStyle, V.FontStyle, X.SizeStyle].reduce(function(H, K) {
            return H[K.keyName] = K,
            H
        }, {})
          , it = function(H) {
            function K(W, Y) {
                !function k(H, K) {
                    if (!(H instanceof K))
                        throw new TypeError("Cannot call a class as a function")
                }(this, K);
                var G = function _(H, K) {
                    if (!H)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !K || "object" != typeof K && "function" != typeof K ? H : K
                }(this, (K.__proto__ || Object.getPrototypeOf(K)).call(this, W, Y));
                return G.quill.root.addEventListener("paste", G.onPaste.bind(G)),
                G.container = G.quill.addContainer("ql-clipboard"),
                G.container.setAttribute("contenteditable", !0),
                G.container.setAttribute("tabindex", -1),
                G.matchers = [],
                et.concat(G.options.matchers).forEach(function($) {
                    var nt = b($, 2)
                      , st = nt[1];
                    (Y.matchVisual || st !== x) && G.addMatcher(nt[0], st)
                }),
                G
            }
            return function f(H, K) {
                if ("function" != typeof K && null !== K)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof K);
                H.prototype = Object.create(K && K.prototype, {
                    constructor: {
                        value: H,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                K && (Object.setPrototypeOf ? Object.setPrototypeOf(H, K) : H.__proto__ = K)
            }(K, H),
            c(K, [{
                key: "addMatcher",
                value: function(W, Y) {
                    this.matchers.push([W, Y])
                }
            }, {
                key: "convert",
                value: function(W) {
                    if ("string" == typeof W)
                        return this.container.innerHTML = W.replace(/\>\r?\n +\</g, "><"),
                        this.convert();
                    var Y = this.quill.getFormat(this.quill.selection.savedRange.index);
                    if (Y[C.default.blotName]) {
                        var G = this.container.innerText;
                        return this.container.innerHTML = "",
                        (new L.default).insert(G, T({}, C.default.blotName, Y[C.default.blotName]))
                    }
                    var $ = this.prepareMatching()
                      , nt = b($, 2)
                      , rt = o(this.container, nt[0], nt[1]);
                    return t(rt, "\n") && null == rt.ops[rt.ops.length - 1].attributes && (rt = rt.compose((new L.default).retain(rt.length() - 1).delete(1))),
                    Q.log("convert", this.container.innerHTML, rt),
                    this.container.innerHTML = "",
                    rt
                }
            }, {
                key: "dangerouslyPasteHTML",
                value: function(W, Y) {
                    var G = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : I.default.sources.API;
                    if ("string" == typeof W)
                        this.quill.setContents(this.convert(W), Y),
                        this.quill.setSelection(0, I.default.sources.SILENT);
                    else {
                        var $ = this.convert(Y);
                        this.quill.updateContents((new L.default).retain(W).concat($), G),
                        this.quill.setSelection(W + $.length(), I.default.sources.SILENT)
                    }
                }
            }, {
                key: "onPaste",
                value: function(W) {
                    var Y = this;
                    if (!W.defaultPrevented && this.quill.isEnabled()) {
                        var G = this.quill.getSelection()
                          , $ = (new L.default).retain(G.index)
                          , nt = this.quill.scrollingContainer.scrollTop;
                        this.container.focus(),
                        this.quill.selection.update(I.default.sources.SILENT),
                        setTimeout(function() {
                            $ = $.concat(Y.convert()).delete(G.length),
                            Y.quill.updateContents($, I.default.sources.USER),
                            Y.quill.setSelection($.length() - G.length, I.default.sources.SILENT),
                            Y.quill.scrollingContainer.scrollTop = nt,
                            Y.quill.focus()
                        }, 1)
                    }
                }
            }, {
                key: "prepareMatching",
                value: function() {
                    var W = this
                      , Y = []
                      , G = [];
                    return this.matchers.forEach(function($) {
                        var nt = b($, 2)
                          , tt = nt[0]
                          , st = nt[1];
                        switch (tt) {
                        case Node.TEXT_NODE:
                            G.push(st);
                            break;
                        case Node.ELEMENT_NODE:
                            Y.push(st);
                            break;
                        default:
                            [].forEach.call(W.container.querySelectorAll(tt), function(rt) {
                                rt[J] = rt[J] || [],
                                rt[J].push(st)
                            })
                        }
                    }),
                    [Y, G]
                }
            }]),
            K
        }(S.default);
        it.DEFAULTS = {
            matchers: [],
            matchVisual: !0
        },
        g.default = it,
        g.matchAttributor = i,
        g.matchBlot = r,
        g.matchNewline = y,
        g.matchSpacing = x,
        g.matchText = E
    }
    , function(B, g, d) {
        "use strict";
        function w(h) {
            return h && h.__esModule ? h : {
                default: h
            }
        }
        function u(h) {
            var l = h.reduce(function(x, O) {
                return x + (O.delete || 0)
            }, 0)
              , y = h.length() - l;
            return function f(h) {
                var l = h.ops[h.ops.length - 1];
                return null != l && (null != l.insert ? "string" == typeof l.insert && l.insert.endsWith("\n") : null != l.attributes && Object.keys(l.attributes).some(function(y) {
                    return null != n.default.query(y, n.default.Scope.BLOCK)
                }))
            }(h) && (y -= 1),
            y
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.getLastChangeIndex = g.default = void 0;
        var e = function() {
            function h(l, y) {
                for (var x = 0; x < y.length; x++) {
                    var O = y[x];
                    O.enumerable = O.enumerable || !1,
                    O.configurable = !0,
                    "value"in O && (O.writable = !0),
                    Object.defineProperty(l, O.key, O)
                }
            }
            return function(l, y, x) {
                return y && h(l.prototype, y),
                x && h(l, x),
                l
            }
        }()
          , n = w(d(0))
          , s = w(d(6))
          , a = function(h) {
            function l(y, x) {
                !function T(h, l) {
                    if (!(h instanceof l))
                        throw new TypeError("Cannot call a class as a function")
                }(this, l);
                var O = function k(h, l) {
                    if (!h)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !l || "object" != typeof l && "function" != typeof l ? h : l
                }(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, y, x));
                return O.lastRecorded = 0,
                O.ignoreChange = !1,
                O.clear(),
                O.quill.on(s.default.events.EDITOR_CHANGE, function(E, v, b, c) {
                    E !== s.default.events.TEXT_CHANGE || O.ignoreChange || (O.options.userOnly && c !== s.default.sources.USER ? O.transform(v) : O.record(v, b))
                }),
                O.quill.keyboard.addBinding({
                    key: "Z",
                    shortKey: !0
                }, O.undo.bind(O)),
                O.quill.keyboard.addBinding({
                    key: "Z",
                    shortKey: !0,
                    shiftKey: !0
                }, O.redo.bind(O)),
                /Win/i.test(navigator.platform) && O.quill.keyboard.addBinding({
                    key: "Y",
                    shortKey: !0
                }, O.redo.bind(O)),
                O
            }
            return function _(h, l) {
                if ("function" != typeof l && null !== l)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof l);
                h.prototype = Object.create(l && l.prototype, {
                    constructor: {
                        value: h,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                l && (Object.setPrototypeOf ? Object.setPrototypeOf(h, l) : h.__proto__ = l)
            }(l, h),
            e(l, [{
                key: "change",
                value: function(y, x) {
                    if (0 !== this.stack[y].length) {
                        var O = this.stack[y].pop();
                        this.stack[x].push(O),
                        this.lastRecorded = 0,
                        this.ignoreChange = !0,
                        this.quill.updateContents(O[y], s.default.sources.USER),
                        this.ignoreChange = !1;
                        var E = u(O[y]);
                        this.quill.setSelection(E)
                    }
                }
            }, {
                key: "clear",
                value: function() {
                    this.stack = {
                        undo: [],
                        redo: []
                    }
                }
            }, {
                key: "cutoff",
                value: function() {
                    this.lastRecorded = 0
                }
            }, {
                key: "record",
                value: function(y, x) {
                    if (0 !== y.ops.length) {
                        this.stack.redo = [];
                        var O = this.quill.getContents().diff(x)
                          , E = Date.now();
                        if (this.lastRecorded + this.options.delay > E && this.stack.undo.length > 0) {
                            var v = this.stack.undo.pop();
                            O = O.compose(v.undo),
                            y = v.redo.compose(y)
                        } else
                            this.lastRecorded = E;
                        this.stack.undo.push({
                            redo: y,
                            undo: O
                        }),
                        this.stack.undo.length > this.options.maxStack && this.stack.undo.shift()
                    }
                }
            }, {
                key: "redo",
                value: function() {
                    this.change("redo", "undo")
                }
            }, {
                key: "transform",
                value: function(y) {
                    this.stack.undo.forEach(function(x) {
                        x.undo = y.transform(x.undo, !0),
                        x.redo = y.transform(x.redo, !0)
                    }),
                    this.stack.redo.forEach(function(x) {
                        x.undo = y.transform(x.undo, !0),
                        x.redo = y.transform(x.redo, !0)
                    })
                }
            }, {
                key: "undo",
                value: function() {
                    this.change("undo", "redo")
                }
            }]),
            l
        }(w(d(7)).default);
        a.DEFAULTS = {
            delay: 1e3,
            maxStack: 100,
            userOnly: !1
        },
        g.default = a,
        g.getLastChangeIndex = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.IndentClass = void 0;
        var o, _ = function() {
            function o(s, i) {
                for (var r = 0; r < i.length; r++) {
                    var a = i[r];
                    a.enumerable = a.enumerable || !1,
                    a.configurable = !0,
                    "value"in a && (a.writable = !0),
                    Object.defineProperty(s, a.key, a)
                }
            }
            return function(s, i, r) {
                return i && o(s.prototype, i),
                r && o(s, r),
                s
            }
        }(), f = function o(s, i, r) {
            null === s && (s = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(s, i);
            if (void 0 === a) {
                var h = Object.getPrototypeOf(s);
                return null === h ? void 0 : o(h, i, r)
            }
            if ("value"in a)
                return a.value;
            var l = a.get;
            return void 0 !== l ? l.call(r) : void 0
        }, e = (o = d(0)) && o.__esModule ? o : {
            default: o
        }, t = function(o) {
            function s() {
                return function w(o, s) {
                    if (!(o instanceof s))
                        throw new TypeError("Cannot call a class as a function")
                }(this, s),
                function T(o, s) {
                    if (!o)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !s || "object" != typeof s && "function" != typeof s ? o : s
                }(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments))
            }
            return function k(o, s) {
                if ("function" != typeof s && null !== s)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof s);
                o.prototype = Object.create(s && s.prototype, {
                    constructor: {
                        value: o,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                s && (Object.setPrototypeOf ? Object.setPrototypeOf(o, s) : o.__proto__ = s)
            }(s, o),
            _(s, [{
                key: "add",
                value: function(i, r) {
                    if ("+1" === r || "-1" === r) {
                        var a = this.value(i) || 0;
                        r = "+1" === r ? a + 1 : a - 1
                    }
                    return 0 === r ? (this.remove(i),
                    !0) : f(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "add", this).call(this, i, r)
                }
            }, {
                key: "canAdd",
                value: function(i, r) {
                    return f(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "canAdd", this).call(this, i, r) || f(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "canAdd", this).call(this, i, parseInt(r))
                }
            }, {
                key: "value",
                value: function(i) {
                    return parseInt(f(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "value", this).call(this, i)) || void 0
                }
            }]),
            s
        }(e.default.Attributor.Class), n = new t("indent","ql-indent",{
            scope: e.default.Scope.BLOCK,
            whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
        });
        g.IndentClass = n
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var e, u = function(e) {
            function t() {
                return function w(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function T(e, t) {
                    if (!e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function k(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e),
            t
        }(((e = d(3)) && e.__esModule ? e : {
            default: e
        }).default);
        u.blotName = "blockquote",
        u.tagName = "blockquote",
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var t, _ = function() {
            function t(n, o) {
                for (var s = 0; s < o.length; s++) {
                    var i = o[s];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(n, i.key, i)
                }
            }
            return function(n, o, s) {
                return o && t(n.prototype, o),
                s && t(n, s),
                n
            }
        }(), e = function(t) {
            function n() {
                return function w(t, n) {
                    if (!(t instanceof n))
                        throw new TypeError("Cannot call a class as a function")
                }(this, n),
                function T(t, n) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !n || "object" != typeof n && "function" != typeof n ? t : n
                }(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments))
            }
            return function k(t, n) {
                if ("function" != typeof n && null !== n)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof n);
                t.prototype = Object.create(n && n.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
            }(n, t),
            _(n, null, [{
                key: "formats",
                value: function(o) {
                    return this.tagName.indexOf(o.tagName) + 1
                }
            }]),
            n
        }(((t = d(3)) && t.__esModule ? t : {
            default: t
        }).default);
        e.blotName = "header",
        e.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"],
        g.default = e
    }
    , function(B, g, d) {
        "use strict";
        function w(l) {
            return l && l.__esModule ? l : {
                default: l
            }
        }
        function k(l, y) {
            if (!(l instanceof y))
                throw new TypeError("Cannot call a class as a function")
        }
        function _(l, y) {
            if (!l)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !y || "object" != typeof y && "function" != typeof y ? l : y
        }
        function f(l, y) {
            if ("function" != typeof y && null !== y)
                throw new TypeError("Super expression must either be null or a function, not " + typeof y);
            l.prototype = Object.create(y && y.prototype, {
                constructor: {
                    value: l,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            y && (Object.setPrototypeOf ? Object.setPrototypeOf(l, y) : l.__proto__ = y)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.ListItem = void 0;
        var u = function() {
            function l(y, x) {
                for (var O = 0; O < x.length; O++) {
                    var E = x[O];
                    E.enumerable = E.enumerable || !1,
                    E.configurable = !0,
                    "value"in E && (E.writable = !0),
                    Object.defineProperty(y, E.key, E)
                }
            }
            return function(y, x, O) {
                return x && l(y.prototype, x),
                O && l(y, O),
                y
            }
        }()
          , e = function l(y, x, O) {
            null === y && (y = Function.prototype);
            var E = Object.getOwnPropertyDescriptor(y, x);
            if (void 0 === E) {
                var v = Object.getPrototypeOf(y);
                return null === v ? void 0 : l(v, x, O)
            }
            if ("value"in E)
                return E.value;
            var b = E.get;
            return void 0 !== b ? b.call(O) : void 0
        }
          , n = w(d(0))
          , s = w(d(3))
          , r = w(d(23))
          , a = function(l) {
            function y() {
                return k(this, y),
                _(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments))
            }
            return f(y, l),
            u(y, [{
                key: "format",
                value: function(x, O) {
                    x !== h.blotName || O ? e(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "format", this).call(this, x, O) : this.replaceWith(n.default.create(this.statics.scope))
                }
            }, {
                key: "remove",
                value: function() {
                    null == this.prev && null == this.next ? this.parent.remove() : e(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "remove", this).call(this)
                }
            }, {
                key: "replaceWith",
                value: function(x, O) {
                    return this.parent.isolate(this.offset(this.parent), this.length()),
                    x === this.parent.statics.blotName ? (this.parent.replaceWith(x, O),
                    this) : (this.parent.unwrap(),
                    e(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "replaceWith", this).call(this, x, O))
                }
            }], [{
                key: "formats",
                value: function(x) {
                    return x.tagName === this.tagName ? void 0 : e(y.__proto__ || Object.getPrototypeOf(y), "formats", this).call(this, x)
                }
            }]),
            y
        }(s.default);
        a.blotName = "list-item",
        a.tagName = "LI";
        var h = function(l) {
            function y(x) {
                k(this, y);
                var O = _(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this, x))
                  , E = function(v) {
                    if (v.target.parentNode === x) {
                        var b = O.statics.formats(x)
                          , c = n.default.find(v.target);
                        "checked" === b ? c.format("list", "unchecked") : "unchecked" === b && c.format("list", "checked")
                    }
                };
                return x.addEventListener("touchstart", E),
                x.addEventListener("mousedown", E),
                O
            }
            return f(y, l),
            u(y, null, [{
                key: "create",
                value: function(x) {
                    var O = "ordered" === x ? "OL" : "UL"
                      , E = e(y.__proto__ || Object.getPrototypeOf(y), "create", this).call(this, O);
                    return "checked" !== x && "unchecked" !== x || E.setAttribute("data-checked", "checked" === x),
                    E
                }
            }, {
                key: "formats",
                value: function(x) {
                    return "OL" === x.tagName ? "ordered" : "UL" === x.tagName ? x.hasAttribute("data-checked") ? "true" === x.getAttribute("data-checked") ? "checked" : "unchecked" : "bullet" : void 0
                }
            }]),
            u(y, [{
                key: "format",
                value: function(x, O) {
                    this.children.length > 0 && this.children.tail.format(x, O)
                }
            }, {
                key: "formats",
                value: function() {
                    return function T(l, y, x) {
                        return y in l ? Object.defineProperty(l, y, {
                            value: x,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : l[y] = x,
                        l
                    }({}, this.statics.blotName, this.statics.formats(this.domNode))
                }
            }, {
                key: "insertBefore",
                value: function(x, O) {
                    if (x instanceof a)
                        e(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "insertBefore", this).call(this, x, O);
                    else {
                        var E = null == O ? this.length() : O.offset(this)
                          , v = this.split(E);
                        v.parent.insertBefore(x, v)
                    }
                }
            }, {
                key: "optimize",
                value: function(x) {
                    e(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "optimize", this).call(this, x);
                    var O = this.next;
                    null != O && O.prev === this && O.statics.blotName === this.statics.blotName && O.domNode.tagName === this.domNode.tagName && O.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (O.moveChildren(this),
                    O.remove())
                }
            }, {
                key: "replace",
                value: function(x) {
                    if (x.statics.blotName !== this.statics.blotName) {
                        var O = n.default.create(this.statics.defaultChild);
                        x.moveChildren(O),
                        this.appendChild(O)
                    }
                    e(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "replace", this).call(this, x)
                }
            }]),
            y
        }(r.default);
        h.blotName = "list",
        h.scope = n.default.Scope.BLOCK_BLOT,
        h.tagName = ["OL", "UL"],
        h.defaultChild = "list-item",
        h.allowedChildren = [a],
        g.ListItem = a,
        g.default = h
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var e, u = function(e) {
            function t() {
                return function w(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function T(e, t) {
                    if (!e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function k(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e),
            t
        }(((e = d(39)) && e.__esModule ? e : {
            default: e
        }).default);
        u.blotName = "italic",
        u.tagName = ["EM", "I"],
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var n, _ = function() {
            function n(o, s) {
                for (var i = 0; i < s.length; i++) {
                    var r = s[i];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(o, r.key, r)
                }
            }
            return function(o, s, i) {
                return s && n(o.prototype, s),
                i && n(o, i),
                o
            }
        }(), f = function n(o, s, i) {
            null === o && (o = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(o, s);
            if (void 0 === r) {
                var a = Object.getPrototypeOf(o);
                return null === a ? void 0 : n(a, s, i)
            }
            if ("value"in r)
                return r.value;
            var h = r.get;
            return void 0 !== h ? h.call(i) : void 0
        }, t = function(n) {
            function o() {
                return function w(n, o) {
                    if (!(n instanceof o))
                        throw new TypeError("Cannot call a class as a function")
                }(this, o),
                function T(n, o) {
                    if (!n)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !o || "object" != typeof o && "function" != typeof o ? n : o
                }(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
            }
            return function k(n, o) {
                if ("function" != typeof o && null !== o)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof o);
                n.prototype = Object.create(o && o.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                o && (Object.setPrototypeOf ? Object.setPrototypeOf(n, o) : n.__proto__ = o)
            }(o, n),
            _(o, null, [{
                key: "create",
                value: function(s) {
                    return "super" === s ? document.createElement("sup") : "sub" === s ? document.createElement("sub") : f(o.__proto__ || Object.getPrototypeOf(o), "create", this).call(this, s)
                }
            }, {
                key: "formats",
                value: function(s) {
                    return "SUB" === s.tagName ? "sub" : "SUP" === s.tagName ? "super" : void 0
                }
            }]),
            o
        }(((n = d(5)) && n.__esModule ? n : {
            default: n
        }).default);
        t.blotName = "script",
        t.tagName = ["SUB", "SUP"],
        g.default = t
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var e, u = function(e) {
            function t() {
                return function w(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function T(e, t) {
                    if (!e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function k(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e),
            t
        }(((e = d(5)) && e.__esModule ? e : {
            default: e
        }).default);
        u.blotName = "strike",
        u.tagName = "S",
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var e, u = function(e) {
            function t() {
                return function w(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function T(e, t) {
                    if (!e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function k(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e),
            t
        }(((e = d(5)) && e.__esModule ? e : {
            default: e
        }).default);
        u.blotName = "underline",
        u.tagName = "U",
        g.default = u
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var s, _ = function() {
            function s(i, r) {
                for (var a = 0; a < r.length; a++) {
                    var h = r[a];
                    h.enumerable = h.enumerable || !1,
                    h.configurable = !0,
                    "value"in h && (h.writable = !0),
                    Object.defineProperty(i, h.key, h)
                }
            }
            return function(i, r, a) {
                return r && s(i.prototype, r),
                a && s(i, a),
                i
            }
        }(), f = function s(i, r, a) {
            null === i && (i = Function.prototype);
            var h = Object.getOwnPropertyDescriptor(i, r);
            if (void 0 === h) {
                var l = Object.getPrototypeOf(i);
                return null === l ? void 0 : s(l, r, a)
            }
            if ("value"in h)
                return h.value;
            var y = h.get;
            return void 0 !== y ? y.call(a) : void 0
        }, e = (s = d(0)) && s.__esModule ? s : {
            default: s
        }, t = d(15), n = ["alt", "height", "width"], o = function(s) {
            function i() {
                return function w(s, i) {
                    if (!(s instanceof i))
                        throw new TypeError("Cannot call a class as a function")
                }(this, i),
                function T(s, i) {
                    if (!s)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !i || "object" != typeof i && "function" != typeof i ? s : i
                }(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments))
            }
            return function k(s, i) {
                if ("function" != typeof i && null !== i)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof i);
                s.prototype = Object.create(i && i.prototype, {
                    constructor: {
                        value: s,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                i && (Object.setPrototypeOf ? Object.setPrototypeOf(s, i) : s.__proto__ = i)
            }(i, s),
            _(i, [{
                key: "format",
                value: function(r, a) {
                    n.indexOf(r) > -1 ? a ? this.domNode.setAttribute(r, a) : this.domNode.removeAttribute(r) : f(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "format", this).call(this, r, a)
                }
            }], [{
                key: "create",
                value: function(r) {
                    var a = f(i.__proto__ || Object.getPrototypeOf(i), "create", this).call(this, r);
                    return "string" == typeof r && a.setAttribute("src", this.sanitize(r)),
                    a
                }
            }, {
                key: "formats",
                value: function(r) {
                    return n.reduce(function(a, h) {
                        return r.hasAttribute(h) && (a[h] = r.getAttribute(h)),
                        a
                    }, {})
                }
            }, {
                key: "match",
                value: function(r) {
                    return /\.(jpe?g|gif|png)$/.test(r) || /^data:image\/.+;base64/.test(r)
                }
            }, {
                key: "sanitize",
                value: function(r) {
                    return (0,
                    t.sanitize)(r, ["http", "https", "data"]) ? r : "//:0"
                }
            }, {
                key: "value",
                value: function(r) {
                    return r.getAttribute("src")
                }
            }]),
            i
        }(e.default.Embed);
        o.blotName = "image",
        o.tagName = "IMG",
        g.default = o
    }
    , function(B, g, d) {
        "use strict";
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var s, _ = function() {
            function s(i, r) {
                for (var a = 0; a < r.length; a++) {
                    var h = r[a];
                    h.enumerable = h.enumerable || !1,
                    h.configurable = !0,
                    "value"in h && (h.writable = !0),
                    Object.defineProperty(i, h.key, h)
                }
            }
            return function(i, r, a) {
                return r && s(i.prototype, r),
                a && s(i, a),
                i
            }
        }(), f = function s(i, r, a) {
            null === i && (i = Function.prototype);
            var h = Object.getOwnPropertyDescriptor(i, r);
            if (void 0 === h) {
                var l = Object.getPrototypeOf(i);
                return null === l ? void 0 : s(l, r, a)
            }
            if ("value"in h)
                return h.value;
            var y = h.get;
            return void 0 !== y ? y.call(a) : void 0
        }, u = d(3), t = (s = d(15)) && s.__esModule ? s : {
            default: s
        }, n = ["height", "width"], o = function(s) {
            function i() {
                return function w(s, i) {
                    if (!(s instanceof i))
                        throw new TypeError("Cannot call a class as a function")
                }(this, i),
                function T(s, i) {
                    if (!s)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !i || "object" != typeof i && "function" != typeof i ? s : i
                }(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments))
            }
            return function k(s, i) {
                if ("function" != typeof i && null !== i)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof i);
                s.prototype = Object.create(i && i.prototype, {
                    constructor: {
                        value: s,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                i && (Object.setPrototypeOf ? Object.setPrototypeOf(s, i) : s.__proto__ = i)
            }(i, s),
            _(i, [{
                key: "format",
                value: function(r, a) {
                    n.indexOf(r) > -1 ? a ? this.domNode.setAttribute(r, a) : this.domNode.removeAttribute(r) : f(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "format", this).call(this, r, a)
                }
            }], [{
                key: "create",
                value: function(r) {
                    var a = f(i.__proto__ || Object.getPrototypeOf(i), "create", this).call(this, r);
                    return a.setAttribute("frameborder", "0"),
                    a.setAttribute("allowfullscreen", !0),
                    a.setAttribute("src", this.sanitize(r)),
                    a
                }
            }, {
                key: "formats",
                value: function(r) {
                    return n.reduce(function(a, h) {
                        return r.hasAttribute(h) && (a[h] = r.getAttribute(h)),
                        a
                    }, {})
                }
            }, {
                key: "sanitize",
                value: function(r) {
                    return t.default.sanitize(r)
                }
            }, {
                key: "value",
                value: function(r) {
                    return r.getAttribute("src")
                }
            }]),
            i
        }(u.BlockEmbed);
        o.blotName = "video",
        o.className = "ql-video",
        o.tagName = "IFRAME",
        g.default = o
    }
    , function(B, g, d) {
        "use strict";
        function w(h) {
            return h && h.__esModule ? h : {
                default: h
            }
        }
        function T(h, l) {
            if (!(h instanceof l))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(h, l) {
            if (!h)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !l || "object" != typeof l && "function" != typeof l ? h : l
        }
        function _(h, l) {
            if ("function" != typeof l && null !== l)
                throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            h.prototype = Object.create(l && l.prototype, {
                constructor: {
                    value: h,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            l && (Object.setPrototypeOf ? Object.setPrototypeOf(h, l) : h.__proto__ = l)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.FormulaBlot = void 0;
        var f = function() {
            function h(l, y) {
                for (var x = 0; x < y.length; x++) {
                    var O = y[x];
                    O.enumerable = O.enumerable || !1,
                    O.configurable = !0,
                    "value"in O && (O.writable = !0),
                    Object.defineProperty(l, O.key, O)
                }
            }
            return function(l, y, x) {
                return y && h(l.prototype, y),
                x && h(l, x),
                l
            }
        }()
          , u = function h(l, y, x) {
            null === l && (l = Function.prototype);
            var O = Object.getOwnPropertyDescriptor(l, y);
            if (void 0 === O) {
                var E = Object.getPrototypeOf(l);
                return null === E ? void 0 : h(E, y, x)
            }
            if ("value"in O)
                return O.value;
            var v = O.get;
            return void 0 !== v ? v.call(x) : void 0
        }
          , t = w(d(33))
          , o = w(d(6))
          , i = w(d(7))
          , r = function(h) {
            function l() {
                return T(this, l),
                k(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments))
            }
            return _(l, h),
            f(l, null, [{
                key: "create",
                value: function(y) {
                    var x = u(l.__proto__ || Object.getPrototypeOf(l), "create", this).call(this, y);
                    return "string" == typeof y && (window.katex.render(y, x, {
                        throwOnError: !1,
                        errorColor: "#f00"
                    }),
                    x.setAttribute("data-value", y)),
                    x
                }
            }, {
                key: "value",
                value: function(y) {
                    return y.getAttribute("data-value")
                }
            }]),
            l
        }(t.default);
        r.blotName = "formula",
        r.className = "ql-formula",
        r.tagName = "SPAN";
        var a = function(h) {
            function l() {
                T(this, l);
                var y = k(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this));
                if (null == window.katex)
                    throw new Error("Formula module requires KaTeX.");
                return y
            }
            return _(l, h),
            f(l, null, [{
                key: "register",
                value: function() {
                    o.default.register(r, !0)
                }
            }]),
            l
        }(i.default);
        g.FormulaBlot = r,
        g.default = a
    }
    , function(B, g, d) {
        "use strict";
        function w(x) {
            return x && x.__esModule ? x : {
                default: x
            }
        }
        function T(x, O) {
            if (!(x instanceof O))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(x, O) {
            if (!x)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !O || "object" != typeof O && "function" != typeof O ? x : O
        }
        function _(x, O) {
            if ("function" != typeof O && null !== O)
                throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            x.prototype = Object.create(O && O.prototype, {
                constructor: {
                    value: x,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            O && (Object.setPrototypeOf ? Object.setPrototypeOf(x, O) : x.__proto__ = O)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.CodeToken = g.CodeBlock = void 0;
        var f = function() {
            function x(O, E) {
                for (var v = 0; v < E.length; v++) {
                    var b = E[v];
                    b.enumerable = b.enumerable || !1,
                    b.configurable = !0,
                    "value"in b && (b.writable = !0),
                    Object.defineProperty(O, b.key, b)
                }
            }
            return function(O, E, v) {
                return E && x(O.prototype, E),
                v && x(O, v),
                O
            }
        }()
          , u = function x(O, E, v) {
            null === O && (O = Function.prototype);
            var b = Object.getOwnPropertyDescriptor(O, E);
            if (void 0 === b) {
                var c = Object.getPrototypeOf(O);
                return null === c ? void 0 : x(c, E, v)
            }
            if ("value"in b)
                return b.value;
            var p = b.get;
            return void 0 !== p ? p.call(v) : void 0
        }
          , t = w(d(0))
          , o = w(d(6))
          , i = w(d(7))
          , h = function(x) {
            function O() {
                return T(this, O),
                k(this, (O.__proto__ || Object.getPrototypeOf(O)).apply(this, arguments))
            }
            return _(O, x),
            f(O, [{
                key: "replaceWith",
                value: function(E) {
                    this.domNode.textContent = this.domNode.textContent,
                    this.attach(),
                    u(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "replaceWith", this).call(this, E)
                }
            }, {
                key: "highlight",
                value: function(E) {
                    var v = this.domNode.textContent;
                    this.cachedText !== v && ((v.trim().length > 0 || null == this.cachedText) && (this.domNode.innerHTML = E(v),
                    this.domNode.normalize(),
                    this.attach()),
                    this.cachedText = v)
                }
            }]),
            O
        }(w(d(13)).default);
        h.className = "ql-syntax";
        var l = new t.default.Attributor.Class("token","hljs",{
            scope: t.default.Scope.INLINE
        })
          , y = function(x) {
            function O(E, v) {
                T(this, O);
                var b = k(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, E, v));
                if ("function" != typeof b.options.highlight)
                    throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
                var c = null;
                return b.quill.on(o.default.events.SCROLL_OPTIMIZE, function() {
                    clearTimeout(c),
                    c = setTimeout(function() {
                        b.highlight(),
                        c = null
                    }, b.options.interval)
                }),
                b.highlight(),
                b
            }
            return _(O, x),
            f(O, null, [{
                key: "register",
                value: function() {
                    o.default.register(l, !0),
                    o.default.register(h, !0)
                }
            }]),
            f(O, [{
                key: "highlight",
                value: function() {
                    var E = this;
                    if (!this.quill.selection.composing) {
                        this.quill.update(o.default.sources.USER);
                        var v = this.quill.getSelection();
                        this.quill.scroll.descendants(h).forEach(function(b) {
                            b.highlight(E.options.highlight)
                        }),
                        this.quill.update(o.default.sources.SILENT),
                        null != v && this.quill.setSelection(v, o.default.sources.SILENT)
                    }
                }
            }]),
            O
        }(i.default);
        y.DEFAULTS = {
            highlight: null == window.hljs ? null : function(x) {
                return window.hljs.highlightAuto(x).value
            }
            ,
            interval: 1e3
        },
        g.CodeBlock = h,
        g.CodeToken = l,
        g.default = y
    }
    , function(B, g, d) {
        "use strict";
        function w(c) {
            return c && c.__esModule ? c : {
                default: c
            }
        }
        function _(c, p) {
            if (!c)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !p || "object" != typeof p && "function" != typeof p ? c : p
        }
        function u(c, p, N) {
            var q = document.createElement("button");
            q.setAttribute("type", "button"),
            q.classList.add("ql-" + p),
            null != N && (q.value = N),
            c.appendChild(q)
        }
        function e(c, p) {
            Array.isArray(p[0]) || (p = [p]),
            p.forEach(function(N) {
                var q = document.createElement("span");
                q.classList.add("ql-formats"),
                N.forEach(function(L) {
                    if ("string" == typeof L)
                        u(q, L);
                    else {
                        var U = Object.keys(L)[0]
                          , z = L[U];
                        Array.isArray(z) ? function t(c, p, N) {
                            var q = document.createElement("select");
                            q.classList.add("ql-" + p),
                            N.forEach(function(L) {
                                var U = document.createElement("option");
                                !1 !== L ? U.setAttribute("value", L) : U.setAttribute("selected", "selected"),
                                q.appendChild(U)
                            }),
                            c.appendChild(q)
                        }(q, U, z) : u(q, U, z)
                    }
                }),
                c.appendChild(q)
            })
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.addControls = g.default = void 0;
        var n = function(p, N) {
            if (Array.isArray(p))
                return p;
            if (Symbol.iterator in Object(p))
                return function c(p, N) {
                    var q = []
                      , L = !0
                      , U = !1
                      , z = void 0;
                    try {
                        for (var F, I = p[Symbol.iterator](); !(L = (F = I.next()).done) && (q.push(F.value),
                        !N || q.length !== N); L = !0)
                            ;
                    } catch (m) {
                        U = !0,
                        z = m
                    } finally {
                        try {
                            !L && I.return && I.return()
                        } finally {
                            if (U)
                                throw z
                        }
                    }
                    return q
                }(p, N);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
          , o = function() {
            function c(p, N) {
                for (var q = 0; q < N.length; q++) {
                    var L = N[q];
                    L.enumerable = L.enumerable || !1,
                    L.configurable = !0,
                    "value"in L && (L.writable = !0),
                    Object.defineProperty(p, L.key, L)
                }
            }
            return function(p, N, q) {
                return N && c(p.prototype, N),
                q && c(p, q),
                p
            }
        }()
          , i = w(d(4))
          , a = w(d(0))
          , l = w(d(6))
          , x = w(d(10))
          , E = w(d(7))
          , v = (0,
        x.default)("quill:toolbar")
          , b = function(c) {
            function p(N, q) {
                !function k(c, p) {
                    if (!(c instanceof p))
                        throw new TypeError("Cannot call a class as a function")
                }(this, p);
                var z, L = _(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, N, q));
                if (Array.isArray(L.options.container)) {
                    var U = document.createElement("div");
                    e(U, L.options.container),
                    N.container.parentNode.insertBefore(U, N.container),
                    L.container = U
                } else
                    L.container = "string" == typeof L.options.container ? document.querySelector(L.options.container) : L.options.container;
                return L.container instanceof HTMLElement ? (L.container.classList.add("ql-toolbar"),
                L.controls = [],
                L.handlers = {},
                Object.keys(L.options.handlers).forEach(function(F) {
                    L.addHandler(F, L.options.handlers[F])
                }),
                [].forEach.call(L.container.querySelectorAll("button, select"), function(F) {
                    L.attach(F)
                }),
                L.quill.on(l.default.events.EDITOR_CHANGE, function(F, I) {
                    F === l.default.events.SELECTION_CHANGE && L.update(I)
                }),
                L.quill.on(l.default.events.SCROLL_OPTIMIZE, function() {
                    var F = L.quill.selection.getRange()
                      , I = n(F, 1);
                    L.update(I[0])
                }),
                L) : (z = v.error("Container required for toolbar", L.options),
                _(L, z))
            }
            return function f(c, p) {
                if ("function" != typeof p && null !== p)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof p);
                c.prototype = Object.create(p && p.prototype, {
                    constructor: {
                        value: c,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                p && (Object.setPrototypeOf ? Object.setPrototypeOf(c, p) : c.__proto__ = p)
            }(p, c),
            o(p, [{
                key: "addHandler",
                value: function(N, q) {
                    this.handlers[N] = q
                }
            }, {
                key: "attach",
                value: function(N) {
                    var q = this
                      , L = [].find.call(N.classList, function(z) {
                        return 0 === z.indexOf("ql-")
                    });
                    if (L) {
                        if (L = L.slice(3),
                        "BUTTON" === N.tagName && N.setAttribute("type", "button"),
                        null == this.handlers[L]) {
                            if (null != this.quill.scroll.whitelist && null == this.quill.scroll.whitelist[L])
                                return void v.warn("ignoring attaching to disabled format", L, N);
                            if (null == a.default.query(L))
                                return void v.warn("ignoring attaching to nonexistent format", L, N)
                        }
                        N.addEventListener("SELECT" === N.tagName ? "change" : "click", function(z) {
                            var F = void 0;
                            if ("SELECT" === N.tagName) {
                                if (N.selectedIndex < 0)
                                    return;
                                var I = N.options[N.selectedIndex];
                                F = !I.hasAttribute("selected") && (I.value || !1)
                            } else
                                F = !N.classList.contains("ql-active") && (N.value || !N.hasAttribute("value")),
                                z.preventDefault();
                            q.quill.focus();
                            var m = q.quill.selection.getRange()
                              , P = n(m, 1)[0];
                            if (null != q.handlers[L])
                                q.handlers[L].call(q, F);
                            else if (a.default.query(L).prototype instanceof a.default.Embed) {
                                if (!(F = prompt("Enter " + L)))
                                    return;
                                q.quill.updateContents((new i.default).retain(P.index).delete(P.length).insert(function T(c, p, N) {
                                    return p in c ? Object.defineProperty(c, p, {
                                        value: N,
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0
                                    }) : c[p] = N,
                                    c
                                }({}, L, F)), l.default.sources.USER)
                            } else
                                q.quill.format(L, F, l.default.sources.USER);
                            q.update(P)
                        }),
                        this.controls.push([L, N])
                    }
                }
            }, {
                key: "update",
                value: function(N) {
                    var q = null == N ? {} : this.quill.getFormat(N);
                    this.controls.forEach(function(L) {
                        var U = n(L, 2)
                          , z = U[0]
                          , F = U[1];
                        if ("SELECT" === F.tagName) {
                            var I = void 0;
                            if (null == N)
                                I = null;
                            else if (null == q[z])
                                I = F.querySelector("option[selected]");
                            else if (!Array.isArray(q[z])) {
                                var m = q[z];
                                "string" == typeof m && (m = m.replace(/\"/g, '\\"')),
                                I = F.querySelector('option[value="' + m + '"]')
                            }
                            null == I ? (F.value = "",
                            F.selectedIndex = -1) : I.selected = !0
                        } else if (null == N)
                            F.classList.remove("ql-active");
                        else if (F.hasAttribute("value")) {
                            var A = q[z] === F.getAttribute("value") || null != q[z] && q[z].toString() === F.getAttribute("value") || null == q[z] && !F.getAttribute("value");
                            F.classList.toggle("ql-active", A)
                        } else
                            F.classList.toggle("ql-active", null != q[z])
                    })
                }
            }]),
            p
        }(E.default);
        b.DEFAULTS = {},
        b.DEFAULTS = {
            container: null,
            handlers: {
                clean: function() {
                    var c = this
                      , p = this.quill.getSelection();
                    if (null != p)
                        if (0 == p.length) {
                            var N = this.quill.getFormat();
                            Object.keys(N).forEach(function(q) {
                                null != a.default.query(q, a.default.Scope.INLINE) && c.quill.format(q, !1)
                            })
                        } else
                            this.quill.removeFormat(p, l.default.sources.USER)
                },
                direction: function(c) {
                    var p = this.quill.getFormat().align;
                    "rtl" === c && null == p ? this.quill.format("align", "right", l.default.sources.USER) : c || "right" !== p || this.quill.format("align", !1, l.default.sources.USER),
                    this.quill.format("direction", c, l.default.sources.USER)
                },
                indent: function(c) {
                    var p = this.quill.getSelection()
                      , N = this.quill.getFormat(p)
                      , q = parseInt(N.indent || 0);
                    if ("+1" === c || "-1" === c) {
                        var L = "+1" === c ? 1 : -1;
                        "rtl" === N.direction && (L *= -1),
                        this.quill.format("indent", q + L, l.default.sources.USER)
                    }
                },
                link: function(c) {
                    !0 === c && (c = prompt("Enter link URL:")),
                    this.quill.format("link", c, l.default.sources.USER)
                },
                list: function(c) {
                    var p = this.quill.getSelection()
                      , N = this.quill.getFormat(p);
                    this.quill.format("list", "check" === c ? "checked" !== N.list && "unchecked" !== N.list && "unchecked" : c, l.default.sources.USER)
                }
            }
        },
        g.default = b,
        g.addControls = e
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>'
    }
    , function(B, g) {
        B.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>'
    }
    , function(B, g, d) {
        "use strict";
        function w(O) {
            return O && O.__esModule ? O : {
                default: O
            }
        }
        function T(O, E) {
            if (!(O instanceof E))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(O, E) {
            if (!O)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !E || "object" != typeof E && "function" != typeof E ? O : E
        }
        function _(O, E) {
            if ("function" != typeof E && null !== E)
                throw new TypeError("Super expression must either be null or a function, not " + typeof E);
            O.prototype = Object.create(E && E.prototype, {
                constructor: {
                    value: O,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            E && (Object.setPrototypeOf ? Object.setPrototypeOf(O, E) : O.__proto__ = E)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        }),
        g.default = g.BubbleTooltip = void 0;
        var f = function O(E, v, b) {
            null === E && (E = Function.prototype);
            var c = Object.getOwnPropertyDescriptor(E, v);
            if (void 0 === c) {
                var p = Object.getPrototypeOf(E);
                return null === p ? void 0 : O(p, v, b)
            }
            if ("value"in c)
                return c.value;
            var N = c.get;
            return void 0 !== N ? N.call(b) : void 0
        }
          , u = function() {
            function O(E, v) {
                for (var b = 0; b < v.length; b++) {
                    var c = v[b];
                    c.enumerable = c.enumerable || !1,
                    c.configurable = !0,
                    "value"in c && (c.writable = !0),
                    Object.defineProperty(E, c.key, c)
                }
            }
            return function(E, v, b) {
                return v && O(E.prototype, v),
                b && O(E, b),
                E
            }
        }()
          , t = w(d(2))
          , o = w(d(9))
          , s = d(44)
          , i = w(s)
          , r = d(22)
          , h = w(d(26))
          , l = [["bold", "italic", "link"], [{
            header: 1
        }, {
            header: 2
        }, "blockquote"]]
          , y = function(O) {
            function E(v, b) {
                T(this, E),
                null != b.modules.toolbar && null == b.modules.toolbar.container && (b.modules.toolbar.container = l);
                var c = k(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, v, b));
                return c.quill.container.classList.add("ql-bubble"),
                c
            }
            return _(E, O),
            u(E, [{
                key: "extendToolbar",
                value: function(v) {
                    this.tooltip = new x(this.quill,this.options.bounds),
                    this.tooltip.root.appendChild(v.container),
                    this.buildButtons([].slice.call(v.container.querySelectorAll("button")), h.default),
                    this.buildPickers([].slice.call(v.container.querySelectorAll("select")), h.default)
                }
            }]),
            E
        }(i.default);
        y.DEFAULTS = (0,
        t.default)(!0, {}, i.default.DEFAULTS, {
            modules: {
                toolbar: {
                    handlers: {
                        link: function(O) {
                            O ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1)
                        }
                    }
                }
            }
        });
        var x = function(O) {
            function E(v, b) {
                T(this, E);
                var c = k(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, v, b));
                return c.quill.on(o.default.events.EDITOR_CHANGE, function(p, N, q, L) {
                    if (p === o.default.events.SELECTION_CHANGE)
                        if (null != N && N.length > 0 && L === o.default.sources.USER) {
                            c.show(),
                            c.root.style.left = "0px",
                            c.root.style.width = "",
                            c.root.style.width = c.root.offsetWidth + "px";
                            var U = c.quill.getLines(N.index, N.length);
                            if (1 === U.length)
                                c.position(c.quill.getBounds(N));
                            else {
                                var z = U[U.length - 1]
                                  , F = c.quill.getIndex(z)
                                  , I = Math.min(z.length() - 1, N.index + N.length - F)
                                  , m = c.quill.getBounds(new r.Range(F,I));
                                c.position(m)
                            }
                        } else
                            document.activeElement !== c.textbox && c.quill.hasFocus() && c.hide()
                }),
                c
            }
            return _(E, O),
            u(E, [{
                key: "listen",
                value: function() {
                    var v = this;
                    f(E.prototype.__proto__ || Object.getPrototypeOf(E.prototype), "listen", this).call(this),
                    this.root.querySelector(".ql-close").addEventListener("click", function() {
                        v.root.classList.remove("ql-editing")
                    }),
                    this.quill.on(o.default.events.SCROLL_OPTIMIZE, function() {
                        setTimeout(function() {
                            if (!v.root.classList.contains("ql-hidden")) {
                                var b = v.quill.getSelection();
                                null != b && v.position(v.quill.getBounds(b))
                            }
                        }, 1)
                    })
                }
            }, {
                key: "cancel",
                value: function() {
                    this.show()
                }
            }, {
                key: "position",
                value: function(v) {
                    var b = f(E.prototype.__proto__ || Object.getPrototypeOf(E.prototype), "position", this).call(this, v)
                      , c = this.root.querySelector(".ql-tooltip-arrow");
                    if (c.style.marginLeft = "",
                    0 === b)
                        return b;
                    c.style.marginLeft = -1 * b - c.offsetWidth / 2 + "px"
                }
            }]),
            E
        }(s.BaseTooltip);
        x.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""),
        g.BubbleTooltip = x,
        g.default = y
    }
    , function(B, g, d) {
        "use strict";
        function w(b) {
            return b && b.__esModule ? b : {
                default: b
            }
        }
        function T(b, c) {
            if (!(b instanceof c))
                throw new TypeError("Cannot call a class as a function")
        }
        function k(b, c) {
            if (!b)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !c || "object" != typeof c && "function" != typeof c ? b : c
        }
        function _(b, c) {
            if ("function" != typeof c && null !== c)
                throw new TypeError("Super expression must either be null or a function, not " + typeof c);
            b.prototype = Object.create(c && c.prototype, {
                constructor: {
                    value: b,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            c && (Object.setPrototypeOf ? Object.setPrototypeOf(b, c) : b.__proto__ = c)
        }
        Object.defineProperty(g, "__esModule", {
            value: !0
        });
        var u = function b(c, p, N) {
            null === c && (c = Function.prototype);
            var q = Object.getOwnPropertyDescriptor(c, p);
            if (void 0 === q) {
                var L = Object.getPrototypeOf(c);
                return null === L ? void 0 : b(L, p, N)
            }
            if ("value"in q)
                return q.value;
            var U = q.get;
            return void 0 !== U ? U.call(N) : void 0
        }
          , e = function() {
            function b(c, p) {
                for (var N = 0; N < p.length; N++) {
                    var q = p[N];
                    q.enumerable = q.enumerable || !1,
                    q.configurable = !0,
                    "value"in q && (q.writable = !0),
                    Object.defineProperty(c, q.key, q)
                }
            }
            return function(c, p, N) {
                return p && b(c.prototype, p),
                N && b(c, N),
                c
            }
        }()
          , n = w(d(2))
          , s = w(d(9))
          , i = d(44)
          , r = w(i)
          , h = w(d(15))
          , l = d(22)
          , x = w(d(26))
          , O = [[{
            header: ["1", "2", "3", !1]
        }], ["bold", "italic", "underline", "link"], [{
            list: "ordered"
        }, {
            list: "bullet"
        }], ["clean"]]
          , E = function(b) {
            function c(p, N) {
                T(this, c),
                null != N.modules.toolbar && null == N.modules.toolbar.container && (N.modules.toolbar.container = O);
                var q = k(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, p, N));
                return q.quill.container.classList.add("ql-snow"),
                q
            }
            return _(c, b),
            e(c, [{
                key: "extendToolbar",
                value: function(p) {
                    p.container.classList.add("ql-snow"),
                    this.buildButtons([].slice.call(p.container.querySelectorAll("button")), x.default),
                    this.buildPickers([].slice.call(p.container.querySelectorAll("select")), x.default),
                    this.tooltip = new v(this.quill,this.options.bounds),
                    p.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
                        key: "K",
                        shortKey: !0
                    }, function(N, q) {
                        p.handlers.link.call(p, !q.format.link)
                    })
                }
            }]),
            c
        }(r.default);
        E.DEFAULTS = (0,
        n.default)(!0, {}, r.default.DEFAULTS, {
            modules: {
                toolbar: {
                    handlers: {
                        link: function(b) {
                            if (b) {
                                var c = this.quill.getSelection();
                                if (null == c || 0 == c.length)
                                    return;
                                var p = this.quill.getText(c);
                                /^\S+@\S+\.\S+$/.test(p) && 0 !== p.indexOf("mailto:") && (p = "mailto:" + p),
                                this.quill.theme.tooltip.edit("link", p)
                            } else
                                this.quill.format("link", !1)
                        }
                    }
                }
            }
        });
        var v = function(b) {
            function c(p, N) {
                T(this, c);
                var q = k(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, p, N));
                return q.preview = q.root.querySelector("a.ql-preview"),
                q
            }
            return _(c, b),
            e(c, [{
                key: "listen",
                value: function() {
                    var p = this;
                    u(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "listen", this).call(this),
                    this.root.querySelector("a.ql-action").addEventListener("click", function(N) {
                        p.root.classList.contains("ql-editing") ? p.save() : p.edit("link", p.preview.textContent),
                        N.preventDefault()
                    }),
                    this.root.querySelector("a.ql-remove").addEventListener("click", function(N) {
                        if (null != p.linkRange) {
                            var q = p.linkRange;
                            p.restoreFocus(),
                            p.quill.formatText(q, "link", !1, s.default.sources.USER),
                            delete p.linkRange
                        }
                        N.preventDefault(),
                        p.hide()
                    }),
                    this.quill.on(s.default.events.SELECTION_CHANGE, function(N, q, L) {
                        if (null != N) {
                            if (0 === N.length && L === s.default.sources.USER) {
                                var z = function(c, p) {
                                    if (Array.isArray(c))
                                        return c;
                                    if (Symbol.iterator in Object(c))
                                        return function b(c, p) {
                                            var N = []
                                              , q = !0
                                              , L = !1
                                              , U = void 0;
                                            try {
                                                for (var z, F = c[Symbol.iterator](); !(q = (z = F.next()).done) && (N.push(z.value),
                                                !p || N.length !== p); q = !0)
                                                    ;
                                            } catch (I) {
                                                L = !0,
                                                U = I
                                            } finally {
                                                try {
                                                    !q && F.return && F.return()
                                                } finally {
                                                    if (L)
                                                        throw U
                                                }
                                            }
                                            return N
                                        }(c, p);
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                                }(p.quill.scroll.descendant(h.default, N.index), 2)
                                  , F = z[0];
                                if (null != F) {
                                    p.linkRange = new l.Range(N.index - z[1],F.length());
                                    var m = h.default.formats(F.domNode);
                                    return p.preview.textContent = m,
                                    p.preview.setAttribute("href", m),
                                    p.show(),
                                    void p.position(p.quill.getBounds(p.linkRange))
                                }
                            } else
                                delete p.linkRange;
                            p.hide()
                        }
                    })
                }
            }, {
                key: "show",
                value: function() {
                    u(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "show", this).call(this),
                    this.root.removeAttribute("data-mode")
                }
            }]),
            c
        }(i.BaseTooltip);
        v.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""),
        g.default = E
    }
    ]).default
});
