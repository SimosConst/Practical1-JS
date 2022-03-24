function myfunc() {
    alert("hello");
}

function chng_val_byId(elem_id, val) {
    document.getElementById(elem_id).value = val;
}



var obj_csv = {
    size: 0,
    dataFile: []
};

function readImage(file_elem_id, tabl_elem) {
    file_elem = document.getElementById(file_elem_id);
    console.log(file_elem)
    if (file_elem.files && file_elem.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(file_elem.files[0]);
        reader.onload = function(e) {
            console.log(e);
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result
            console.log(obj_csv.dataFile)
            array = parseData(obj_csv.dataFile);
            createTableToElement(array, tabl_elem)

        }
    }
}

function parseData(data) {
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    // console.table(csvData);
    return csvData;
}

function createTableToElement(array, tabl_elem) {
    //INITIAL DECLARATION
    var content = "";

    //STATIC HEADERS
    var headers = ["Name", "Department", "Salary", "Manager"]
    headers.forEach(function(col) {
        content += "<th>" + col + "</th>\n";
    });

    //DATA ROWS 
    array.forEach(function(row) {
        content += "<tr>\n";
        row.forEach(function(cell) {
            content += "<td>" + cell + "</td>\n";
        });
        content += "</tr>\n";
    });

    console.log(content)
    document.getElementById(tabl_elem).innerHTML = content;
}