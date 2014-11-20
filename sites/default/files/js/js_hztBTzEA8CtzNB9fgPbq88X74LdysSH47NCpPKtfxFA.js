// Sticky Plugin v1.0.0 for jQuery - http://stickyjs.com/
(function(f) {
    var e = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: false,
            getWidthFrom: ""
        },
        b = f(window),
        d = f(document),
        i = [],
        a = b.height(),
        g = function() {
            var j = b.scrollTop(),
                q = d.height(),
                p = q - a,
                l = (j > p) ? p - j : 0;
            for (var m = 0; m < i.length; m++) {
                var r = i[m],
                    k = r.stickyWrapper.offset().top,
                    n = k - r.topSpacing - l;
                if (j <= n) {
                    if (r.currentTop !== null) {
                        r.stickyElement.removeClass("navbar-fixed-top");
                        r.stickyElement.parent().removeClass(r.className);
                        r.currentTop = null
                    }
                } else {
                    var o = q - r.stickyElement.outerHeight() - r.topSpacing - r.bottomSpacing - j - l;
                    if (o < 0) {
                        o = o + r.topSpacing
                    } else {
                        o = r.topSpacing
                    }
                    if (r.currentTop != o) {
                        r.stickyElement.addClass("navbar-fixed-top");
                        if (typeof r.getWidthFrom !== "undefined") {
                            r.stickyElement.css("width", f(r.getWidthFrom).width())
                        }
                        r.stickyElement.parent().addClass(r.className);
                        r.currentTop = o
                    }
                }
            }
        },
        h = function() {
            a = b.height()
        },
        c = {
            init: function(j) {
                var k = f.extend(e, j);
                return this.each(function() {
                    var l = f(this);
                    var m = l.attr("id");
                    var o = f("<div></div>").attr("id", m + "-sticky-wrapper").addClass(k.wrapperClassName);
                    l.wrapAll(o);
                    if (k.center) {
                        l.parent().css({
                            width: l.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        })
                    }
                    if (l.css("float") == "right") {
                        l.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        })
                    }
                    var n = l.parent();
                    n.css("height", l.outerHeight());
                    i.push({
                        topSpacing: k.topSpacing,
                        bottomSpacing: k.bottomSpacing,
                        stickyElement: l,
                        currentTop: null,
                        stickyWrapper: n,
                        className: k.className,
                        getWidthFrom: k.getWidthFrom
                    })
                })
            },
            update: g
        };
    if (window.addEventListener) {
        window.addEventListener("scroll", g, false);
        window.addEventListener("resize", h, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onscroll", g);
            window.attachEvent("onresize", h)
        }
    }
    f.fn.sticky = function(j) {
        if (c[j]) {
            return c[j].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof j === "object" || !j) {
                return c.init.apply(this, arguments)
            } else {
                f.error("Method " + j + " does not exist on jQuery.sticky")
            }
        }
    };
    f(function() {
        setTimeout(g, 0)
    })
})(jQuery);

// Fire Sticky
jQuery(function(){
  jQuery("#navbar").sticky({topSpacing:0});
});

jQuery(document).ready(function(){
  //Check to see if the window is top if not then display button
  jQuery(window).scroll(function(){
    if (jQuery(this).scrollTop() > 100) {
      jQuery('.scrollToTop').fadeIn();
    } else {
      jQuery('.scrollToTop').fadeOut();
    }
  });

  //Click event to scroll to top
  jQuery('.scrollToTop').click(function(){
    jQuery('html, body').animate({scrollTop : 0},800);
    return false;
  });
});;
