import {
    createOrderHtml,
    html,
    updateDraggingHtml,
    moveToColumn,

} from './view.js'

// import {
//     TABLES,
//     COLUMNS,
//     state,
//     createOrderData,
//     updateDragging
// } from './data.js'



/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}


const handleDragStart = (event) => {
    const { orderId } = event.target.dataset;
    event.dataTransfer.setData('text/plain', orderId);
}
const handleDragEnd = (event) => {
    const { orderId } = event.target.dataset;
}
const handleHelpToggle = (event) => {
    const helpOverlay = document.getElementById('helpOverlay');
    helpOverlay.classList.toggle('show');
    if (helpOverlay.classList.contains('show')) {
        document.getElementById('addOrderButton').focus();
    }
}
const handleAddToggle = (event) => {
    const addOverlay = document.getElementById('addOverlay');
    addOverlay.classList.toggle('show');
    if (addOverlay.classList.contains('show')) {
        clearAddOrderForm();
        document.getElementById('addOrderText').focus();
    } else {
        document.getElementById('addOrderButton').focus();
    }
}
const handleAddSubmit = (event) => {
    event.preventDefault();
    const orderText = document.getElementById('addOrderText').value;
    const orderTable = document.getElementById('addOrderTable').value;
}
const handleEditToggle = (event) => {
    const orderId = event.target.dataset.orderId;
    const editOverlay = document.getElementById('editOverlay');
    editOverlay.classList.toggle('show');
    if (editOverlay.classList.contains('show')) {
        fillEditOrderForm(orderId);
        document.getElementById('editOrderText').focus();
    } else {
        document.getElementById('addOrderButton').focus();
    }
}
const handleEditSubmit = (event) => {
    event.preventDefault();
    const orderId = document.getElementById('editOrderId').value;
    const orderText = document.getElementById('editOrderText').value;
    const orderTable = document.getElementById('editOrderTable').value;
    const orderStatus = document.getElementById('editOrderStatus').value;
}
const handleDelete = (event) => {
    const orderId = event.target.dataset.orderId;
}

html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}