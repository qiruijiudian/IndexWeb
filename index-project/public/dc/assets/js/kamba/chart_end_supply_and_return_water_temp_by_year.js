// 末端供回水温度 年数据

new DataChart(
    request_data={"key": "api_end_supply_and_return_water_temp", "start": start, "end": end, "by": 'y'},
    time_ids=["last_year_supply_return_water_temp_time_delta"],
    funcs=[
        {
            "type": "option",
            "func": function (data) {
                let series_name = ['供水温度', '回水温度', '温差', '去年供水温度', '去年回水温度', '去年温差'];
                if (data["hint"].length > 2){
                    let hint = data["hint"];
                    series_name = ['供水温度', '回水温度', '温差', hint + '供水温度', hint + '回水温度', hint + '温差'];
                }

                return get_common_option(
                    data,
                    {
                        legend: {
                            left: 50,
                            top: 18,
                            data: series_name
                        },
                        toolbox: {  //配置工具箱组件
                            show: true,
                            right: 50,
                            top: 18,
                            feature: {
                                mark: { show: true },
                                dataZoom: { show: true },
                                dataView: { show: true, readOnly: false },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        xAxis: [
                            {
                                type: 'value',
                                scale: true
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                scale: true
                            }
                        ],
                        tooltip: {
                            formatter: function(param) {


                                if(param.name == '平均值'){
                                    // console.log(param);
                                    return series_name[param.seriesIndex] + '平均值：' + param.value + '℃';
                                }else if(param.name == '最大值'){
                                    return series_name[param.seriesIndex] + '最大值：' + param.value + '℃';
                                }else if(param.name == '最小值'){
                                    return series_name[param.seriesIndex] + '最小值：' + param.value + '℃';
                                }else{
                                    return '温度：' + param.value[0] + '℃' + '<br/>' + param.seriesName + '：' + param.value[1] + '℃';
                                }
                            }
                        },
                        series: []
                    },
                    {
                        'series': {
                            "type": "arr",
                            "obj": ["data"],
                            "values": [
                                {
                                    name: '供水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: 'end_supply_water_temp',
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {   //设置男性数据
                                    name: '回水温度',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: 'end_return_water_temp',
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: '温差',
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: 'end_supply_and_return_water_temp_diff',
                                    markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: series_name[3],
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: 'last_end_supply_water_temp',
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {   //设置男性数据
                                    name: series_name[4],
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: 'last_end_return_water_temp',
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                                {
                                    name: series_name[5],
                                    type: 'scatter',
                                    symbolSize: 8,
                                    data: 'last_end_supply_and_return_water_temp_diff',
                                    markPoint: { data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]},
                                    markLine: { data: [{ type: 'average', name: '平均值' }] }
                                },
                            ]
                        }
                    }
                );
            }
        }
    ],
    chart_objs=["last_year_supply_return_water_temp"]
).data_render();