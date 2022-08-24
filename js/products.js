let listadoProductos = [];

function mostrarProductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < listadoProductos.products.length; i++) {
        let producto = listadoProductos.products[i];
        htmlContentToAppend += `
        <div onclick="setCatID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                        <small class="text-muted">${producto.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${producto.description}</p>
                </div>
            </div>
        </div>
        `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    document.getElementById("nombreProducto").innerHTML = listadoProductos.catName;
}

let getID = localStorage.getItem("catID");


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + getID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listadoProductos = resultObj.data
            mostrarProductos()
            console.log(resultObj.data)
        }
    })
})

// nuevo codigo utilizando el getJSONData //