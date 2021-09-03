//***************获取元素*************************
var days_heat_well_heating_dom = document.getElementById("days_heat_well_heating");
var days_heat_pipe_network_heating_dom = document.getElementById("days_heat_pipe_network_heating");
var days_water_heat_pump_heat_production_dom = document.getElementById("days_water_heat_pump_heat_production");
var high_temp_plate_exchange_heat_production_dom = document.getElementById("high_temp_plate_exchange_heat_production");

//***************初始化图表***********************************
var days_heat_well_heating_chart = echarts.init(days_heat_well_heating_dom);
var days_heat_pipe_network_heating_chart = echarts.init(days_heat_pipe_network_heating_dom);
var days_water_heat_pump_heat_production_chart = echarts.init(days_water_heat_pump_heat_production_dom);
var high_temp_plate_exchange_heat_production_chart = echarts.init(high_temp_plate_exchange_heat_production_dom);

loading_all([days_heat_well_heating_chart, days_heat_pipe_network_heating_chart, days_water_heat_pump_heat_production_chart, high_temp_plate_exchange_heat_production_chart]);

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
            name: hint + '(kWh)'
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
    //heat_provide_temperature
    $.ajax(
        {
            url: url,
            type: "POST",
            data: {
                "key": "api_heat_provide_temperature",
                "start": start,
                "end": end,
                "by": 'd'
            },
            cache: true,
            success: function (data) {
                days_heat_well_heating_chart.hideLoading();
                days_heat_well_heating_chart.setOption(
                    get_options(
                        data['heat_well_heating'], '供热量'
                    )
                );

                days_heat_pipe_network_heating_chart.hideLoading();
                days_heat_pipe_network_heating_chart.setOption(
                    get_options(
                        data['heat_pipe_network_heating'], '供热量'
                    )
                );

                days_water_heat_pump_heat_production_chart.hideLoading();
                days_water_heat_pump_heat_production_chart.setOption(
                    get_options(
                        data['water_heat_pump_heat_production'], '制热量'
                    )
                );

                high_temp_plate_exchange_heat_production_chart.hideLoading();
                high_temp_plate_exchange_heat_production_chart.setOption(
                    get_options(
                        data['high_temp_plate_exchange_heat_production'], '制热量'
                    )
                );
            },
            error: function (xhr) {
                console.log("post heat_provide_temperature error：", xhr);
            }
        }
    );
}catch (e) {
    console.log("ajax heat_provide_temperature error：", e);
}

resize_chart([days_heat_well_heating_chart, days_heat_pipe_network_heating_chart, days_water_heat_pump_heat_production_chart, high_temp_plate_exchange_heat_production_chart]);




