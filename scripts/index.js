/**
 * Created by Guoxing.han on 2015/7/7 0007.
 */
$(function () {
    var indexHome = {
        init: function () {
            this.eventHandler();
            if ($("#aboutPage").length > 0) {
                this.aboutPage();
            }
            if ($("#contactPage").length > 0) {
                this.contactPage();
            }
        }
    };

    $.extend(indexHome, {
        eventHandler: function () {
            var winHeight = $(document).scrollTop();
            $(window).scroll(function () {
                var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
                if (scrollY > 250) { //如果滚动距离大于550px则隐藏，否则删除隐藏类
                    $('#J_header').addClass('hiddened');
                }
                else {
                    $('#J_header').removeClass('hiddened');
                }
                if (scrollY > winHeight) { //如果没滚动到顶部，删除显示类，否则添加显示类
                    $('#J_header').removeClass('showed');
                }
                else {
                    $('#J_header').addClass('showed');
                }
                winHeight=scrollY;
            });

            $(window).scroll(function () {
                if (jQuery(window).scrollTop() >= 100) {
                    jQuery('#updown').fadeIn(300);
                } else {
                    jQuery('#updown').fadeOut(300);
                }
            });
            jQuery('#updown .up').click(function () {
                jQuery('html,body').animate({scrollTop: '0px'}, 800);
            });
            $("#J_brain-left").animate({"right": "185px", "opacity": 1}, 600);
            $("#J_brain-right").animate({"right": "47px", "opacity": 1}, 600);
            setTimeout(function () {
                $("#J_elec-box,#J_sq-right,#J_d-left,#J_elec-icon").animate({"opacity": 1}, 700);
                $("#J_sq-right,#J_elec-icon").addClass("animation");
                $(".j_line-bar").animate({"opacity": 0.07});
                $(".j_line-corner").animate({"opacity": 1});
            }, 800);
            $("#J_weixin-btn").hover(function () {
                $("#J_weixin-coad").fadeIn(200);
            }, function () {
                $("#J_weixin-coad").fadeOut(200);
            });
            $(".j_downApp-btn").click(function () {
                $("html,body").stop(true);
                $("html,body").animate({scrollTop: $("#J_downApp-box").offset().top}, 1000);
            });
            if($("#indexPage").length>0){
                $(window).fadeThis({
                    speed: 1000,
                    distance: 400,
                    reverse: false
                });
            }
        },
        aboutPage   : function () {
            $(".j_close-btn").on("click", function () {
                $("#J_alert_win").fadeOut(300);
            });
            $("#J_open-play").on("click", function () {
                $("#J_alert_win").fadeIn(300);
            });
            var swiper = new Swiper('.swiper-container', {
                autoplay                    : 3000,
                autoplayDisableOnInteraction: false,
                loop                        : true,
                effect                      : 'fade',
                //onTransitionStart: function(index,slide){
                //    console.log(index,slide)
                //}
                onTransitionStart: function(swiper){
                    //console.log(swiper.activeIndex);
                    if(swiper.activeIndex<=5||swiper.activeIndex==11){
                        $("#J_swiper-box>.left-box").addClass("active");
                        $("#J_swiper-box>.right-box").removeClass("active");
                    }
                    else{
                        $("#J_swiper-box>.right-box").addClass("active");
                        $("#J_swiper-box>.left-box").removeClass("active");
                    }
                    if(swiper.activeIndex==11){
                        $("#J_swiper-box i").animate({"opacity":0},300);
                        $("#J_swiper-box .icson1").animate({"opacity":1},300);
                    }
                    else{
                        $("#J_swiper-box i").animate({"opacity":0},300);
                        $("#J_swiper-box .icson"+swiper.activeIndex).animate({"opacity":1},300);
                    }
                }

            });
            $('#J_swiper-box').on("mouseenter","a",function(){
                var _val = $(this).attr("data-val");
                swiper.slideTo(_val, 300, false);
                $("#J_swiper-box i").animate({"opacity":0},300);
                $("#J_swiper-box .icson"+_val).animate({"opacity":1},300);
                if(_val<=5||_val==11){
                    $("#J_swiper-box>.left-box").addClass("active");
                    $("#J_swiper-box>.right-box").removeClass("active");
                }
                else{
                    $("#J_swiper-box>.right-box").addClass("active");
                    $("#J_swiper-box>.left-box").removeClass("active");
                }
            });

        },
        contactPage : function () {
            var _height = $("#J_contact-photo>a").width() * 393 / 495, _allW = document.body.clientWidth;
            $("#J_contact-photo>a").height(_height);
            if (_allW >= 1500) {
                $("#J_contact-photo>a").hover(function () {
                    $("em.opacity", this).animate({"top": "100%"}, 500);
                    $("em.bottom", this).animate({"top": "86%"}, 500);
                    $("p", this).animate({"top": "86%"}, 500);
                    $("p>span.s", this).fadeOut(600);
                }, function () {
                    $("em.opacity", this).animate({"top": 0}, 500);
                    $("em.bottom", this).animate({"top": "100%"}, 500);
                    $("p", this).animate({"top": "40%"}, 500);
                    $("p>span.s", this).fadeIn(1);
                });
            }
            else {
                $("#J_contact-photo>a").hover(function () {
                    $("em.opacity", this).animate({"top": "100%"}, 500);
                    $("em.bottom", this).animate({"top": "83%"}, 500);
                    $("p", this).animate({"top": "83%"}, 500);
                    //setTimeout(function(){
                    $("p>span.s", this).fadeOut(600);
                    //},500)
                }, function () {
                    $("em.opacity", this).animate({"top": 0}, 500);
                    $("em.bottom", this).animate({"top": "100%"}, 500);
                    $("p", this).animate({"top": "40%"}, 500);
                    $("p>span.s", this).fadeIn(1);
                });
            }

            $(".slider .bd li").first().before($(".slider .bd li").last());
            $(".slider").hover(function () {
                $(this).find(".arrow").stop(true, true).fadeIn(300);
            }, function () {
                $(this).find(".arrow").fadeOut(300);
            });
            $(".slider").slide({
                titCell : ".hd ul",
                mainCell: ".bd ul",
                effect  : "leftLoop",
                autoPlay: true,
                vis     : 3,
                autoPage: true,
                trigger : "click"
            });

        }
    });
    indexHome.init();

});
