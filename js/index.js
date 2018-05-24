// 主页各模块
var components = {
  ywHeader: document.getElementById('commonHeaderWrap'),
  ywAppWrap: document.getElementById('AppWrap'),
  ywBrandWrap: document.getElementById('brandWrap'),
  ywNewsWrap: document.getElementById('newsWrap'),
  ywContactWrap: document.getElementById('commonContactWrap')
}

// 各组件的offsetTop
var comonentsOff = {
  header: components.ywHeader.offsetTop,
  appWrap: components.ywAppWrap.offsetTop,
  brandWrap: components.ywBrandWrap.offsetTop,
  newsWrap: components.ywNewsWrap.offsetTop,
  contactWrap: components.ywContactWrap.offsetTop
}

// 新闻列表数据， copyright全版权数据
var newsData = null,
  copyrightData = null;

/*********************************************************************/

// 切换头部样式
function switchHeaderStyle() {
  // 添加自定义属性，保存当前scroll值
  var curScrollTop = 0;

  // 为窗口绑定滚动事件
  $.addEventHandler(window, 'scroll', function (event) {
    curScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (!curScrollTop) {
      $.removeClass(components.ywHeader, 'yw-header-fixed')
    } else {
      $.addClass(components.ywHeader, 'yw-header-fixed');
    }

    switchNavTabStyle(curScrollTop);
  })
}

// 添加头部导航栏nav-tab样式
function switchNavTabStyle(val) {
  var navTabs = $.getElementsByClass('yw-nav-a');

  // 切换nav-item
  function switchClass(context, element, className) {
    // 删除作用域内所有的class
    for (var i = 0; i < context.length; i++) {
      $.removeClass(context[i], className);
    }

    // 为当前样式添加Class
    $.addClass(element, className)
  }

  //
  if (val > comonentsOff.header && val < comonentsOff.appWrap - 100) {
    switchClass(navTabs, navTabs[0], 'active');
  } else if (val > comonentsOff.appWrap - 100 && val < comonentsOff.brandWrap - 100) {
    switchClass(navTabs, navTabs[1], 'active');
  } else if (val > comonentsOff.brandWrap - 100 && val < comonentsOff.newsWrap - 100) {
    switchClass(navTabs, navTabs[2], 'active');
  } else if (val > comonentsOff.newsWrap - 100 && val < comonentsOff.contactWrap - 100) {
    switchClass(navTabs, navTabs[3], 'active');
  }
}

// 轮播图展示
function bannerSwitch() {
  var bannerContent = $.getElementsByClass('yw-banner-content')[0],
    bannerSlideArr = $.getElementsByClass('yw-banner-slide');

  var curIndex = 0,
    autoPlayTimer = null;

  // 自动切换
  function autoPlay() {
    var bannerDot = document.getElementById('ywBannerDot'),
      bannerDotli = bannerDot.getElementsByTagName('li');
    var sliderLen = bannerSlideArr.length;
    if (curIndex >= sliderLen) {
      curIndex = 0;
    }

    for (var i = 0; i < sliderLen; i++) {
      $.css(bannerSlideArr[i], {
        'opacity': 0
      });

      $.removeClass(bannerDotli[i], 'actived');
    }

    animate(bannerSlideArr[curIndex], {
      'opacity': 1
    }, 200);

    $.addClass(bannerDotli[curIndex], 'actived');
  }

  // 设置定时器
  function setPlay(time) {
    return setInterval(function () {
      curIndex++;
      autoPlay();
    }, time);
  }

  // 添加轮播图导航按钮
  function createBannerNavDOM(id, className) {
    var div = document.createElement('div'),
      ul = document.createElement('ul');
    for (var i = 0; i < bannerSlideArr.length; i++) {
      var li = document.createElement('li');
      li.index = i;
      if (i === 0) {
        li.className = 'actived';
      }
      ul.appendChild(li);
    }

    div.id = id;
    div.className = className;

    div.appendChild(ul);
    bannerContent.appendChild(div);
  }

  // 导航按钮点击跳转
  function bannerNavEvent() {
    var ywBannerDot = document.getElementById('ywBannerDot');
    ywBannerDot.onclick = function (ev) {
      var target = ev.target || window.event;
      curIndex = target.index;
      autoPlay();
    }
  }

  // 进入或离开停止轮播动画
  bannerContent.onmouseenter = function () {
    clearInterval(autoPlayTimer)
  };
  bannerContent.onmouseleave = function () {
    autoPlayTimer = setPlay(3000);
  };

  (function () {
    autoPlayTimer = setPlay(3000);
    createBannerNavDOM('ywBannerDot', 'yw-banner-dot');
    bannerNavEvent();
  })()
}

// copyright全版权运营滚动图数据绑定
function renderCopyrightData() {
  var ywCpShow_0 = document.getElementById('ywCpShow_0'),
    ywCpShow_1 = document.getElementById('ywCpShow_1'),
    copyrightImgList = ywCpShow_0.getElementsByTagName('img');

  var fragment = document.createDocumentFragment();

  // 创建HTML DOM结构
  function createCopyrightDOM() {
    if (copyrightData) {
      for (var index = 0; index < copyrightData.length; index++) {
        // 创建各个元素标签
        var li = document.createElement('li'),
          divImg = document.createElement('div'),
          img = document.createElement('img'),
          divDesc = document.createElement('div'),
          divCon = document.createElement('div'),
          p = document.createElement('p'),
          i = document.createElement('i');

        // 为元素添加Class属性
        li.className = 'yw-copyright-show-li';
        divImg.className = 'yw-copyright-show-li-item';
        img.className = 'yw-cp-img';
        divDesc.className = 'yw-min-desc';
        divCon.className = 'yw-min-con';
        p.className = '"yw-cp-p"';
        i.className = 'yw-cp-i';

        // 绑定数据
        img.src = copyrightData[index].src;
        img.alt = copyrightData[index].title;
        p.textContent = copyrightData[index].desc;

        // 添加元素
        divImg.appendChild(img);
        divDesc.appendChild(divCon);
        divCon.appendChild(p);
        divDesc.appendChild(i);
        li.appendChild(divImg);
        li.appendChild(divDesc);

        fragment.appendChild(li);
      }
    }
  }

  // 插入HTML
  function insertCopyrightHTML() {
    var clone = fragment.cloneNode(true);
    ywCpShow_0.appendChild(fragment);
    ywCpShow_1.appendChild(clone);
  }

  // copyright滚动效果
  function translateX() {
    function createTimer(ele, flag, time) {
      return window.setInterval(function () {
        ele.flagX--;
        ele.style.transform = 'translateX(' + ele.flagX + 'px)';
      }, time);
    }

    function bindClearTimer(ele) {
      ele.onmouseenter = function (ev) {
        clearInterval(this.timer);
      };
    }

    function bindAddTimer(ele, time) {
      ele.onmouseleave = function (ev) {
        this.timer = createTimer(this, this.flagX, time);
      };
    }

    ywCpShow_0.flagX = 0;
    ywCpShow_1.flagX = 0;

    // 创建定时器
    ywCpShow_0.timer = createTimer(ywCpShow_0, ywCpShow_0.flagX, 80);
    ywCpShow_1.timer = createTimer(ywCpShow_1, ywCpShow_1.flagX, 50);

    // 绑定鼠标进入后停止移动
    bindClearTimer(ywCpShow_0);
    bindClearTimer(ywCpShow_1);

    // 绑定鼠标离开后继续移动
    bindAddTimer(ywCpShow_0, 80);
    bindAddTimer(ywCpShow_1, 50)
  };

  // 图片赖加载
  function lazyLoad() {
    function loop(j) {
      var currentImg = copyrightImgList[j];
      var customImg = new Image;
      customImg.src = currentImg.mySrc;

      customImg.onload = function () {
        currentImg.src = this.src;
      }
      console.log(currentImg);

      customImg = null;
    }

    for (var i = 0; i < copyrightImgList.length; i++) {
      loop(i);
    }
  }

  (function () {
    createCopyrightDOM();
    insertCopyrightHTML();
    translateX()
    // lazyLoad();
  })()

}

// 移动产品切换
function switchAppView() {
  var tapApp = document.getElementById('tapApp'),
    appTabNav = tapApp.firstElementChild,
    appTabNavLi = $.children(appTabNav);

  var tabLine = document.getElementById('tabLine');

  var ywAppMainLi = $.getElementsByClass('yw-app-tab-main-li');

  function switchNavLi(index) {
    var targetWidth = Math.ceil($.css(this, 'width'));
    $.css(tabLine, {width: targetWidth});

    animate(tabLine, {
      left: this.offsetLeft
    }, 200);

  }

  function switchMainLi(index) {
    for (var i = 0; i < this.length; i++) {
      $.css(this[i], {display: 'none'});
    }
    $.css(this[index], {display: 'block'});
  }

  // 给每个li元素添加索引index
  for (var i = 0; i < appTabNavLi.length; i++) {
    appTabNavLi[i].index = i;
  }


  appTabNav.onclick = function (ev) {
    var target = ev.target || window.event;
    if (target.tagName.toUpperCase() === 'LI') {
      switchNavLi.call(target);
      switchMainLi.call(ywAppMainLi, target.index);
    }
  };
}

// 旗下品牌
function renderBrand() {
  var ywBrandDescribe = document.getElementById('ywBrandDescribe'),
    ywBrandDescribeLogo = ywBrandDescribe.firstElementChild,
    ywBrandDescribeP = ywBrandDescribe.lastElementChild,
    brandUlListBtn = document.getElementById('brandUlListBtn');

  var timer = null;

  var prevClassName = '';

  var curTitle = '',
    curClassName = '',
    curDescribe = null;

  function switchBrandShow(target){
    clearTimeout(timer);
    timer = setTimeout(function () {
      curTitle = target.title;
      curClassName = target.firstElementChild.className.slice(14);
      curDescribe = target.lastElementChild;
      prevClassName = ywBrandDescribeLogo.className.slice(23);

      ywBrandDescribeLogo.classList.remove(prevClassName);
      ywBrandDescribeLogo.classList.add(curClassName);

      console.log(target.firstElementChild.className,ywBrandDescribeLogo.className);

      ywBrandDescribeP.innerHTML = curDescribe.innerHTML;

    }, 300);
  }

  /*
  * 说明：在ul元素上使用事件代理，用冒泡触发切换
  * */
  brandUlListBtn.onmouseover = function (ev) {
    var target = ev.target || window.target;
    if (target.tagName.toLocaleUpperCase() === 'A' && curTitle !== target.title) {
      switchBrandShow(target);
    }
  };
}

// 新闻加载
function renderNewsList() {
  if (newsData) {
    var newsUl = document.getElementById('yw_news_ul');
    var newsDialogUl = document.getElementById('news_dialog_ul');

    function createNewsListData(newsData, inx) {
      var newsFragment = document.createDocumentFragment();
      var data = newsData;
      var index = inx || newsData.length;

      for (var i = 0; i < index; i++) {
        // 创建各个元素标签
        var li = document.createElement('li'),
          h5 = divImg = document.createElement('h5'),
          titleA = document.createElement('a');
        p = document.createElement('p'),
          p1 = document.createElement('p'),
          span = document.createElement('span'),
          span1 = document.createElement('span'),
          a = document.createElement('a');

        // 添加Class
        li.className = 'yw-news-li';
        h5.className = 'yw-news-title';
        p.className = 'yw-news-time';
        p1.className = 'yw-news-desc';
        span.className = 'yw-news-tag';
        span1.className = 'yw-news-date';
        a.className = 'yw-news-more';

        // 添加数据
        span.textContent = data[i].category;
        span1.textContent = data[i].updated_at;
        p1.textContent = data[i].desc;

        a.href = data[i].url;
        a.target = '_blank';
        a.textContent = '阅读更多>'

        titleA.href = data[i].url;
        titleA.target = '_blank';
        titleA.textContent = data[i].title;

        h5.appendChild(titleA);
        p.appendChild(span);
        p.appendChild(span1);
        li.appendChild(h5);
        li.appendChild(p);
        li.appendChild(p1);
        li.appendChild(a);

        newsFragment.appendChild(li);
      }

      return newsFragment;
    }

    // 插入DOM
    function insertNewsHTML(element, inx) {
      var data = createNewsListData(newsData, inx)
      element.appendChild(data);
    }

    // 新闻查看更多
    function showNewsDialog() {
      var newsDialog = document.getElementById('yw_news_dialog'),
        newsDialogCloseBtn = document.getElementById('news_dialog_close_btn'),
        newsDialogMoreBtn = document.getElementById('news_dialog_more_btn');

      var data = createNewsListData(newsData);
      newsDialogUl.appendChild(data);

      newsDialogCloseBtn.onclick = function () {
        newsDialog.style.display = 'none';
      }
      newsDialogMoreBtn.onclick = function () {
        newsDialog.style.display = 'block';
      }
    }

    (function () {
      insertNewsHTML(newsUl, 4);
      showNewsDialog();
    })()
  }
}

window.onload = function () {
  switchHeaderStyle();
  bannerSwitch();
  switchAppView();
  renderBrand();

  // 获取版权信息
  $.ajax({
    type: 'get',
    url: './js/copyright.json',
    async: true,
    success: function (responseData) {
      copyrightData = responseData;
      renderCopyrightData();
    }
  });

  // 获取新闻信息
  $.ajax({
    type: 'get',
    url: './js/FeHelper-20180124152420.json',
    async: true,
    success: function (responseData) {
      newsData = responseData.data.listInfo;
      renderNewsList();
    }
  });


}