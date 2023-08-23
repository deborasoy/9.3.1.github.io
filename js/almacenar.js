document.addEventListener("DOMContentLoaded", init)

const groupList = document.getElementById("contenedor");
const checkStorage = localStorage.getItem("groupList");

function init() {
    const addButton = document.getElementById("agregar");
    const cleanButton = document.getElementById("limpiar");

    if(checkStorage) rendericeStorageItems(checkStorage);

    cleanButton.addEventListener("click",cleanStorage)
    addButton.addEventListener("click", addItem);
}

function rendericeStorageItems(groupItems) {
    const groupListArr = JSON.parse(groupItems);

    groupListArr.map((element) => {
        const nodeItem = document.createElement("li");
        const nodeText = document.createTextNode(element.item);
        
        addStyleItem(nodeItem)
        nodeItem.appendChild(nodeText)
        groupList.appendChild(nodeItem)
    });

}

function addItem() {
    const itemValue = document.getElementById("item").value;
    const nodeItem = document.createElement("li");
    const nodeText = document.createTextNode(itemValue);

    addStyleItem(nodeItem)
    nodeItem.appendChild(nodeText);
    groupList.appendChild(nodeItem);
    addItemToStorage(itemValue);

}

function addItemToStorage(item) {
    const itemObject = { item };

    if(!checkStorage) {
        let listItems = [];
        addListToStorage(listItems, itemObject)
        return;
    }

    let jsonStorage = JSON.parse(checkStorage);
    addListToStorage(jsonStorage, itemObject)
    
}

function addListToStorage(arrList, item) {
    arrList = [...arrList, item ]; // ---> listItems.push(itemObject);
    const StringListItems = JSON.stringify(arrList);

    localStorage.setItem("groupList", StringListItems);
}

function cleanStorage() {
    groupList.innerHTML = "";
    localStorage.removeItem("groupList");
}

function addStyleItem(item) {
    item.classList.add("form-control");
    item.style.border = "none";
    item.style.borderRadius = "0";
    item.style.marginBottom = "10px";
    item.style.backgroundColor = "aqua";
}