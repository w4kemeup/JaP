const AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let listadoAutos = [];


function mostrarListadoAutos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < listadoAutos.products.length; i++) {
        let auto = listadoAutos.products[i];
        htmlContentToAppend += `
        <div onclick="setCatID(${auto.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${auto.image}" alt="${auto.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${auto.name} - ${auto.currency} ${auto.cost}</h4>
                        <small class="text-muted">${auto.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${auto.description}</p>
                </div>
            </div>
        </div>
        `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(AUTOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listadoAutos = resultObj.data
            mostrarListadoAutos()
            console.log(resultObj.data)
        }
    })
})

// nuevo codigo utilizando el getJSONData //