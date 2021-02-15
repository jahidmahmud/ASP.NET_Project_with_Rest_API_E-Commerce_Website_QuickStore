jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
	categoryName();
	function categoryName(){
      $.ajax({
            url:'http://localhost:63483/api/categories',
            method: 'Get',
            complete:function(xmlhttp,status){
              if(xmlhttp.status==200)
              {
              var data=xmlhttp.responseJSON;
                selectdata ="";
                for (var i = 0; i < data.length; i++){
                  selectdata += "<option value="+data[i].categoryId+">"+data[i].categoryName+"</option>";
                  
                }
                $('#categoryIdVal').html(selectdata);
              }
              else
              {
                console.log(xmlhttp.status+":"+xmlhttp.statusText);
              }
            }
          });
    }


    //add

    /*$('#addProBtn').click(function(){
        AddProduct();
      }); */
      $('#addProBtn').click(function(e) {
      
        var productname=$("#productname").val();
        var categoryIdVal=$("#categoryIdVal").val();
        var description=$("#description").val();
        var quantity=$("#quantity").val();
        var price=$("#price").val();
        var longDescrib=$("#longdescription").val();

          if(productname != "" && categoryIdVal != "" && description != "" && quantity != "" && price != "" && longDescrib != "" ){

            $.ajax({
              url:"http://localhost:63483/api/products",
              method:"POST",
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
                if(xmlhttp.status==201)
                {
                  Swal.fire({
                    title: 'Product Added successfully',
                    type:'success'
                  });
                }
                else
                {
                  Swal.fire({
                    title: 'Somthing error',
                    type:'error'
                  });
                }
              }
            }); 
          }else{
             Swal.fire({
                    title: 'All fields are required',
                    type:'error'
                  });
          }
    });
});