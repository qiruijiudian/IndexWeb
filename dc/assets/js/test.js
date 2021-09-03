var t1 = document.getElementById("container1");
var t2 = document.getElementById("container3");

var t1_chart = echarts.init(t1);
var t2_chart = echarts.init(t2);
var t1_options = {
    color: ['#32CD32', '#0000FF', '#FF0000'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data: ['COP', 'Target Miniumum', 'Low Threshold'],
        left: 10
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'}
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
        }
    ],
    grid: [{
        left: 50,
        right: 50,
        // height: '35%'
    }, {
        left: 50,
        right: 50,
        top: '55%',
        // height: '35%'
    }],
    xAxis: [
        {
            type: 'category',
            name: '日期',
            boundaryGap: false,
            axisLine: {onZero: true},
            data: kamba_system_cop_time
        }
    ],
    yAxis: [
        {
            name: 'COP',
            type: 'value'
//            max: max_cop
        }
    ],
    series: [
        {
            name: 'COP',
            type: 'line',
            symbol: 'none',
            hoverAnimation: false,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#32CD32'
                    }
                }
            },
            data: kamba_system_cop
        },
        {
            name: 'Target Miniumum',
            type: 'line',
            symbol: 'none',
            hoverAnimation: false,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#0000FF'
                    }
                }
            },
            data: target_minimum
        },
        {
            name: 'Low Threshold',
            type: 'line',
            symbol: 'none',
            hoverAnimation: false,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#FF0000'
                    }
                }
            },
            data: low_threshold
        }
    ]
};
var t2_options = {

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        right: '20%'
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            magicType: {show: true, type: ['line', 'bar']},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['高温板换制热量', '水源热泵制热量']
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: calories_time_data
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '高温板换制热量',
            min: 0,
            position: 'left',
            axisLine: {
                show: true
            },
            axisLabel: {
                formatter: '{value} kWh'
            }
        },
        {
            type: 'value',
            name: '水源热泵制热量',
            min: 0,
            position: 'right',
            axisLine: {
                show: true
            },

            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name: '高温板换制热量',
            type: 'bar',
            data: high_temperature_plate_exchange_heat
        },
        {
            name: '水源热泵制热量',
            type: 'bar',
            data: wshp_heat,
            yAxisIndex: 1,
        }
    ]
    ,
    grid: {
        x: 140,
        y: 80,
        x2: 115,
        y2: 50
    }
};

t1_chart.setOption(t1_options);
t2_chart.setOption(t2_options);