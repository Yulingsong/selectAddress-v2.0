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
            return false;
        }


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

            //绑定关闭按钮方法
            document.getElementsByClassName('yls_address_pop_cancel')[0].addEventListener("click",hideAddress,false);
            document.getElementsByClassName('yls_address_bg')[0].addEventListener("click",hideAddress,false);

            toggleBody(1);
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
            toggleBody(0);
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

        function toggleBody(isPin) {
            if (isPin) {
                document.body.style.height = '100vh'
                document.body.style['overflow-y'] = 'hidden'
            } else {
                document.body.style.height = 'unset'
                document.body.style['overflow-y'] = 'auto'
            }
        }
    }
}