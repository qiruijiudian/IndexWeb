<template>
  <div class="map" id="container"></div>
</template>


<!-- <script src="http://api.map.baidu.com/api?v=3.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x"></script> -->
<script>
// import 'echarts/extension/bmap/bmap'
// import { MP } from './map'
import BMap from 'BMap'
import {RadarOverlay, TextCentent, MapCircleOverlay } from './dom'
// import './server'
export default {
  data() {
    return {
      form: {},
      overlays: [],
      layer_exists: true
    }
  },
  // created(){
  // },
  mounted() {
    const script = document.createElement('script')
    script.src = 'http://api.map.baidu.com/api?v=3.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x'
    script.onload = this.createMysqlCon
    document.head.appendChild(script)
    // MP().then(BMap => this.createMysqlCon(BMap))
    // eslint-disable-next-line no-undef
    // this.createMysqlCon()
  },
  computed:{
    origin() {
      return window.location.origin
    }
  },
  methods: {
    getShortUrl() {
      // a30c5ea5-0b50-11ee-8d2b-c7382613edaf
      // loadGenerate('22c9d630-5dc4-11ee-9f07-9745522ba61e').then(res => {
      //   const {
      //     valid,
      //     enablePwd,
      //     pwd,
      //     uri,
      //     overTime
      //   } = res.data
      //   this.valid = valid
      //   this.form.enablePwd = enablePwd
      //   this.form.uri = uri ? (this.origin + uri) : uri
      //   // console.log('this.form.uri : ', this.form.uri,' uri ',  uri)
      //   this.createMysqlCon()
      // })
    },
    createMysqlCon(){
      fetch('http://localhost:8000/kamba/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: "panel_data", autotime : true })
        })
        .then(response => response.json())
        .then(data => {
          console.log(' fetching data: ', data)
          this.form.avg_load = data.avg_load
          this.form.co2 = data.co2
          this.form.cost = data.cost
          this.initializeMap()
        })
        .catch(error => {
          console.error('Error fetching data: ', error)
          this.form.avg_load = '1377kW'
          this.form.co2 = '22158吨'
          this.form.cost = '886万元'
          this.initializeMap()
        })
    },
    initializeMap() {
      try {
        this.form.uri = 'http://data.cdqrmi.com/#/delink?link=wiIQsbbnOcRrvXdKNpiR51lgdIQuXw73PnK211Ym7BYd2KSmO85R9l7zHRHPUS7b6YDNlEGLSgqeSxg3JLjiAw&user=uHNsqts9HzrQ%2BlCtonkCoXK9B0hy2x57cBcoo3DnNBwAcsx7haa3wxCxe5AKuOiGCnzx8XHa5uGpsew748KZzA'
        const map = new BMap.Map('container', { enableMapClick: false })
        const point = new BMap.Point(88.522129, 28.277643)
        map.centerAndZoom(point, 14)
        map.enableScrollWheelZoom(true)

        // eslint-disable-next-line no-undef
        map.setMapType(BMAP_NORMAL_MAP)
        map.addControl(new BMap.MapTypeControl({
          mapTypes: [
            // eslint-disable-next-line no-undef
            BMAP_NORMAL_MAP,
            // eslint-disable-next-line no-undef
            BMAP_HYBRID_MAP
          ]
        }))
        this.CreateOverlay(map, point)
        map.addEventListener("zoomend", () => {
          var that = this
          var zoom = map.getZoom()
          if (zoom < 12 && that.layer_exists) {
            map.clearOverlays(that.overlays)
            that.createMapCircleOverlay(map)
            that.layer_exists = false
          }
          if (zoom >= 12 && !that.layer_exists) {
            that.CreateOverlay(map, point) 
            that.layer_exists = true
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    CreateOverlay(map, point) { 
      const radar = new RadarOverlay(point, 20)
      // 添加自定义覆盖物
      map.addOverlay(radar)

      const Text_Kamba_Xian = new TextCentent(point,
        {
          title: '热管与聚光式太阳能集热器效率测试实验',
          text: '太阳能集热器实际效率与工作寿命，是主动式太阳能采暖系统的关键设计参数，本次研究主要对比新型聚光式与常规真空热管式的热效率区别，并为日喀则地区岗巴县太阳能设计提供关键设计参数。',
          imgSrc: "http://cdqrmi.com/DataCenter/kamba.jpg",
          url: this.form.uri,
          avg_load: this.form.avg_load,
          co2: this.form.co2,
          cost: this.form.cost,
          name: 'kamba_Xian'
        })
      // 添加自定义覆盖物
      map.addOverlay(Text_Kamba_Xian)

      var point_Kamba_Town = new BMap.Point(88.480673, 28.224317)
      const radar_Kamba_Town = new RadarOverlay(point_Kamba_Town, 20)
      // 添加自定义覆盖物
      map.addOverlay(radar_Kamba_Town)
      const Text_Kamba_Town = new TextCentent(point_Kamba_Town,
        {
          title: '岗巴县孔玛乡被动式采暖试点工程(2017年)',
          text: '被动式太阳能+电暖片组合式系统采暖，系统简单可靠，建筑同寿命；每户耗电6元/月，基本实现“零能耗”供暖。',
          imgSrc: "http://cdqrmi.com/DataCenter/kamba.jpg",
          url: this.form.uri,
          avg_load: this.form.avg_load,
          co2: this.form.co2,
          cost: this.form.cost,
          name: 'kamba'
        })
      // 添加自定义覆盖物
      map.addOverlay(Text_Kamba_Town)

      var point_Cona_Xian = new BMap.Point(91.963748, 27.996766)
      const radar_Cona_Xian = new RadarOverlay(point_Cona_Xian, 20)
      // 添加自定义覆盖物
      map.addOverlay(radar_Cona_Xian)
      const Text_Cona_Xian = new TextCentent(point_Cona_Xian,
        {
          title: '错那县城地热供暖施工（2015-2017年）',
          text: '采用丰富的地热资源+水源热泵机组，末端采用风机盘管及地盘管，商铺采用电采暖。',
          imgSrc: "http://cdqrmi.com/DataCenter/kamba.jpg",
          url: this.form.uri,
          avg_load: this.form.avg_load,
          co2: this.form.co2,
          cost: this.form.cost,
          name: 'Cona'
        })
      // 添加自定义覆盖物
      map.addOverlay(Text_Cona_Xian)
      this.overlays.push(radar, radar_Kamba_Town, radar_Cona_Xian, Text_Cona_Xian, Text_Kamba_Town, Text_Kamba_Xian)
    },
    createMapCircleOverlay(map) { 
      var point_Kamba_Town = new BMap.Point(88.480673, 28.224317)
      const MapCircle_Kamba_Town = new MapCircleOverlay(point_Kamba_Town, 20)
      // 添加自定义覆盖物
      map.addOverlay(MapCircle_Kamba_Town)
    }
  }
}
</script>
<style lang="scss">
.map {
  width: 100%;
  height: 1100px;
}

.map-circle {
    position: absolute;
    height: 99px;
    width: 99px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    cursor: pointer;
    font-size: 13px;
    text-align: center;
    color: #fff;
    background: rgba(43, 160, 43, .9);
    margin-top: -33px;
    margin-left: -33px;

  .circle_text {

    p {
      margin: 15px 0 0 0;
      color: #ffffff;
    }
  }
}
.map-circle:hover {
    background: #EE5D5B;
    z-index: 99;
}
.radar-box {
  position: absolute;

  .radar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    position: relative;
  }

  .radar .ripple {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid red;
    animation: ripple 2s linear infinite;
  }

  .radar :nth-child(1) {
    animation-delay: 0.666s;
  }

  .radar :nth-child(2) {
    animation-delay: 1.322s;
  }

  @keyframes ripple {
    to {
      width: 150px;
      height: 150px;
      opacity: 0;
    }
  }
}

.div_box {
  display: flex;
}

.scroll-container {
  height: 90px;
  margin-left: 0px;
  overflow: hidden;
  padding: 10px;

  .data_list {
    cursor: pointer;
    list-style: none;
    margin: 0;
    padding: 0;
    animation: scroll 10s linear infinite;
    animation-delay: -1s;
    /* 延迟1秒开始滚动 */

    a {
      text-decoration: none;
    }

    li {
      text-decoration: none;
      margin: 10px 0;
      padding: 10px;
      background-color: #f9f9f9;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

}

@keyframes scroll {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(calc(-100% + 50px));
  }
}</style>
