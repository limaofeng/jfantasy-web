<#assign s=JspTaglibs["/WEB-INF/tlds/struts-tags.tld"]/>
<!DOCTYPE html>
<html>
<title>文章预览</title>
<head>
    <link rel="stylesheet" type="text/css" href="${request.contextPath}/css/phone.css">
    <script type="text/javascript" src="${request.contextPath}/js/jquery-1.9.1.min.js"></script>
</head>
<body>
<header>
<@s.hidden name="id" value="%{#parameters['id']}" cssClass="artId"/>
  <script type="text/javascript">
      $(function() {
          var url = "http://eflupwx.ruochuchina.com/books/detail/" + $('.artId').val();
          $('iframe').attr('src', url);
      });
</script>
    <div class="phone">
        <iframe frameborder="0" src=""></iframe>
        <div class="statusbar">
        </div>
    </div>

</header>
</body>
</html>