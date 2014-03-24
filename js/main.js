var jsCRUD = (function () {

	// Private Variables
	var
		// initialize DB and ID Generator
		jsCRUDId = localStorage.getItem( 'jsCRUDId' ) || localStorage.setItem( 'jsCRUDId', 1 ),
		jsCRUDDb = JSON.parse(localStorage.getItem( 'jsCRUDDb' ) || '[]' ),

		// Catching DOM Elements
		inputData = document.querySelector( '#inputData' ),
		statusDb = document.querySelector( '#statusDb' ),
		storeDataBtn = document.querySelector( '#storeData' ),
		cleanDbBtn = document.querySelector( '#cleanDb' ),
		list = document.querySelector( '#list' );
	
	
	// Private Methods
	function statusCleaner () {
		setTimeout(function () {
			statusDb.innerHTML = "DB Operations Status";
		}, 3000);
	}

	function storeDataDb () {
		if ( inputData.value === null || inputData.value === "" ) {
			statusDb.innerHTML = "Please, enter some value to be stored.";
			statusCleaner();
		} else {
			var enter = { 
				id: parseInt( localStorage.getItem( 'jsCRUDId' ) ),
			 	name: inputData.value };
			jsCRUDDb.push( enter );
			jsCRUDIdGenerator = parseInt( JSON.parse(localStorage.getItem( 'jsCRUDId' ))) + 1;
			localStorage.setItem( 'jsCRUDId', JSON.stringify( jsCRUDIdGenerator ));
			localStorage.setItem( 'jsCRUDDb', JSON.stringify( jsCRUDDb ));
			statusDb.innerHTML = "Input stored successfully";
			inputData.value = "";
			statusCleaner();
			setList();
		}
	}

	function storeWithEnter ( event ) {
		if ( event.keyCode == 13 ) {
			storeDataDb();
			return false;
		}
	}

	function setList () {
		var countDb = JSON.parse(localStorage.getItem('jsCRUDDb')).length;
		jsCRUDId, jsCRUDDb;

		if ( countDb > 0 ) {
			var dataTable = "";

			for ( var i = 0; i < countDb; i += 1 ) {
				dataTable += "<tr>";
				dataTable += "<td id='id" + i + "'>";
				dataTable += JSON.parse(localStorage.getItem('jsCRUDDb'))[i].id;
				dataTable += "</td>";
				dataTable += "<td id='data"+ i + "' contenteditable='true' maxlength=35>";
				dataTable += JSON.parse(localStorage.getItem('jsCRUDDb'))[i].name;
				dataTable += "</td>";
				dataTable += "<td>";
				dataTable += "<span onClick='jsCRUD.update("+i+");' class='btn-action green'>✔</span>";
				dataTable += "<span onClick='jsCRUD.removeOne("+i+");' class='btn-action red'>✖</span>";
				dataTable += "</td>";
				dataTable += "</tr>";
			}

			list.innerHTML = dataTable;
		}
	}

	function removeAllData () {
		localStorage.clear();
		localStorage.setItem( 'jsCRUDId', 1 );
		localStorage.setItem( 'jsCRUDDb', '[]' );
		window.location.reload();
		statusDb.innerHTML = "Database was successfully cleaned!";
		statusCleaner();
	}

	function removeOneData ( key ) {
		var cutItem = JSON.parse( localStorage.getItem( 'jsCRUDDb' ) );
		cutItem.splice( key, 1 );
		localStorage.setItem( 'jsCRUDDb', JSON.stringify( cutItem ) );
		window.location.reload();
		statusDb.innerHTML = "Data was successfully remove!";
		setList();
	}

	function updateData ( key ) {
		var 
			dataIn = document.getElementById( 'data' + key ).innerHTML,
			dataOut = { 
				id: document.getElementById( 'id' + key ).innerHTML, 
				name: document.getElementById( 'data' + key ).innerHTML };
			update = JSON.parse( localStorage.getItem( 'jsCRUDDb' ) );
			update.splice( key, 1, dataOut );
			localStorage.setItem( 'jsCRUDDb', JSON.stringify( update ) );
			statusDb.innerHTML = "Input successfully updated";
			statusCleaner();
	}

	// Public Variables and Methods
	return {
		init: setList,
		removeOne: removeOneData,
		update: updateData,

		// Event Handlers
		storeDataClick: storeDataBtn.onclick = storeDataDb,
		cleanDbClick: cleanDbBtn.onclick = removeAllData,
		storeDataWithEnter: inputData.onkeypress = storeWithEnter
	};


})();

jsCRUD.init();