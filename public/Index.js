let toastCtr = 0;
/** 
 * changeModalHeaderColor
 * -changes modal header color based on row status
 * 
 * @param {string} status 
 */

function changeModalHeaderColor(status){
  let modalHeader = document.getElementById('modal-header');
  modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-primary','bg-danger','bg-info');
  
  let fstatus       = document.getElementById('field-status');
  fstatus.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger' ,'text-bg-info');

  let orderlabel = document.getElementById('view-ticket-label');
  orderlabel.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger' ,'text-bg-info', 'text-bg-white', 'text-dark');

  let orderno = document.getElementById('modal-ticket-no');
  orderno.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger' ,'text-bg-info', 'text-bg-white', 'text-dark');

  switch (status) { 
    case 'add':
      modalHeader.classList.add('bg-primary');
      break; 
    case 'to deliver':
      modalHeader.classList.add('bg-info');
      fstatus.classList.add('text-bg-info');
      orderlabel.classList.add('text-dark');
      orderno.classList.add('text-dark');
      break;
    case 'to pack':
      modalHeader.classList.add('bg-warning');
      fstatus.classList.add('text-bg-warning');
      orderlabel.classList.add('text-dark');
      orderno.classList.add('text-dark')


      
      break;
    case 'completed':
      modalHeader.classList.add('bg-success');
      fstatus.classList.add('text-bg-success');
      break;  
    default:
      modalHeader.classList.add('bg-danger');
      fstatus.classList.add('text-bg-danger');
      break;                    
  } 
}

/** 
 * breakByHTMLChars
 * -separate string of text by html tags and convert to array
 * @param {string} statusHtml the column of status in selected row
 * 
 * @return {array} the array version of string
 */
function breakByHTMLChars(statusHtml = ""){
  const tagRegex = /<[^>]*>/g;
  const resultArray = statusHtml.split(tagRegex);

  return resultArray.filter(item => item.trim() !== '');
}

/** 
 * showHideTableButtons
 * -show or hide the table buttons depending on row status
 * @param {object} row 
 */
function showHideTableButtons(row){
  const columns = row.getElementsByTagName('td'); 
  const status = breakByHTMLChars(columns[6].innerHTML);
  
  if(status.includes("completed")){
    removeBtns = columns[7].querySelectorAll(".edit-ticket,.delete-ticket");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });
  }
}

/** 
 * showHideModalButtons
 * -show or hide the buttons inside the of the modal based on row status
 * 
 * @param {object} row 
 * @param {string} state name of originating function call, ex. from "edit" 
 */
function showHideModalButtons(row, state =''){
  const columns = row.getElementsByTagName('td'); 
  const status = breakByHTMLChars(columns[6].innerHTML);
  const modalMain = document.querySelector('#viewTicketModal');
  
  removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save,#modal-btn-create");
  removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });

  if(status.includes("completed")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

   
  } else if(status.includes("To Pack")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });
    
    if(state == ""){
      showBtns = modalMain.querySelectorAll("#modal-btn-process");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    } else {
      showBtns = modalMain.querySelectorAll("#modal-btn-process");
      showBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
      });

      showBtns = modalMain.querySelectorAll("#modal-btn-save");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    }
    
  } else if(status.includes("To Deliver")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

    if(state == ""){
      showBtns = modalMain.querySelectorAll("#modal-btn-complete");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    } else {
      showBtns = modalMain.querySelectorAll("#modal-btn-complete");
      showBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
      });

      showBtns = modalMain.querySelectorAll("#modal-btn-save");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    }  
  } 

  
}

/** 
 * removeRowHightlight
 * -removes row highlight
 */
function removeRowHightlight(){
  document.querySelectorAll('tr').forEach(row => {
    row.classList.remove('table-active');
     
  });
}

/** 
 * addGlobalEventListener
 * -js event delegation wrapper
 */
function addGlobalEventListener(type, selector, callback){
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e);
  });
}

/** 
 * generateToast
 * -generate dynamic toast message
 * 
 * @param {string} [bgColor=""]     bootstrap bg color class
 * @param {string} [textMessage=""] text string to prompt
 */
function generateToast(bgColor = "", textMessage =""){
  toastCtr++;
  let toastHtml = `<div class="toast align-items-center ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true"  id="liveToast${toastCtr}">
                    <div class="d-flex">
                      <div class="toast-body">
                        ${textMessage}
                      </div>
                      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                   </div>
                  </div>`;
  const toastWrapper = document.querySelector('.toast-container');
  toastWrapper.innerHTML += toastHtml;

  const toastMain = document.querySelector('#liveToast'+toastCtr);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMain);
  toastBootstrap.show();
}

/**
 * assignRowFieldValues
 * - assign the selected row data to modal fields
 * @param {object} row 
 */
function assignRowFieldValues(row) {
    const orderNo  = row.getElementsByTagName('th');
    const columns   = row.getElementsByTagName('td');
    let modalLabel  = document.getElementById('view-ticket-label');
    let modalTitle  = document.getElementById('modal-ticket-no');
    let category    = document.getElementById('category');
    let status      = document.getElementById('field-status');
    let title       = document.getElementById('seller-name');
    let description = document.getElementById('order-description');
    let dateCreated = document.getElementById('date-created');
    let targetDeliveryDate  = document.getElementById('target-date');
    let costumerName = document.getElementById('costumer-name');
    let approvedBy  = document.getElementById('approved-by');
    let department  = document.getElementById('order-type');
    let completed   = document.getElementById('date-completed');
    const statusArray = ['to deliver','to pack','completed','overdue'];

    row.classList.add('table-active');
    

    textContentArray = breakByHTMLChars(columns[6].innerHTML);
    
    modalTitle.innerHTML =`${orderNo[0].textContent} [${textContentArray.join("/")}]`;
    changeModalHeaderColor(columns[6].textContent.toLowerCase());
    category.value    = columns[5].textContent;
    status.value      = textContentArray.join("/");
    title.value       = columns[0].textContent;
    description.value = 'Fast Ship Mode';
    dateCreated.value = columns[3].textContent;
    targetDeliveryDate.value  = columns[4].textContent;
    costumerName.value = columns[1].textContent;
    approvedBy.value  = 'JC Coral';
    department.value  = columns[2].textContent;
}


/**
 * clearFieldValues
 * - empty text field value for add modal
 * 
 */
function clearFieldValues() {
  let modalLabel  = document.getElementById('view-ticket-label');
  let modalTitle  = document.getElementById('view-ticket-label');
  let category    = document.getElementById('category');
  let status      = document.getElementById('field-status');
  let title       = document.getElementById('seller-name');
  let description = document.getElementById('order-description');
  let dateCreated = document.getElementById('date-created');
  let targetDeliveryDate  = document.getElementById('target-date');
  let costumerName = document.getElementById('costumer-name');
  let approvedBy  = document.getElementById('approved-by');
  let department  = document.getElementById('order-type');
  let completed   = document.getElementById('date-completed');
  const statusArray = ['to deliver','to pack','completed','overdue'];

  let date = new Date();
  date.setDate(date.getDate() + 7);
  newDateTarget = date.toISOString().split('T')[0];

  modalTitle.innerHTML =`Open Order Details for <span class="fw-bold" id="modal-ticket-no"></span>`;
  changeModalHeaderColor("add");
  category.value    = '';
  status.value      = 'To Pack';
  title.value       = '';
  description.value = '';
  dateCreated.value = new Date().toISOString().split('T')[0];
  targetDeliveryDate.value  = newDateTarget;
  costumerName.value = '';
  approvedBy.value  = 'JC Coral';
  department.value  = '';

  // disable some dates
  status.setAttribute("disabled","");
  dateCreated.setAttribute("disabled","");
  approvedBy.setAttribute("disabled","");

  //show create ticket button
  removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save");
  removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });
  showBtns = modalMain.querySelectorAll("#modal-btn-create");
  showBtns.forEach(btnCol => {
    btnCol.classList.remove('d-none');
  });
}


function addTicketRecord() {
  let neworderNo = `OR-${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}`
  let category    = document.getElementById('category');
  let status      = document.getElementById('field-status');
  let title       = document.getElementById('seller-name');
  let description = document.getElementById('order-description');
  let dateCreated = document.getElementById('date-created');
  let targetDeliveryDate  = document.getElementById('target-date');
  let costumerName = document.getElementById('costumer-name');
  let approvedBy  = document.getElementById('approved-by');
  let department  = document.getElementById('order-type');
  let completed   = document.getElementById('date-completed');

  const tblRow   = document.querySelector("#table-onqueue");
  const tblBody  = tblRow.querySelector('tbody');
  
  let newRow     = tblBody.insertRow();

  let col1 = newRow.insertCell(0);
  let col2 = newRow.insertCell(1);
  let col3 = newRow.insertCell(2);
  let col4 = newRow.insertCell(3);
  let col5 = newRow.insertCell(4);
  let col6 = newRow.insertCell(5);
  let col7 = newRow.insertCell(6);
  let col8 = newRow.insertCell(7);
  let col9 = newRow.insertCell(8);

  col1.outerHTML = `<th class="align-middle fs-6">${neworderNo}</th>`;
  col2.outerHTML = `<td class="align-middle fs-6">${title.value}</td>`;
  col3.outerHTML = `<td class="align-middle fs-6">${costumerName.value}</td>`;
  col4.outerHTML = `<td class="align-middle fs-6">${department.value}</td>`;
  col5.outerHTML = `<td class="align-middle fs-6">${dateCreated.value}</td>`;
  col6.outerHTML = `<td class="align-middle fs-6">${targetDeliveryDate.value}</td>`;
  col7.outerHTML = `<td class="align-middle fs-6">${category.value}</td>`;
  col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-warning">To Pack</span></td>`;
  col9.outerHTML = `<td class="align-middle text-center">
                      <button class="btn btn-info view-ticket" >view</button>
                      <button class="btn btn-warning edit-ticket" >Edit</button>
                      <button class="btn btn-danger delete-ticket" >Delete</button>
                    </td>`;
  
  generateToast("text-bg-primary",`Ticket ${neworderNo} added`);
}



document.addEventListener('DOMContentLoaded', function() {
  //Ticket Button
  addButton = document.querySelector('#add-ticket');
  editButton = document.querySelectorAll('.edit-ticket');
  deleteButton = document.querySelectorAll('.delete-ticket');
  modalMain = document.querySelector('#viewTicketModal');
  activeRow = null;

  // ON RECORD ClICK
  document.querySelectorAll('.table tbody tr').forEach(row => {
    showHideTableButtons(row);
    row.addEventListener('dblclick', () => {
      // Get the data from the clicked row
      const columns = row.getElementsByTagName('td');
      const firstName = columns[1].textContent;
      const lastName = columns[2].textContent;

      const status = document.getElementById("status");
      console.log(columns[0].textContent);
      const animalArray = [];
      for (var i = 0; i < status.length; i++) {
        animalArray.push(status[i].textContent);
      }
      
    });


    
  });

  // ALL VIEW BUTTONS
  addGlobalEventListener("click",'.view-ticket', e => {
    removeRowHightlight();

    let modalView = document.querySelector("#viewTicketModal")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;

    // assign values to fields base on selected row
    assignRowFieldValues(row);

    //show modal buttons
    showHideModalButtons(row);
  });

  // ALL EDIT BUTTONS
  addGlobalEventListener("click",'.edit-ticket', e => {
    // Remove table row highlight
    removeRowHightlight();

    let modalView = document.querySelector("#viewTicketModal")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;
    
    // assign values to fields base on selected row
    assignRowFieldValues(row);

    // remove disable attribute in fields
    const inputFields = document.querySelectorAll(".form-control");
    inputFields.forEach(input => {
      if(input.id != "date-completed") input.removeAttribute("disabled");
    });

    // show modal buttons
    showHideModalButtons(row,"edit");
    
  });


  // ADD BUTTON
  addButton.addEventListener('click', function(){
    let modalView = document.querySelector("#viewTicketModal");
    const createButton = modalView.querySelector("#modal-btn-create");
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    const inputFields = document.querySelectorAll(".form-control");
    inputFields.forEach(input => {
      if(input.id != "date-completed") input.removeAttribute("disabled");
    });

    // make text field empty
    clearFieldValues();

    // CREATE TICKET BUTTON
    createButton.addEventListener('click', function(event){
      const forms = document.querySelectorAll('.requires-validation');
      Array.from(forms).forEach(function (form) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
        } else {
          addTicketRecord();
          myModal.hide();
        }
        form.classList.add('was-validated');
      })
    });


  });


  // ALL DELETE BUTTONS
  deleteButton.forEach(function(button){
    button.addEventListener('click', function(){
      removeRowHightlight();
      let row           = this.parentElement.parentElement;
      const orderNo    = row.getElementsByTagName('th');
      const modalDelete = document.querySelector("#deleteTicketModal")
      const myModal     = new bootstrap.Modal(modalDelete);
      const modalText   = modalDelete.querySelector("#delete-prompt"); 
      modalText.innerHTML = `Are you sure you want to delete <strong>${orderNo[0].textContent}</strong> ?`;
      myModal.show();
      
      const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
      confirmDelBtn.addEventListener("click", function(){
        myModal.hide();
        row.remove();        
        generateToast("text-bg-danger",`Order <strong>${orderNo[0].textContent}</strong> DELETED`);
      });
      
    });
  });


  // ON MODAL CLOSE
  modalMain.addEventListener("hidden.bs.modal", function(){
    if(activeRow != null) activeRow.classList.remove('table-active');
    
     // add disable attribute in fields
     const inputFields = document.querySelectorAll(".form-control");
     inputFields.forEach(input => {
       if(input.id != "date-completed") input.setAttribute("disabled","");
     });

     const forms = document.querySelectorAll(".requires-validation");
     forms.forEach(form => {
      form.classList.remove('was-validated');
     });
  });

  

  // MODAL BUTTONS
  // COMPLETE TICKET BUTTON
  addGlobalEventListener("click",'#modal-btn-complete', e => {
    const tblRow   = document.querySelector("#table-completed");
    const tblBody  = tblRow.querySelector('tbody');
    const orderNo = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0);
    let col2 = newRow.insertCell(1);
    let col3 = newRow.insertCell(2);
    let col4 = newRow.insertCell(3);
    let col5 = newRow.insertCell(4);
    let col6 = newRow.insertCell(5);
    let col7 = newRow.insertCell(6);
    let col8 = newRow.insertCell(7);
    let col9 = newRow.insertCell(8);

    col1.outerHTML = orderNo[0].outerHTML;
    col2.outerHTML = columns[0].outerHTML;
    col3.outerHTML = columns[1].outerHTML;
    col4.outerHTML = columns[2].outerHTML;
    col5.outerHTML = columns[3].outerHTML;
    col6.outerHTML = columns[4].outerHTML;
    col7.outerHTML = columns[5].outerHTML;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-success">completed</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info view-ticket" >view</button>
                        <button class="btn btn-warning edit-ticket d-none" >Edit</button>
                        <button class="btn btn-danger delete-ticket d-none" >Delete</button>
                      </td>`;
    
    activeRow.remove();
    generateToast("text-bg-success",`Order <strong>${orderNo[0].textContent}</strong> tag as COMPLETED`);
  });

  // PROCESS TICKET BUTTON
  addGlobalEventListener("click",'#modal-btn-process', e => {
    const tblRow   = document.querySelector("#table-ongoing");
    const tblBody  = tblRow.querySelector('tbody');
    const orderNo = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0);
    let col2 = newRow.insertCell(1);
    let col3 = newRow.insertCell(2);
    let col4 = newRow.insertCell(3);
    let col5 = newRow.insertCell(4);
    let col6 = newRow.insertCell(5);
    let col7 = newRow.insertCell(6);
    let col8 = newRow.insertCell(7);
    let col9 = newRow.insertCell(8);

    col1.outerHTML = orderNo[0].outerHTML;
    col2.outerHTML = columns[0].outerHTML;
    col3.outerHTML = columns[1].outerHTML;
    col4.outerHTML = columns[2].outerHTML;
    col5.outerHTML = columns[3].outerHTML;
    col6.outerHTML = columns[4].outerHTML;
    col7.outerHTML = columns[5].outerHTML;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-info">To Deliver</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info view-ticket" >view</button>
                        <button class="btn btn-warning edit-ticket" >Edit</button>
                        <button class="btn btn-danger delete-ticket" >Delete</button>
                      </td>`;
    
    activeRow.remove();
    generateToast("text-bg-info",`Order ${orderNo[0].textContent} tag as <strong>To Deliver</strong>`);
  });

  // SAVE TICKET BUTTON
  addGlobalEventListener("click",'#modal-btn-save', e => {
    const tblRow   = document.querySelector("#table-ongoing");
    const tblBody  = tblRow.querySelector('tbody');
    const orderNo = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let category    = document.getElementById('category');
    let status      = document.getElementById('field-status');
    let title       = document.getElementById('seller-name');
    let description = document.getElementById('order-description');
    let dateCreated = document.getElementById('date-created');
    let targetDeliveryDate  = document.getElementById('target-date');
    let costumerName = document.getElementById('costumer-name');
    let approvedBy  = document.getElementById('approved-by');
    let department  = document.getElementById('order-type');
    
    columns[5].textContent = category.value;
    columns[0].textContent = title.value       
    columns[3].textContent = dateCreated.value 
    columns[4].textContent = targetDeliveryDate.value  
    columns[1].textContent = costumerName.value 
    columns[2].textContent = department.value  
    
    generateToast("text-bg-success",`Ticket ${orderNo[0].textContent} updated`); 
  });

 
});
