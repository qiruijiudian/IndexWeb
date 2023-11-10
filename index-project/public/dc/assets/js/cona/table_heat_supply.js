// 供热量与平均温度

new DataChart(
    request_data={"key": "api_heat_supply", "start": start, "end": end, "by": "d"},
    time_ids=["avg_temp_with_heat_title"],
    funcs=[
        {
            "type": "p_function",
            "func": function (data) {
                for (var i=0;i<data['heat_pipe_network_data'].length;i++){
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
).data_render();

