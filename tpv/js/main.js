	
	$(document).ready(function(){
		$('#btn_search').click(function(){
			getProductos(document.getElementById("txtBuscar").value);
			//alert(document.getElementById("txtBuscar").value);
		});
		//getAllInventario();

		$('#btnSave').click(function(){
			var cla = document.getElementById('clave_empleado').value;
			var tot = document.getElementById('total').value;
			var fec = document.getElementById('fecha').value;

			if(cla == "" || tot == "" || fec == ""){
				alert("No debes tener campos vacios :P");
				//console.log(cla+"des:"+des);
			}else{
				var datosSave = $('#form_vta_total').serialize();
				//console.log(datosUpdate);
				//alert(datosSave);
				$.ajax({
					method: "POST",
					url: "../db/db_tpv_insert_regvtatotal.php",
					dataType: "json",
					//data: { name: "John", location: "Boston" }
					data: datosSave,
					success: function(response){
						console.log(response);
						//var resultJson = JSON.parse(response);
						if(response.success){
							//console.log(response);
							alert("Msg: "+response.data.message);
						}else{
							alert("Msg: "+response.data.message);
						}
					},
					error: function(msg){
						console.log("error",msg);
					}
				});
			}
		});
		//getVtaReportes();
		$('#btnReporte').click(function(){
			getVtaReportes();
		});
		$('#btnVtaTotal').click(function(){

			var clave="";
			var clave = prompt("Ingresa clave vendedor:", "1");
		    if (clave == null || clave == "") {
		        clave = "User cancelled the prompt.";
		    } else {
		        //txt = "Hello " + cantidad + "! How are you today?";
		        //setVtaDetalle(clave, descripcion, precio, cantidad, "otros");
		        var arrayDatos = [];
		        var d = new Date();
		        var folio = d.getFullYear()+""+(d.getMonth()+1)+""+d.getDate()+""+d.getHours()+""+d.getMinutes();
		        //2018-07-18
		        
		        arrayDatos.push({Empleado:clave, Cliente:"1", Folio:folio});
		        arrayDatos.push(arrayVtaDetalle);
		        console.log(arrayDatos);
		    }
		});
	});

	function getCantidad(clave, descripcion, precio) {
	    var txt;
	    var cantidad = prompt("Ingresa cantidad:", "1");
	    if (cantidad == null || cantidad == "") {
	        txt = "User cancelled the prompt.";
	    } else {
	        //txt = "Hello " + cantidad + "! How are you today?";
	        setVtaDetalle(clave, descripcion, precio, cantidad, "otros");
	    }
	    //document.getElementById("demo").innerHTML = txt;
	}

	function getProductos(descripcion){
		var codProducto = "";
		var desProducto = "";
		var preProducto = "";
		var canProducto = "";
		$.ajax({
			method:"POST",
			url:"../../db/db_producto_read.php",
			data:{request:"getProductos", descripcion:descripcion},
			dataType:"json",
			success: function(response){
				console.log(response);
					//alert("Obtenemos producto buscado"+response.success);
					if(response.success){
					//alert("Obtenemos todos los productos");
					//$("#tableAllProductos > tr").remove();
					$("#tbodyAllProductos tr").remove();
					$.each(response.data.items, function(key, value){
						
						var tableRow = "<tr>";
						$.each(value, function(productKey, productValue){
							
							if(productKey == "codigo"){
								tableRow+="<td>"+productValue+"</td>";
								codProducto = productValue;
							}else if(productKey == "descripcion"){
								tableRow+="<td>"+productValue+"</td>";
								desProducto = productValue;
							}/*else if(productKey == "cantidad"){
								tableRow+="<td>"+productValue+"</td>";
							}*/else if(productKey == "ventaPub"){
								tableRow+="<td> $"+productValue+"</td>";
								preProducto = productValue;
							}
						});
						tableRow+="<td><a href=\"#\" onclick='getCantidad(\""+codProducto+"\",\""+desProducto+"\",\""+preProducto+"\");'>Agregar</a></td>";

						$('#tbodyAllProductos').append(tableRow+"</tr>");	
					});
					
				}else{
					alert("Producto no encontrado");
				}
			},
			error: function(msg){
				console.log("Error: "+msg);
			}
		});
	}

	function getAllInventario(){
		//alert("Obtenemos todos los productos");
		$.ajax({
			method:"POST",
			url:"../../db/db_producto_read.php",
			data:{request:"getAllProductos"},
			dataType:"json",
			success: function(response){
				console.log(response);
				if(response.success){
					alert("Obtenemos todos los productos");
				}
			},
			error: function(msg){
				console.log("Error: "+msg);
			}
		});
	};
	var vtaPrecio = 0.00;
	var arrayVtaDetalle=[];
	function setVtaDetalle(clave, descripcion, precio, cantidad, otros){
		//var cars = new Array(clave, descripcion, precio);
		arrayVtaDetalle.push({Clave:clave, Descripcion:descripcion, Precio:precio, Cantidad:cantidad});
		console.log(arrayVtaDetalle);
		//document.getElementById("lblVentaTotal")
		vtaImporte = parseFloat(precio)*parseFloat(cantidad);
		vtaPrecio+=vtaImporte;
		document.getElementById("lblVentaTotal").innerHTML = "Venta Total: <strong>$"+vtaPrecio+"</strong>";
		var tableRow = "<tr>";
			
			//if(productKey == "codigo"){
				tableRow+="<td>"+clave+"</td>";
			//}else if(productKey == "descripcion"){
				tableRow+="<td>"+descripcion+"</td>";
			//}else if(productKey == "cantidad"){
				tableRow+="<td>"+precio+"</td>";
			//}else if(productKey == "unidadCompra"){
				tableRow+="<td>"+cantidad+"</td>";
			//}else if(productKey == "costoProv"){
				tableRow+="<td> $"+vtaImporte+"</td>";
			//}else if(productKey == "ventaPub"){
				tableRow+="<td>otro</td>";
			//}else if(productKey == "extras"){
				//tableRow+="<td>"+productValue+"</td>";
			//}

		$('#tbodyVtaProductos').append(tableRow+"</tr>");
	}

	function getVtaReportes(){
		//alert("Obtenemos todos los productos");
		$.ajax({
			method:"POST",
			url:"../../db/db_tpv_get_reporte.php",
			data:{request:"getVtaTotal"},
			dataType:"json",
			success: function(response){
				console.log(response);
				if(response.success){
					//alert("Obtenemos todos los productos");
					//clave_empleado, total, created, updated
					$("#tbodyReportes tr").remove();
					$.each(response.data.items, function(key, value){
						var tableRow = "<tr>";
						$.each(value, function(productKey, productValue){
							
							if(productKey == "clave_empleado"){
								tableRow+="<td>"+productValue+"</td>";
							}else if(productKey == "nombre"){
								tableRow+="<td>"+productValue+"</td>";
							}else if(productKey == "total"){
								tableRow+="<td>"+productValue+"</td>";
							}else if(productKey == "created"){
								tableRow+="<td>"+productValue+"</td>";
							}
							
						});

						$('#tbodyReportes').append(tableRow+"</tr>");	
					});
					
				}
			},
			error: function(msg){
				console.log("Error: "+msg);
			}
		});
	};