const labelsContainer = document.getElementById("label-container")
const deleteModalLabel = document.getElementById("deleteModalLabel")

let currentLabelId = null

const showModalDeleteContact = (contactId) => {
    currentContactId = contactId
    deleteModalContact.classList.toggle("hidden")
    deleteModalContact.classList.toggle("flex")
}

const showModalDeleteLabel = (labelId) => {
    currentLabelId = labelId
    deleteModalLabel.classList.toggle("hidden")
    deleteModalLabel.classList.toggle("flex")
}

const confirmDeleteContact = (x) => {
    if (x) {
        deleteContact(currentContactId)
        return showModalDeleteContact()
    }
    showModalDeleteContact()
}

const confirmDeleteLabel = (x) => {
    if (x) {
        deleteLabel(currentLabelId)
        return showModalDeleteLabel()
    }
    showModalDeleteLabel()
}

const renderLabels = () => {
    const labels = loadLabels()

    const labelItemsElements = labels.map((label) => {
        return `
      <li class="w-full rounded-md hover:bg-indigo-200 py-2 px-4 flex justify-between">
        <a href="/label/?id=${label.id}" class="cursor-pointer"><span>${label.name}</span></a>
        <div class="flex space-x-5 justify-end">
          <div class="cursor-pointer edit-contact">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil hover:scale-150">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
              </svg>
          </div>
          <div class="cursor-pointer delete-contact" onclick="showModalDeleteLabel(${label.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash hover:scale-150">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
          </div>
        </div>
      </li>`
    })
    const labelItems = labelItemsElements.join("")
    labelsContainer.innerHTML = labelItems
}

const renderOptionLabels = () => {
    const labels = loadLabels()
    const selectElement = document.getElementById("label")

    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.textContent = "No Label"
    selectElement.appendChild(defaultOption)

    labels.forEach((label) => {
        const option = document.createElement("option")
        option.value = label.id.toString()
        option.textContent = label.name
        selectElement.appendChild(option)
    })
}

window.addEventListener("DOMContentLoaded", () => {
    let labelsToSave = []
    const labelsLocal = localStorage.getItem("labels")

    if (labelsLocal) {
        labelsToSave = JSON.parse(labelsLocal)
    }

    saveLabel(labelsToSave)
    renderLabels()
    renderOptionLabels()
})
