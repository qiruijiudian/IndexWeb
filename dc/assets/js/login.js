function removeDialog() {
    setInterval(() => {
        if ($(".dialog").length > 0) {
            m_DialogGroup.shift();
            $(".dialog")[0].remove();
            Array.from($(".dialog")).forEach(element => {
                element.style.top = (parseInt(element.style.top) - 80) + 'px';
            });
            for (let i = 0; i < m_DialogGroup.length; i++) {
                m_DialogGroup[i] -= 80;
            }
        }
    }, 3500);
}

//消息提示组件
function showDialogBox(msg, type, width, height) {
    m_DialogGroup[0] = -80;
    let m_Top = m_DialogGroup.slice(-1)[0] + 80;
    m_DialogGroup.push(m_Top);
    let m_Dialog = document.createElement("div");
    m_Dialog.style.height = height + "px";
    m_Dialog.style.width = width + "px";
    m_Dialog.style.color = "white";
    m_Dialog.className = "dialog";
    m_Dialog.innerText = msg;
    m_Dialog.setAttribute("type", "error");
    $("body").append(m_Dialog);
    setTimeout(() => {
        m_Dialog.style.opacity = 1;
        m_Dialog.style.top = m_Top + 'px';
    }, 0);
}





var m_DialogGroup = [], m_Start = false, now_href = document.location.href, common_url = "http://cdqrmi.com:8000/api/common/";

if (document.location.href.indexOf('cdqrmi') < 0){
    common_url = "http://127.0.0.1:8000/api/common/";
}


if (now_href.indexOf('permission_error') > -1){
    showDialogBox('请登录后再访问原网页', 'error', 350, 60);
    if (m_Start == false) {
        m_Start = true;
        removeDialog();
    }
}

$("#login").click(

    function () {
        var u_name = $("#u_name").val();
        var pwd = $("#pwd").val();
        console.log(u_name, pwd);

        $.ajax(
            {
                url: 'http://127.0.0.1:8000/api/common/',
                type: "POST",
                data: {
                    "key": "login",
                    "u_name": u_name,
                    "pwd": pwd,
                },
                cache: true,
                success: function (data) {
                    console.log(data);
                    var cookie_date = new Date();
                    cookie_date.setDate(cookie_date.getDate() + 30);
                    document.cookie = `auth=${data['token']};expires=${cookie_date.toUTCString()}`;
                    window.location.href = 'cona.html'
                },
                error: function (xhr) {
                    console.log("error：", xhr);
                    showDialogBox('用户名或密码错误，请修改后重试', 'error', 350, 60);
                    if (m_Start == false) {
                        m_Start = true;
                        removeDialog();
                    }

                }
            }
        );
    }
);