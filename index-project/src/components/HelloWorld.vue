<template>
  <div>
    <div class="map" id="container"></div>
    <ul class="btn-wrap" style="z-index: 99;">
        <li class = "btn" @click = "getDesignInfo()">查看设计项目</li>
        <li class = "btn" @click = "getBuildInfo()">查看施工项目</li>
    </ul>
  </div>
</template>


<!-- <script src="http://api.map.baidu.com/api?v=3.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x"></script> -->
<script>
// import 'echarts/extension/bmap/bmap'
// import { MP } from './map'
import BMap from 'BMap'
import Design_Property from './design_properties.json'
import Build_Property from './build_properties.json'
import {RadarOverlay, TextCentent, MapCircleOverlay } from './dom'
// import './server'
export default {
  data() {
    return {
      form: {},
      overlays: [],
      layer_exists: true,
      circle_text_overlay: [],
      design_project_num: {},
      build_project_num: {},
      map: {},
      type: 'design'
    }
  },
  // created() {
  //   this.CreateOverlayLarge()
  // },
  mounted() {
    const script = document.createElement('script')
    script.src = 'http://api.map.baidu.com/api?v=3.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x'
    this.map = new BMap.Map('container', { enableMapClick: false })
    script.onload = this.createMysqlCon(this.map)
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
    getlocNum() { 
      this.design_project_num = {}
      this.build_project_num = {}
      Design_Property.forEach((item) => {
        if (item.location in this.design_project_num) {
          this.design_project_num[item.location] += 1
        } else {
          this.design_project_num[item.location] = 1
        }
      })
      Build_Property.forEach((item) => {
        if (item.location in this.build_project_num) {
          this.build_project_num[item.location] += 1
        } else {
          this.build_project_num[item.location] = 1
        }
      })
    },
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
          this.initializeMap(this.map)
        })
        .catch(error => {
          console.error('Error fetching data: ', error)
          this.form.avg_load = '1377kW'
          this.form.co2 = '22158吨'
          this.form.cost = '886万元'
          this.initializeMap(this.map)
        })
    },
    initializeMap(map, Property = Design_Property) {
      try {
        this.getlocNum()
        this.form.uri = 'http://data.cdqrmi.com/#/delink?link=wiIQsbbnOcRrvXdKNpiR51lgdIQuXw73PnK211Ym7BYd2KSmO85R9l7zHRHPUS7b6YDNlEGLSgqeSxg3JLjiAw&user=uHNsqts9HzrQ%2BlCtonkCoXK9B0hy2x57cBcoo3DnNBwAcsx7haa3wxCxe5AKuOiGCnzx8XHa5uGpsew748KZzA'
        // const map = new BMap.Map('container', { enableMapClick: false })
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
        // this.CreateOverlay(map, point)
        this.CreateOverlayLarge(map, Property)
        map.addEventListener("zoomend", () => {
          var that = this
          var zoom = map.getZoom()
          if (zoom < 12 && that.layer_exists) {
            map.clearOverlays(that.overlays)
            that.createMapCircleOverlay(map)
            that.layer_exists = false
          }
          if (zoom >= 12 && !that.layer_exists) {
            if (that.circle_text_overlay) {
              map.clearOverlays(that.circle_text_overlay)
            }
            // that.CreateOverlay(map, point)
            that.CreateOverlayLarge(map, Property)
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
    CreateOverlayLarge(map, Property = Design_Property) {
      // var that = this
      // project_num = {}
      const text_layer = []
      const rader_layer = []
      Property.forEach((item) => {
        var Map_point = new BMap.Point(item["point"][0], item["point"][1])
        if (item.text != "") {
          text_layer.push(
            new TextCentent(Map_point,
              {
                title: item.title,
                text: item.text,
                imgSrc: item.imgSrc || '',
                url: this.form.uri,
                avg_load: this.form.avg_load,
                co2: this.form.co2,
                cost: this.form.cost,
                name: item.name
              })
          )
          rader_layer.push(new RadarOverlay(Map_point, 20))
        }
      })
      for (let index = 0; index < rader_layer.length; index++) {
        map.addOverlay(rader_layer[index])
      }
      for (let index = 0; index < text_layer.length; index++) {
        map.addOverlay(text_layer[index])
      }
    },
    createMapCircleOverlay(map) {
      var that = this
      var project_num = that.design_project_num
      if (that.type == 'build') { 
        project_num = that.build_project_num
      }else{ 
        project_num = that.design_project_num
      }
      console.log('that ', project_num)
      var point_Kamba_Town = new BMap.Point(88.480673, 28.224317)
      var point_Cona_Xian = new BMap.Point(91.963748, 27.996766)
      // var point_Tianjin_City = new BMap.Point(117.206489, 39.106812)
      var point_Lasa_city = new BMap.Point(91.146321, 29.660194)
      var point_Shannan_city = new BMap.Point(91.767756, 29.251851)
      var point_arm_project = new BMap.Point(93.505387, 28.448879)
      
      var circleLayerList = []
      const MapCircle_Kamba_Town = new MapCircleOverlay(point_Kamba_Town, 20, {
        clickPoint: new BMap.Point(88.522129, 28.277643),
        projectName: '岗巴县项目',
        projectNum: project_num['Rikaze'] || 1
      })
      const MapCircle_Cona_Town = new MapCircleOverlay(point_Cona_Xian, 20, {
        clickPoint: point_Cona_Xian,
        projectName: '错那市项目',
        projectNum: project_num['Cona'] || 1
      })
      // const MapCircle_Tianjin_City = new MapCircleOverlay(point_Tianjin_City, 20, {
      //   clickPoint: new BMap.Point(117.206489, 39.106812),
      //   projectName: '天津市项目',
      //   projectNum: project_num['TianJing'] || 1
      // })
      const MapCircle_Lasa_city = new MapCircleOverlay(point_Lasa_city, 20, {
        clickPoint: new BMap.Point(91.146321, 29.660194),
        projectName: '拉萨市项目',
        projectNum: project_num['Lhasa'] || 1
      })
      const MapCircle_Shannan_city = new MapCircleOverlay(point_Shannan_city, 20, {
        clickPoint: new BMap.Point(91.349078, 29.255213),
        projectName: '山南市项目',
        projectNum: project_num['Shannan'] || 1
      })
      const MapCircle_arm_project = new MapCircleOverlay(point_arm_project, 20, {
        clickPoint: new BMap.Point(91.349078, 29.255213),
        projectName: '军区相关项目',
        projectNum: project_num['arm'] || 1
      })

      circleLayerList.push(MapCircle_Kamba_Town, MapCircle_Cona_Town, MapCircle_Lasa_city, MapCircle_Shannan_city, MapCircle_arm_project)
      console.log('circleLayerList ', circleLayerList)
      circleLayerList.forEach((item) => { 
        map.addOverlay(item)
      })
      // this.circle_text_overlay.push(MapCircle_Kamba_Town)
    },
    getDesignInfo() {
      this.map.clearOverlays()
      this.map.removeEventListener("zoomend")
      this.type = 'design'
      this.layer_exists = true
      this.initializeMap(this.map, Design_Property)
    },
    getBuildInfo() {
      this.map.clearOverlays()
      this.map.removeEventListener("zoomend")
      this.type = 'build'
      this.layer_exists = true
      this.initializeMap(this.map, Build_Property)
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
    height: 110px;
    width: 110px;
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
      margin: 20px 0 -5px 0;
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
}

ul li {
    list-style: none;
}
.btn-wrap {
    z-index: 999;
    position: relative;
    bottom: 4rem;
    margin-left: 0rem;
    // padding: 1rem 1rem;
    border-radius: 0.25rem;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    height: 60px;
    width: max-content;
    padding: 6px 0px 0px 0px;
}
.btn {
    cursor: pointer;
    float: left;
    background-color: #fff;
    color: rgba(27, 142, 236, 1);
    font-size: 14px;
    border:1px solid rgba(27, 142, 236, 1);
    border-radius: 5px;
    margin: 0 5px;
    text-align: center;
    line-height: 30px;
}
.btn:hover {
    background-color: rgba(27, 142, 236, 0.8);
    color: #fff;
}

#triangle-down {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
}

#star-six {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
  position: relative;
}
#star-six:after {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
  position: absolute;
  content: "";
  top: 30px;
  left: -50px;
}

#burst-8 {
  background: red;
  width: 80px;
  height: 80px;
  position: relative;
  text-align: center;
  transform: rotate(20deg);
}
#burst-8:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  width: 80px;
  background: red;
  transform: rotate(135deg);
}

#burst-12 {
  background: red;
  width: 80px;
  height: 80px;
  position: relative;
  text-align: center;
}
#burst-12:before,
#burst-12:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  width: 80px;
  background: red;
}
#burst-12:before {
  transform: rotate(30deg);
}
#burst-12:after {
  transform: rotate(60deg);
}

</style>
