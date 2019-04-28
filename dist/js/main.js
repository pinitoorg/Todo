function updateStoredTodoList(){localStorage.setItem("todo",JSON.stringify(todo))}function firstTimeLoadLocalStorage(){null===localStorage.getItem("todo")&&(todo=[],createList("Default List"),createElement(0,"open","This is an item that is yet to be completed","This is the description for the item that is yet to be completed"),createListsAndElements(),createElement(0,"closed","This is an item that has been completed","This is the description for the item that has been completed"),createListsAndElements())}function createListsAndElements(){updateStoredTodoList(),$(".list-container").empty(),$.each(todo,function(n,e){var o=populateListFromJson(n,e);$(".list-container").append(o),o="",$.each(e.openElements,function(e,t){o+=populateElementsFromJson(n,e,t,"open")}),$.each(e.closedElements,function(e,t){o+=populateElementsFromJson(n,e,t,"closed")}),$("#list-"+n).append(o)}),$(".list-container").append(populateAddAnotherList())}function populateListFromJson(e,t){return"<div class='list'><div class='list-header'><div class='list-title'>"+t.list_name+"</div><div class='button-container'><div class='list-button' onclick='toggleDropdown("+e+")'><i class='fas fa-ellipsis-h'></i></div><div class='dropdown hidden' id='id-dropdown-"+e+"'><div class='dropdown-title'><div class='dropdown-title-text'>List Actions</div><i class='fas fa-times' onclick='toggleDropdown("+e+")'></i></div><div class='dropdown-element' onclick='prepareModalRenameList("+e+")'>Rename List</div><div class='dropdown-element' onclick='prepareModalDeleteList("+e+")'>Delete List</div></div></div></div><div class='list-body scrollbar' id='list-"+e+"'></div><div class='list-footer' onclick='buttonOpenElementModalForElementCreate("+e+")'><i class='fas fa-plus'></i> Add another item</div></div>"}function populateElementsFromJson(e,t,n,o){var l="",s="",a="",i="",r="",d="",m=populateCategoryField(n.category);return""!=n.due&&"open"==o&&(d="<div class='tag tag-"+calculateRisk(n.due)+"'>"+timeTill(n.due)+"</div>"),"open"===o&&(s="status-open",a="buttonChangeElementStatusToClosed",i="far fa-square",r="open"),"closed"===o&&(s="status-closed",a="buttonChangeElementStatusToOpen",i="fas fa-check-square",r="closed"),l="<div class='list-element "+s+"'>"+m+"<div class='status' onclick='"+a+"("+e+", "+t+")'><i class=\""+i+"\"></i></div><div class='title' onclick='buttonOpenElementModalForElementUpdate("+e+", "+t+', "'+r+"\")'>"+n.title+d+"</div><div class='position'>","open"===o&&(l+="<div class='position-up position-element' onclick='buttonIncreaseElementPosition("+e+", "+t+")'><i class='fas fa-caret-up'></i></div><div class='position-down position-element' onclick='buttonDecreaseElementPosition("+e+", "+t+")'><i class='fas fa-caret-down'></i></div>"),"closed"===o&&(l+="<div class='promote' onclick='prepareModalDelete("+e+", "+t+')\'><i class="far fa-trash-alt"></i></div></div>'),l+="</div></div>"}function populateAddAnotherList(){return'<div class="add-list" onclick="buttonCreateList()"><i class="fas fa-plus"></i> Add another item</div>'}function populateCategoryField(e){var t="";return 0==e?t="<div class='category'></div>":1==e?t="<div class='category category-blue'></div>":2==e?t="<div class='category category-green'></div>":3==e?t="<div class='category category-orange'></div>":4==e?t="<div class='category category-purple'></div>":5==e?t="<div class='category category-red'></div>":6==e&&(t="<div class='category category-yellow'></div>"),t}function prepareModalDelete(e,t){$("#modal-confirm-list").val(e),$("#modal-confirm-element").val(t),$("#deleteElementButton").show(),$("#deleteListButton").hide(),closeAllDropdown(),toggleConfirmationModalVisibility()}function prepareModalDeleteList(e){$("#modal-confirm-list").val(e),$("#deleteElementButton").hide(),$("#deleteListButton").show(),closeAllDropdown(),toggleConfirmationModalVisibility()}function prepareModalRenameList(e){$("#modal-rename-list").val(e),$("#modal-list-rename-input").val(todo[e].list_name),closeAllDropdown(),toggleRenameListModal(),$("#modal-list-rename-input").focus()}function toggleConfirmationModalVisibility(){$("#id-confirmation-modal").hasClass("hidden")?($("#id-confirmation-modal").addClass("flex"),$("#id-confirmation-modal").removeClass("hidden")):($("#id-confirmation-modal").removeClass("flex"),$("#id-confirmation-modal").addClass("hidden"))}function toggleElementModalVisibility(){$("#id-element-modal").hasClass("hidden")?($("#id-element-modal").addClass("flex"),$("#id-element-modal").removeClass("hidden")):($("#id-element-modal").removeClass("flex"),$("#id-element-modal").addClass("hidden"))}function closeAllDropdown(){$(".dropdown").removeClass("flex"),$(".dropdown").addClass("hidden")}function toggleRenameListModal(){$("#id-rename-modal").hasClass("hidden")?($("#id-rename-modal").addClass("flex"),$("#id-rename-modal").removeClass("hidden")):($("#id-rename-modal").removeClass("flex"),$("#id-rename-modal").addClass("hidden"))}function toggleDropdown(e){$("#id-dropdown-"+e).hasClass("hidden")?($(".dropdown").removeClass("flex"),$(".dropdown").addClass("hidden"),$("#id-dropdown-"+e).addClass("flex"),$("#id-dropdown-"+e).removeClass("hidden")):($("#id-dropdown-"+e).removeClass("flex"),$("#id-dropdown-"+e).addClass("hidden"))}function buttonIncreaseElementPosition(e,t){reorderList(e,t,"up")}function buttonDecreaseElementPosition(e,t){reorderList(e,t,"down")}function buttonChangeElementStatusToOpen(e,t){changeElementStatusToOpen(e,t),updateStoredTodoList(),createListsAndElements()}function buttonChangeElementStatusToClosed(e,t){changeElementStatusToClosed(e,t),updateStoredTodoList(),createListsAndElements()}function buttonChangeElementStatusToDeleted(){changeElementStatusToDeleted($("#modal-confirm-list").val(),$("#modal-confirm-element").val()),updateStoredTodoList(),createListsAndElements(),toggleConfirmationModalVisibility(),generateUserAlert("List item successfully deleted.","success",5e3)}function buttonCreateList(){createList("New List"),updateStoredTodoList(),createListsAndElements()}function buttonDeleteList(){deleteList($("#modal-confirm-list").val()),createListsAndElements(),toggleConfirmationModalVisibility(),generateUserAlert("List successfully deleted.","success",5e3)}function buttonOpenElementModalForElementUpdate(e,t,n){var o=getElement(e,t,n);resetElementModalUserAlert(),$("#modal-list").val(e),$("#modal-element").val(t),$("#modal-status").val(n),$("#elementTitle").val(o.title),$("#elementDescription").val(o.description),$("#elementComments").val(o.comments),$("#elementCategory").val(parseInt(o.category)),$("#elementDue").val(o.due),$("#element-modal-button-create").hide(),$("#element-modal-button-update").show(),$("#element-modal-update-title").show(),$("#element-modal-create-title").hide(),closeAllDropdown(),toggleElementModalVisibility(),autosize.update($("#elementDescription")),$("#elementTitle").focus()}function buttonOpenElementModalForElementCreate(e){resetElementModalUserAlert(),$("#elementTitle").val(""),$("#elementDescription").val(""),$("#elementComments").val(""),$("#elementCategory").val(0),$("#elementDue").val(""),$("#element-modal-button-create").show(),$("#element-modal-button-update").hide(),$("#element-modal-update-title").hide(),$("#element-modal-create-title").show(),$("#modal-list").val(e),closeAllDropdown(),toggleElementModalVisibility(),autosize.update($("#elementDescription")),$("#elementTitle").focus()}function buttonUpdateElement(){var e=$("#modal-list").val(),t=$("#modal-element").val(),n=$("#modal-status").val();setElementTitle(e,t,n,$("#elementTitle").val()),setElementDescription(e,t,n,$("#elementDescription").val()),setElementComments(e,t,n,$("#elementComments").val()),setElementCategory(e,t,n,parseInt($("#elementCategory").val())),setElementDue(e,t,n,$("#elementDue").val()),toggleElementModalVisibility(),createListsAndElements()}function buttonCreateNewElement(){createElement($("#modal-list").val(),"open",$("#elementTitle").val(),$("#elementDescription").val(),$("#elementComments").val(),parseInt($("#elementCategory").val()),"","",$("#elementDue").val(),"",""),toggleElementModalVisibility(),createListsAndElements()}function buttonRenameList(){setListName($("#modal-rename-list").val(),$("#modal-list-rename-input").val()),createListsAndElements(),toggleRenameListModal()}function buttonClearDueDate(){$("#elementDue").val("")}function autoUpdate(){var e=JSON.parse(localStorage.getItem("todo"));null!=localStorage.getItem("todo")?compareJsonArrays(todo,e)||(todo=JSON.parse(localStorage.getItem("todo")),createListsAndElements(),generateUserAlert("It looks like you updated your list on another tab, it has been updated on this tab too!","information",5e3)):(firstTimeLoadLocalStorage(),createListsAndElements())}function compareJsonArrays(e,t){if(e===t)return!0;if(!(e instanceof Object&&t instanceof Object))return!1;if(e.constructor!==t.constructor)return!1;var n;for(n in e)if(e.hasOwnProperty(n)){if(!t.hasOwnProperty(n))return!1;if(e[n]===t[n])continue;if("object"!=typeof e[n])return!1;if(!compareJsonArrays(e[n],t[n]))return!1}for(n in t)if(t.hasOwnProperty(n)&&!e.hasOwnProperty(n))return!1;return!0}function themeChanger(e){"default"===e&&(currentTheme="default",$("body").removeClass(),$("body").addClass("theme-default")),"dark"===e&&(currentTheme="dark",$("body").removeClass(),$("body").addClass("theme-dark")),"light"===e&&(currentTheme="light",$("body").removeClass(),$("body").addClass("theme-light")),saveTheme(e)}function saveTheme(e){localStorage.setItem("theme",e)}function loadTheme(){themeChanger(localStorage.getItem("theme"))}function autoChangeTheme(){null!=localStorage.getItem("theme")?localStorage.getItem("theme")!==currentTheme&&(loadTheme(),generateUserAlert("It looks like you updated your theme on another tab, it has been updated on this tab too!","information",5e3)):setDefaultTheme()}function setDefaultTheme(){null==localStorage.getItem("theme")&&localStorage.setItem("theme","default")}function downloadObjectAsJson(){var e=todo,t="todoBackup_"+(new Date).toISOString(),n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,2)),o=document.createElement("a");o.setAttribute("href",n),o.setAttribute("download",t+".json"),document.body.appendChild(o),o.click(),o.remove()}function generateUserAlert(e,t,n){var o,l="",s="",a="",i=e,r=Math.floor(1e6*Math.random())+0;"information"==t&&(l="fas fa-info-circle",s="Information",a="userAlert-info"),"success"==t&&(l="fas fa-check-circle",s="Success",a="userAlert-success"),"warning"==t&&(l="fas fa-exclamation-circle",s="Warning",a="userAlert-warning"),"error"==t&&(l="fas fa-times-circle",s="Error",a="userAlert-error"),o="<div class='userAlert "+a+"'id='alertId-"+r+"'><div class='icon'><i class='"+l+"'></i></div><div class='text'><div class='text-title'>"+s+"</div><div class='text-body'>"+i+"</div></div></div>",$(".userAlert-container").append(o),0!==n&&setTimeout(function(){$("#alertId-"+r).fadeOut(2e3,function(){$("#alertId-"+r).remove()})},n)}function timeTill(e){var t=Date.parse(e),n=new Date,o=Math.floor((t-n)/1e3),l=Math.floor(o/60),s=Math.floor(l/60),a=Math.floor(s/24);l=l-24*a*60-60*(s-=24*a);return t-n<=0?"Overdue":1<=a?1==a?a+" Day":a+" Days":1<=s?1==s?s+" Hour":s+" Hours":1==l?l+" Min":l+" Mins"}function calculateRisk(e){var t=Date.parse(e)-new Date;return t<864e5?"danger":t<6048e5?"warning":"info"}function createList(e,t,n,o){t=t||"",n=n||"",o=o||"";var l=!1;if(createJsonList()){var s=todo.length-1;setListName(s,e),""!=t&&setListOpenElements(s,t),""!=n&&setListClosedElements(s,n),""!=o&&setListDeletedElements(s,o),l=!0}return l}function createJsonList(){return todo.push({list_name:"",openElements:[],closedElements:[],deletedElements:[]}),!0}function deleteList(e){var t=!1;try{todo.splice(e,1),t=!0}catch(e){t=!1}return t}function getList(e){return todo[e]}function getListName(e){return todo[e].list_name}function getListOpenElements(e){return todo[e].openElements}function getListClosedElements(e){return todo[e].closedElements}function getListDeletedElements(e){return todo[e].deletedElements}function setListName(e,t){var n=!1;try{todo[e].list_name=t,n=!0}catch(e){n=!1}return n}function setListOpenElements(e,t){var n=!1;try{todo[e].openElements=t,n=!0}catch(e){n=!1}return n}function setListClosedElements(e,t){var n=!1;try{todo[e].closedElements=t,n=!0}catch(e){n=!1}return n}function setListDeletedElements(e,t){var n=!1;try{todo[e].deletedElements=t,n=!0}catch(e){n=!1}return n}function getElementList(e,t){var n;return"open"==t?n=todo[e].openElements:"closed"==t?n=todo[e].closedElements:"deleted"==t&&(n=todo[e].deletedElements),n}function createElement(e,t,n,o,l,s,a,i,r,d,m){if(n&&(o=o||"",l=l||"",s=s||0,a=a||"",i=i||"",r=r||"",d=d||"",m=m||"",createJsonElement(e,t))){var c=todo[e].openElements.length-1;setElementTitle(e,c,t,n),setElementDescription(e,c,t,o),setElementComments(e,c,t,l),setElementCategory(e,c,t,s),setElementClassification(e,c,t,a),setElementUser(e,c,t,i),setElementDue(e,c,t,r),setElementCreated(e,c,t,d),setElementChecklist(e,c,t,m)}return!1}function createJsonElement(e,t){return getElementList(e,t).push({title:"",description:"",classification:"",user:"",due:"",created:"",checklist:[]}),!0}function getElement(e,t,n){return getElementList(e,n)[t]}function getElementTitle(e,t,n){return getElementList(e,n)[t]}function getElementDescription(e,t,n){return getElementList(e,n)[t]}function getElementComments(e,t,n){return getElementList(e,n)[t]}function getElementCategory(e,t,n){return getElementList(e,n)[t]}function getElementClassification(e,t,n){return getElementList(e,n)[t]}function getElementUser(e,t,n){return getElementList(e,n)[t]}function getElementDue(e,t,n){return getElementList(e,n)[t]}function getElementCreated(e,t,n){return getElementList(e,n)[t]}function getElementChecklist(e,t,n){return getElementList(e,n)[t]}function setElementTitle(e,t,n,o){getElementList(e,n)[t].title=o}function setElementDescription(e,t,n,o){getElementList(e,n)[t].description=o}function setElementComments(e,t,n,o){getElementList(e,n)[t].comments=o}function setElementCategory(e,t,n,o){getElementList(e,n)[t].category=parseInt(o)}function setElementClassification(e,t,n,o){getElementList(e,n)[t].classification=o}function setElementUser(e,t,n,o){getElementList(e,n)[t].user=o}function setElementDue(e,t,n,o){getElementList(e,n)[t].due=o}function setElementCreated(e,t,n,o){getElementList(e,n)[t].Created=o}function setElementChecklist(e,t,n,o){getElementList(e,n)[t].checklist=o}function changeElementStatus(e,t,n){var o,l,s,a=getElementList(e,"open"),i=getElementList(e,"closed"),r=getElementList(e,"deleted");"open"===n&&(s=a,l=i),"closed"===n&&(s=i,l=a),"deleted"===n&&(s=r,l=i),o=l[t],l.splice(t,1),s.push(o)}function changeElementStatusToDeleted(e,t){changeElementStatus(e,t,"deleted")}function changeElementStatusToClosed(e,t){changeElementStatus(e,t,"closed")}function changeElementStatusToOpen(e,t){changeElementStatus(e,t,"open")}function reorderList(a,i,r){$.each(todo,function(e,t){if(e===parseInt(a)){if("up"===r&&0!==i&&1<t.openElements.length){var n=t.openElements[i],o=t.openElements[i-1];t.openElements[i]=o,t.openElements[i-1]=n}if("down"===r&&i!==t.openElements.length-1&&1<t.openElements.length){var l=t.openElements[i],s=t.openElements[i+1];t.openElements[i]=s,t.openElements[i+1]=l}}}),createListsAndElements()}function compareElementModalTextarea(){var e=getElement($("#modal-list").val(),$("#modal-element").val(),$("#modal-status").val());e.description!=$("#elementDescription").val()?($("#elementDescriptionWarning").removeClass("hidden"),$("#elementDescriptionWarning").addClass("flex"),$("#elementDescription").addClass("user-save-alert-border")):($("#elementDescriptionWarning").addClass("hidden"),$("#elementDescriptionWarning").removeClass("flex"),$("#elementDescription").removeClass("user-save-alert-border")),e.comments!=$("#elementComments").val()?($("#elementCommentsWarning").removeClass("hidden"),$("#elementCommentsWarning").addClass("flex"),$("#elementComments").addClass("user-save-alert-border")):($("#elementCommentsWarning").addClass("hidden"),$("#elementCommentsWarning").removeClass("flex"),$("#elementComments").removeClass("user-save-alert-border"))}function resetElementModalUserAlert(){$("#elementDescriptionWarning").addClass("hidden"),$("#elementDescriptionWarning").removeClass("flex"),$("#elementDescription").removeClass("user-save-alert-border"),$("#elementCommentsWarning").addClass("hidden"),$("#elementCommentsWarning").removeClass("flex"),$("#elementComments").removeClass("user-save-alert-border")}var todo=JSON.parse(localStorage.getItem("todo"));createListsAndElements(),autosize($("#elementDescription")),autosize($("#elementComments")),$("#elementDescription").focus(function(){autosize.update($("#elementDescription")),autosize.update($("#elementComments"))}),firstTimeLoadLocalStorage(),window.setInterval(function(){autoUpdate()},1e3);var currentTheme="";setDefaultTheme(),loadTheme(),window.setInterval(function(){autoChangeTheme()},1e3),tail.DateTime(".tail-datetime-field",{animate:!0,classNames:!1,closeButton:!0,dateFormat:"YYYY-mm-dd",dateStart:!1,dateRanges:[],dateBlacklist:!0,dateEnd:!1,locale:"en",position:"bottom",rtl:"auto",startOpen:!1,stayOpen:!1,timeFormat:"HH:ii:ss",timeHours:null,timeMinutes:null,timeSeconds:0,timeIncrement:!0,timeStepHours:1,timeStepMinutes:5,timeStepSeconds:5,today:!0,tooltips:[],viewDefault:"days",viewDecades:!0,viewYears:!0,viewMonths:!0,viewDays:!0,weekStart:0}),$(document).on("keyup",function(e){compareElementModalTextarea()});