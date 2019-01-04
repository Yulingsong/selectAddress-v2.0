# selectAddress-v2.0
web移动端地址选择控件封装精简版本



&#160;&#160;&#160;&#160;按照之前的约定，把之前地址选择控件进行了封装，做成了一个直接可以调用的版本，不用太多繁琐的东西，直接使用。

&#160;&#160;&#160;&#160;效果如图(跟之前一样)：
![效果图](https://upload-images.jianshu.io/upload_images/1062695-22b3275276e5155d.gif?imageMogr2/auto-orient/strip)

&#160;&#160;&#160;&#160;这次把jquery拿掉，全部都是用js原生写的，不过动态效果还没有加进去，不过凑合能用了，弹出效果暂时还没做，主要功能性的东西做出来了，后期有时间会做一下，不过到时候就不更新文章了。

&#160;&#160;&#160;&#160;没有其他兴趣的就直接看代码。[github selectAddress-v2.0](https://github.com/Yulingsong/selectAddress-v2.0)

接下去进去正题。这次封装多多少少也花了点时间，平时干活完整的封装一个插件次数还是不算多，这次正好借着这个机会，慢慢一步步的摸索出来封装成插件的一种方式。

# 第一步:创建基本文件，确定思路

&#160;&#160;&#160;&#160;创建项目之后，创建三个文件，分别是html，css，js文件。
![图片.png](https://upload-images.jianshu.io/upload_images/1062695-d13911affbc3a3b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&#160;&#160;&#160;&#160;这次封装的思路呢，是将js部分的声明一个对象，在对象中声明一个启动方法，把所有的逻辑部分内容放进这个启动方法里面。在调用方法弹出选择框的时候，将基本的接口数据，地址信息都传递过去，然后进行一些处理。

# 第二步:构建基本页面，编写css

&#160;&#160;&#160;&#160;那么首先构建基本的页面和样式。按照之前版本样式不变，只不过html部分只有基本的按钮就行。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>chooseAddress</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1, maximum-scale=1"/>
    <link rel="stylesheet" href="address.css">
</head>
<body>
<div class="but" onclick="show()">点击选择地址</div>

<div class="product_details_address" onclick="show()">
    <div class="choose_address jdshop_alignment_center">
        <div class="details_address">
            <div><span>送至</span>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAABj1BMVEUAAAD////mABKcAQ3mABLDABDFABDmABK+AQ++ARDmABLCABDmABLNABDCABDmABK+AQ/mABK8AQ++AQ/mABLMABC/ARDmABK8AQ/mABLiABK+AQ/mABK7AQ+6AQ/mABLmABK6AQ/mABK9AQ/mABK6AQ/XABHmABK6AQ++Dxy+EB2/FCHAFiPAFyTBABDCHyvDChnDIy/EJTHJOUTJOkXKPUfLP0nNRlDPTlfQVF3RV2DTX2fWABHXa3PZcnnad37cJDPcf4beho3fh47gi5LgjpXhj5bjABLkWGPlDyDlnqTmABLmARPmAhTmoafnparnpqvoEyToFiboGCjpGyvprLHprrPqJDPqKDfqKzrrMD/rMUDsUV3tRlPtR1TtvsLugYnuwsbvXWjvxMfwZnHwtLnxbnjxzM/xzdDyeoPy0NP0i5P0jpb0kpr1m6L3sbf3tLn34eP4vMH55+j56uv70tX78PH86uv87/D95uj96uv99/f9+fn+8vP+8/T++/v+/Pz+/f3/+/v//v7////fwfveAAAAKHRSTlMAAAIDCw0NDhERFRlCSEtdaXiFhYiQlKi0wMHJytLT5Obp6erq7vz8QGVO8AAAAbRJREFUOMuF1OVfAjEYB3BAFEUUURSxAIvZ3d0xsbvF7u6W+8Pdc8/dbQcov1e77ftZ3TaDMXYMRoMWk83p9vqp3+t22ky8WjAWh4fyeByWSGMvpPoU28OM2UUj4zKLxpqnVAdWNjeWJ1SUZ+XGrJC58xeJ5fl0RkVmzSgDBT8kJU/r6nCqseP3nsTzPaogOxoLrmj1RzDSa6+yOotsHPh1gx0cnYTkwkInVjvAmHDrluSWnRpC6g+hFKpC5DExY0N/AA23ZYSl8gHKHQSRjRknmjOoHyJyxqHcRxA5mXGjuYD6HjT9UB4kiNzMeNEcQ/0imi0odxFEXmb8aNbkibZAQ5s8/TqCyM+M+nPuoeFtoKl5+EteIXbJEO+HBiVdWhVDSvl8aOBeJLsqIUV8XZRuiqZBM7l8f1guOZnUCMni+8wy/66SuwpuUvn/0p2Odk58ccJ/Z5m4QjLFCckQzw9k9hHIdTknJYm6cwjZYIfns1HoJi3sPEO2JalbINkR9wJ2cn9aIPkJUe4XpWO1nBQk/3FPR6q1geLD73txGCpJ++/dAORLT4rytgjvT05miv79iZ1ftLMHLKmtwx4AAAAASUVORK5CYII=">
                <span id="product_address_show" style="max-width: 250px">北京市,北京市,朝阳区,建外街道</span></div>
        </div>
        <div class="details_stock">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABMlBMVEX///+KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiopnwFdMAAAAZXRSTlMAAQIDBAYHCgsMDg8UFRYYGhweJCYpLS4wMzc9QUJHSElLTlBUWltgZmhpcHF1d3t9gIGEhoiJi42TlpeZn6Gkpqesra6ytLm+v8THycvP0NLT1Nrc3+Pk5+jr7fDx8vP19vr9/vBx0x4AAAENSURBVBgZ7cFVVkIBFAXQ80RERVCxsbC7uxPEQrFb4XnmPwXvHcLhy7V0b/z77QauGlGBqoVvXsagy9IcRyAbp1uHbpVuErLgkCbMQBY7p/nshCx5T/PQBFnbG02hDrKeMk0uAtkY3QZ0S3RTkAX7NOEgZDVnNF9dkDXc0jylIGt9pbmuh6y7THNSDdkI3TZ083QzkAW7dMOQRU9pSmnI+uhuoGp/oXnvgKjlmeYjDVHqkabUC1HzHU05A1GiSBMOQRQv0ISjENVe0E1AFMvTTUMUzdHNQRQ5oluBKNij24Qo2KLbCSBaozuIQLRIl41CNEuXj0I0SXcWg2qZ5iIO3XjIYgKV6C8k8e+P+AHSCVwAt/Q8GwAAAABJRU5ErkJggg==">
        </div>
    </div>
</div>

</body>
<script src="address.js"></script>
</html>
```

&#160;&#160;&#160;&#160;上面那部分是基本的html，加上样式

```
body, html {
    -webkit-user-select: none;
    user-select: none
}

html {
    -webkit-text-size-adjust: 100%
}

body {
    line-height: 1.6;
    background-color: #f5f5f9;
    color: #4a4a4a;
    font-size: 14px;
    font-family: Arial, '微软雅黑', Helvetica Neue, Helvetica, sans-serif;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch
}

* {
    margin: 0;
    padding: 0
}

a img {
    border: 0
}

a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none
}

@font-face {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    font-family: Arial, '微软雅黑', Helvetica Neue, Helvetica, sans-serif
}

input, textarea {
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    font-size: inherit;
    color: inherit
}


.product_details_address {
    position: relative;
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 3px #e9e9e9;
}
.jdshop_alignment_center, .jdshop_alignment_middle, .jdshop_alignment_right, .jdshow_center_center {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.jdshop_alignment_bottom, .jdshop_alignment_center, .jdshop_alignment_top {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.jdshop_alignment_bottom, .jdshop_alignment_center, .jdshop_alignment_left, .jdshop_alignment_middle, .jdshop_alignment_right, .jdshop_alignment_top, .jdshow_center_center {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.details_address {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.product_details_address .choose_address .details_address div:first-child {
    height: 22px;
}
.details_address div {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.product_details_address .choose_address .details_address span:first-child {
    color: #8a8a8a;
}
.product_details_address .choose_address .details_address span {
    display: inline-block;
    color: #4a4a4a;
    margin-right: 10px;
    max-width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.product_details_address .choose_address .details_address img {
    width: 18px;
    height: 18px;
    margin: 2px 10px 2px 0;
}
.product_details_address .choose_address .details_address span {
    display: inline-block;
    color: #4a4a4a;
    margin-right: 10px;
    max-width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.but{
    margin: 0 auto;
    width: calc(50%);
    height: 30px;
    margin-top: 100px;
    background-color: lightcyan;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
}
.jdshop_alignment_middle{
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}


.yls_address_bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    z-index: 500;
    opacity: .3;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    touch-action: none
}
.yls_address_main {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #fff;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 3px #e9e9e9;
    -webkit-transform: translate3d(0, 120%, 0);
    transform: translate3d(0, 120%, 0);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    z-index: 1001;
    transform: translate3d(0, 0, 0);
}
.yls_address_pop_top {
    text-align: center;
    height: 50px;
    margin-bottom: 5px;
}
.yls_address_pop_title {
    height: 100%;
    line-height: 50px;
}
.yls_address_pop_cancel {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
}
.yls_address_pop_cancel::before, .yls_address_pop_cancel::after {
    content: '';
    width: 16px;
    height: 1px;
    background: #000;
    display: block;
    position: absolute;
    right: 10px;
    top: 25px;
}
.yls_address_pop_cancel::before {
    transform: rotate(45deg); /*进行旋转*/
}
.yls_address_pop_cancel::after {
    transform: rotate(-45deg);
}
.yls_address_pop_main {

}
.yls_address_product{

}
.yls_address_select{
    height: calc(60vh);
    width: 100%;
    position: relative;
    overflow: hidden;
}
.yls_address_top_address{
    font-size: 12px;
    height: 35px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
}
.yls_address_top_address>div{
    padding: 5px 5px;
    margin: 0 5px;
    white-space: nowrap;
}
.yls_address_top_address>div.show{
    color: #c91623;
    border-bottom: #c91623 1px solid;
}
.yls_address{
    position: absolute;
    left: 0;
    top: 45px;
    overflow: auto;
    width: 100%;
    height: calc(60vh - 35px);
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0);
    -webkit-transition: -webkit-transform .3s .2s;
    transition: -webkit-transform .3s .2s;
    transition: transform .3s .2s;
    transition: transform .3s .2s,-webkit-transform .3s .2s;
}
.yls_address p{
    padding: 8px 10px;
    font-size: 14px;
}
.yls_address p.p_show {
    position: relative;
    color: #c91623;
}
.yls_address.show {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}

```

&#160;&#160;&#160;&#160;上面css部分也是包含弹出框样式的，只是弹出框部分的html没有放在页面上，而是每次弹出的时候动态添加到页面上的，这样出来的效果是这样的，没啥别的，
![效果图1](https://upload-images.jianshu.io/upload_images/1062695-e590f9ac4fda84c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 第三步:了解调用方法数据结构

&#160;&#160;&#160;&#160;点击显示弹框的方法show中，需要这么写。其实这部分应该在完成整个js之后写的，不过放在前面也一样。

```
function show() {
        // 一般情况，在调用的时候，获取当前最新的地址数据，和对应的id
        var startId = [1804,1805,1829,1831];
        var startName = ['北京市','北京市','朝阳区','朝外街道'];
        var url = '';//你的请求url信息

        //声明对象，存放请求数据url，地址信息，和需要显示最后选择地址的元素，加上一个回调方法用来获取选择完毕之后的地址。
        var details = {
            url:url,
            startId:startId,
            startName:startName,
            targetDom:document.getElementById('product_address_show'),
            fn:function () {
                //在点击四级地址之后回调方法中可以获取到相应的数据
                console.log(yls_address.CityArr);
                console.log(yls_address.CityIdArr);
            }
        };
        //调用run方法进行弹出框以及选择地址。
        yls_address.run(details)
    }
```

# 第四步:编辑逻辑部分

#### 1:声明对象，声明方法

&#160;&#160;&#160;&#160;html部分的东西就这么多，上面这个其实就是使用方法，接下来是js文件的内容。有点不知道怎么分解了说了。
首先就是声明一个对象，在对象中声明一个方法。

```
var yls_address = {
//details就是调用的时候传进来的方法
    run: function (details) {
    }
}
```

#### 2:处理传递过来的数据，创建不同的变量赋值

&#160;&#160;&#160;&#160;接下来是先获取传过来details里面的一些数据。在run里面写

```
        var _this = this;
        //初始化id
        var thisStartId = details.startId;
        //初始化Name
        var thisStartName = details.startName;
        //获取请求url
        var thisUrl = details.url || '';
        //获取回调方法
        var thisFn = details.fn || '';
        //获取最后需要显示地址信息的元素，可有可无的
        var thisWrightHtml = details.targetDom || '';

        //因为要经常获取元素，所以把前缀单独声明了
        var ylsAd =  'yls_address_';
        var ylsTopAd =  'yls_top_address_';

        //判断初始数据是否正确
        if (thisStartName.length === thisStartName.length) {
            initHtml();//初始化html
            getData(0, 1, thisStartName[0],1);//获取数据
        } else {
            console.log('初始值出问题了');
        }
```

#### 3:初始化弹框html，添加到页面上

&#160;&#160;&#160;&#160;initHtml()这方法就是创建html并且初始化渲染到页面上，getData方法就是调用接口获取地址数据的。接下来就是初始化方法和获取数据方法的编写了。

```
         /**
         *
         初始化弹出框的html，去除一些样式
         *
         @method initHtml
         *
         */
        function initHtml() {
            //生成html添加到页面
            var thisInnerHtml = '<div class="yls_address_bg"></div>' +
                '<div class="yls_address_main">' +
                ' <div class="yls_address_pop_top">' +
                '<div class="yls_address_pop_title">请选择地址</div>' +
                '<div class="yls_address_pop_cancel"></div>' +
                '</div>' +
                '<div class="yls_address_pop_main">' +
                '<div class="yls_address_product">' +
                '<div class="yls_address_select">' +
                '<div class="yls_address_top_address jdshop_alignment_middle">' +
                '<div id="yls_top_address_1">请选择</div>' +
                '<div id="yls_top_address_2"></div>' +
                '<div id="yls_top_address_3"></div>' +
                '<div id="yls_top_address_4"></div>' +
                '<div id="yls_top_address_5"></div>' +
                '</div>' +
                '<div class="yls_address" id="yls_address_1"></div>' +
                '<div class="yls_address" id="yls_address_2"></div>' +
                '<div class="yls_address" id="yls_address_3"></div>' +
                '<div class="yls_address" id="yls_address_4"></div>' +
                '<div class="yls_address" id="yls_address_5"></div>' +
                '</div></div></div></div>';

            addNode("div", thisInnerHtml, "yls_address_choose", '');
            for(var i = 1; i <= thisStartId.length;i++){
                //获取每个地址列表
                var ad = document.getElementById(ylsAd + i);
                //获取四个顶部选中的地址
                var topad = document.getElementById(ylsTopAd + i);
                //清空地址列表
                ad.innerHTML = '';
                //清空地址列表
                ad.className = 'yls_address';
                //初始化列表的样式
                topad.innerHTML = '';
                //清空选中地址的样式
                topad.removeAttribute('class');
            }
        }

         /**
         *
         为页面添加html
         *
         @method addNode
         *
         @param tag 标签
         *
         @param innerHtml 标签内html
         *
         @param id 标签id
         *
         @param className 标签样式
         *
         */
        function addNode(tag, innerHtml, id, className) {
            var obj = document.createElement(tag);
            if (id) {
                obj.id = id;
            }
            if(className){
                obj.className=className
            }
            obj.innerHTML = innerHtml;
            document.body.appendChild(obj);
            return obj;
        }
```

#### 4:绑定关闭弹框事件，移除相应元素

&#160;&#160;&#160;&#160;再添加html到页面之后 并初始化，情况里面的内容，然后循环调用接口获取初始化的四级内容。不过与此同时先把背景和叉叉按钮上添加关闭弹框的点击事件，并且将移除元素的方法也写上。

```
         //绑定关闭按钮方法
        document.getElementsByClassName('yls_address_pop_cancel')[0].addEventListener("click",hideAddress,false);
        document.getElementsByClassName('yls_address_bg')[0].addEventListener("click",hideAddress,false);
         /**
         *
         将数据渲染到当前列表的方法
         *
         @method remove
         *
         @param _element 删除的元素
         *
         */
        function remove(_element) {
            var _parentElement = _element.parentNode;//找到父元素，然后删除
            if (_parentElement) {
                _parentElement.removeChild(_element);
            }
        }
         /**
         *
         隐藏弹框
         *
         @method hideAddress
         *
         */
        function hideAddress() {
            remove(document.getElementById("yls_address_choose"));
        }
```

#### 5:获取地址数据

&#160;&#160;&#160;&#160;获取数据方法

```
         /**
         *
         获取地址列表数据方法
         *
         @method getData
         *
         @param areaId 点选地址的areaid
         *
         @param addressNum yls_address是第几个
         *
         @param name 是点击选择的地址name
         *
         @param isInit 是点是初始化，1是初始化，0不是初始化
         *
         @return 返回值说明
         */
        function getData(areaId, addressNum, name, isInit){
            addressNum = parseInt(addressNum);//转成数字，防止变成字符串
            isInit = parseInt(isInit);//转成数字，防止变成字符串
            var addressUrl = thisUrl + areaId;
            //请求数据
            var xhr = function () {

                if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                }
                else {
                    return new ActiveObject('Micrsorf.XMLHttp');
                }
            }();
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4 && xhr.status === 200){

                    var res = JSON.parse(xhr.responseText);
                    // console.log(res.result);
                    if (isInit === 1 && addressNum < thisStartId.length) {
                        //初始化的时候循环请求数据
                        getData(thisStartId[addressNum - 1], (addressNum + 1), thisStartName[addressNum],1);
                    }
                    setPages(res.result, areaId, addressNum, name, isInit);
                }
            };
            xhr.open('get', addressUrl);
            xhr.send(null);
        }
```

#### 6:设置显示html，渲染页面，绑定相应的点击事件

&#160;&#160;&#160;&#160;获取数据请求全部都是用原生方法请求，然后成功获取数据之后进行循环请求，然后渲染页面方法

```
         /**
         *
         将数据渲染到当前列表的方法
         *
         @method setPages
         *
         @param data 获取到第addressNum列的数据
         *
         @param areaId 点选地址的areaid
         *
         @param addressNum yls_address是第几个
         *
         @param name 是点击选择的地址name
         *
         @param isInit 是点是初始化，1是初始化，0不是初始化
         *
         */
        function setPages(data, areaId, addressNum, name, isInit) {
            //转成数字，防止变成字符串
            addressNum = parseInt(addressNum);
            //转成数字，防止变成字符串
            isInit = parseInt(isInit);
            //声明变量以获得当前需要做处理的列表
            var current = 0;
            isInit === 1 ? current = addressNum : current = addressNum - 1;
            //获取当前需要渲染的地址列表
            var current_address = document.getElementById(ylsAd + current);
            //获取当前列表选中地址的顶部tab div
            var current_topAddress = document.getElementById(ylsTopAd + current);

            if(isInit === 1){
                //是初始化页面
                if (addressNum === thisStartId.length) {
                    //当渲染到最后一个列表的时候，添加上show，让他显示
                    current_address.className = 'yls_address show';
                    current_topAddress.className = 'show';
                }
                //当前标题tab上的name添加上去
                current_topAddress.innerHTML = name;
                //为每个标题tab设置属性
                current_topAddress.setAttribute('areaId', thisStartId[addressNum - 1]);
                //为每个标题tab添加点击事件
                current_topAddress.addEventListener("click", function () {
                    //获取到id上最后一位数字，然后根据数字进行相应的隐藏显示操作
                    var areaId = this.getAttribute('areaid');
                    var id_no = parseInt(current);
                    //循环进行判断添加显示
                    for (var i = 1; i < 5; i++) {
                        var top_id = 'yls_top_address_' + i;//获取到每一个顶部tab的id
                        var ad_id = 'yls_address_' + i;//获取到每一个列表address的id
                        document.getElementById(top_id).removeAttribute('class');
                        document.getElementById(ad_id).className = 'yls_address';
                        if (i === id_no) {
                            document.getElementById(top_id).className = 'show';
                            document.getElementById(ad_id).className = 'yls_address show';
                        }
                        if (i > id_no) {
                            document.getElementById(top_id).innerHTML = '';
                        }
                    }
                    //更新数据，截取到前面几位
                    thisStartId = thisStartId.slice(0, addressNum);
                    thisStartName = thisStartName.slice(0, addressNum);
                    // console.log(thisStartId);
                }, false);
                //清空列表html，拼接html
                current_address.innerHTML = '';
                //拼接html添加到div中
                setHtmls(current_address,data,addressNum, isInit);
            }else{
                //不是初始化页面

                //获取到下一级渲染列表的div
                var next_address = document.getElementById(ylsAd + addressNum);
                //获取到要下一级列表顶部的tab div
                var next_topAddress = document.getElementById(ylsTopAd + addressNum);
                //下一级标题显示请选择
                next_topAddress.innerHTML='请选择';
                //下一级标题添加红色样式
                next_topAddress.className='show';
                //当前标题去除红色样式
                current_topAddress.removeAttribute('class');
                //当前列表去除显示样式
                current_address.className = 'yls_address';
                //下一级列表添加显示样式
                next_address.className ='yls_address show';
                //下一级列表情况
                next_address.innerHTML = '';
                //拼接html添加到div中
                setHtmls(next_address,data,addressNum, isInit);
            }
        }
        /**
         *
         拼接html，添加到div中，并且绑定点击事件
         *
         @method setHtmls
         *
         @param data 获取到第addressNum列的数据
         *
         @param faEle 需要添加html的列表div
         *
         @param addressNum yls_address是第几个
         *
         @param isInit 是点是初始化，1是初始化，0不是初始化
         */
        function setHtmls(faEle, data, addressNum, isInit) {
            //拼接html
            var html = '';
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if ((thisStartName[addressNum - 1] === data[i].name) && isInit === 1) {
                        html += '<p class="p_show" id="add_' + data[i].areaId + '"  addressNum="' + addressNum + '" areaId="'+data[i].areaId+'">' + data[i].name + '</p>';
                    }else{
                        html += '<p id="add_' + data[i].areaId + '"  addressNum="' + addressNum + '" areaId="'+data[i].areaId+'">' + data[i].name + '</p>';
                    }
                }
                faEle.innerHTML = html;
            }
            //绑定点击事件
            var allP = faEle.getElementsByTagName('p');
            for (var j = 0; j < allP.length; j++) {
                allP[j].addEventListener('click', chooseAddress, false)
            }
        }
```

#### 7:实现点击地址列表中地址的方法

&#160;&#160;&#160;&#160;与此同时在方法中要为各个点击区域添加上点击事件，相应的切换四级的点击事件和具体点击选择当前列表中地址的点击事件。之后就是详细写明点击选择地址的时候触发的事件了。

```
         /**
         *
         点击列表中的地址触发的方法
         *
         @method chooseAddress
         *
         */
        function chooseAddress() {
            //获取现在点击的城市的id
            var areaId = this.getAttribute('id').split('_')[1];
            //获取我点击地址在第几个列表中
            var addressNum = parseInt(this.getAttribute('addressNum'));
            //获取现在点击的城市的name
            var name = this.innerHTML;
            //更新数据
            // console.log(parseInt(areaId));
            thisStartId[addressNum-1] = parseInt(areaId);
            thisStartName[addressNum-1] = name;

            //获取当前需要渲染的地址列表
            var current_address = document.getElementById(ylsAd + addressNum);
            //获取当前列表选中地址的顶部tab div
            var current_topAddress = document.getElementById(ylsTopAd + addressNum);
            //移除当前列表中所有的标红样式，然后添加到新选择的上面
            var pEles = current_address.getElementsByTagName('p');
            //是否对应areaId,不等于的将样式移除
            for(var i=0;i<pEles.length;i++){
                if(thisStartId[addressNum-1] === parseInt(pEles[i].getAttribute('areaId'))){
                    pEles[i].className = 'p_show';
                }else{
                    pEles[i].removeAttribute('class');
                }
            }
            //当前顶部tab换成点选的地址
            current_topAddress.innerHTML=name;

            //判断是否是最后一个列表，如果是，就不用请求新的数据，如果不是，就请求新的数据。
            if(addressNum === 4){
                //将文字显示到页面上
                thisWrightHtml.innerHTML = thisStartName;
                _this.CityArr = thisStartName;
                _this.CityIdArr = thisStartId;
                hideAddress();
                setTimeout(function () {
                    thisFn();
                },300)
            }else{
                //重新请求数据
                getData(areaId, (addressNum+1), name, 0);
            }
        }
```

&#160;&#160;&#160;&#160;写的有点乱，下面我就把整个js放出来，大家要是觉得上面的乱，可以看下面一目了然的代码。

```
var yls_address = {
    run: function (details) {
        var _this = this;
        //初始化id
        var thisStartId = details.startId;
        //初始化Name
        var thisStartName = details.startName;
        //获取请求url
        var thisUrl = details.url || '';
        //获取回调方法
        var thisFn = details.fn || '';
        //获取最后需要显示地址信息的元素，可有可无的
        var thisWrightHtml = details.targetDom || '';

        //因为要经常获取元素，所以把前缀单独声明了
        var ylsAd =  'yls_address_';
        var ylsTopAd =  'yls_top_address_';

        //判断初始数据是否正确
        if (thisStartName.length === thisStartName.length) {
            initHtml();//初始化html
            getData(0, 1, thisStartName[0],1);//获取数据
        } else {
            console.log('初始值出问题了');
        }

        //绑定关闭按钮方法
        document.getElementsByClassName('yls_address_pop_cancel')[0].addEventListener("click",hideAddress,false);
        document.getElementsByClassName('yls_address_bg')[0].addEventListener("click",hideAddress,false);
        /**
         *
         初始化弹出框的html，去除一些样式
         *
         @method initHtml
         *
         */
        function initHtml() {
            //生成html添加到页面
            var thisInnerHtml = '<div class="yls_address_bg"></div>' +
                '<div class="yls_address_main">' +
                ' <div class="yls_address_pop_top">' +
                '<div class="yls_address_pop_title">请选择地址</div>' +
                '<div class="yls_address_pop_cancel"></div>' +
                '</div>' +
                '<div class="yls_address_pop_main">' +
                '<div class="yls_address_product">' +
                '<div class="yls_address_select">' +
                '<div class="yls_address_top_address jdshop_alignment_middle">' +
                '<div id="yls_top_address_1">请选择</div>' +
                '<div id="yls_top_address_2"></div>' +
                '<div id="yls_top_address_3"></div>' +
                '<div id="yls_top_address_4"></div>' +
                '<div id="yls_top_address_5"></div>' +
                '</div>' +
                '<div class="yls_address" id="yls_address_1"></div>' +
                '<div class="yls_address" id="yls_address_2"></div>' +
                '<div class="yls_address" id="yls_address_3"></div>' +
                '<div class="yls_address" id="yls_address_4"></div>' +
                '<div class="yls_address" id="yls_address_5"></div>' +
                '</div></div></div></div>';

            addNode("div", thisInnerHtml, "yls_address_choose", '');
            for(var i = 1; i <= thisStartId.length;i++){
                //获取每个地址列表
                var ad = document.getElementById(ylsAd + i);
                //获取四个顶部选中的地址
                var topad = document.getElementById(ylsTopAd + i);
                //清空地址列表
                ad.innerHTML = '';
                //清空地址列表
                ad.className = 'yls_address';
                //初始化列表的样式
                topad.innerHTML = '';
                //清空选中地址的样式
                topad.removeAttribute('class');
            }
        }
        /**
         *
         获取地址列表数据方法
         *
         @method getData
         *
         @param areaId 点选地址的areaid
         *
         @param addressNum yls_address是第几个
         *
         @param name 是点击选择的地址name
         *
         @param isInit 是点是初始化，1是初始化，0不是初始化
         *
         @return 返回值说明
         */
        function getData(areaId, addressNum, name, isInit){
            addressNum = parseInt(addressNum);//转成数字，防止变成字符串
            isInit = parseInt(isInit);//转成数字，防止变成字符串
            var addressUrl = thisUrl + areaId;
            //请求数据
            var xhr = function () {

                if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                }
                else {
                    return new ActiveObject('Micrsorf.XMLHttp');
                }
            }();
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4 && xhr.status === 200){

                    var res = JSON.parse(xhr.responseText);
                    // console.log(res.result);
                    if (isInit === 1 && addressNum < thisStartId.length) {
                        //初始化的时候循环请求数据
                        getData(thisStartId[addressNum - 1], (addressNum + 1), thisStartName[addressNum],1);
                    }
                    setPages(res.result, areaId, addressNum, name, isInit);
                }
            };
            xhr.open('get', addressUrl);
            xhr.send(null);
        }
        /**
         *
         将数据渲染到当前列表的方法
         *
         @method setPages
         *
         @param data 获取到第addressNum列的数据
         *
         @param areaId 点选地址的areaid
         *
         @param addressNum yls_address是第几个
         *
         @param name 是点击选择的地址name
         *
         @param isInit 是点是初始化，1是初始化，0不是初始化
         *
         */
        function setPages(data, areaId, addressNum, name, isInit) {
            //转成数字，防止变成字符串
            addressNum = parseInt(addressNum);
            //转成数字，防止变成字符串
            isInit = parseInt(isInit);
            //声明变量以获得当前需要做处理的列表
            var current = 0;
            isInit === 1 ? current = addressNum : current = addressNum - 1;
            //获取当前需要渲染的地址列表
            var current_address = document.getElementById(ylsAd + current);
            //获取当前列表选中地址的顶部tab div
            var current_topAddress = document.getElementById(ylsTopAd + current);

            if(isInit === 1){
                //是初始化页面
                if (addressNum === thisStartId.length) {
                    //当渲染到最后一个列表的时候，添加上show，让他显示
                    current_address.className = 'yls_address show';
                    current_topAddress.className = 'show';
                }
                //当前标题tab上的name添加上去
                current_topAddress.innerHTML = name;
                //为每个标题tab设置属性
                current_topAddress.setAttribute('areaId', thisStartId[addressNum - 1]);
                //为每个标题tab添加点击事件
                current_topAddress.addEventListener("click", function () {
                    //获取到id上最后一位数字，然后根据数字进行相应的隐藏显示操作
                    var areaId = this.getAttribute('areaid');
                    var id_no = parseInt(current);
                    //循环进行判断添加显示
                    for (var i = 1; i < 5; i++) {
                        var top_id = 'yls_top_address_' + i;//获取到每一个顶部tab的id
                        var ad_id = 'yls_address_' + i;//获取到每一个列表address的id
                        document.getElementById(top_id).removeAttribute('class');
                        document.getElementById(ad_id).className = 'yls_address';
                        if (i === id_no) {
                            document.getElementById(top_id).className = 'show';
                            document.getElementById(ad_id).className = 'yls_address show';
                        }
                        if (i > id_no) {
                            document.getElementById(top_id).innerHTML = '';
                        }
                    }
                    //更新数据，截取到前面几位
                    thisStartId = thisStartId.slice(0, addressNum);
                    thisStartName = thisStartName.slice(0, addressNum);
                    // console.log(thisStartId);
                }, false);
                //清空列表html，拼接html
                current_address.innerHTML = '';
                //拼接html添加到div中
                setHtmls(current_address,data,addressNum, isInit);
            }else{
                //不是初始化页面

                //获取到下一级渲染列表的div
                var next_address = document.getElementById(ylsAd + addressNum);
                //获取到要下一级列表顶部的tab div
                var next_topAddress = document.getElementById(ylsTopAd + addressNum);
                //下一级标题显示请选择
                next_topAddress.innerHTML='请选择';
                //下一级标题添加红色样式
                next_topAddress.className='show';
                //当前标题去除红色样式
                current_topAddress.removeAttribute('class');
                //当前列表去除显示样式
                current_address.className = 'yls_address';
                //下一级列表添加显示样式
                next_address.className ='yls_address show';
                //下一级列表情况
                next_address.innerHTML = '';
                //拼接html添加到div中
                setHtmls(next_address,data,addressNum, isInit);
            }
        }
        /**
         *
         拼接html，添加到div中，并且绑定点击事件
         *
         @method setHtmls
         *
         @param data 获取到第addressNum列的数据
         *
         @param faEle 需要添加html的列表div
         *
         @param addressNum yls_address是第几个
         *
         @param isInit 是点是初始化，1是初始化，0不是初始化
         */
        function setHtmls(faEle, data, addressNum, isInit) {
            //拼接html
            var html = '';
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if ((thisStartName[addressNum - 1] === data[i].name) && isInit === 1) {
                        html += '<p class="p_show" id="add_' + data[i].areaId + '"  addressNum="' + addressNum + '" areaId="'+data[i].areaId+'">' + data[i].name + '</p>';
                    }else{
                        html += '<p id="add_' + data[i].areaId + '"  addressNum="' + addressNum + '" areaId="'+data[i].areaId+'">' + data[i].name + '</p>';
                    }
                }
                faEle.innerHTML = html;
            }
            //绑定点击事件
            var allP = faEle.getElementsByTagName('p');
            for (var j = 0; j < allP.length; j++) {
                allP[j].addEventListener('click', chooseAddress, false)
            }
        }
        /**
         *
         点击列表中的地址触发的方法
         *
         @method chooseAddress
         *
         */
        function chooseAddress() {
            //获取现在点击的城市的id
            var areaId = this.getAttribute('id').split('_')[1];
            //获取我点击地址在第几个列表中
            var addressNum = parseInt(this.getAttribute('addressNum'));
            //获取现在点击的城市的name
            var name = this.innerHTML;
            //更新数据
            // console.log(parseInt(areaId));
            thisStartId[addressNum-1] = parseInt(areaId);
            thisStartName[addressNum-1] = name;

            //获取当前需要渲染的地址列表
            var current_address = document.getElementById(ylsAd + addressNum);
            //获取当前列表选中地址的顶部tab div
            var current_topAddress = document.getElementById(ylsTopAd + addressNum);
            //移除当前列表中所有的标红样式，然后添加到新选择的上面
            var pEles = current_address.getElementsByTagName('p');
            //是否对应areaId,不等于的将样式移除
            for(var i=0;i<pEles.length;i++){
                if(thisStartId[addressNum-1] === parseInt(pEles[i].getAttribute('areaId'))){
                    pEles[i].className = 'p_show';
                }else{
                    pEles[i].removeAttribute('class');
                }
            }
            //当前顶部tab换成点选的地址
            current_topAddress.innerHTML=name;

            //判断是否是最后一个列表，如果是，就不用请求新的数据，如果不是，就请求新的数据。
            if(addressNum === 4){
                //将文字显示到页面上
                thisWrightHtml.innerHTML = thisStartName;
                _this.CityArr = thisStartName;
                _this.CityIdArr = thisStartId;
                hideAddress();
                setTimeout(function () {
                    thisFn();
                },300)
            }else{
                //重新请求数据
                getData(areaId, (addressNum+1), name, 0);
            }
        }
        /**
         *
         隐藏弹框
         *
         @method hideAddress
         *
         */
        function hideAddress() {
            remove(document.getElementById("yls_address_choose"));
        }
        /**
         *
         为页面添加html
         *
         @method addNode
         *
         @param tag 标签
         *
         @param innerHtml 标签内html
         *
         @param id 标签id
         *
         @param className 标签样式
         *
         */
        function addNode(tag, innerHtml, id, className) {
            var obj = document.createElement(tag);
            if (id) {
                obj.id = id;
            }
            if(className){
                obj.className=className
            }
            obj.innerHTML = innerHtml;
            document.body.appendChild(obj);
            return obj;
        }
        /**
         *
         将数据渲染到当前列表的方法
         *
         @method remove
         *
         @param _element 删除的元素
         *
         */
        function remove(_element) {
            var _parentElement = _element.parentNode;//找到父元素，然后删除
            if (_parentElement) {
                _parentElement.removeChild(_element);
            }
        }
    }
}
```

&#160;&#160;&#160;&#160;以上就是所有的代码分解，其实总的来说难度比较低，在v1.0的版本下进行封装的话就更简单了，就是把一堆东西塞进一个方法里面。看着简单点，到时候写起来也简洁一点。

&#160;&#160;&#160;&#160;调用方法在写js之前就写了，也很简单，就是把几个数据凑一块组成对象，塞进方法里面。当前2.0版本的代码还是有很多地方可以优化。不过暂时满足我项目需要，就不做太多的改动，之后要是有更新也不会更新到文章里面了。只会直接更新到github上了。

&#160;&#160;&#160;&#160;还有就是目前这个弹框还有两个问题，一个是动效还没加，一个是没有去做蒙板弹出，滑动地址列表数据的时候，底层可能也会跟着一块滚动的问题，不过解决起来不难，要是真有兴趣看到这里的朋友可以自己试一试。当然，我估计应该没啥人能看到这里了。。

&#160;&#160;&#160;&#160;同样，有什么问题可以留言讨论，大家一起进步。

&#160;&#160;&#160;&#160;OVER！













