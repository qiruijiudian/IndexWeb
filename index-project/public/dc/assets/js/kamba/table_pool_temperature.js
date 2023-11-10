// 水池温度

new DataChart(
    request_data={"key": "api_pool_temperature", "end": end, "by": 'h'},
    time_ids=["pool_temp_status"],
    funcs=[
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
).data_render();

