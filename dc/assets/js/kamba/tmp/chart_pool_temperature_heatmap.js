new DataChart(
    request_data={"key": "api_pool_temperature", "start": start, "end": end, "by": 'h', "heat_map": true},
    time_ids=["heat_map_title_of_temp"],
    funcs=undefined,
    chart_objs=["heat_map_of_temp"],
    option_datas=[{
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '60%',
            top: '10%',
            left: "10%",
            right: "10%"
        },
        xAxis: {},
        yAxis: {},
        visualMap: {},
        series: []
    }],
    option_mappings=[
        {
            xAxis: {
                "type": "obj",
                "obj": ["data"],
                "values": {
                    type: 'category',
                    // data: data["sizes"],
                    data: "heat_time_period",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitArea: {
                        show: true,
                    }
                },

            },
            yAxis: {
                'type': 'obj',
                'obj': ['data'],
                'values': {
                    type: 'category',
                    // data: data["heat_time_period"],
                    data: "sizes",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitArea: {
                        show: true,
                    }
                },
            },
            visualMap: {
                'type': 'obj',
                'obj': ['pieces'],
                'values': {
                    pieces: function (data){return get_pieces(data["pieces"]);},
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '10%'
                }

            },
            series: {
                "type": "arr",
                "obj": ["data"],
                "values": [{
                    name: '水池温度',
                    type: 'heatmap',
                    data: "values",
                    label: {
                        show: true
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },]

            }


        }
    ],
    dataZooms=[false]
).data_render();