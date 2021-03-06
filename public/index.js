const firebaseConfig = {
    apiKey: "AIzaSyCKn6-libbIAr77bbONd9jcZiAU8yuGLeE",
    authDomain: "shop-6b8ac.firebaseapp.com",
    databaseURL: "https://shop-6b8ac.firebaseio.com",
    projectId: "shop-6b8ac",
    storageBucket: "shop-6b8ac.appspot.com",
    messagingSenderId: "194373152867",
    appId: "1:194373152867:web:40db81630eae65842f4856",
    measurementId: "G-N35Y84K7VC"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var ref = database.ref('Users/');

ref.on("value", function (snapshot) {
    var total_tobacco = 0;
    document.getElementById('table-order').innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (grandChild) {
            grandChild.forEach(function (superChild) {
                if (superChild.key === 'tobacco') {
                    total_tobacco = total_tobacco + 1;
                    fetchData(childSnapshot, grandChild, superChild);
                }
            });
        });
    });
    document.getElementById('total-users').innerHTML = 'Total Tobacco Orders: ' + total_tobacco;
});

function fetchData(root, parent, child) {
    var table = document.getElementById('table-order');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.setAttribute('onclick', 'showDetail(' + rowCount + ')');
    var cell0 = row.insertCell(0);
    cell0.innerHTML = rowCount + 1;
    var cell1 = row.insertCell(1);
    cell1.innerHTML = root.key;
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    cell2.innerHTML = child.child('Total').child('Pack').val();
    cell3.innerHTML = child.child('Total').child('Outer').val();
    cell4.innerHTML = child.child('Total').child('SC(Box)').val();
    cell5.innerHTML = child.child('Total').child('Available').val();
    cell6.innerHTML = child.child('Contact Less Delivery').val();
    if (child.child('Contact Less Delivery').val()) {
        cell6.style.color = 'green'
    } else {
        cell6.style.color = 'red'
    }
    cell7.innerHTML = child.child('Date').val();
}

function showDetail(rowID) {
    var table = document.getElementById('table-order');
    var r = table.rows[rowID];
    var userID = r.cells[1];
    var date = r.cells[7].innerHTML;
    document.getElementById('user-id').innerHTML = userID.innerHTML;
    var ref = database.ref('Users/' + userID.innerHTML + '/');
    ref.on("value", function (snapshot) {
        var tableDetail = document.getElementById('table-detail');
        tableDetail.innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childSnapshot.forEach(function (superChild) {
                superChild.forEach(function (grandChild) {
                    if (superChild.key === 'tobacco' && superChild.child('Date').val() === date) {
                        if (grandChild.key === 'Contact Less Delivery' || grandChild.key ==='Date' || grandChild.key === 'Total' ) {
                            console.log("skip");
                        }  else {
                            var rowCount = tableDetail.rows.length;
                            var row = tableDetail.insertRow(rowCount);
                            row.insertCell(0).innerHTML = grandChild.key;
                            row.insertCell(1).innerHTML = grandChild.child('Pack').val();
                            row.insertCell(2).innerHTML = grandChild.child('Outer').val();
                            row.insertCell(3).innerHTML = grandChild.child('SC(Box)').val();
                            row.insertCell(4).innerHTML = grandChild.child('Available').val();
                        }
                    }
                });
                superChild.forEach(function (grandChild) {
                    if (superChild.key === 'tobacco' && superChild.child('Date').val() === date) {
                        if (grandChild.key === 'Contact Less Delivery') {
                            var rowCount = tableDetail.rows.length;
                            var row = tableDetail.insertRow(rowCount);
                            row.insertCell(0).innerHTML = grandChild.key;
                            row.insertCell(1).innerHTML = grandChild.val();
                            row.insertCell(2).innerHTML = "";
                            row.insertCell(3).innerHTML = "";
                            row.style.backgroundColor = '#f2eeed';
                            row.cells[0].style.fontWeight = 'bold'
                            row.cells[1].style.fontWeight = 'bold'
                            if (grandChild.val()) {
                                row.cells[1].style.color = 'green'
                            } else {
                                row.cells[1].style.color = 'red'
                            }
                        } else if (grandChild.key === 'Date') {
                            var rowCount = tableDetail.rows.length;
                            var row = tableDetail.insertRow(rowCount);
                            row.insertCell(0).innerHTML = grandChild.key;
                            row.insertCell(1).innerHTML = grandChild.val();
                            row.style.backgroundColor = '#f2eeed';
                            row.cells[0].style.fontWeight = 'bold'
                            row.cells[1].style.fontWeight = 'bold'
                            row.insertCell(2).innerHTML = "";
                            row.insertCell(2).innerHTML = "";
                        } else if (grandChild.key === 'Total') {
                            var rowCount = tableDetail.rows.length;
                            var row = tableDetail.insertRow(rowCount);
                            row.insertCell(0).innerHTML = grandChild.key;
                            row.insertCell(1).innerHTML = grandChild.child('Pack').val();
                            row.insertCell(2).innerHTML = grandChild.child('Outer').val();
                            row.insertCell(3).innerHTML = grandChild.child('SC(Box)').val();
                            row.insertCell(4).innerHTML = grandChild.child('Available').val();
                            row.style.backgroundColor = '#f2eeed';
                            row.cells[0].style.fontWeight = 'bold'
                            row.cells[1].style.fontWeight = 'bold'
                            row.cells[2].style.fontWeight = 'bold'
                            row.cells[3].style.fontWeight = 'bold'
                            row.cells[4].style.fontWeight = 'bold'
                        }
                    }
                });
            });
        });
        tableDetail.setAttribute('class', 'table-stripped');
    });

}


function searchTracker() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-tracker");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[7];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}