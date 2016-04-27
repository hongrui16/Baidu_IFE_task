/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var aqiTable = document.getElementById('aqi-table');
var cityInput = document.getElementById('aqi-city-input');
var aqiInput = document.getElementById('aqi-value-input');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
	/** 
	 * 判断输入的城市名格式是否符合要求
	 */
	var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();

    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格，改变边框样式
 */
function renderAqiList() {
	var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";  //有city数据和没有city数据时
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	delete aqiData[city];
    renderAqiList();
}

function init() {
    // 给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById('add-btn');
    if (addBtn.addEventListener) {
    	addBtn.addEventListener("click", addBtnHandle);
    } else if (addBtn.attachEvent) {
    	addBtn.attachEvent("onclick", addBtnHandle);
    }
    // 给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    if (aqiTable.addEventListener) {
    	aqiTable.addEventListener("click", function(event){
        	if(event.target.nodeName.toLowerCase() === 'button') 
        		delBtnHandle.call(null, event.target.dataset.city);
    	});
    } else if (aqiTable.attachEvent) {
    	aqiTable.attachEvent("onclick", function(event){               //event.target:检测是否为按钮触发的事件。
        	if(event.target.nodeName.toLowerCase() === 'button') 
        		delBtnHandle.call(event.target.dataset.city);     //dataset是html5中的新属性,call方法改变方法delBtnHandle中的city引用
    	});
    }
}

init();