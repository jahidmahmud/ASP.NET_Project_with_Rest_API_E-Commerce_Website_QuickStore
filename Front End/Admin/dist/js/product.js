jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
  var Email = Cookies.get('email');
	getAllBlog();
  function getAllBlog(){
    $.ajax({
        url:"http://localhost:63483/api/products",
        method:"GET",
        headers : {
          Authorization: "Basic "+btoa(Email+":"+userpassword) 
        },
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            console.log('If');
            var str = "";
            str +="<thead class='thead-dark'><tr><th>Product Name</th><th>CategoryId</th><th>Description</th><th>L Description</th><th>Quantity</th><th>Price</th><th>Image</th><th>Action</th></tr></thead><tbody>"
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              str +="<tr><td>"+data[i].productName+"</td><td>"+data[i].categoryId+"</td><td>"+data[i].description+"</td><td>"+data[i].longDescrib+"</td><td>"+data[i].quantity+"</td><td>"+data[i].price+"</td><td><img src='" + data[i].productImage + "' /></td><td><a href='productedit.html?id="+data[i].productId+"' title='Edit Category' class='editBtn'><i class='fas fa-edit fa-lg text-info'></i></a>&nbsp<a href='#' id="+data[i].productId+" title='Delete Category' class='deleteBtn'><i class='fas fa-trash-alt fa-lg text-info text-danger'></i></a></td></tr>";
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

    //products edit
    loadProducts();
     function loadProducts(e) {
      edit_id=$(location).attr('href').split("=")[1];
      $.ajax({
        url:"http://localhost:63483/api/products/"+edit_id,
        method:"GET",
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var data=xmlhttp.responseJSON;
            $('#id').val(data.productId);
            $('#productname').val(data.productName);
            //$('#categoryid').val(data.categoryId);
            $('#description').val(data.description);
            $('#quantity').val(data.quantity);
            $('#price').val(data.price);
            $('#longdescription').val(data.longDescrib);
            categoryId();
          }
        }
      });
      
    }

    function categoryId(){
      $.ajax({
            url:'http://localhost:63483/api/categories',
            method: 'Get',
            complete:function(xmlhttp,status){
              if(xmlhttp.status==200)
              {console.log('if');
              var data=xmlhttp.responseJSON;
                selectdata ="";
                for (var i = 0; i < data.length; i++){
                  selectdata += "<option value="+data[i].categoryId+">"+data[i].categoryName+"</option>";
                  console.log('for');
                }
                 console.log(selectdata);
                $('#categoryIdVal').html(selectdata);
              }
              else
              {
                  console.log('else');
                console.log(xmlhttp.status+":"+xmlhttp.statusText);
              }
            }
          });
    }
    //select for category



    //update products
    $('#editProBtn').click(function(){
        updateProducts();
      });    
  //Update Category 
    function updateProducts() {
      edit_id=$(location).attr('href').split("=")[1];
      console.log(edit_id);
      $.ajax({
        url:"http://localhost:63483/api/products/"+edit_id,
        method: 'Put',
        header:"Content-Type:application/json",
        data:{
            productName: $("#productname").val(),
            categoryId: $("#categoryIdVal").val(),
            description: $("#description").val(),
            quantity: $("#quantity").val(),
            price: $("#price").val(),
            longDescrib: $("#longdescription").val()
        },
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            Swal.fire({
                    title: 'Category Updated successfully',
                    type:'success'
                  });
          }
          else
          {
            console.log(xmlhttp.status+":"+xmlhttp.statusText);
          }
        }
      });
    }

    //delete product

    //Delete a note request
     $('body').on('click', '.deleteBtn', function(e){
      e.preventDefault();
      del_id=$(this).attr('id');
      //console.log(del_id);
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url:"http://localhost:63483/api/products/"+del_id,
          method:"Delete",
          header:"Content-Type:application/json",
          
          complete:function(xmlhttp,status){
            if(xmlhttp.status==204)
            {
              Swal.fire(
              'Deleted!',
              'Product deleted successfully!!.',
              'success'
            )
              getAllBlog();
            }
            else
            {
              console.log(xmlhttp.status+":"+xmlhttp.statusText);
            }
          }
        });
        /*$.ajax({
          url: 'catedit.php',
          method: 'post',
          data: {del_id: del_id},
          success:function(response){
            Swal.fire(
              'Deleted!',
              'Category deleted successfully!!.',
              'success'
            )
            displayAllCategory();
          }
        });*/
      }
    });
     });
});