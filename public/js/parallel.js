;
(function ($, window, document, undefined) {
    'use strict';
    var pluginName = 'parallel',
        defaults = [];

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.phoneContent = $(this.element).next().find(".content");
            this.phoneContainer = $(this.element).next();
            this._vw = window.innerWidth,
                this.startX,
                this.endX,
                this.distX = 0,
                this.dir, //滑动的方向
                this.iLeft,
                this.colorOff = {}, //颜色偏移量
                this.prevDeg, //上一个盒子偏移量
                this.nextDeg, //下一个盒子偏移量
                this.degOff, //旋转偏移量
                this._offset = 250, //翻译要大于的值
                this.i = 0; //当前页数
            this.moveBg(this.phoneContent[0], this.i);
            this.touchStart(this.element);
            this.touchMove(this.element);
            this.touchEnd(this.element);
        },
        touchStart: function (ele) {
            var _self = this;
            $(document).on("touchstart", function (e) {
                _self.startX = e.touches[0].pageX;
                _self.iLeft = $(ele).offset().left; //当前页面的left
                _self.i = Math.abs(_self.iLeft / _self._vw);
            });
        },
        touchMove: function (ele) {
            var _self = this;
            $(document).on("touchmove", function (e) {
                _self.endX = e.touches[0].pageX;
                _self.distX = _self.startX - _self.endX;
                _self.degOff = _self.distX * 0.3;
                _self.dir = _self.distX > 0 ? "L" : "R";
                _self.colorOff.mid = 70 + parseInt(Math.abs(_self.distX / _self._vw * 185)); //rgb的b在70-255内
                _self.colorOff.out = 255 - parseInt(Math.abs(_self.distX / _self._vw * 185));
                //移动开始
                if (!(_self.dir == "L" && _self.i == 2 || _self.dir == "R" && _self.i == 0)) {
                    $(ele).css("left", -_self.distX + _self.iLeft + "px");
                    $(_self.phoneContainer).css("left", -_self.distX + _self.iLeft + "px");
                    if (_self.dir == "L") {
                        _self.prevDeg = -_self.degOff < -90 ? -90 : -_self.degOff;
                        _self.nextDeg = 90 - _self.degOff < 0 ? 0 : 90 - _self.degOff;
                       $(_self.phoneContent[_self.i]).css("transform", "rotate(" + _self.prevDeg + "deg)");
                        $(_self.phoneContent[_self.i + 1]).css("transform", "rotate(" + _self.nextDeg + "deg)");
                        if (_self.i == 0) {
                            $(document).find("body").css("backgroundColor", 'rgb(70,208,' + _self.colorOff.mid + ')');
                        } else if (_self.i == 1) {
                            $(document).find("body").css("backgroundColor", "rgb(70,208," + _self.colorOff.out + ")");
                        }
                    } else {
                        _self.prevDeg = -_self.degOff > 90 ? 90 : -_self.degOff;
                        _self.nextDeg = -90 - _self.degOff > 0 ? 0 : -90 - _self.degOff;
                        $(_self.phoneContent[_self.i]).css("transform", "rotate(" + _self.prevDeg + "deg)");
                        $(_self.phoneContent[_self.i - 1]).css("transform", "rotate(" + _self.nextDeg + "deg)");
                        if (_self.i == 2) {
                            $(document).find("body").css("backgroundColor", "rgb(70,208," + _self.colorOff.mid + ")");
                        } else if (_self.i == 1) {
                            $(document).find("body").css("backgroundColor", "rgb(70,208," + _self.colorOff.out + ")");
                        }
                    }
                }
            });
        },
        touchEnd: function (ele) {
            var _self = this,
                _left;
            $(document).on("touchend", function (e) {
                var abs = Math.abs(_self.distX); //手划的距离
                if (abs >= _self._offset) {
                    if (_self.dir == "L" && _self.i != 2) {
                        _left = _self.iLeft - _self._vw;
                        $(_self.phoneContent[_self.i]).css("transform", "rotate(-90deg)");
                        $(_self.phoneContent[_self.i + 1]).css("transform", "rotate(0deg)");
                        _self.moveBg(_self.phoneContent[_self.i + 1], _self.i + 1);
                        _self.resetBg(_self.phoneContent[_self.i], _self.i + 1);

                    } else if (_self.dir == "R" && _self.i != 0) {
                        _left = _self.iLeft + _self._vw;
                        $(_self.phoneContent[_self.i]).css("transform", "rotate(90deg)");
                        $(_self.phoneContent[_self.i - 1]).css("transform", "rotate(0deg)");
                        _self.moveBg(_self.phoneContent[_self.i - 1], _self.i - 1);
                        _self.resetBg(_self.phoneContent[_self.i], _self.i - 1);

                    } else {
                        _left = _self.iLeft; //当是第一页和最后一页时
                    }
                } else if (abs < _self._offset) {
                    _left = _self.iLeft;
                    $(_self.phoneContent[_self.i]).css("transform", "rotate(0deg)");
                    $(_self.phoneContent[_self.i + 1]).css("transform", "rotate(-90deg)");
                    if (_self.i == 0 || _self.i == 2) {
                        $(document).find("body").css("backgroundColor", 'rgb(70,208,70)');
                    } else if (_self.i == 1) {
                        $(document).find("body").css("backgroundColor", "rgb(70,208,255)");
                    }

                }
                $(ele).css("left", _left + "px");
                $(_self.phoneContainer).css("left", _left + "px");
            });
        },
        moveBg: function (ele, i) {
            var pos = $(ele).find(".andr-container").width(); //手机装图片盒子的宽度
            var $logo = $(ele).closest(".phone-container").prev().find("img");
            setTimeout(function () {
                $(ele).css('backgroundPosition', "-100vw 0");
                $(ele).find(".andr-container").css('backgroundPosition', -pos + "px" + " 0");
                $logo.eq(i).css({
                    border: "1px solid #fff",
                    borderImage: "url(images/4x.png) 2 2 2 2 fill/1 1 1 1/1px repeat"
                });
            }, 500);
        },
        resetBg: function (ele, i) {
            var $logo = $(ele).closest(".phone-container").prev().find("img");
            $(ele).css('backgroundPosition', "0");
            $(ele).find(".andr-container").css('backgroundPosition', "0");
            $logo.eq(i).css("border", "0");
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$(this).data('plugin_' + pluginName)) {
                $(this).data('plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
})(Zepto, window, document);
$(".text-container").parallel();
