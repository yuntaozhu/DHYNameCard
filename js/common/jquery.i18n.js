(function(h) {
    function v(a) {
        a.debug && (f("callbackIfComplete()"), f("totalFiles: " + a.totalFiles), f("filesLoaded: " + a.filesLoaded));
        a.async && a.filesLoaded === a.totalFiles && a.callback && a.callback()
    }
    function n(a, c) {
        c.debug && f("loadAndParseFiles");
        null !== a && 0 < a.length ? w(a[0], c,
            function() {
                a.shift();
                n(a, c)
            }) : v(c)
    }
    function w(a, c, m) {
        c.debug && (f("loadAndParseFile('" + a + "')"), f("totalFiles: " + c.totalFiles), f("filesLoaded: " + c.filesLoaded));
        null !== a && "undefined" !== typeof a && h.ajax({
            url: a,
            async: c.async,
            cache: c.cache,
            dataType: "text",
            success: function(e, b) {
                c.debug && (f("Succeeded in downloading " + a + "."), f(e));
                x(e, c);
                m()
            },
            error: function(e, b, d) {
                c.debug && f("Failed to download or parse " + a + ". errorThrown: " + d);
                404 === e.status && --c.totalFiles;
                m()
            }
        })
    }
    function x(a, c) {
        for (var m = "",
                 e = a.split(/\n/), b = /(\{\d+})/g, d = /\{(\d+)}/g, k = /(\\u.{4})/ig, f = 0, n = e.length; f < n; f++) {
            var l = e[f],
                l = l.trim();
            if (0 < l.length && "#" != l.match("^#")) {
                var p = l.split("=");
                if (0 < p.length) {
                    for (var l = decodeURI(p[0]).trim(), g = 1 == p.length ? "": p[1]; - 1 != g.search(/\\$/);) g = g.substring(0, g.length - 1),
                        g += e[++f].trimRight();
                    for (var q = 2; q < p.length; q++) g += "=" + p[q];
                    g = g.trim();
                    if ("map" == c.mode || "both" == c.mode)(p = g.match(k)) && p.forEach(function(a) {
                        g = g.replace(a, y(a))
                    }),
                        c.namespace ? h.i18n.map[c.namespace][l] = g: h.i18n.map[l] = g;
                    if ("vars" == c.mode || "both" == c.mode) if (g = g.replace(/"/g, '\\"'), z(l), b.test(g)) {
                        var u = !0,
                            r = "",
                            t = [];
                        g.split(b).forEach(function(a) { ! b.test(a) || 0 !== t.length && -1 != t.indexOf(a) || (u || (r += ","), r += a.replace(d, "v$1"), t.push(a), u = !1)
                        });
                        m += l + "=function(" + r + "){";
                        l = '"' + g.replace(d, '"+v$1+"') + '"';
                        m += "return " + l + ";};"
                    } else m += l + '="' + g + '";'
                }
            }
        }
        eval(m);
        c.filesLoaded += 1
    }
    function z(a) {
        if (/\./.test(a)) {
            var c = "";
            a = a.split(/\./);
            for (var m = 0,
                     e = a.length; m < e; m++) {
                var b = a[m];
                0 < m && (c += ".");
                c += b;
                eval("typeof " + c + ' == "undefined"') && eval(c + "={};")
            }
        }
    }
    function y(a) {
        var c = [];
        a = parseInt(a.substr(2), 16);
        0 <= a && a < Math.pow(2, 16) && c.push(a);
        return c.reduce(function(a, c) {
                return a + String.fromCharCode(c)
            },
            "")
    }
    h.i18n = {};
    h.i18n.map = {};
    var f = function(a) {
        window.console && console.log("i18n::" + a)
    };
    h.i18n.properties = function(a) {
        a = h.extend({
                name: "Messages",
                language: "",
                path: "",
                namespace: null,
                mode: "vars",
                cache: !1,
                debug: !1,
                encoding: "UTF-8",
                async: !1,
                callback: null
            },
            a);
        a.namespace && "string" == typeof a.namespace && (a.namespace.match(/^[a-z]*$/) ? h.i18n.map[a.namespace] = {}: (f("Namespaces can only be lower case letters, a - z"), a.namespace = null));
        a.path.match(/\/$/) || (a.path += "/");
        a.language = this.normaliseLanguageCode(a);
        var c = a.name && a.name.constructor === Array ? a.name: [a.name];
        a.totalFiles = 2 * c.length + (5 <= a.language.length ? c.length: 0);
        a.debug && f("totalFiles: " + a.totalFiles);
        a.filesLoaded = 0;
        c.forEach(function(c) {
            var e = a.path + c + ".properties";
            var b = a.language.substring(0, 2);
            b = a.path + c + "_" + b + ".properties";
            if (5 <= a.language.length) {
                var d = a.language.substring(0, 5);
                c = a.path + c + "_" + d + ".properties";
                e = [e, b, c]
            } else e = [e, b];
            n(e, a)
        });
        a.callback && !a.async && a.callback()
    };
    h.i18n.prop = function(a) {
        var c = [].slice.call(arguments);
        if (2 == c.length) if (h.isArray(c[1])) var f = c[1];
        else if ("object" === typeof c[1]) {
            var e = c[1].namespace;
            var b = c[1].replacements;
            c.splice( - 1, 1);
            b && Array.prototype.push.apply(c, b)
        }
        b = e ? h.i18n.map[e][a] : h.i18n.map[a];
        if (null === b) return "[" + (e ? e + "#" + a: a) + "]";
        var d;
        if ("string" == typeof b) {
            for (d = 0; - 1 != (d = b.indexOf("\\", d));) b = "t" == b.charAt(d + 1) ? b.substring(0, d) + "\t" + b.substring(d+++2) : "r" == b.charAt(d + 1) ? b.substring(0, d) + "\r" + b.substring(d+++2) : "n" == b.charAt(d + 1) ? b.substring(0, d) + "\n" + b.substring(d+++2) : "f" == b.charAt(d + 1) ? b.substring(0, d) + "\f" + b.substring(d+++2) : "\\" == b.charAt(d + 1) ? b.substring(0, d) + "\\" + b.substring(d+++2) : b.substring(0, d) + b.substring(d + 1);
            var k = [];
            for (d = 0; d < b.length;) if ("'" == b.charAt(d)) if (d == b.length - 1) b = b.substring(0, d);
            else if ("'" == b.charAt(d + 1)) b = b.substring(0, d) + b.substring(++d);
            else {
                for (e = d + 2; - 1 != (e = b.indexOf("'", e));) if (e == b.length - 1 || "'" != b.charAt(e + 1)) {
                    b = b.substring(0, d) + b.substring(d + 1, e) + b.substring(e + 1);
                    d = e - 1;
                    break
                } else b = b.substring(0, e) + b.substring(++e); - 1 == e && (b = b.substring(0, d) + b.substring(d + 1))
            } else if ("{" == b.charAt(d)) if (e = b.indexOf("}", d + 1), -1 == e) d++;
            else {
                var n = parseInt(b.substring(d + 1, e)); ! isNaN(n) && 0 <= n ? (d = b.substring(0, d), "" !== d && k.push(d), k.push(n), d = 0, b = b.substring(e + 1)) : d = e + 1
            } else d++;
            "" !== b && k.push(b);
            b = k;
            settings.namespace ? h.i18n.map[settings.namespace][a] = k: h.i18n.map[a] = k
        }
        if (0 === b.length) return "";
        if (1 == b.length && "string" == typeof b[0]) return b[0];
        k = "";
        d = 0;
        for (e = b.length; d < e; d++) k = "string" == typeof b[d] ? k + b[d] : f && b[d] < f.length ? k + f[b[d]] : !f && b[d] + 1 < c.length ? k + c[b[d] + 1] : k + ("{" + b[d] + "}");
        return k
    };
    h.i18n.normaliseLanguageCode = function(a) {
        var c = a.language;
        if (!c || 2 > c.length) a.debug && f("No language supplied. Pulling it from the browser ..."),
            c = navigator.languages && 0 < navigator.languages.length ? navigator.languages[0] : navigator.language || navigator.userLanguage || "en",
        a.debug && f("Language from browser: " + c);
        c = c.toLowerCase();
        c = c.replace(/-/, "_");
        3 < c.length && (c = c.substring(0, 3) + c.substring(3).toUpperCase());
        return c
    }
})(jQuery);