<template>
    <div class = "map" id = "container"></div>
</template>
<script src="http://api.map.baidu.com/api?v=3.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x"></script>
<script>
// import 'echarts/extension/bmap/bmap'
import BMap from 'BMap'
import {RadarOverlay, TextCentent} from './dom'
// import './server'
export default {
  data() {
    return {
      form: {}
    }
  },
  // created(){
  // },
  mounted() {
    // const script = document.createElement('script')
    // script.src = 'http://api.map.baidu.com/api?v=3.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x'
    // script.onload = this.initializeMap
    // document.head.appendChild(script)
    // eslint-disable-next-line no-undef
    this.createMysqlCon()
  },
  computed:{
    origin() {
      return window.location.origin
    }
  },
  methods: {
    getShortUrl(){
      // a30c5ea5-0b50-11ee-8d2b-c7382613edaf
      loadGenerate('22c9d630-5dc4-11ee-9f07-9745522ba61e').then(res => {
        const {
          valid,
          enablePwd,
          pwd,
          uri,
          overTime
        } = res.data
        this.valid = valid
        this.form.enablePwd = enablePwd
        this.form.uri = uri ? (this.origin + uri) : uri
        // console.log('this.form.uri : ', this.form.uri,' uri ',  uri)
        this.createMysqlCon()
      })
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
      var that = this
      try {
        this.form.uri = 'www.cdqrmi.com'
        const map = new BMap.Map('container', { enableMapClick: false })
        const point = new BMap.Point(88.522129, 28.277643)
        map.centerAndZoom(point, 17)
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
        const radar = new RadarOverlay(point, 40)
        // 添加自定义覆盖物
        map.addOverlay(radar)

        const point3 = new BMap.Point(117.404, 34.915)
        const Text = new TextCentent(point,
        {
          title: '热管与聚光式太阳能集热器效率测试实验',
          text: '太阳能集热器实际效率与工作寿命，是主动式太阳能采暖系统的关键设计参数，本次研究主要对比新型聚光式与常规真空热管式的热效率区别，并为日喀则地区岗巴县太阳能设计提供关键设计参数。',
          imgSrc : "http://cdqrmi.com/DataCenter/kamba.jpg",
          url: this.form.uri,
          avg_load : this.form.avg_load,
          co2 : this.form.co2,
          cost : this.form.cost
        })
        console.log('this.form.uri 2', this.form.uri)
        // 添加自定义覆盖物
        map.addOverlay(Text)
        // radar.addEventListener('click', () => {
        //   map.openInfoWindow(infoWindow, point2) // 开启信息窗口
        // })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
  .map {
      width: 100%;
      height: 100%;
  }

  .radar-box {
    position: absolute;
    .radar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: red;
      position: relative;
    }

    .radar .ripple {
      width: 40px;
      height: 40px;
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
      animation-delay: -1s; /* 延迟1秒开始滚动 */

      li {
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
  }
</style>
