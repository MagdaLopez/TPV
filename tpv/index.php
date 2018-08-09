<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script src="js/main.js"></script>
</head>
<body>
<div class="main-container">
	<!-- Tab links -->
	<div class="tab">
	  <button class="tablinks" onclick="openCity(event, 'London')">T.P.V.</button>
	  <button class="tablinks" onclick="openCity(event, 'Paris')">Vender</button>
	  <button class="tablinks" onclick="openCity(event, 'Tokyo')">Reg. Venta</button>
	  <button class="tablinks" onclick="openCity(event, 'reportes')">Reportes</button>
	</div>

	<!-- Tab content -->
	<div id="London" class="tabcontent">
	  <h3>London</h3>
	  <p>London is the capital city of England.</p>
	</div>

	<div id="Paris" class="tabcontent">
		<div class="w3-container">
			<div class="w3-container w3-blue">
				<h2>Venta Parcial</h2>
			</div>
			<div class="w3-cell-row">
			  <div class="w3-container w3-red w3-cell">
			    <form>
			    	<p>
					<label>Ingresar clave o nombre:</label>
					<input id="txtBuscar" class="w3-input" type="search"></p>
					<input type="button" class="w3-btn w3-blue-grey" id="btn_search" value="Buscar">
				</form>
			  </div>
			  <div class="w3-container w3-green w3-cell">
			    <div class="tbl-scroll">
			    	<table class="tbl_default" id="tableAllProductos">
					<thead>
						<tr>
							<th>Clave</th>
							<th>Descripción</th>
							<th>Precio</th>
							<th>Opción</th>
						</tr>
					</thead>
					<tbody id="tbodyAllProductos">

					</tbody>
				</table>
			    </div>
			    
			  </div>
			</div>
			<div class="w3-container w3-blue">
				<h3><p id="lblVentaTotal">Venta Total:<strong> $150.00</p></strong></h3>
				<input id="btnVtaTotal" class="w3-btn w3-blue-grey" type="button" name="btn_guardar" value="Generar Venta">
			</div>
		  <table id="myTable" class="w3-table w3-striped">
		   <thead>
				<tr>
					<th>Clave</th>
					<th>Descripción</th>
					<th>Precio</th>
					<th>Cantidad</th>
					<th>Importe</th>
				</tr>
			</thead>
			<tbody id="tbodyVtaProductos">

			</tbody>
		  </table>
		</div>
	</div>

	<div id="Tokyo" class="tabcontent">
		<div class="w3-container w3-blue">
		  <h2>Venta Total por Empleado</h2>
		</div>
		<form class="w3-container" id="form_vta_total">
			<p>
			<label>Clave Usuario</label>
			<input id="clave_empleado" name="clave_empleado" class="w3-input" type="text"></p>
			<p>
			<label>Cantidad</label>
			<input id="total" name="total" class="w3-input" type="number" step=".01"></p>
			<p>
			<label>Fecha</label>
			<input id="fecha" name="fecha" class="w3-input" type="date"></p>
			<input id="btnSave" class="w3-btn w3-blue-grey" type="button" name="btn_guardar" value="Guardar">
		</form>
	</div>
	<div id="reportes" class="tabcontent">
		<div class="w3-container w3-blue">
		  <h2>Reportes de Ventas</h2>
		  <input id="btnReporte" class="w3-btn w3-blue-grey" type="button" name="btn_guardar" value="Actualizar">
		</div>
		<table class="w3-table w3-striped">
		   <thead>
				<tr>
					<th>Clave</th>
					<th>Usuario</th>
					<th>Vta Total</th>
					<th>Fecha</th>
					<th>Otros</th>
				</tr>
			</thead>
			<tbody id="tbodyReportes">

			</tbody>
		  </table>
	</div>
</div>
<script type="text/javascript">
	function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>
</body>
</html>