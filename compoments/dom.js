import BMap from 'BMap'
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

class TextCentent extends BMap.Overlay {
  constructor(point, propertie = {}) {
    super()
    this.point = point
    if (Object.keys(propertie).length === 0) {
      this.properties = {
        title: '热管与聚光式太阳能集热器效率测试实验(2018年)',
        text: '太阳能集热器实际效率与工作寿命，是主动式太阳能采暖系统的关键设计参数，本次研究主要对比新型聚光式与常规真空热管式的热效率区别，并为日喀则地区岗巴县太阳能设计提供关键设计参数。'
      }
    } else {
      this.properties = propertie
    }
  }

  initialize(map) {
    this._map = map
    var div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.zIndex = BMap.Overlay.getZIndex(this.point.lat)
    div.style.backgroundColor = '#fff'
    div.style.color = '#333'
    div.style.height = '260px'
    div.style.width = '330px'
    div.style.padding = '2px'
    div.style.lineHeight = '50px'
    div.style.whiteSpace = 'nowrap'
    div.style.MozUserSelect = 'none'
    div.style.fontSize = '12px'
    div.style.borderRadius = '10px'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.flexDirection = 'column'

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

    if ('imgSrc' in this.properties) {
      var img = document.createElement('img')
      img.style.width = '120px'
      img.src = this.properties.imgSrc
      div_Fragment.appendChild(img)
    }

    const template =
    `<div class="scroll-container" @mouseover="pauseScroll" @mouseout="resumeScroll">
      <ul id = "data-list" class = "data_list">
        <a href="${'url' in this.properties ? this.properties.url : 'http://data.cdqrmi.com/#/panel/index'}" target="_blank"><li>平均负荷：${this.properties.avg_load}</li></a>
        <a href="${'url' in this.properties ? this.properties.url : 'http://data.cdqrmi.com/#/panel/index'}" target="_blank"><li>累计CO2减少量：${this.properties.co2}</li></a>
        <a href="${'url' in this.properties ? this.properties.url : 'http://data.cdqrmi.com/#/panel/index'}" target="_blank"><li>累计节省费用：${this.properties.cost}</li></a>
      </ul>
    </div>`
    const divFragment = document.createRange().createContextualFragment(template)
    const _div = divFragment.querySelectorAll('.scroll-container')[0]

    _div.onmouseover = () => {
      var _list = document.getElementById('data-list')
      _list.style.animationPlayState = 'paused'
    }

    _div.onmouseout = () => {
      var _list = document.getElementById('data-list')
      _list.style.animationPlayState = 'running'
    }

    div_Fragment.appendChild(_div)

    var arrow = document.createElement('div')
    arrow.style.position = 'inherit'
    arrow.style.top = '266px'
    arrow.style.left = '155px'
    arrow.style.width = '0'
    arrow.style.height = '0'
    arrow.style.borderColor = 'white transparent transparent transparent'
    arrow.style.borderStyle = 'solid'
    arrow.style.borderWidth = '10px'
    arrow.style.overflow = 'hidden'
    div.appendChild(arrow)

    // div.onmouseover = () => {
    //   div.style.backgroundColor = 'skyblue'
    //   div.style.color = '#fff'
    //   span.style.color = '#fff'
    //   arrow.style.top = '266px'
    //   arrow.style.borderColor = 'skyblue transparent transparent transparent'
    // }

    // div.onmouseout = () => {
    //   div.style.backgroundColor = '#fff'
    //   div.style.color = '#333'
    //   span.style.color = '#333'
    //   arrow.style.borderColor = 'white transparent transparent transparent'
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
}

export {
  RadarOverlay,
  TextCentent
}
