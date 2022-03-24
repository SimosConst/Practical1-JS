//TESTING FUNCTIONS
/*
function myfunc() {
    alert("hello");
}
function chng_val_byId(elem_id, val) {
    document.getElementById(elem_id).value = val;
}
*/

//GLOBAL VARIABLE TO STORE CSV FILE
var obj_csv = {
    size: 0,
    dataFile: [],
    parsedArray: []
};
//READ LINES FROM CSV FILE WITH FILEREADER 
function readFromFile(file_elem, sel_elem) {
    // file_elem = document.getElementById(file_elem_id);
    console.log(file_elem)
    if (file_elem.files && file_elem.files[0]) {
        let reader = new FileReader();
        reader.readAsBinaryString(file_elem.files[0]);
        reader.onload = function(e) {
            console.log(e);
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result;
            obj_csv.parsedArray = parseData(obj_csv.dataFile);
            //DEBUG
            console.log("LINES: " + obj_csv.dataFile);
            console.log("Array: " + obj_csv.parsedArray);
            // array = parseData(obj_csv.dataFile);
            // createTableToElement(array, queryName, tabl_elem)
            populSelectElem(sel_elem, 1);
            createTableToElement('Select1', 'Table1');
        }
    }
}
//PARSE TEXT FROM DELIMITERS TO ARRAY 
function parseData(data) {
    let csvData = [];
    let lbreak = data.split("\r\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    csvData.filter(word => word != '');
    // console.table(csvData);
    return csvData;
}
//FROM QUERY ELEMENT(SELECT) GET VALUE AND FILL TABLE ELEMENT FROM GRLOBAL ARRAY(PRELOADED CSV) 
function createTableToElement(query_elem, tabl_elem) {
    //GET QUERY WORD from SELECT ELEMENT
    queryName = document.getElementById(query_elem).value;
    //Get array from Global Variable
    array = obj_csv.parsedArray;
    //INITIAL DECLARATION
    var content = "";
    //LOAD STATIC HEADERS
    var headers = ["Name", "Department", "Salary", "Manager"]
    content += "<thead><tr>";
    headers.forEach(function(col) {
        content += "<th>" + col + "</th>\n";
    });
    content += "</tr></thead>";
    //DATA ROWS + FILTERING ACCORGING TO queryName
    content += "<tbody><tr>";
    array.forEach(function(row) {
        var col_counter = 0;
        var temp_row = "";
        var isApprop = false;
        temp_row += "<tr>\n";
        row.forEach(function(cell) {
            temp_row += "<td>" + cell + "</td>\n";
            if (col_counter == 1) {
                if (cell == queryName) {
                    isApprop = true;
                }
            } else if (queryName == "All") {
                isApprop = true;
            }
            col_counter++;
        });
        if (isApprop) {
            content += temp_row;
        }
        // content += "</tr>\n";
    });
    content += "</tr></tbody>";
    //DEBUG
    console.log(content);
    //WRITE HTML TO ELEMENT
    document.getElementById(tabl_elem).innerHTML = content;
}
//FILL HTML SELECT ELEMENT FROM UNIQUE VALUES FROM THE CSV
function populSelectElem(sel_elem, columnNumber) {
    //GET UNIQUE VALUES FROM PARSED ARRAY
    array = getUniqueColumnValsFromArray(columnNumber, obj_csv.parsedArray);
    //INITIALIZE FINAL CONCATENATION STRING
    content = "";
    //FOR EACH UNIQUE NAME
    array.forEach(function(name) {
        content += "<option value='" + name + "'>" + name + "</option>\n";
    });
    //DEBUG
    console.log(content);
    //WRITE STRING TO ELEMENT
    document.getElementById(sel_elem).innerHTML = content;
}
//FIND UNIQUE VALUES FROM GIVEN ARRAY(NON SORTED)
function getUniqueColumnValsFromArray(columnNumber, array) {
    array = array.map(row => row[columnNumber]);
    array = array.sort().filter(word => word != undefined);
    var names = [];
    var com_val = array[0];
    //INITIAL VALUE
    names.push(com_val);
    //FOR EACH LOOP
    array.forEach(function(text) {
        if (text != com_val) {
            names.push(text);
            com_val = text;
        }
    })
    names.unshift("All");
    return names;
}