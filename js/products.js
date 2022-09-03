/* variables y constantes necesarias para el ejercicio */

const ORDER_ASC_BY_PRICE = "priceUp";
const ORDER_DESC_BY_PRICE = "priceDown";
const ORDER_BY_PROD_RELEVANCE = "Rel.";
let listadoProductos = [];
let listadoProductosNombres = [];
let productosFiltrados = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let search = undefined;
let getID = localStorage.getItem("catID");

/* criterios para ordenar los productos  */

function sortProductos(criteria, array) {

    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_RELEVANCE) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

/* funcion para mostrar los productos */

function mostrarProductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < listadoProductos.length; i++) {
        let producto = listadoProductos[i];

        if (!(producto.cost < minCount) && !(producto.cost > maxCount)) {

            if (search == undefined || search == "" || producto.name.toLowerCase().includes(search) || producto.description.toLowerCase().includes(search)) {

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
             `;
            }
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        document.getElementById("nombreProducto").innerHTML = listadoProductosNombres.catName;
    }
}

/* funcion para mostrar y ordenar los productos */

function sortAndShowProductos(sortCriteria, productosFiltrados) {
    currentSortCriteria = sortCriteria;

    if (productosFiltrados != undefined) {
        listadoProductos = productosFiltrados;
    }

    listadoProductos = sortProductos(currentSortCriteria, listadoProductos);

    mostrarProductos();
}

/* al cargar la data, se ejecuta la funcion getJSONData, se concatena la url de los productos con su extension correspondiente e ID correspondiente, seguido se cargan los criterios para ordenar los productos
basados en precio mayor o menor y productos vendidos */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + getID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listadoProductos = resultObj.data.products
            listadoProductosNombres = resultObj.data
            mostrarProductos()
            console.log(resultObj.data)
        }
    });

    document.getElementById("sortPriceUp").addEventListener("click", function () {
        sortAndShowProductos(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortPriceDown").addEventListener("click", function () {
        sortAndShowProductos(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function () {
        sortAndShowProductos(ORDER_BY_PROD_RELEVANCE);
    });

    /* limpiar campo de filtros */

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("buscador").value = "";

        minCount = undefined;
        maxCount = undefined;
        search = undefined;

        mostrarProductos();
    });

    /* filtrado basado en valores ingresados manualmente */

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        mostrarProductos();
    });

    /* barra de busqueda */

    document.getElementById("buscador").addEventListener("input", function () {
        search = document.getElementById("buscador").value;

        mostrarProductos();

    })
})