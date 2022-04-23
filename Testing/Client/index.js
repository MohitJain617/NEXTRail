document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => console.log(data));
    loadHTMLTable([]);
});

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    let tableHtm = "";

    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan ='5'>No Data</td></tr>";
    }
}