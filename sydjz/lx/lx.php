<?php
// 接收前端传递的表单数据
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// 配置邮箱信息
$to = "306067004@qq.com"; // 接收邮件的QQ邮箱
$title = "善意的竞争网站留言 - " . $subject; // 邮件标题
$content = "
    <h2>新的网站留言</h2>
    <p><strong>姓名：</strong>$name</p >
    <p><strong>邮箱：</strong>$email</p >
    <p><strong>板块：</strong>$subject</p >
    <p><strong>内容：</strong>$message</p >
";

// 邮件头（设置为HTML格式）
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: 网站留言 <no-reply@coco.com>" . "\r\n";

// 发送邮件
if(mail($to, $title, $content, $headers)){
    echo "success";
}else{
    echo "error";
}
?>