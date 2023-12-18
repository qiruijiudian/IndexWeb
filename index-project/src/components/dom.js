// import { BaiduMap as BMap } from 'vue-baidu-map'
import BMap from 'BMap'

class PieOverlay extends BMap.Overlay {
  constructor(point, propertie = {}) {
    super()
    this.point = point
    this.size = 80
    if (propertie.projectName == "拉萨市") {
      this.size = 100
    }
    this.properties = propertie
  }

  initialize(map) {
    this._map = map;
    var container = document.createElement("div")
    container.style.position = "absolute"
    container.id = this.properties.id
    container.style.width = `${this.size}px`
    container.style.height = `${this.size}px`
    map.getPanes().labelPane.appendChild(container)
    this._container = container

    var canvas = document.createElement("canvas")
    canvas.width = this.size
    canvas.height = this.size
    container.appendChild(canvas)
    this._canvas = canvas

    container.onmouseover = () => {
      var that = this
      var _layer = document.getElementById(container.id)
      _layer.style.zIndex = that.getHighestZIndex() + 1
      this.showPopover()
    }
    this._createPie();
    return container;
  }

  _createPie() { 
    var total = 0
    var kinds = 0
    for (const key in this.properties.kind) {
      console.log(key + ': ' + this.properties.kind[key])
      total += this.properties.kind[key]
      kinds += 1
    }
    
    var startAngle = 0
    // var colors = ["rgba(242, 200, 15, 0.6)", "rgba(55, 70, 73, 0.6)", "rgba(166, 105, 153, 0.6)", "rgba(253, 98, 94, 0.6)", "rgba(1, 184, 170, 0.6)", "rgba(14,147,46, 0.6)"] // 颜色数组，可根据需要自定义
    var colors = {"build":"rgba(253, 98, 94, 0.6)", "design":"rgba(1, 184, 170, 0.6)", "maintenance":"rgba(14, 147, 46, 0.6)"}
    var i = 0

    
    var ctx = this._canvas.getContext("2d");
    var centerX = this.size / 2;
    var centerY = this.size / 2;
    var radius = this.size / 2;

    for (const _key in this.properties.kind) {
      var angle = (1 / kinds) * Math.PI * 2;
      var endAngle = startAngle + angle;
      console.log('color : ', colors[i % colors.length], 'totol', total, _key)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[_key]
      ctx.fill();
      // 添加边框颜色
      ctx.strokeStyle = "rgb(179, 137, 0)"; // 边框颜色，可根据需要自定义
      ctx.lineWidth = 1; // 边框宽度，可根据需要自定义
      ctx.stroke();

      // 绘制区块文本
      var text = this.properties.kind[_key];
      ctx.font = "bold 16px Arial"; // 区块文本字体样式，可根据需要自定义
      ctx.fillStyle = "#000000"; // 区块文本颜色，可根据需要自定义
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var textAngle = startAngle + angle / 2;
      var textX = centerX + Math.cos(textAngle) * radius * 0.6;
      var textY = centerY + Math.sin(textAngle) * radius * 0.6;
      ctx.fillText(text, textX, textY);

      startAngle = endAngle;
      i += 1;
    }

    // // 绘制标题文本
    // var title = this.properties.projectName;
    // ctx.font = "bold 14px Arial"; // 标题字体样式，可根据需要自定义
    // ctx.fillStyle = "#000000"; // 标题颜色，可根据需要自定义
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(title, centerX, centerY)
  }

  getHighestZIndex() {
    var elements = document.getElementsByTagName('*');
    var highestZIndex = Number.MIN_SAFE_INTEGER;

    for (var i = 0; i < elements.length; i++) {
      var zIndex = parseInt(window.getComputedStyle(elements[i]).getPropertyValue('z-index'));

      if (zIndex > highestZIndex && zIndex !== 'auto') {
        highestZIndex = zIndex;
      }
    }

    return highestZIndex;
  }

  showPopover() {
    // const content = JSON.stringify(this.properties.kind);
    // 创建一个弹出框元素
    const popover = document.createElement('div')
    const title = document.createElement('div')
    title.className = 'popover-title'
    title.innerHTML = this.properties.projectName

    popover.className = 'popover'
    popover.style.backgroundColor = '#ffffff'
    popover.style.border = '1px solid #cccccc'
    popover.style.boxShadow = ' 0 2px 4px rgba(0, 0, 0, 0.1)'
    popover.style.padding = '10px'
    popover.style.borderRadius= '4px'
    popover.style.fontFamily = 'Arial, sans-serif'
    popover.style.fontSize = '14px'
    popover.style.width = '200px'
    popover.style.color = '#333333'

    popover.appendChild(title)
    
    var key_map = {"build" : "施工", "design": "设计", "maintenance":"维护"}
    // var temp_dom = []

    for (const _key in this.properties.kind) { 
      const p1 = document.createElement('div')
      p1.className = 'p1'
      p1.innerHTML = `${key_map[_key]}项目数: ` + this.properties.kind[_key]
      popover.appendChild(p1)
    }


    // popover.innerHTML += content

    // 根据标题的长度调整弹出框的宽度
    // const titleWidth = title.offsetWidth
    // popover.style.width = titleWidth + 'px'

    // 设置弹出框的位置
    const position = this._map.pointToOverlayPixel(this.point)
    popover.style.left = position.x + 'px';
    popover.style.top = position.y - 20 + 'px'

    // 将弹出框添加到地图容器中
    this._map.getPanes().floatPane.appendChild(popover)

    // 鼠标移出覆盖物时，隐藏弹出框
    this._container.onmouseout = () => {
      this.hidePopover(popover)
    }
  }

  hidePopover(popover) {
    // 从地图容器中移除弹出框
    this._map.getPanes().floatPane.removeChild(popover);
  }

  draw() {
    // 根据地理坐标转换为像素坐标，并设置给容器
    const position = this._map.pointToOverlayPixel(this.point)
    this._container.style.left = `${position.x - this.size / 2}px`
    this._container.style.top = `${position.y - this.size / 2}px`
  }
}

class MutiShapeOverlay_2 extends BMap.Overlay {
  constructor(point, propertie = {}) {
    super()
    this.point = point
    this.size = 15
    switch (propertie.level) {
      case 'city':
        // this.size = 20
        this.imgClass = 'city_width'
        break;
      case 'town':
        // this.size = 15
        this.imgClass = 'town_width'
        break;
      case 'unit':
        // this.size = 12.5
        this.imgClass = 'unit_width'
        break;
      case 'plot':
        // this.size = 7.5
        this.imgClass = 'plot_width'
        break;
      default:
        break;
    }
    this.properties = propertie
  }

  initialize(map) {
    this._map = map
    let template = ``
    let selector = '.MutiShapeOverlay-div'

    switch (this.properties.sort) {
      case 'build':
        template = `<div class="MutiShapeOverlay-div" id = ${this.properties.name}>
                      <img class = "${this.imgClass}" src = "http://cdqrmi.com/DataCenter/project_imgs/circle_city.png"/>
                    </div>`
        break;
      case 'design':
        template = `<div class="MutiShapeOverlay-div" id = ${this.properties.name}>
                      <img class = "${this.imgClass}" src = "http://cdqrmi.com/DataCenter/project_imgs/circle_green.png"/>
                    </div>`
        break;
      case 'maintenance':
        template = `<div class="MutiShapeOverlay-div" id = ${this.properties.name}>
                      <img class = "${this.imgClass}" src = "http://cdqrmi.com/DataCenter/project_imgs/circle_bule.png"/>
                    </div>`
        break;
      default:
        template = `<div class="MutiShapeOverlay-div" id = ${this.properties.name}>
                      <img class = "${this.imgClass}" src = "http://cdqrmi.com/DataCenter/project_imgs/circle_city.png"/>
                    </div>`
        break;
    }
    if (this.properties.level == 'city') { 
      template = `<div class="MutiShapeOverlay-div" id = ${this.properties.name} style= "z-index : 99">
                      <img class = "${this.imgClass}" src = "http://cdqrmi.com/DataCenter/project_imgs/circle_key.png"/>
                    </div>`
    }
    // console.log('selector', this.properties)
    const divFragment = document.createRange().createContextualFragment(template)
    const div = divFragment.querySelectorAll(selector)[0]
    map.getPanes().markerPane.appendChild(div)
    this._div = div
    div.onmouseover = () => {
      this.showPopover()
    }
    div.onclick = () => {
      var dom = document.getElementById(this.properties.name)
      console.log('1', dom.style.opacity)
      if (dom.style.opacity == 0.7) { 
        dom.style.opacity = 1
      } else {
        dom.style.opacity = 0.7
      }
    }
    return div
  }

  showPopover() {
    const content = this.properties.text;
    // 创建一个弹出框元素
    const popover = document.createElement('div')
    const title = document.createElement('div')
    title.className = 'popover-title'
    title.innerHTML = this.properties.title

    popover.className = 'popover'
    popover.style.backgroundColor = '#ffffff'
    popover.style.border = '1px solid #cccccc'
    popover.style.boxShadow = ' 0 2px 4px rgba(0, 0, 0, 0.1)'
    popover.style.padding = '10px'
    popover.style.borderRadius= '4px'
    popover.style.fontFamily = 'Arial, sans-serif'
    popover.style.fontSize = '14px'
    popover.style.width = '200px'
    popover.style.color = '#333333'

    popover.appendChild(title)
    popover.innerHTML += content

    // 根据标题的长度调整弹出框的宽度
    // const titleWidth = title.offsetWidth
    // popover.style.width = titleWidth + 'px'

    // 设置弹出框的位置
    const position = this._map.pointToOverlayPixel(this.point)
    popover.style.left = position.x + 'px';
    popover.style.top = position.y - 20 + 'px'

    // 将弹出框添加到地图容器中
    this._map.getPanes().floatPane.appendChild(popover)

    // 鼠标移出覆盖物时，隐藏弹出框
    this._div.onmouseout = () => {
      this.hidePopover(popover)
    }
  }

  hidePopover(popover) {
    // 从地图容器中移除弹出框
    this._map.getPanes().floatPane.removeChild(popover);
  }

  draw() {
    // 根据地理坐标转换为像素坐标，并设置给容器
    const position = this._map.pointToOverlayPixel(this.point)
    this._div.style.left = `${position.x - this.size / 2}px`
    this._div.style.top = `${position.y - this.size / 2}px`
  }
}
class RadarOverlay extends BMap.Overlay {
  constructor(point, size) {
    super()
    this.point = point
    this.size = size
  }

  initialize(map) {
    this._map = map
    const template = `<div class="radar-box">
        <div class="radar">
          <div class="ripple"></div>
          <div class="ripple"></div>
          <div class="ripple"></div>
        </div>
      </div>`
    const divFragment = document.createRange().createContextualFragment(template)
    const div = divFragment.querySelectorAll('.radar-box')[0]
    map.getPanes().markerPane.appendChild(div)
    this._div = div
    return div
  }

  draw() {
    // 根据地理坐标转换为像素坐标，并设置给容器
    const position = this._map.pointToOverlayPixel(this.point)
    this._div.style.left = `${position.x - this.size / 2}px`
    this._div.style.top = `${position.y - this.size / 2}px`
  }
}

class MapCircleOverlay extends BMap.Overlay {
  constructor(point, size, propertie = {}) {
    super()
    this.point = point
    this.size = size
    this.properties = propertie
  }

  initialize(map) {
    this._map = map
    var that = this
    const template = `<div class="map-circle">
        <div class = 'circle_text'>  
          <p>${that.properties.projectName}</p>
          <p>${that.properties.projectNum}个</p>
        </div>
      </div>`
    const divFragment = document.createRange().createContextualFragment(template)
    const div = divFragment.querySelectorAll('.map-circle')[0]
    map.getPanes().markerPane.appendChild(div)
    this._div = div
    // 添加鼠标悬停事件监听器
    if (this.properties.projectName != '军区相关项目') {
      div.addEventListener('click', () => {
      that.handleClick()
    })
    }
    return div
  }
  handleClick() {
    // 处理鼠标悬停事件的逻辑
    this._map.centerAndZoom(this.properties.clickPoint, 14)
  }
  draw() {
    // 根据地理坐标转换为像素坐标，并设置给容器
    const position = this._map.pointToOverlayPixel(this.point)
    this._div.style.left = `${position.x - this.size / 2}px`
    this._div.style.top = `${position.y - this.size / 2}px`
  }
}

class TextCentent extends BMap.Overlay {
  constructor(point, propertie = {}) {
    super()
    this.point = point
    if (Object.keys(propertie).length === 0) {
      this.properties = {
        title: '热管与聚光式太阳能集热器效率测试实验(2018年)',
        name: '',
        text: '太阳能集热器实际效率与工作寿命，是主动式太阳能采暖系统的关键设计参数，本次研究主要对比新型聚光式与常规真空热管式的热效率区别，并为日喀则地区岗巴县太阳能设计提供关键设计参数。'
      }
    } else {
      this.properties = propertie
    }
  }

  initialize(map) {
    this._map = map
    var div = document.createElement('div')
    div.id = 'layer'+ this.properties.name
    div.style.position = 'absolute'
    div.style.zIndex = BMap.Overlay.getZIndex(this.point.lat)
    div.style.backgroundColor = '#fff'
    div.style.color = '#333'
    if ('imgSrc' in this.properties && this.properties.imgSrc) {
      div.style.height = '260px'
      div.style.width = '330px'
    } else { 
      div.style.height = '100px'
      div.style.width = '330px'
    }

    div.style.padding = '2px'
    div.style.lineHeight = '50px'
    div.style.whiteSpace = 'normal'
    div.style.MozUserSelect = 'none'
    div.style.fontSize = '12px'
    div.style.borderRadius = '10px'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.flexDirection = 'column'

    var layer_id = 'layer'+ this.properties.name

    var title = document.createElement('div')
    title.style.display = 'block'
    title.style.lineHeight = '16px'
    title.style.fontSize = '16px'
    title.style.fontWeight = '700'
    div.appendChild(title)
    title.appendChild(document.createTextNode(this.properties.title))

    var span = document.createElement('span')
    span.style.wordWrap = 'break-word'
    span.style.lineHeight = '16px'
    span.style.whiteSpace = 'normal'
    span.style.padding = '10px'
    span.style.color = '#666'
    div.appendChild(span)
    span.appendChild(document.createTextNode(this.properties.text))

    var box_div = `<div class="div_box"></div>`
    const _Fragment = document.createRange().createContextualFragment(box_div)
    const div_Fragment = _Fragment.querySelectorAll('.div_box')[0]
    div.appendChild(div_Fragment)

    if ('imgSrc' in this.properties && this.properties.imgSrc) {
      var img = document.createElement('img')
      img.style.width = '120px'
      img.src = this.properties.imgSrc
      div_Fragment.appendChild(img)

      var ul_id = 'data-list' + this.properties.name

      const template =
        `<div class="scroll-container" @mouseover="pauseScroll" @mouseout="resumeScroll">
        <ul id = "${ul_id}" class = "data_list">
          <a href="${'url' in this.properties ? this.properties.url : 'http://data.cdqrmi.com/#/panel/index'}" target="_blank"><li>平均负荷：${'avg_load' in this.properties? this.properties.avg_load :'1377kW'}</li></a>
          <a href="${'url' in this.properties ? this.properties.url : 'http://data.cdqrmi.com/#/panel/index'}" target="_blank"><li>累计CO2减少量：${'co2' in this.properties? this.properties.co2 : '22158吨'}</li></a>
          <a href="${'url' in this.properties ? this.properties.url : 'http://data.cdqrmi.com/#/panel/index'}" target="_blank"><li>累计节省费用：${'cost' in this.properties? this.properties.cost : '886万元'}</li></a>
        </ul>
      </div>`
      const divFragment = document.createRange().createContextualFragment(template)
      const _div = divFragment.querySelectorAll('.scroll-container')[0]
        
      _div.onmouseover = () => {
        var _list = document.getElementById(ul_id)
        _list.style.animationPlayState = 'paused'
      }

      _div.onmouseout = () => {
        var _list = document.getElementById(ul_id)
        _list.style.animationPlayState = 'running'
      }

      div_Fragment.appendChild(_div)
    }


    var arrow = document.createElement('div')
    arrow.style.position = 'inherit'
    if ('imgSrc' in this.properties && this.properties.imgSrc) {
      arrow.style.top = '266px'
    } else { 
      arrow.style.top = '106px'
    }
    // arrow.style.top = '266px'
    arrow.style.left = '155px'
    arrow.style.width = '0'
    arrow.style.height = '0'
    arrow.style.borderColor = 'white transparent transparent transparent'
    arrow.style.borderStyle = 'solid'
    arrow.style.borderWidth = '10px'
    arrow.style.overflow = 'hidden'
    div.appendChild(arrow)

    div.onmouseover = () => {
      var that = this
      var _layer = document.getElementById(layer_id)
      _layer.style.zIndex = that.getHighestZIndex() + 1
    }

    // div.onmouseout = () => {
    // }

    map.getPanes().markerPane.appendChild(div)
    this._div = div
    return div
  }

  draw() {
    // var that = this
    // 根据地理坐标转换为像素坐标，并设置给容器
    var position = this._map.pointToOverlayPixel(this.point)
    var extractedNumber_width = this._div.style.width.match(/\d+/)[0]
    var extractedNumber_height = this._div.style.height.match(/\d+/)[0]
    this._div.style.left = `${position.x - (extractedNumber_width / 2)}px`
    this._div.style.top = `${position.y - extractedNumber_height - 10}px`
  }

  getHighestZIndex() {
    var elements = document.getElementsByTagName('*');
    var highestZIndex = Number.MIN_SAFE_INTEGER;

    for (var i = 0; i < elements.length; i++) {
      var zIndex = parseInt(window.getComputedStyle(elements[i]).getPropertyValue('z-index'));

      if (zIndex > highestZIndex && zIndex !== 'auto') {
        highestZIndex = zIndex;
      }
    }

    return highestZIndex;
  }

}

export {
  RadarOverlay,
  TextCentent,
  MapCircleOverlay,
  PieOverlay,
  MutiShapeOverlay_2
}
