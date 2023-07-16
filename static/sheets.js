

// updates data with data recieved from server


function updatePage(data){
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Clear existing data

    data.forEach((row, index) => {
        var rowHtml;
        if (index == 0){
            rowHtml = "<tr class='tableRow'>";

            rowHtml += "<th>" + "Rank" + "</th>";

            row.forEach(head => {
                rowHtml += "<th>" + head + "</th>";
            });
            rowHtml += "</tr>"
        }
        else {
            rowHtml = "<tr class='tableRow'>";

            rowHtml += "<td>" + index + "</td>";
            row.forEach(element => {
                rowHtml += "<td class='tableData'>" + element + "</td>";
            });
            
            rowHtml += "</tr>";
        }
        
        tbody.innerHTML += rowHtml;
    });
}

function fetchData(){
    fetch('/data')
        .then(response => response.json())
        .then(data => updatePage(data))
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', function(){
    fetchData();

    setInterval(function(){
        fetchData();
    }, 5000)
});