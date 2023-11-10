/** 参数配置
 * 定义数据中心不同板块的参数信息，包括请求参数、option配置等
 */

let cona_conf = {
    // 1. 供水温度与气温
    "chart_water_provide_temperature": {
        "request_data": {"key": "api_water_provide_temperature", "start": start, "end": end, "by": 'd'},
        "time_ids": ["water_provide_temp_chart_title"],
        "funcs": [
            {
                "type": "option", "func": function (data) {
                    return  get_water_provider_options([data['end_supply_water_temp'], data['last_end_supply_water_temp']], '供水温度', data["hint"])
                }
            }
        ],
        "chart_objs": ["water_provide_temp_chart"]
    },

    // 2. 地热井供水温度
    "chart_geothermal_wells_heat_provide": {
        "request_data": {"key": "api_geothermal_wells_heat_provide", "start": start, "end": end, "by": 'd'},
        "time_ids": ["geothermal_wells_heat_provide_title"],
        "funcs": undefined,
        "chart_objs": ["geothermal_wells_heat_provide"],
        "option_datas": [
            {
                grid: {
                    x: 110,
                    x2: 80,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['高温板换制热量', '水源热泵制热量', '地热井可提供高温热量', '地热井可提供低温热量']
                },
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '热量(kWh)',
                        min: 0,
                        // max: 150000,
                        axisLabel: {
                            formatter: '{value}' + ' kWh'
                        }
                    }
                ],
                series: []
            }
        ],
        "option_mappings": [
            {
                "xAxis": {
                    "type": "arr",
                    "obj": ['data'],
                    "values": [
                        {
                            type: 'category',
                            name: '日期',
                            data: 'time_data',
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ]
                },
                "series": {
                    "type": "arr",
                    "obj": ['data'],
                    "values": [
                        {
                            name: '高温板换制热量',
                            type: 'bar',
                            stack: '制热量',
                            data: 'high_temp_plate_exchange_heat_production'
                        },
                        {
                            name: '水源热泵制热量',
                            type: 'bar',
                            stack: '制热量',
                            data: 'water_heat_pump_heat_production'
                        },
                        {
                            name: '地热井可提供高温热量',
                            type: 'line',
                            data: 'geothermal_wells_high_heat_provide'
                        },
                        {
                            name: '地热井可提供低温热量',
                            type: 'line',
                            data: 'geothermal_wells_low_heat_provide'
                        }
                    ]
                }
            }
        ],
    },

    // 3. 综合COP
    "chart_com_cop": {
        "request_data": {"key": "api_com_cop", "start": start, "end": end, "by": 'h'},
        "time_ids": ["com_cop_pie_title", "com_cop_chart_title"],
        "funcs": [
            {
                "type": "option",
                "func": function (data) {


                    return get_cop_pie_options(data['values'][data['values'].length-1], "cona")
                }
            },
            {
                "type": "option",
                "func": function (data) {return get_cona_com_cop_chart_options(data)}
            }
        ],
        "chart_objs": ["com_cop_pie", "com_cop_chart"],
        "dataZooms": [false, 1],
    },

    // 4. 地热井出水温度
    "table_outlet_water_temperature": {
        "request_data": {"key": "api_outlet_water_temperature", "end": end},
        "time_ids": [false],
        "funcs": [
            {
                "type": "p_function",
                "func": function (data) {
                    set_outlet_water_temperature(data, set_table_status, ["last_week_high_temp_tbody", "last_year_high_temp_tbody", "last_week_low_temp_tbody", "last_year_low_temp_tbody"]);
                    set_outlet_water_temp_time_range(data, titles)

                }
            }
        ]
    },

    // 5. 节省供暖费用
    "chart_cost_saving": {
        "request_data": {"key": "api_cost_saving", "start": last_month_date, "end": end, "by": 'd'},
        "time_ids": ["cost_saving_title", undefined],
        "funcs": [false, false],
        "chart_objs": ["cost_saving", "cost_saving_high_low_pie"],
        "option_datas": [
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
        "option_mappings": [
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
    },

    // 6. 供热量与平均温度
    "table_heat_supply": {
        "request_data": {"key": "api_heat_supply", "start": start, "end": end, "by": "d"},
        "time_ids": ["avg_temp_with_heat_title"],
        "funcs": [
            {
                "type": "p_function",
                "func": function (data) {
                    for (let i=0;i<data['heat_pipe_network_data'].length;i++){
                        if (data['heat_pipe_network_data'][i][0] > 0){
                            var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '</tr>';
                            tr_html = tr_html.format(
                                data['heat_pipe_network_data'][i][1],
                                data['heat_pipe_network_data'][i][2],
                                data['heat_pipe_network_data'][i][3],
                            );

                        } else {
                            var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '</tr>';
                            tr_html = tr_html.format(
                                data['heat_pipe_network_data'][i][1],
                                data['heat_pipe_network_data'][i][2],
                                data['heat_pipe_network_data'][i][3],
                            );
                        }
                        $("#heat_supply").append(tr_html);
                    }
                }
            }
        ]
    },

    // 7. 供回水温度与温差
    "water_supply_and_return_temp": {
        "request_data": {"key": "api_water_supply_return_temperature", "start": start, "end": end, "by": "d"},
        "time_ids": ["avg_temp_with_temp", "temp_diff_title"],
        "funcs": [
            {
                "type": "p_function",
                "func": function (data) {
                    if ($("#avg_temp_with_temp").length){
                        for (var i=0;i<data['supply_return_water_temp_table_data'].length;i++){
                            if (data['supply_return_water_temp_table_data'][i][0] > 0){
                                var tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                                tr_html = tr_html.format(
                                    data['supply_return_water_temp_table_data'][i][1],
                                    data['supply_return_water_temp_table_data'][i][2],
                                    data['supply_return_water_temp_table_data'][i][3],
                                    data['supply_return_water_temp_table_data'][i][4],
                                );

                            } else {
                                var tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
                                tr_html = tr_html.format(
                                    data['supply_return_water_temp_table_data'][i][1],
                                    data['supply_return_water_temp_table_data'][i][2],
                                    data['supply_return_water_temp_table_data'][i][3],
                                    data['supply_return_water_temp_table_data'][i][4],
                                );
                            }
                            $("#supply_return_water_temp_table_data").append(tr_html);
                        }
                    }

                }
            },
            false
        ],
        "chart_objs": [
            false, "supply_return_water_temp"
        ],
        "option_datas": [
            false,
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['平均供水温度', '平均回水温度', '平均供回水温差'],
                    left: 10
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },

                axisPointer: {
                    link: {xAxisIndex: 'all'}
                },

                grid: [{
                    left: 70,
                    right: 70,
                    height: '25%'
                }, {
                    left: 70,
                    right: 70,
                    top: '60%',
                    height: '25%'
                }],
                xAxis: [],
                yAxis: [
                    {
                        name: '温度(℃)',
                        type: 'value',
                        // max: 50,
                        // min: 20
                    },
                    {
                        gridIndex: 1,
                        name: '温差(℃)',
                        type: 'value',
                        max: 8,
                        inverse: true
                    }
                ],
                series: []
            }
        ],
        "option_mappings": [
            false,
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '日期',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'time_data'
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'time_data',
                            position: 'top'
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '平均供水温度',
                            type: 'line',
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: 'water_supply_temperature'
                        },
                        {
                            name: '平均回水温度',
                            type: 'line',
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: 'return_water_temperature'
                        },
                        {
                            name: '平均供回水温差',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: 'supply_return_water_temp_diff'
                        }
                    ]
                }
            }
        ],
        "dataZooms": [1, 1]
    },

    // 8. 供热/制热与气温关系
    "chart_heat_with_temp": {
        "request_data": {"key": "api_heat_provide_temperature", "start": start, "end": end, "by": "d"},
        "time_ids": ["heat_well_heating_chart_title", "heat_pipe_network_heating_chart_title", "water_heat_pump_heat_production_chart_title", "high_temp_plate_exchange_heat_production_chart_title"],
        "funcs": [
            {
                "type": "option",
                "func": function (data) {
                    return get_heat_provide_options({'latest_data': data['heat_well_heating'], 'last_data': data['last_heat_well_heating']},"热力井", "供热量", data["hint"])
                }
            },
            {
                "type": "option",
                "func": function (data) {
                    return get_heat_provide_options({'latest_data': data['heat_pipe_network_heating'], 'last_data': data['last_heat_pipe_network_heating']},"热力管网", "供热量", data["hint"])
                }
            },
            {
                "type": "option",
                "func": function (data) {
                    return get_heat_provide_options({'latest_data': data['water_heat_pump_heat_production'], 'last_data': data['last_water_heat_pump_heat_production']},"水源热泵", "制热量", data["hint"])
                }
            },
            {
                "type": "option",
                "func": function (data) {
                    return get_heat_provide_options({'latest_data': data['high_temp_plate_exchange_heat_production'], 'last_data': data['last_high_temp_plate_exchange_heat_production']},"高温板换", "制热量", data["hint"])
                }
            }
        ],
        "chart_objs": ["heat_well_heating_chart", "heat_pipe_network_heating_chart", "water_heat_pump_heat_production_chart", "high_temp_plate_exchange_heat_production_chart"]
    },

    // 9. 负荷
    "chart_load": {
        "request_data": {"key": "api_load", "start": start, "end": end, "by": 'd'},
        "time_ids": ["load_title", false],
        "funcs": [false, false],
        "chart_objs": ["load_data_chart", "load_pie"],
        "option_datas": [
            {
                grid: {
                    left: 100,
                    right: 80
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['最小负荷', '平均负荷', '最大负荷']
                },
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '负荷量（kWh）',
                        min: 0,
                        // max: 7000,
                        axisLabel: {
                            formatter: '{value} kW'
                        }
                    }
                ],
                series: []
            },
            {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: []
            }
        ],
        "option_mappings": [
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '日期',
                            data: 'time_data',
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '最小负荷',
                            type: 'bar',
                            data: 'min_loads'
                        },
                        {
                            name: '平均负荷',
                            type: 'bar',
                            data: 'avg_loads'
                        },
                        {
                            name: '最大负荷',
                            type: 'line',
                            yAxisIndex: 0,
                            data: 'max_loads'
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
                            name: '负荷值',
                            type: 'pie',
                            radius: '50%',
                            data: 'load_pie_data',
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
        ]
    },

    // 10. 补水
    "chart_water_replenishment": {
        "request_data": {"key": "api_water_replenishment", "start": start, "end": end, "by": 'h'},
        "time_ids": ["water_replenishment_title"],
        "funcs": undefined,
        "chart_objs": ["water_replenishment"],
        "option_datas": [
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['补水量', '补水量限值'],
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
                    left: 65,
                    right: 70,
                    // height: '35%'
                }, {
                    left: 65,
                    right: 70,
                    top: '55%',
                    // height: '35%'
                }],
                xAxis: [],
                yAxis: [
                    {
                        name: '补水量(m³)',
                        type: 'value',
                        // max: 12
                    }
                ],
                series: []
            }

        ],
        "option_mappings": [
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '日期',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'time_data'
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '补水量',
                            type: 'bar',
                            data: 'water_replenishment'
                        },
                        {
                            name: '补水量限值',
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
                            data: 'water_replenishment_limit'
                        },
                    ]
                }

            },
        ]
    }
};
let kamba_conf = {
    // 1. 蓄热水池热量
    "chart_heat_storage_heat": {
        "request_data": {"key": "api_heat_storage_heat", "start": start, "end": end, "by": 'd'},
        "time_ids": ["pool_available_heat_heat_date", "high_heat_equal_supply_days_heat_date"],
        "funcs": [false, false],
        "chart_objs": ["pool_available_heat", "high_heat_equal_supply_days"],
        "option_datas": [
            {
                grid: {
                    left: 110,
                    right: 80
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['低温热量', '高温热量']
                },
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '热量',
                        min: 0,
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    }
                ],
                series: []
            },
            {
                grid: {
                    right: 110,
                    left: 80
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['2000kW电锅炉供热天数', '高温热量']
                },
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '供热天数',
                        min: 0,
                        position: 'left',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} 天'
                        }
                    },
                    {
                        type: 'value',
                        name: '高温热量',
                        min: 0,
                        position: 'right',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    }

                ],
                series: []
            }
        ],
        "option_mappings": [
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '时间段',
                            data: 'time_data',
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '低温热量',
                            type: 'bar',
                            stack: '可用热量',
                            data: 'low_heat_total'
                        },
                        {
                            name: '高温热量',
                            type: 'bar',
                            stack: '可用热量',
                            data: 'high_heat_total'
                        }
                    ]
                }
            },
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '时间段',
                            data: 'time_data',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ]
                },

                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '2000kW电锅炉供热天数',
                            type: 'bar',
                            data: 'heat_supply_days'
                        },
                        {
                            name: '高温热量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: 'high_heat_total'
                        }
                    ]
                }
            },
        ],
        "dataZooms": [1, 1]
    },

    // 2. 系统COP
    "chart_system_cop": {
        "request_data": {"key": "api_system_cop", "start": start, "end": end, "by": 'h'},
        "time_ids": ["com_cop_pie_title", "sys_cop_title"],
        "funcs": [
            {
                "type": "option",
                "func": function (data) {return get_cop_pie_options(data['kamba_system_cop'][data['kamba_system_cop'].length-1], "kamba")}
            },
            false
        ],
        "chart_objs": ["kamba_system_cop_pie", "kamba_system_cop_chart"],
        "option_datas": [
            false,
            {
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
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
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
                    left: 70,
                    right: 70,
                    // height: '35%'
                }, {
                    left: 70,
                    right: 70,
                    top: '55%',
                    // height: '35%'
                }],
                xAxis: [],
                yAxis: [],
                series: []
            }
        ],
        "option_mappings": [
            false,
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '日期',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'time_data'
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: 'COP',
                            type: 'line',
                            symbol: 'none',
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#32CD32'
                                    }
                                }
                            },
                            data: 'kamba_system_cop'
                        },
                        {
                            name: 'Target Miniumum',
                            type: 'line',
                            symbol: 'none',
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#0000FF'
                                    }
                                }
                            },
                            data: 'target_minimum'
                        },
                        {
                            name: 'Low Threshold',
                            type: 'line',
                            symbol: 'none',
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#FF0000'
                                    }
                                }
                            },
                            data: 'low_threshold'
                        }
                    ]
                },
                'yAxis': {
                    'type': 'arr',
                    'obj': ['max'],
                    'values': [
                        {
                            name: 'COP',
                            type: 'value',
                            max: 'max_cop'
                        }
                    ]
                }
            }
        ],
        "dataZooms": [false, 1]
    },

    // 3. 水源热泵COP
    "chart_wshp_cop": {
        "request_data": {"key": "api_wshp_cop", "start": start, "end": end, "by": 'h'},
        "time_ids": ["wshp_cop_pie_title", "wp_cop_title"],
        "funcs": [
            {
                'type': 'option',
                'func': function (data) {return get_cop_pie_options(data['kamba_wshp_cop'][data['kamba_wshp_cop'].length-1], "kamba")}
            },
            false
        ],
        "chart_objs": ["kamba_wshp_cop_pie", "kamba_wshp_cop_chart"],
        "option_datas": [
            false,
            {
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
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
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
                    left: 70,
                    right: 70,
                    // height: '35%'
                }, {
                    left: 70,
                    right: 70,
                    top: '55%',
                    // height: '35%'
                }],
                xAxis: [],
                yAxis: [],
                series: []
            }
        ],
        "option_mappings": [
            false,
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '日期',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'time_data'
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: 'COP',
                            type: 'line',
                            symbol: 'none',
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#32CD32'
                                    }
                                }
                            },
                            data: 'kamba_wshp_cop'
                        },
                        {
                            name: 'Target Miniumum',
                            type: 'line',
                            symbol: 'none',
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#0000FF'
                                    }
                                }
                            },
                            data: 'target_minimum'
                        },
                        {
                            name: 'Low Threshold',
                            type: 'line',
                            symbol: 'none',
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#FF0000'
                                    }
                                }
                            },
                            data: 'low_threshold'
                        }
                    ]
                },
                'yAxis': {
                    'type': 'arr',
                    'obj': ['max'],
                    'values': [
                        {
                            name: 'COP',
                            type: 'value',
                            max: 'max_cop'
                        }
                    ]
                }
            }
        ],
        "dataZooms": [1, 1]
    },

    // 4. 水池温度
    "table_pool_temperature": {
        "request_data": {"key": "api_pool_temperature", "end": end, "by": 'h'},
        "time_ids": ["pool_temp_status"],
        "funcs": [
            {
                "type": "p_function",
                "func": function (data) {
                    for (var i=0;i<data['pool_temperature'].length;i++){

                        if (i % 2 == 0){
                            var tr_html = '<tr class="info">' +
                                '<td  style="text-align:center;vertical-align:middle;">{0}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{1}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{2}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{3}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{4}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{5}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{6}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{7}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{8}</td>' +
                                '</tr>';
                            tr_html = tr_html.format(
                                data['pool_temperature'][i][0],
                                data['pool_temperature'][i][1],
                                data['pool_temperature'][i][2],
                                data['pool_temperature'][i][3],
                                data['pool_temperature'][i][4],
                                data['pool_temperature'][i][5],
                                data['pool_temperature'][i][6],
                                data['pool_temperature'][i][7],
                                data['pool_temperature'][i][8]
                            );

                        } else {
                            var tr_html = '<tr class="success">' +
                                '<td  style="text-align:center;vertical-align:middle;">{0}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{1}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{2}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{3}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{4}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{5}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{6}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{7}</td>' +
                                '<td  style="text-align:center;vertical-align:middle;">{8}</td>' +
                                '</tr>';
                            tr_html = tr_html.format(
                                data['pool_temperature'][i][0],
                                data['pool_temperature'][i][1],
                                data['pool_temperature'][i][2],
                                data['pool_temperature'][i][3],
                                data['pool_temperature'][i][4],
                                data['pool_temperature'][i][5],
                                data['pool_temperature'][i][6],
                                data['pool_temperature'][i][7],
                                data['pool_temperature'][i][8]
                            );
                        }
                        $("#tbody_pool").append(tr_html);
                    }
                }
            }
        ]
    },

    // 5. 水池温度 热力图
    "chart_pool_temperature_heatmap": {
        "request_data": {"key": "api_pool_temperature", "start": start, "end": end, "by": 'h', "heat_map": true},
        "time_ids": ["heat_map_title_of_temp"],
        "funcs": undefined,
        "chart_objs": ["heat_map_of_temp"],
        "option_datas": [{
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
        "option_mappings": [
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
        "dataZooms": [false]
    },

    // 6. 太阳能集热
    "chart_solar_collector": {
        "request_data": {"key": "api_solar_collector", "start": start, "end": end, "by": 'h'},
        "time_ids": ["solar_heat_collector_title"],
        "funcs": undefined,
        "chart_objs": ["last_week_solar_collector"],
        "option_datas": [{
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
        "option_mappings": [
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
        ]
    },

    // 7. 补水量
    "chart_hydration": {
        "request_data": {"key": "api_hydration", "start": start, "end": end, "by": 'h'},
        "time_ids": ["heat_storage_rep_title", "heat_rep_title", "solar_rep_title"],
        "funcs": undefined,
        "chart_objs": ["last_week_heat_storage_replenishment", "last_week_heat_water_replenishment", "last_week_solar_side_replenishment"],
        "option_datas": [
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['蓄热水池补水量'],
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
                    left: 80,
                    right: 80,
                }, {
                    left: 80,
                    right: 80,
                    top: '55%',
                }],
                xAxis: [],
                yAxis: [
                    {
                        name: '蓄热水池补水量',
                        type: 'value',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} m³'
                        }
                    }
                ],
                series: []
            },
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['供热端补水量', '供热端补水限值'],
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
                        name: '补水量',
                        type: 'value',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} m³'
                        }
                    }
                ],
                series: []
            },
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['太阳能侧补水量', '太阳能矩阵补水限值'],
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
                        name: '补水量',
                        type: 'value',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} m³'
                        }
                    }
                ],
                series: []
            }

        ],
        "option_mappings": [
            {
                xAxis: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }],

                },
                series: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        name: '蓄热水池补水量',
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
                        data: 'heat_storage_tank_replenishment'
                    },]

                }
            },
            {
                xAxis: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }],

                },
                series: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        name: '供热端补水量',
                        type: 'bar',
                        data: 'heat_water_replenishment'
                    },
                        {
                            name: '供热端补水限值',
                            type: 'line',
                            symbolSize: 5,
                            hoverAnimation: false,
                            data: 'heat_water_replenishment_limit'
                        }]

                }
            },
            {
                xAxis: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }],

                },
                series: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [
                        {
                            name: '太阳能侧补水量',
                            type: 'bar',
                            data: 'solar_side_replenishment'
                        },
                        {
                            name: '太阳能矩阵补水限值',
                            type: 'line',
                            symbolSize: 5,
                            hoverAnimation: false,
                            data: 'solar_matrix_replenishment_limit'
                        },
                    ]

                }
            }
        ],
        "dataZooms": [1, 1, 1]
    },

    // 8. 太阳能矩阵共回水温度温差
    "chart_solar_matrix_supply_and_return_water_temperature": {
        "request_data": {"key": "api_solar_matrix_supply_and_return_water_temperature", "start": start, "end": end, "by": 'h'},
        "time_ids": ["solar_matrix_title"],
        "funcs": undefined,
        "chart_objs": ["solar_matrix_supply_and_return_water_temp"],
        "option_datas": [
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['太阳能矩阵供水温度', '太阳能矩阵回水温度'],
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
                    left: 70,
                    right: 70,
                    // height: '35%'
                }, {
                    left: 70,
                    right: 70,
                    top: '55%',
                    // height: '35%'
                }],
                xAxis: [],
                yAxis: [
                    {
                        name: '温度(℃)',
                        type: 'value'
                    }
                ],
                series: []
            }

        ],
        "option_mappings": [
            {
                xAxis: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }],

                },
                series: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        name: '太阳能矩阵供水温度',
                        type: 'line',
                        data: 'solar_matrix_supply_water_temp'
                    },
                        {
                            name: '太阳能矩阵回水温度',
                            type: 'line',
                            symbolSize: 5,
                            hoverAnimation: false,
                            data: 'solar_matrix_return_water_temp'
                        }]

                }
            }

        ]
    },

    // 9. 负荷
    "chart_load": {
        "request_data": {"key": "api_load", "start": start, "end": end, "by": 'd'},
        "time_ids": ["load_title"],
        "funcs": undefined,
        "chart_objs": ["load_by_days"],
        "option_datas": [
            {
                grid: {
                    left: 100,
                    right: 80
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['最小负荷', '平均负荷', '最大负荷']
                },
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '负荷量（kW）',
                        axisLabel: {
                            formatter: '{value} kW'
                        }
                    }
                ],
                series: []
            }

        ],
        "option_mappings": [
            {
                xAxis: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        type: 'category',
                        name: '日期',
                        boundaryGap: true,
                        axisLine: {onZero: true},
                        data: 'time_data'
                    }],

                },
                series: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [{
                        name: '最小负荷',
                        type: 'line',
                        data: 'min_loads',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#548B54'
                                }
                            }
                        }
                    },
                        {
                            name: '平均负荷',
                            type: 'bar',
                            data: 'avg_loads'
                        },
                        {
                            name: '最大负荷',
                            type: 'line',
                            yAxisIndex: 0,
                            data: 'max_loads'
                        }]

                }
            }

        ]
    },

    // 10. 末端供回水温度
    "chart_end_supply_and_return_water_temp": {
        "request_data": {"key": "api_end_supply_and_return_water_temp", "start": start, "end": end, "by": 'd'},
        "time_ids": ["re_with_temp_title", "sup_with_temp_title", "diff_with_temp_title", "diff_temp"],
        "funcs": [
            {
                "type": "option",
                "func": function (data) {
                    return  get_water_provider_options([data['end_supply_and_return_water_temp_diff_with_temp'], data['last_end_supply_and_return_water_temp_diff_with_temp']], '末端供回水温差', data["hint"])
                }
            },
            {
                "type": "option",
                "func": function (data) {
                    return  get_water_provider_options([data['supply_water_temp_with_temp'], data['last_supply_water_temp_with_temp']], '末端供水温度', data["hint"])
                }
            },
            {
                "type": "option",
                "func": function (data) {
                    return  get_water_provider_options([data['return_water_temp_with_temp'], data['last_return_water_temp_with_temp']], '末端回水温度', data["hint"])
                }
            },
            false
        ],
        "chart_objs": ["supply_and_return_water_temp_diff_with_temp", "supply_water_temp_with_temp", "return_water_temp_with_temp", "end_supply_and_return_water_temp"],
        "option_datas": [
            false, false, false,
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['平均供水温度', '平均回水温度', '平均供回水温差'],
                    left: 10
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },

                axisPointer: {
                    link: {xAxisIndex: 'all'}
                },

                grid: [{
                    left: 70,
                    right: 70,
                    height: '30%'
                }, {
                    left: 70,
                    right: 70,
                    top: '60%',
                    height: '30%'
                }],
                xAxis: [],
                yAxis: [
                    {
                        name: '温度(℃)',
                        type: 'value'
                    },
                    {
                        gridIndex: 1,
                        name: '温差(℃)',
                        type: 'value',
                        inverse: true
                    }
                ],
                series: []
            }

        ],
        "option_mappings": [
            false, false, false,
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
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'time_data',
                            position: 'top'
                        }
                    ],

                },
                series: {
                    "type": "arr",
                    "obj": ["data"],
                    "values": [
                        {
                            name: '平均供水温度',
                            type: 'line',
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: 'end_supply_water_temp'
                        },
                        {
                            name: '平均回水温度',
                            type: 'line',
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: 'end_return_water_temp',
                            itemStyle : {
                                normal : {
                                    lineStyle:{
                                        color:'#556B2F'
                                    }
                                }
                            }
                        },
                        {
                            name: '平均供回水温差',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: 'end_supply_and_return_water_temp_diff'
                        }
                    ]
                }
            }

        ],
        "dataZooms": [false, false, false, 2]
    },

    // 11. 末端供回水温度 年数据
    "chart_end_supply_and_return_water_temp_by_year": {
        "request_data": {"key": "api_end_supply_and_return_water_temp", "start": start, "end": end, "by": 'y'},
        "time_ids": ["last_year_supply_return_water_temp_time_delta"],
        "funcs": [
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
        "chart_objs": ["last_year_supply_return_water_temp"]
    },

    // 12. 太阳能集热分析
    "chart_solar_heat_supply": {
        "request_data": {"key": "api_solar_heat_supply", "start": start, "end": end, "by": 'd'},
        "time_ids": ["solar_analysis_title"],
        "funcs": undefined,
        "chart_objs": ["last_week_solar_collector_by_days"],
        "option_datas": [
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
        "option_mappings": [
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
    },

    // 13. 供热分析
    "chart_calories": {
        "request_data": {"key": "api_calories", "start": start, "end": end, "by": 'd'},
        "time_ids": ["heat_supply_analysis_title", "high_power_title"],
        "funcs": undefined,
        "chart_objs": ["heat_supply_analysis", "power_rate"],
        "option_datas": [
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
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
                    data: ['高温板换制热量', '水源热泵制热量']
                },
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '制热量',
                        min: 0,
                        position: 'left',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    }
                ],
                series: []
                ,
                grid: {
                    x: 140,
                    y: 80,
                    x2: 115,
                    y2: 50
                }
            },
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['高温板换制热功率'],
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
                    left: 70,
                    right: 70,
                }, {
                    left: 70,
                    right: 70,
                    top: '55%',
                }],
                xAxis: [],
                yAxis: [
                    {
                        name: '制热功率(kW)',
                        type: 'value'
                    }
                ],
                series: []
            }
        ],
        "option_mappings": [
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
                            name: '高温板换制热量',
                            type: 'bar',
                            data: 'high_temperature_plate_exchange_heat'
                        },
                        {
                            name: '水源热泵制热量',
                            type: 'bar',
                            data: 'wshp_heat'
                        }
                    ]
                }
            },
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            name: '日期',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: 'rate_time'
                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '高温板换制热功率',
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
                            data: 'high_temperature_plate_exchange_heat_rate'
                        }
                    ]
                }
            },
        ],
        "dataZooms": [1, 1]
    },

    // 14. 制热量情况
    "chart_heat_supply": {
        "request_data": {"key": "api_heat_supply", "start": start, "end": end, "by": 'd'},
        "time_ids": ["heat_make_title"],
        "funcs": undefined,
        "chart_objs": ["calories_by_days"],
        "option_datas": [
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
                    data: ['供热量', '水源热泵耗电量', '供热率']
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
                        name: '供热率',
                        min: 0,
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
        "option_mappings": [
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
                            name: '水源热泵耗电量',
                            type: 'bar',
                            data: 'power_consume'
                        },
                        {
                            name: '供热率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: 'rate'
                        }
                    ]
                }
            },
        ]
    },

    // 15. 节省供暖费用
    "chart_cost_saving": {
        "request_data": {"key": "api_cost_saving", "start": last_month_date, "end": end, "by": 'd'},
        "time_ids": ["cost_saving_title"],
        "funcs": undefined,
        "chart_objs": ["cost_saving"],
        "option_datas": [
            {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['节省电费', '耗电量']
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
                xAxis: [],
                yAxis: [
                    {
                        type: 'value',
                        name: '节省电费（元）',
                        min: 0,
                        position: 'left',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} 元'
                        }
                    },
                    {
                        type: 'value',
                        name: '耗电量（kWh）',
                        min: 0,
//            max: 100,
                        position: 'right',
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value} kWh'
                        }
                    }

                ],
                series: []
            }
        ],
        "option_mappings": [
            {
                'xAxis': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            type: 'category',
                            data: 'time_data',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisPointer: {
                                type: 'shadow'
                            }

                        }
                    ]
                },
                'series': {
                    'type': 'arr',
                    'obj': ['data'],
                    'values': [
                        {
                            name: '节省电费',
                            type: 'bar',
                            data: 'cost_saving'
                        },
                        {
                            name: '耗电量',
                            type: 'bar',
                            yAxisIndex: 1,
                            data: 'power_consumption'
                        }
                    ]
                }
            }
        ]
    },
};


/**
 * @function get_cop_pie_options
 * @desc 获取cop数据仪表盘option配置字典
 * @param {object} value 用于设置option的数据字典
 * @param {string} c_type 类型，cona或者kamba，根据不同板块在颜色以及分块区域上有稍微不同
 * @returns {object} option配置字典
 */
function get_cop_pie_options(value, c_type){
    let line_style = {width: 20,color: [[0.08, '#fd666d'],[0.12, '#FFD700'],[1, '#7FFF00']]};
    if (c_type.includes("cona")) line_style["color"] = [[0.2, '#fd666d'],[0.3, '#FFD700'],[1, '#7FFF00']];
    let options = {
        series: [{
            type: 'gauge',
            min:0,//最小值
            max:50,//最大值
            splitNumber:5, //刻度的个数
            axisLine: {
                lineStyle: line_style
            },
            pointer: {
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                distance: -60,
                length: 8,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            splitLine: {
                distance: -30,
                length: 30,
                lineStyle: {
                    color: '#fff',
                    width: 4
                }
            },
            axisLabel: {
                color: 'auto',
                distance: 30,
                fontSize: 15
            },
            detail: {
                show: true,
                valueAnimation: true,
                formatter: '{value} ',
                color: 'auto',
                borderRadius: 3,
            },
            data: [{
                value: value,
                name: 'COP',
                title: {
                    show: 'true',
                    offsetCenter: ['0%', '-30%'],
                    fontSize: 20,
                    fontWeight: 'bold'

                }
            }]
        }]
    };
    return options
}

/**
 * @function get_water_provider_options
 * @desc 获取供回水温度与气温数据option配置字典
 * @param {object}  data 用于设置option的数据字典
 * @param {string}  hint  用户设置y轴名称的提示文字，如供水温度
 * @param {string}  delta_hint 用于设置图例中周期的提示文字，如上月/去年
 * @returns {object} option配置字典
 */
function get_water_provider_options(data, hint, delta_hint){
    // 按照传入的data进行数据设置，返回设置好的option配置字典，hint项为提示文字
    let common = "";
    if (hint.includes("供回水")){
        common = "温差"
    }else if (hint.includes("供水")){
        common = "供水温度";
    }else {
        common = "回水温度";
    }

    let options = {
        color: ["green", "red"],
        grid: {
            left: 80,
            right: 80
        },
        legend: {
            left: 'center',
            // right: 50,
            // top: 18,
            data: [common, delta_hint + common]
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            name: '温度（℃）'
        },
        yAxis: {
            name: hint + '（℃）'
        },
        tooltip: {
            formatter: function(param) {
                let value = param.value;
                return '温度：' + value[0] + '℃' + '<br/>' + param.seriesName + '：' + value[1] + '℃';
            }
        },
        series: [
            {
                name: common,
                symbolSize: 11,
                data: data[0],
                type: 'scatter'
            },
            {
                name: delta_hint + common,
                symbolSize: 11,
                data: data[1],
                type: 'scatter'
            }
        ]
    };
    return options
}

/**
 * @function get_heat_provide_options
 * @desc 获取供热与气温数据option配置字典
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  name 用于设置option的数据字典
 * @param {string}  hint  用户设置y轴名称的提示文字，如供热量
 * @param {string}  delta_hint 用于设置图例中周期的提示文字，如上月/去年
 * @returns {object} option配置字典
 */
function get_heat_provide_options(data, name, hint, delta_hint){

    let options = {
        color: ["green", "red"],
        grid:{
            x:75,
            x2:90,
        },
        legend: {
            left: "center",
            // right: 50,
            // top: 18,
            data: [name + hint, delta_hint + hint]
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },

        xAxis: {
            name: '温度（℃）'
        },
        yAxis: {
            name: hint + '(kWh)'
        },
        tooltip: {

            formatter: function(param) {
                let value = param.value;
                return '温度：' + value[0] + '℃' + '<br/>' + param.seriesName + '：' + value[1] + 'kWh';
            }
        },
        series: [
            {
                name: name+hint,
                symbolSize: 15,
                data: data['latest_data'],
                type: 'scatter'
            },
            {
                name: delta_hint+hint,
                symbolSize: 15,
                data: data['last_data'],
                type: 'scatter'
            },
        ]
    };
    return options
}

/**
 * @function get_cona_com_cop_chart_options
 * @desc 获取cop序列图数据的option配置
 * @param {object}  data 用于设置option的数据字典
 * @returns {object} option配置字典
 */
function get_cona_com_cop_chart_options(data) {
    return {
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
            right: 65,
            // height: '35%'
        }, {
            left: 50,
            right: 65,
            top: '55%',
            // height: '35%'
        }],
        xAxis: [
            {
                type: 'category',
                name: '日期',
                boundaryGap: false,
                axisLine: {onZero: true},
                data: data['time_data']
            }
        ],
        yAxis: [
            {
                name: 'COP',
                type: 'value',
                max: data['max_cop']
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
                data: data['values']
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
                data: data['target_minimum']
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
                data: data['low_threshold']
            }
        ]
    };
}

/**
 * @function get_cona_sub_cop_chart_option
 * @desc 获取cop子页面数据的option配置
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  name 针对不同机房的cop返回数据名称，如cop_f2_value
 * @returns {object} option配置字典
 */
function get_cona_sub_cop_chart_option(data, name) {
    return {
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
                data: data['time_data']
            }
        ],
        yAxis: [
            {
                name: 'COP',
                type: 'value'
            }
        ],
        series: [
            {
                name: 'COP',
                type: 'line',
                symbolSize: 5,
                hoverAnimation: false,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#32CD32'
                        }
                    }
                },
                data: data[name]
            },
            {
                name: 'Target Miniumum',
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
                data: data['target_minimum']
            },
            {
                name: 'Low Threshold',
                type: 'line',
                symbolSize: 5,
                hoverAnimation: false,
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#FF0000'
                        }
                    }
                },
                data: data['low_threshold']
            }
        ]
    }
}

/**
 * @function get_outlet_water_temperature_tr_html
 * @desc 生成出水温度的tr标签html代码
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  name 针对不同板块数据的区分字段，high_week_result(高温_周数据)、low_week_result(低温_周)
 * @returns {object} tr标签代码组成的数组
 */
function get_outlet_water_temperature_tr_html(data, name) {
    let res = [];
    for (let i=0;i<data[name].length;i++){
        if (data[name][i][0] > 0){
            let tr_html = '<tr class="info">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
            tr_html = tr_html.format(
                data[name][i][1],
                data[name][i][2],
                data[name][i][3],
                data[name][i][4],
            );
            res.push(tr_html);

        } else {
            let tr_html = '<tr class="success">' + '<td>{0}</td>' + '<td>{1}</td>' + '<td>{2}</td>' + '<td>{3}</td>' + '</tr>';
            tr_html = tr_html.format(
                data[name][i][1],
                data[name][i][2],
                data[name][i][3],
                data[name][i][4],
            );
            res.push(tr_html);
        }

    }
    return res
}

/**
 * @function set_outlet_water_temperature
 * @desc 设置出水温度表格数据
 * @param {object}  data 用于设置option的数据字典
 * @param {object}  level 用于设置数据的等级区分字段，如all(全部)、high(高温)、low(低温)
 * @param {object}  ids 表格tbody标签的id值，按照先高后低，先周后年的顺序
 */
function set_outlet_water_temperature(data, level, ids) {
    if (level === "high"){
        let high_week = get_outlet_water_temperature_tr_html(data, "high_week_result");

        for (let i=0;i<high_week.length;i++){$(`#${ids[0]}`).append(high_week[i])}

        let high_year = get_outlet_water_temperature_tr_html(data, "high_year_result");

        for (let i=0;i<high_year.length;i++){$(`#${ids[1]}`).append(high_year[i])}

    }else if(level === "low"){
        let low_week = get_outlet_water_temperature_tr_html(data, "low_week_result");

        for (let i=0;i<low_week.length;i++){$(`#${ids[2]}`).append(low_week[i])}

        let low_year = get_outlet_water_temperature_tr_html(data, "low_year_result");

        for (let i=0;i<low_year.length;i++){$(`#${ids[3]}`).append(low_year[i])}
    }else {
        let high_week = get_outlet_water_temperature_tr_html(data, "high_week_result");
        let high_year = get_outlet_water_temperature_tr_html(data, "high_year_result");
        let low_week = get_outlet_water_temperature_tr_html(data, "low_week_result");
        let low_year = get_outlet_water_temperature_tr_html(data, "low_year_result");

        for (let i=0;i<high_week.length;i++){$(`#${ids[0]}`).append(high_week[i])}

        for (let i=0;i<high_year.length;i++){$(`#${ids[1]}`).append(high_year[i])}

        for (let i=0;i<low_week.length;i++){$(`#${ids[2]}`).append(low_week[i])}

        for (let i=0;i<low_year.length;i++){$(`#${ids[3]}`).append(low_year[i])}
    }
}

/**
 * @function set_outlet_water_temp_time_range
 * @desc 设置出水温度表格数据的时间周期
 * @param {object}  data 用于设置时间周期的数据字典(包含start、end字段数据)
 * @param {object}  titles 用于设置时间周期的id值组成的数组
 */
function set_outlet_water_temp_time_range(data, titles) {
    for (let i=0;i<titles.length;i++){
        if (titles[i].includes("week")) {

            set_time_range(titles[i], {"start": data["week_start"], "end": data["week_end"]});
        }else {
            set_time_range(titles[i], {"start": data["year_start"], "end": data["year_end"]});
        }
    }
}

/**
 * @function get_common_option
 * @desc 获取完整的option配置字典，根据data_mapping中的数据，结合data_option内容返回完整的供echarts使用的option配置
 * @param {object}  data_values ajax请求返回的data数据(包含该图表设置所需数据块即可)
 * @param {object}  data_option 基础option配置(除却数据项的数据，如legend、style等，axis、series等需要数据配合的项按照需要设置为空数字或者空字典)
 * @param {object}  data_mapping 用于映射数据的字典，字典中的项对应data_option中需要设置数据的项，将data_values中的数据对应填充
 * @returns {object}  data_option 用于设置数据option配置字典
 */
function get_common_option(data_values, data_option, data_mapping) {
    //
    for(let key in data_mapping){
        let key_data = data_mapping[key];
        if (key_data["type"] === "arr"){
            for (let i=0;i<key_data["values"].length;i++){
                for (let j=0;j<key_data["obj"].length;j++){
                    let modify_key = key_data["obj"][j];
                    if (key_data["values"][i].hasOwnProperty(modify_key)){
                        key_data["values"][i][modify_key] = data_values[key_data["values"][i][modify_key]]
                    }
                }
            }

        }else if (key_data["type"] === "obj"){
            for (let j=0;j<key_data["obj"].length;j++){
                let modify_key = key_data["obj"][j];

                if (typeof key_data["values"][modify_key] === 'function'){
                    key_data["values"][modify_key] = key_data["values"][modify_key](data_values);
                }else if (typeof key_data["values"][modify_key] === 'string'){

                    key_data["values"][modify_key] = data_values[key_data["values"][modify_key]];
                }

            }

        }

        data_option[key] = data_mapping[key]["values"];

    }
    return data_option;
}

/**
 * @function format
 * @desc 自定义类似于python中format的字符串格式化函数
 * @returns {string}  str 格式化完成后的字符串
 */
String.prototype.format = function () {
    // 类似python中的format效果
    let str = this;
    for(let i = 0;i < arguments.length;i++){
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};


/**
 * @class DataChart
 * @classdesc DataChart类中对大部分相同操作进行了整合，公共流程概述为：初始化图表 -> 发送ajax请求 -> 设置特殊文字 -> 设置时间周期 -> 渲染数据，针对个别特殊的图表设置了funcs字段可以通过自定义函数进行设定
 * @desc 构造函数中针对大部分数据都有默认值设置，为了适用于多图表同请求参数的情况，以数组形式定义每个字段
 */
class DataChart {

    /**
     * @method constructor
     * @desc 构造函数，初始化字段以及部分特殊操作(针对大周期数据修改页面文字显示)
     * @param request_data  请求参数，如{"start": "", "end": "", "by": ""}
     * @param time_ids  需要设置时间周期的dom元素id值数组
     * @param funcs 需要执行的函数数组
     * @param chart_objs  图表id值数组，会以此id初始化echarts对象
     * @param option_datas  option基础配置字典(不包含数据项)
     * @param option_mappings   option映射字典(包含数据项)
     * @param dataZooms option配置中的dataZoom，控制图表缩放
     * @param request_type  ajax请求类型
     */

    constructor ({request_data, time_ids, funcs=[false], chart_objs=[false], option_datas=[false], option_mappings=[false], dataZooms=[1], request_type='POST'}){
        this.request_data = request_data;
        this.time_ids=time_ids;
        this.funcs=funcs;
        this.chart_objs=chart_objs;
        this.option_datas=option_datas;
        this.option_mappings=option_mappings;
        this.dataZooms=dataZooms;
        this.request_type=request_type;
        if (document.location.href.includes("cona")){
            this.request_url =  cona_url;
            let remove_div = ['table_geothermal_wells', 'table_water_temp_heat', 'table_avg_temp_with_temp'];
            let titles = ['max_load_title', 'min_load_title', 'cost_saving_total_title', 'cost_saving_title', 'temp_diff_title', 'load_title', 'water_replenishment_title'];
            if (is_large){
                for (let i=0;i<remove_div.length;i++){
                    $(`#${remove_div[i]}`).remove();
                }
                for (let i=0;i<titles.length;i++){
                    let tmp = $(`#${titles[i]}`).text().trim();
                    if (tmp.includes("去年") || tmp.includes("上周") || tmp.includes("上月")){
                        $(`#${titles[i]}`).text(tmp.replace("去年", "").replace("上周", "").replace("上月", ""));
                    }
                }
            }
        }else {
            this.request_url =  kamba_url;
            let titles = ['max_load_title', 'min_load_title', 'kamba_cost_saving_title', 'avg_load_title', 'solar_matrix_title'];
            if (is_large){
                for (let i=0;i<titles.length;i++){
                    let tmp = $(`#${titles[i]}`).text().trim();
                    if (tmp.includes("去年") || tmp.includes("上周") || tmp.includes("上月")){
                        $(`#${titles[i]}`).text(tmp.replace("去年", "").replace("上周", "").replace("上月", ""));
                    }
                }
            }
        }
    }

    /**
     * @method init_chart
     * @desc 以dom元素为对象初始化echarts对象，dom元素由chart_objs中的id值获取
     */
    init_chart(){
        for(let i=0;i<this.chart_objs.length;i++){
            if (this.chart_objs[i]){
                this.chart_objs[i] = echarts.init(document.getElementById(this.chart_objs[i]));
                this.chart_objs[i].showLoading();
                charts.push(this.chart_objs[i]);
            }
        }
    }

    /**
     * @method text_setting
     * @desc 设置特殊文字
     * @param data  ajax请求返回的data数据
     */
    text_setting(data){
        // 特殊板块文字设定（最大负荷、最小负荷、节省供暖费用导航标题）
        if (this.request_data.key.includes("api_load")){
            $('#max_load').text(data['max_load'] + 'KW');
            $('#min_load').text(data['min_load'] + 'KW');
            if ($("#avg_load")) $('#avg_load').text(data['avg_load'] + 'KW');
        }else if(this.request_data.key.includes("api_cost_saving")){
            $('#cost_saving_sum').text(data['cost_saving_total'] + '万元');
            for (let i=0;i<this.chart_objs.length;i++){
                if (this.time_ids[i]){
                    if (this.request_url.includes("kamba")){
                        let now =$(`#${this.time_ids[i]}`).text().trim().slice(0, -1);
                        now = now + `，节省费用总计：${data['cost_saving_total']}万元)`;
                        $(`#${this.time_ids[i]}`).text(now);
                    }else if (this.request_url.includes("cona")){
                        let now =$(`#${this.time_ids[i]}`).text().trim();
                        now = now + `(总计：${data['cost_saving_total']}万元)`;
                        $(`#${this.time_ids[i]}`).text(now);
                    }

                }

            }
        }else if (this.request_data.key.includes("api_heat_supply")){
            $('#avg_heat').text(data['avg_heat_network'] + 'KW');
        }
    }

    /**
     * @method  cop_bind
     * @desc    为cop图表绑定数据，将序列图与仪表盘图表以点击事件关联
     */
    cop_bind(){
        for (let i=0;i<this.chart_objs.length;i+=2){
            let _ = this;
            this.chart_objs[i+1].getZr().on('click', function (params) {
                let pointInPixel= [params.offsetX, params.offsetY];
                if (_.chart_objs[i+1].containPixel('grid',pointInPixel)) {

                    let pointInGrid=_.chart_objs[i+1].convertFromPixel({seriesIndex:0},pointInPixel);
                    //X轴序号
                    let xIndex=pointInGrid[0];

                    //获取当前图表的option
                    let op=_.chart_objs[i+1].getOption();

                    //获得图表中我们想要的数据
                    let month = op.xAxis[0].data[xIndex];
                    let value = op.series[0].data[xIndex];
                    let tmp_options = get_cop_pie_options(value, _.request_url);
                    _.chart_objs[i].setOption(tmp_options);
                    console.log(month+"："+value, tmp_options, _.chart_objs[i]);
                }
            });
        }

    }

    /**
     * @method  data_render
     * @desc    主要执行函数，包含渲染图表的整个过程，初始化图表 -> 发送ajax请求 -> 设置特殊文字 -> 设置时间周期 -> 渲染数据(有func参数则执行其中函数，否则按照常规流程获取option进行设置)
     */
    data_render(){
        try {
            this.init_chart();
            // console.log(this.request_data.key);

            let obj = this;
            $.ajax(
                {
                    url: this.request_url,
                    type: this.request_type,
                    data: this.request_data,
                    cache: true,
                    success: function (data) {

                        // 特定文字设置
                        obj.text_setting(data);

                        for (let i = 0; i < obj.chart_objs.length; i++) {
                            // 设置时间
                            if (obj.time_ids[i]){
                                if (obj.request_data.key.includes("cop") && obj.time_ids[i].includes("pie")){
                                    let tmp_id = obj.time_ids[i];
                                    let tmp_text = $(`#${tmp_id}`).text();
                                    if (obj.request_data.key.includes("sub") && obj.request_url.includes("cona")){
                                        if (!data['status'][i].includes("正常")) $(`#${tmp_id}`).text(tmp_text + '(' + data["status"][i] + ')');
                                    }else {
                                        if (!data['status'].includes("正常")) $(`#${tmp_id}`).text(tmp_text + '(' + data["status"] + ')');
                                    }
                                }else {
                                    set_time_range(obj.time_ids[i], data);
                                }
                            }

                            // 渲染数据
                            if (obj.funcs[i]) {
                                if (obj.funcs[i].type === "option") {
                                    obj.chart_objs[i].hideLoading();
                                    obj.chart_objs[i].setOption(obj.funcs[i].func(data));



                                    console.log("****************************************************************************");
                                    let t_id = obj.time_ids[i];
                                    let t_text = $(`#${t_id}`).text();

                                    if (t_text){
                                        console.log(t_text);
                                    }else{
                                        console.log("木有");
                                    }


                                    console.log(obj.funcs[i].func(data));
                                    console.log("****************************************************************************");



                                } else if (obj.funcs[i].type === "p_function") {

                                    console.log("表格");
                                    console.log();

                                    console.log("****************************************************************************");

                                    let t_id = obj.time_ids[i];
                                    let t_text = $(`#${t_id}`).text();

                                    if (t_text){
                                        console.log(t_text);
                                    }else{
                                        console.log("木有");
                                    }


                                    console.log(obj.funcs[i]);
                                    console.log("****************************************************************************");


                                    obj.funcs[i].func(data);
                                }
                            } else {
                                let option = get_common_option(data, obj.option_datas[i], obj.option_mappings[i]);
                                if (is_large) {
                                    if (!option.hasOwnProperty("dataZoom")) {
                                        if (obj.dataZooms[i] === 1) {
                                            option["dataZoom"] = [{
                                                show: true,
                                                realtime: true,
                                                start: 30,
                                                end: 70,
                                                xAxisIndex: [0, 1]
                                            }];
                                            option["toolbox"]["feature"]["dataZoom"] = {yAxisIndex: 'none'};
                                        } else if (obj.dataZooms[i] === 2) {
                                            option["dataZoom"] = [
                                                {show: true, realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]},
                                                {type: 'inside', realtime: true, start: 30, end: 70, xAxisIndex: [0, 1]}
                                            ];

                                            option["toolbox"]["feature"]["dataZoom"] = {yAxisIndex: 'none'};
                                        }
                                    }
                                }
                                obj.chart_objs[i].hideLoading();

                                console.log("****************************************************************************");

                                let t_id = obj.time_ids[i];
                                let t_text = $(`#${t_id}`).text();

                                if (t_text){
                                    console.log(t_text);
                                }else{
                                    console.log("木有");
                                }


                                // console.log($(`#${obj.time_ids[i].id}`).text());
                                console.log(option);
                                console.log("****************************************************************************");
                                obj.chart_objs[i].setOption(option);
                            }
                        }

                        // 针对COP数据饼图绑定数据动态显示

                        if (obj.request_data.key.includes("cop")) obj.cop_bind();


                    },
                    error: function (xhr) {
                        console.log("失败", xhr);
                    }
                }
            );
        }catch (e) {
            console.log('error', e)
        }
    }
}



/**
 * @function run
 * @desc 按照d_type类型生成对应的DataChart对象并调用其中的data_render方法渲染图表
 * @param {object}  d_type 类型，cona、kamba等
 */

function run(d_type) {
    let conf = cona_conf;
    if (d_type.includes("kamba")) conf = kamba_conf;

    for (let key in conf){
        new DataChart(conf[key]).data_render();
    }
}




export {run};
