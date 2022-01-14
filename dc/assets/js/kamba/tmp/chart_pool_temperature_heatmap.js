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
        visualMap: {
            min: 50,
            max: 70,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            inRange:{
                color:[
                    "#3DC53B", "#D2FD4D", "#F4AE2C", "#F87A2D", "#FC402E"
                ]
            }
        },
        xAxis: {},
        yAxis: {},
        // visualMap: {},
        series: []
    }],
    option_mappings=[
        {
            xAxis: {
                "type": "obj",
                "obj": ["data"],
                "values": {
                    type: 'category',
                    data: "heat_time_period",
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
                    data: "sizes",
                    splitArea: {
                        show: true,
                    }
                },
            },


            visualMap: {
                'type': 'obj',
                'obj': ['min', 'max'],
                'values': {
                    min: 'min',
                    max: 'max',
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '15%',
                    inRange:{
                        color:[
                            "#3DC53B", "#D2FD4D", "#F4AE2C", "#F87A2D", "#FC402E"
                        ]
                    }
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