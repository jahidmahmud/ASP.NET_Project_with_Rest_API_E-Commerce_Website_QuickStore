jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
  var Email = Cookies.get('email');
	getAllBlog();
  function getAllBlog(){
    console.log(Email);
    $.ajax({
        url:"http://localhost:63483/api/admins/blog",
        method:"GET",
       /* headers: {​​​​​  
               Authorization: "Basic "+btoa(Email+":"+userpassword) }​​​​​,*/
        headers : {
          Authorization: "Basic "+btoa(Email+":"+userpassword) 
        },
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            console.log('If');
            var str = "";
            str +="<thead class='thead-dark'><tr><th>S Heading</th><th>B Heading</th><th>S Description</th><th>L Description</th><th>Author</th><th>Image</th><th>Posted</th><th>Action</th></tr></thead><tbody>"
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              str +="<tr><td>"+data[i].shortHeading+"</td><td>"+data[i].blogHeading+"</td><td>"+data[i].shortDescription+"</td><td>"+data[i].longDescription+"</td><td>"+data[i].author+"</td><td><img src='" + data[i].blogImage + "' /></td><td>"+data[i].postedOn+"</td><td><a href='blogedit.html?id="+data[i].blogId+"' title='Edit Category' class='editBtn'><i class='fas fa-edit fa-lg text-info'></i></a></td></tr>";
            }
            str +="</tbody>"
            $("#dataTable").html(str);

          }
          else
          {
            console.log('else');
            $(".error").show();
            $(".error").html("Something error");
            /*$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);*/
          }
        }
      });
    }
});