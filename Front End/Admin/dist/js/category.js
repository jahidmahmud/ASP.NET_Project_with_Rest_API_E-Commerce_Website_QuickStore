jQuery(document).ready(function() {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var Emails = Cookies.get('email');
  var userpassword = Cookies.get('upassword');
  getAllCategory();
  function getAllCategory(){
    $.ajax({
        url:"http://localhost:63483/api/categories",
        method:"GET",
        /*headers: {​​​​​  
               'Authorization': 'Basic ' + btoa(email + ':' + userpassword)  
            }​​​​​,*/
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var str = "";
            str +="<thead class='thead-dark'><tr><th>Category Id</th><th>Category Name</th><th>Action</th></tr></thead><tbody>"
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              str +="<tr><td>"+data[i].categoryId+"</td><td>"+data[i].categoryName+"</td><td><a href='#' id="+data[i].categoryId+" title='View Details' class='infoBtn'><i class='fas fa-info-circle fa-lg text-success'></i></a>&nbsp;<a href='categoryedit.html?id="+data[i].categoryId+"' title='Edit Category' class='editBtn'><i class='fas fa-edit fa-lg text-info'></i></a></td></tr>";
            }
            str +="</tbody>"
            $("#dataTable").html(str);
            $('.editBtn').click(function(event) {
              console.log("Hellow");
            });
          }
          else
          {
            $(".error").show();
            $(".error").html("Something error");
            /*$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);*/
          }
        }
      });
    }

  Load();
     function Load(e) {
      edit_id=$(location).attr('href').split("=")[1];
      $.ajax({
        url:"http://localhost:63483/api/categories/"+edit_id,
        method:"GET",
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var data=xmlhttp.responseJSON;
            $('#id').val(data.categoryId);
            $('#category').val(data.categoryName);
          }
        }
      });
      
    }

    //Add Category
    $('#addCatBtn').click(function(e) {
      
        var categoryname=$("#categoryname").val();
          if(categoryname != ""){

            $.ajax({
              url:"http://localhost:63483/api/categories",
              method:"POST",
              header:"Content-Type:application/json",
              data:{
                CategoryName:$("#categoryname").val()
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                  Swal.fire({
                    title: 'Category Added successfully',
                    type:'success'
                  });
                  $('#addCatModal').hide();
                  getAllCategory();
                }
                else
                {
                  $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
              }
            }); 
          }else{
            $(".error").html("Please insert value first");
          }
    });


    



});