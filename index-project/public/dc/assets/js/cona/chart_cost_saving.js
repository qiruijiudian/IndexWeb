// 节省供暖费用

new DataChart(
    request_data={"key": "api_cost_saving", "start": last_month_date, "end": end, "by": 'd'},
    time_ids=["cost_saving_title", undefined],
    funcs=[false, false],
    chart_objs=["cost_saving", "cost_saving_high_low_pie"],
    option_datas=[
        {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {yAxisIndex: 'none'},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            dataZoom: [{show: true,realtime: true,type: 'slider',start: 10,end: 40}],
            grid: {left: '5%',right: '10%',bottom: '12%',containLabel: true},
            xAxis: [],
            yAxis: [{type: 'value',name: '节省供暖费用（元）'}],

            series: []
        },
        {
            tooltip: {trigger: 'item'},
            legend: {orient: 'vertical',left: 'right',},
            series: []
        }
    ],
    option_mappings=[
        {
            'xAxis': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        type: 'category',
                        name: '日期',
                        data: 'time_data',
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ]
            },
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '当日节省供暖费用/元',
                        type: 'bar',
                        barWidth: '40%',
                        data: 'cost_saving'
                    }
                ]
            }
        },
        {
            'series': {
                'type': 'arr',
                'obj': ['data'],
                'values': [
                    {
                        name: '高低温节省供暖费用对比',
                        type: 'pie',
                        radius: '50%',
                        data: 'cost_saving_high_low',
                        emphasis: {itemStyle: {shadowBlur: 10,shadowOffsetX: 0,shadowColor: 'rgba(0, 0, 0, 0.5)'}}
                    }
                ]
            }
        }
    ]
).data_render();