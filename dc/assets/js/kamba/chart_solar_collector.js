// 太阳能集热
new DataChart(
    request_data={"key": "api_solar_collector", "start": start, "end": end, "by": 'h'},
    time_ids=["solar_heat_collector_title"],
    funcs=undefined,
    chart_objs=["last_week_solar_collector"],
    option_datas=[{
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: ['过去一周太阳能集热量'],
            left: 'center'
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
            left: 80,
            right: 80,
            // height: '35%'
        }, {
            left: 80,
            right: 80,
            top: '55%',
            // height: '35%'
        }],
        xAxis: [],
        yAxis: [
            {
                name: '太阳能集热量',
                type: 'value',
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value} kWh'
                }
//            max: 12
            }
        ],
        series: []
    }],
    option_mappings=[
        {
            xAxis: {
                "type": "arr",
                "obj": ["data"],
                "values": [
                    {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }
                ],

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '过去一周太阳能集热量',
                    type: 'line',
                    symbolSize: 5,
                    hoverAnimation: false,
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#0000FF'
                            }
                        }
                    },
                    data: 'values'
                },]

            }


        }
    ],
).data_render();