String.prototype.format = function () {
    var str = this;
    for(var i = 0;i < arguments.length;i++){
        var str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return str;
};



try {
    // project
    var params = document.location.href.split('?');
    var id = params.pop();
    $.ajax(
        {
            url: 'http://cdqrmi.com:8000/api/common/',
            type: "POST",
            data: {
                "key": "project",
                "id": id
            },
            cache: true,
            success: function (data) {
                $('.detail_title').text(data['title']);
                $('#detail_spec').text(data['spec']);
                $('#detail_size').text(data['size']);
                $('#detail_type').text(data['type']);

                for (var i=1;i<data['num']+1;i++){
                    if (i==1) {
                        var div_html = '<div class="carousel-item active">' + '<img src="images/{0}_{1}.jpg" class="d-block w-100" alt="...">' + '</div>';
                        div_html = div_html.format(data['id'], i);
                    }else {
                        var div_html = '<div class="carousel-item">' + '<img src="images/{0}_{1}.jpg" class="d-block w-100" alt="...">' + '</div>';
                        div_html = div_html.format(data['id'], i);
                    }
                    $('#img_div').append(
                        div_html
                    );
                }

            },
            error: function (xhr) {
                console.log("post project error：", xhr);
                window.location.href = 'http://cdqrmi.com';
            }
        }
    );
}catch (e) {
    console.log("ajax load error：", e);
}

