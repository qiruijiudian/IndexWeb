// 太阳能集热分析

new DataChart(
    request_data={"key": "api_solar_heat_supply", "start": start, "end": end, "by": 'd'},
    time_ids=["solar_analysis_title"],
    funcs=undefined,
    chart_objs=["last_week_solar_collector_by_days"],
    option_datas=[
        {
            tooltip: {
                trigger: 'axis',
                zlevel: 0,
                z: 60,
                show: true,
                showContent: true,
                triggerOn: 'mousemove|click',
                alwaysShowContent: false,
                displayMode: 'single',
                renderMode: 'auto',
                confine: null,
                showDelay: 0,
                hideLay: 100,
                transitionDuration: 0.4,
                enterable: false,
                backgroundColor: '#F8F8FF',
                shadowBlur: 10,
                shadowColor: '#fff',
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                boderRadius: 4,
                boderWidth: 1,
                padding: null,
                textStyle: {
                    'align': 'left'
                },
                axisPointer: {
                    type: 'cross',
                    axis: 'auto',
                    animation: 'auto',
                    animationDurationUpdate: 200,
                    animationEasingUpdate: 'exponentialOut',
                    crossStyle:{
                        color: '#999',
                        width: 1,
                        type: 'dashed'
                    },
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        align: 'right'
                    },
                },
                formatter: function(params){
                    var res = params[0].name + '<br/>', val;
                    res += params[0].marker + " " + params[0].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[0].value + ' kWh' + '<br/>' +
                        params[1].marker + " " + params[1].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[1].value + ' kWh' + '<br/>' +
                        params[2].marker + " " + params[2].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[2].value + ' %' + '<br/>';
                    // params[3].marker + " " + params[3].seriesName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + params[3].value + ' %' + '<br/>'
                    return res;
                }
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
                data: ['供热量', '太阳能集热量', '短期太阳能保证率']
            },
            xAxis: [],
            yAxis: [
                {
                    type: 'value',
                    name: '热量',
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
                    name: '太阳能保证率',
                    min: 0,
                    max: 500,
                    position: 'right',
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [],
            grid: {
                x: 130,
                y: 70,
                x2: 150,
                y2: 50
            }
        },
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: 'time_data'
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '供热量',
                        type: 'bar',
                        data: 'heat_supply'
                    },
                    {
                        name: '太阳能集热量',
                        type: 'bar',
                        data: 'solar_collector_heat'
                    },
                    {
                        name: '短期太阳能保证率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: 'rate'
                    }
                ]
            }
        },
    ]
).data_render();