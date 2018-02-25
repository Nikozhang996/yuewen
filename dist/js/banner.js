function Banner(element, config) {
  this.wrapper = element;
  this.banner = $.firstChild(this.wrapper);
  this.tips = $.lastChild(this.wrapper);
  this.divList = this.banner.getElementsByTagName('div');
  this.imgList = this.banner.getElementsByTagName('img');
  this.tipsList = this.tips.getElementsByTagName('li');

  var _default = {
    step: 0,
    URL: null,
    interval: 2000,
    switchLR: false,
    tips: true,
    tipsClassName: null,
    switchLRClassName: null
  }

  /*
  // 默认步数
  this.step = 0;
  // 图片地址，默认为数组
  this.URL = config.URL || null;
  // 定时器间隔,默认两秒
  this.intervel = config.interval || 2000;
  // 是否左右切换
  this.switchLR = config.switchLR || false;
  // 是否显示tips
  this.tips = config.tips || true;
  // tips样式
  this.tipsClassName = config.tipsClassName || null
  // 左右切换样式
  this.switchLRClassName = config.switchLRClassName || null
  */

  // 定时器
  this.timer = null;
  return this.init();
}

Banner.prototype = {
  constructor: Banner,

  createTips: function () {
    var fragmentTips = document.createDocumentFragment();
    function eachData(target) {
      var ul = document.createElement('ul');
      for (var i = 0; i < target.length; i++) {
        li = document.createElement('li');
        a = document.createElement('a');
      }
    }

  },
  /*实现数据绑定*/
  bindData: function () {
    var fragmentBanner = document.createDocumentFragment();

    if (this.URL) {
      for (var i = 0; i < this.URL.length; i++) {
        var curURLData = this.URL[i];

        // 准备DOM结构的，div>img，li
        var div = document.createElement('div'),
          img = document.createElement('img'),
          li = document.createElement('li');

        // 为第一个li添加默认样式
        if (i === 0) {
          li.className = 'bg';
        }

        // 为img标签设置自定义属性
        img.mySrc = curData.src;

        // 添加数据绑定
        div.appendChild(img);
        fragmentBanner.appendChild(div);
        fragmentTips.appendChild(li);
      }
    }

    // 数据渲染到HTML上
    this.banner.appendChild(fragmentBanner);
    this.tips.appendChild(fragmentTips);
  },





  init: function () {

  }
}