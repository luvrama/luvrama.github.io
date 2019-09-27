(function($) {

    "use strict";

    $.fn.meanmenu = function(options) {

        var defaults = {

            meanMenuTarget: jQuery(this),

            meanMenuContainer: 'header .place-nav',

            meanMenuClose: "X",

            meanMenuCloseSize: "18px",

            meanMenuOpen: "<span /><span /><span />",

            meanRevealPosition: "right",

            meanRevealPositionDistance: "0",

            meanRevealColour: "",

            meanScreenWidth: "860",

            meanNavPush: "",

            meanShowChildren: !0,

            meanExpandableChildren: !0,

            meanExpand: "+",

            meanContract: "-",

            meanRemoveAttrs: !1,

            onePage: !0,

            meanDisplay: "block",

            removeElements: ""

        };

        options = $.extend(defaults, options);

        var currentWidth = window.innerWidth || document.documentElement.clientWidth;

        return this.each(function() {

            var meanMenu = options.meanMenuTarget;

            var meanContainer = options.meanMenuContainer;

            var meanMenuClose = options.meanMenuClose;

            var meanMenuCloseSize = options.meanMenuCloseSize;

            var meanMenuOpen = options.meanMenuOpen;

            var meanRevealPosition = options.meanRevealPosition;

            var meanRevealPositionDistance = options.meanRevealPositionDistance;

            var meanRevealColour = options.meanRevealColour;

            var meanScreenWidth = options.meanScreenWidth;

            var meanNavPush = options.meanNavPush;

            var meanRevealClass = ".meanmenu-reveal";

            var meanShowChildren = options.meanShowChildren;

            var meanExpandableChildren = options.meanExpandableChildren;

            var meanExpand = options.meanExpand;

            var meanContract = options.meanContract;

            var meanRemoveAttrs = options.meanRemoveAttrs;

            var onePage = options.onePage;

            var meanDisplay = options.meanDisplay;

            var removeElements = options.removeElements;

            var isMobile = !1;

            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i))) {

                isMobile = !0

            }

            if ((navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i))) {

                jQuery('html').css("overflow-y", "scroll")

            }

            var meanRevealPos = "";

            var meanCentered = function() {

                if (meanRevealPosition === "center") {

                    var newWidth = window.innerWidth || document.documentElement.clientWidth;

                    var meanCenter = ((newWidth / 2) - 22) + "px";

                    meanRevealPos = "left:" + meanCenter + ";right:auto;";

                    if (!isMobile) {

                        jQuery('.meanmenu-reveal').css("left", meanCenter)

                    } else {

                        jQuery('.meanmenu-reveal').animate({

                            left: meanCenter

                        })

                    }

                }

            };

            var menuOn = !1;

            var meanMenuExist = !1;

            if (meanRevealPosition === "right") {

                meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;"

            }

            if (meanRevealPosition === "left") {

                meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;"

            }

            meanCentered();

            var $navreveal = "";

            var meanInner = function() {

                if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {

                    $navreveal.html(meanMenuClose);

                    jQuery('body').addClass("mean-active")

                } else {

                    $navreveal.html(meanMenuOpen);

                    jQuery('body').removeClass("mean-active")

                }

            };

            var meanOriginal = function() {

                jQuery('.mean-bar,.mean-push').remove();

                jQuery(meanContainer).removeClass("mean-container");

                jQuery(meanMenu).css('display', meanDisplay);

                menuOn = !1;

                meanMenuExist = !1;

                jQuery(removeElements).removeClass('mean-remove')

            };

            var showMeanMenu = function() {

                var meanStyles = "background:" + meanRevealColour + ";color:" + meanRevealColour + ";" + meanRevealPos;

                if (currentWidth <= meanScreenWidth) {

                    jQuery(removeElements).addClass('mean-remove');

                    meanMenuExist = !0;

                    jQuery(meanContainer).addClass("mean-container");

                    jQuery('.mean-container').prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' + meanStyles + '">Show Navigation</a><nav class="mean-nav"></nav></div>');

                    var meanMenuContents = jQuery(meanMenu).html();

                    jQuery('.mean-nav').html(meanMenuContents);

                    if (meanRemoveAttrs) {

                        jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {

                            if (jQuery(this).is('.mean-remove')) {

                                jQuery(this).attr('class', 'mean-remove')

                            } else {

                                jQuery(this).removeAttr("class")

                            }

                            jQuery(this).removeAttr("id")

                        })

                    }

                    jQuery(meanMenu).before('<div class="mean-push" />');

                    jQuery('.mean-push').css("margin-top", meanNavPush);

                    jQuery(meanMenu).hide();

                    jQuery(".meanmenu-reveal").show();

                    jQuery(meanRevealClass).html(meanMenuOpen);

                    $navreveal = jQuery(meanRevealClass);

                    jQuery('.mean-nav ul').hide();

                    if (meanShowChildren) {

                        if (meanExpandableChildren) {

                            jQuery('.mean-nav ul ul').each(function() {

                                if (jQuery(this).children().length) {

                                    jQuery(this, 'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: ' + meanMenuCloseSize + '">' + meanExpand + '</a>')

                                }

                            });

                            jQuery('.mean-expand').on("click", function(e) {

                                e.preventDefault();

                                if (jQuery(this).hasClass("mean-clicked")) {

                                    jQuery(this).text(meanExpand);

                                    jQuery(this).prev('ul').slideUp(300, function() {})

                                } else {

                                    jQuery(this).text(meanContract);

                                    jQuery(this).prev('ul').slideDown(300, function() {})

                                }

                                jQuery(this).toggleClass("mean-clicked")

                            })

                        } else {

                            jQuery('.mean-nav ul ul').show()

                        }

                    } else {

                        jQuery('.mean-nav ul ul').hide()

                    }

                    jQuery('.mean-nav ul li').first().addClass('mean-first');

                    jQuery('.mean-nav ul li').last().addClass('mean-last');

                    $navreveal.removeClass("meanclose");

                    jQuery('body').removeClass("mean-active");

                    jQuery($navreveal).click(function(e) {

                        e.preventDefault();

                        if (menuOn === !1) {

                            $navreveal.css("text-align", "center");

                            $navreveal.css("text-indent", "0");

                            $navreveal.css("font-size", meanMenuCloseSize);

                            jQuery('.mean-nav ul:first').slideDown();

                            menuOn = !0

                        } else {

                            jQuery('.mean-nav ul:first').slideUp();

                            menuOn = !1

                        }

                        $navreveal.toggleClass("meanclose");

                        meanInner();

                        jQuery(removeElements).addClass('mean-remove')

                    });

                    if (onePage) {

                        jQuery('.mean-nav ul > li > a:first-child').on("click", function() {

                            jQuery('.mean-nav ul:first').slideUp();

                            menuOn = !1;

                            jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);

                            jQuery('body').removeClass("mean-active")

                        })

                    }

                } else {

                    meanOriginal()

                }

            };

            if (!isMobile) {

                jQuery(window).resize(function() {

                    currentWidth = window.innerWidth || document.documentElement.clientWidth;

                    if (currentWidth > meanScreenWidth) {

                        meanOriginal()

                    } else {

                        meanOriginal()

                    }

                    if (currentWidth <= meanScreenWidth) {

                        showMeanMenu();

                        meanCentered()

                    } else {

                        meanOriginal()

                    }

                })

            }

            jQuery(window).resize(function() {

                currentWidth = window.innerWidth || document.documentElement.clientWidth;

                if (!isMobile) {

                    meanOriginal();

                    if (currentWidth <= meanScreenWidth) {

                        showMeanMenu();

                        meanCentered()

                    }

                } else {

                    meanCentered();

                    if (currentWidth <= meanScreenWidth) {

                        if (meanMenuExist === !1) {

                            showMeanMenu()

                        }

                    } else {

                        meanOriginal()

                    }

                }

            });

            showMeanMenu()

        })

    }

})(jQuery)

$(function() {

    $('header nav').meanmenu();

    $(".more-to-explore").appendTo($(".more-to-explore-container"));

    $(".page-divider, .services-grid").appendTo($(".page-divider-container"));

    $(".gmap").on("mouseenter", function() {

        $(this).addClass("active");

    }).on("mouseleave", function() {

        $(this).removeClass("active");

    });

    var theWindow = $(window),

        body = $("body"),

        header = $("header"),

        headerBottom = header.outerHeight(),

        hideBottom = $("header article").outerHeight();

    $(window).resize(function() {

        body.css('padding-top', header.outerHeight());

    });

    body.css('padding-top', headerBottom);

    if (window.location.hash && theWindow.width() > 999) {

        body.addClass("scrolled");

        header.addClass("animated fadeInDown");

    }

    theWindow.on("scroll", function() {

        if (theWindow.width() > 999) {

            if (theWindow.scrollTop() >= headerBottom) {

                body.addClass("scrolled").removeClass("not-scrolled");

                header.addClass("animated fadeInDown");

            } else if (theWindow.scrollTop() <= headerBottom) {

                body.removeClass("scrolled").addClass("not-scrolled");

                header.removeClass("animated fadeInDown");

            }

        }

        if (theWindow.width() < 861) {

            if (theWindow.scrollTop() >= hideBottom) {

                body.addClass('attach');

            } else if (theWindow.scrollTop() <= hideBottom) {

                body.removeClass('attach');

            }

        }

    });

    $(".hover-change").on("mouseover", function() {

        var $this = $(this);

        $this.data("original", $this.attr("src"));

        $this.attr("src", $this.data("hover"));

    }).on("mouseleave", function() {

        var $this = $(this);

        $this.data("hover", $this.attr("src"));

        $this.attr("src", $this.data("original"));

    });

    $("#faqs>h3").on("click", function() {

        if ($(this).hasClass("active")) {

            $(this).removeClass("active").next("div").slideUp().removeClass("active-div");

        } else {

            $("#faqs>h3").removeClass("active").next("div").slideUp();

            $(this).addClass("active").next("div").slideDown().addClass("active-div");

        }

    });

    $(".services-grid .arrow").on("click", function() {

        if ($(this).closest(".top").hasClass("active")) {

            $(this).closest(".top").removeClass("active").next().slideUp();

        } else {

            $(".services-grid .top").removeClass("active").next("div").slideUp();

            $(this).closest(".top").addClass("active").next("div").slideDown();

        }

    });

    $(".more-to-explore").appendTo($(".more-to-explore-container"));

    $(".services-rotation").cycle({

        slides: ">div",

        pager: "#services-nav",

        prev: "#services .prev",

        next: "#services .next",

        paused: "true",

        timeout: "0",

        pagerTemplate: "",

        autoHeight: 'container'

    })

    if (theWindow.width() < 750) {

        $(".reviews-rotations").cycle({

            slides: ">div",

            pager: "#reviews .pager",

            prev: "#reviews .prev",

            next: "#reviews .next",

            timeout: 0,

            pagerTemplate: "<span></span>",

            autoHeight: 'container'

        });

    }

    if (!String.prototype.trim) {

        (function() {

            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

            String.prototype.trim = function() {

                return this.replace(rtrim, '')

            }

        })()

    }[].slice.call(document.querySelectorAll('input.input__field')).forEach(function(inputEl) {

        if (inputEl.value.trim() !== '') {

            classie.add(inputEl.parentNode, 'input--filled')

        }

        inputEl.addEventListener('focus', onInputFocus);

        inputEl.addEventListener('blur', onInputBlur)

    });



    function onInputFocus(ev) {

        classie.add(ev.target.parentNode, 'input--filled')

    }



    function onInputBlur(ev) {

        if (ev.target.value.trim() === '') {

            classie.remove(ev.target.parentNode, 'input--filled')

        }

    }

    'use strict';



    function classReg(className) {

        return new RegExp("(^|\\s+)" + className + "(\\s+|$)")

    }

    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {

        hasClass = function(elem, c) {

            return elem.classList.contains(c)

        };

        addClass = function(elem, c) {

            elem.classList.add(c)

        };

        removeClass = function(elem, c) {

            elem.classList.remove(c)

        }

    } else {

        hasClass = function(elem, c) {

            return classReg(c).test(elem.className)

        };

        addClass = function(elem, c) {

            if (!hasClass(elem, c)) {

                elem.className = elem.className + ' ' + c

            }

        };

        removeClass = function(elem, c) {

            elem.className = elem.className.replace(classReg(c), ' ')

        }

    }



    function toggleClass(elem, c) {

        var fn = hasClass(elem, c) ? removeClass : addClass;

        fn(elem, c)

    }

    var classie = {

        hasClass: hasClass,

        addClass: addClass,

        removeClass: removeClass,

        toggleClass: toggleClass,

        has: hasClass,

        add: addClass,

        remove: removeClass,

        toggle: toggleClass

    };

    if (typeof define === 'function' && define.amd) {

        define(classie)

    } else {

        window.classie = classie

    }

    var slideshows = $('.cycle-slideshow').on('cycle-prev cycle-next', function(e, opts) {

        slideshows.not(this).cycle('goto', opts.currSlide);

    });

    $('#carousel .cycle-slideshow figure').click(function() {

        console.log("clicked");

        var index = $('#carousel .cycle-slideshow').data('cycle.API').getSlideIndex(this);

        slideshows.cycle('goto', index);

    });

    $.when(setupServices()).done(function() {

        if (window.location.hash) {

            scrollToAnchor(window.location.hash);

        }

    });



    function scrollToAnchor(target) {

        var $target = $("a[name='" + target.substr(1) + "']"),

            targetName = window.location.href.split("#")[1];

        $('html,body').animate({

            'scrollTop': $target.offset().top - 20

        }, 700, function() {

            document.location.hash = targetName;

        });

    }



    function setupServices() {

        $(".page-divider h2").addClass("divider-title").each(function() {

            $(this).nextUntil('.divider-title').addBack().wrapAll('<div class="divider-body clearfix">');

        });

        $(".divider-body").each(function() {

            $(this).find(".divider-title + p:has(img)").addClass("has-img");

            $(this).children(".has-img").insertBefore($(this).children(".divider-title").first());

            $(this).find(".divider-title").nextAll().wrapAll('<div style="overflow:hidden;">');

        });

        $(".page-divider a[name]").each(function() {

            var getAnchor = $(this).parent(),

                anchorTarget = $(this).parentsUntil(".page-divider").next().find(".divider-title").parent();

            getAnchor.prependTo(anchorTarget);

        });

    }

});


var btn = $('#scroll_up_button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '400');
});
