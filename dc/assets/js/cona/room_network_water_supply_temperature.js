//***************获取元素*************************
var f2_HHWLoop001_ST_dom = document.getElementById("f2_HHWLoop001_ST");
var f3_HHWLoop001_ST_dom = document.getElementById("f3_HHWLoop001_ST");
var f3_HHWLoop002_ST_dom = document.getElementById("f3_HHWLoop002_ST");
var f3_HHWLoop003_ST_dom = document.getElementById("f3_HHWLoop003_ST");
var f4_HHWLoop001_ST_dom = document.getElementById("f4_HHWLoop001_ST");
var f5_HHWLoop001_ST_dom = document.getElementById("f5_HHWLoop001_ST");

//***************初始化图表***********************************
var f2_HHWLoop001_ST_chart = echarts.init(f2_HHWLoop001_ST_dom);
var f3_HHWLoop001_ST_chart = echarts.init(f3_HHWLoop001_ST_dom);
var f3_HHWLoop002_ST_chart = echarts.init(f3_HHWLoop002_ST_dom);
var f3_HHWLoop003_ST_chart = echarts.init(f3_HHWLoop003_ST_dom);
var f4_HHWLoop001_ST_chart = echarts.init(f4_HHWLoop001_ST_dom);
var f5_HHWLoop001_ST_chart = echarts.init(f5_HHWLoop001_ST_dom);

loading_all(
    [
        f2_HHWLoop001_ST_chart,
        f3_HHWLoop001_ST_chart,
        f3_HHWLoop002_ST_chart,
        f3_HHWLoop003_ST_chart,
        f4_HHWLoop001_ST_chart,
        f5_HHWLoop001_ST_chart
    ]
);

//*************定义数据************************************
function get_options(data, hint){
    var options = {
        grid:{
            x:75,
            x2:90,
        },
        xAxis: {
            name: '温度（℃）'
        },
        yAxis: {
            name: hint + '（℃）'
        },
        tooltip: {
            formatter: function(param) {
                var value = param.value;
                return '温度：' + value[0] + '<br/>' + hint + '：' + value[1];
            }
        },
        series: [{
            symbolSize: 15,
            data: data,
            type: 'scatter'
        }]
    };
    return options
}

try {
    // room_network_water_supply_temperature
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_room_network_water_supply_temperature",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                f2_HHWLoop001_ST_chart.hideLoading();
                f2_HHWLoop001_ST_chart.setOption(
                    get_options(data['f2_HHWLoop001_ST'], '供水温度')
                );

                f3_HHWLoop001_ST_chart.hideLoading();
                f3_HHWLoop001_ST_chart.setOption(
                    get_options(data['f3_HHWLoop001_ST'], '供水温度')
                );

                f3_HHWLoop002_ST_chart.hideLoading();
                f3_HHWLoop002_ST_chart.setOption(
                    get_options(data['f3_HHWLoop002_ST'], '供水温度')
                );

                f3_HHWLoop003_ST_chart.hideLoading();
                f3_HHWLoop003_ST_chart.setOption(
                    get_options(data['f3_HHWLoop003_ST'], '供水温度')
                );

                f4_HHWLoop001_ST_chart.hideLoading();
                f4_HHWLoop001_ST_chart.setOption(
                    get_options(data['f4_HHWLoop001_ST'], '供水温度')
                );

                f5_HHWLoop001_ST_chart.hideLoading();
                f5_HHWLoop001_ST_chart.setOption(
                    get_options(data['f5_HHWLoop001_ST'], '供水温度')
                );


            },
            error: function (xhr) {
                console.log("post sub_room_network_water_supply_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax sub_room_network_water_supply_temperature error：", e);
}

resize_chart(
    [
        f2_HHWLoop001_ST_chart,
        f3_HHWLoop001_ST_chart,
        f3_HHWLoop002_ST_chart,
        f3_HHWLoop003_ST_chart,
        f4_HHWLoop001_ST_chart,
        f5_HHWLoop001_ST_chart
    ]
);
