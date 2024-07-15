const allContactsElement = document.getElementById("allContacts")
const addContactFormElement = document.getElementById("add-contact-form")
const labelsContainer = document.getElementById("label-container")
const toggleDeskButton = document.getElementById("toggleDesk")
const deskComponent = document.getElementById("deskComponent")
let currentContactId = null

const renderContacts = () => {
    const contacts = loadContact()
    const labels = loadLabels()

    const contactContainer = document.getElementById("contact-container")

    contacts.forEach((contact) => {
        const label = labels.find((label) => label.id === contact.label)
        const contactLabel = label ? label.name : ""

        const contactItem = document.createElement("div")
        contactItem.classList.add(
            "grid",
            "grid-cols-6",
            "p-2",
            "hover:bg-indigo-200",
            "rounded-md",
            "gap-5",
            "cursor-pointer"
        )
        contactItem.innerHTML = `
          <div>${contact.fullName}</div>
          <div>${contact.email}</div>
          <div>${contact.phone}</div>
          <div>
              <span class="inline-block bg-blue-100 text-indigo-500 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">${contactLabel}</span>
          </div>
          <div></div>
          <div class="flex space-x-5 justify-end">
              <div class="cursor-pointer edit-contact">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil hover:scale-150">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                  </svg>
              </div>
              <div class="cursor-pointer delete-contact">
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
      `

        contactItem.addEventListener("click", () => {
            openDesk(contact)
        })

        contactContainer.appendChild(contactItem)
    })
}

const openDesk = (contact) => {
    if (currentContactId === contact.id) {
        deskComponent.classList.add("hidden", "translate-x-full")
        currentContactId = null
        return
    }

    deskComponent.innerHTML = `
    <div class="p-5 w-80">
        <div class="flex justify-between">
            <button class="font-semibold text-2xl" onclick="closeDesk()">X</button>
            <div class="flex space-x-5 items-center">
              <div class="cursor-pointer edit-contact">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                  </svg>
              </div>
              <div class="cursor-pointer delete-contact">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
              </div>
          </div>
        </div>
        <h2 class="text-xl mt-5 font-semibold">Detail Contact :</h2>
        <div class="flex items-center gap-2 mt-3">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <div class="text-xl ">${contact.fullName}</div>
        </div>
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 64 64"
            id="email"
              >
            <path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path>
            <path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path>
            <path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path>
          </svg>
          <div class="text-xl">${contact.email}</div>
        </div>
        <p class="text-xl">Phone: ${contact.phone}</p>
    </div>
`

    deskComponent.classList.remove("hidden", "translate-x-full")
    currentContactId = contact.id
}

const closeDesk = () => {
    const deskComponent = document.getElementById("deskComponent")
    deskComponent.classList.add("hidden")
    deskComponent.classList.add("translate-x-full")
    currentContactId = null
}

const addContact = (fullName, email, phone, labelId) => {
    const contacts = loadContact()
    const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1

    const newContact = {
        id: newId,
        fullName,
        email,
        phone,
        label: labelId,
    }

    const updatedContacts = [...contacts, newContact]
    saveContact(updatedContacts)
    return renderContacts()
}

const editContact = (id, fullName, email, phone, labelId) => {
    const contacts = loadContact()
    const editContact = {
        id,
        fullName,
        email,
        phone,
        label: labelId,
    }

    const updatedContacts = contacts.map((contact) => {
        if (contact.id === editContact.id) {
            return editContact
        } else {
            return contact
        }
    })
    saveContact(updatedContacts)
    return renderContacts()
}

const deleteContact = (id) => {
    const contacts = loadContact()
    const updatedContacts = contacts.filter((contact) => {
        return contact.id !== id
    })

    saveContact(updatedContacts)
    renderContacts()
}

const searchContact = (keyword) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => {
        return contact.fullName.toLowerCase().includes(keyword.toLowerCase())
    })

    return filteredContacts
}

const renderLabels = () => {
    const labels = loadLabels()

    const labelItemsElements = labels.map((label) => {
        return `<li class="w-full cursor-pointer rounded-md hover:bg-indigo-200 py-2 px-4">${label.name}</li>`
    })

    const labelItems = labelItemsElements.join("")
    labelsContainer.innerHTML = labelItems
}

const addLabels = (name) => {
    const labels = loadLabels()
    const existinglabel = labels.find((label) => {
        return label.name.toLowerCase() === name.toLowerCase()
    })

    if (existinglabel) {
        return alert("The label already exists")
    }
    const newId = labels.length ? labels[labels.length - 1].id + 1 : 1

    const newLabel = {
        id: newId,
        name,
    }
    const updateLabels = [...labels, newLabel]
    saveLabel(updateLabels)
    renderContacts()
    renderLabels()
}

const editLabels = (id, name) => {
    const labels = loadLabels()

    const editLabel = {
        id,
        name,
    }

    const updateLabels = labels.map((label) => {
        if (label.id === id) {
            return editLabel
        } else return label
    })

    saveLabel(updateLabels)
    renderContacts()
    renderLabels()
}

const deleteLabel = (id) => {
    const labels = loadLabels()
    const contacts = loadContact()

    const updateLabels = labels.filter((label) => {
        return label.id !== id
    })

    const updateContacts = contacts.map((contact) => {
        if (contact.label === id) {
            contact.label = null
        }
        return contact
    })

    saveLabel(updateLabels)
    saveContact(updateContacts)
    renderLabels()
    renderContacts()
}

const filterContactByLabel = (id) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => {
        return contact.label === id
    })

    if (filteredContacts.length === 0) {
        return "Contact not found"
    }
    return filteredContacts
}

window.addEventListener("DOMContentLoaded", () => {
    let contactsToSave = contacts
    let labelsToSave = labels

    const contactsLocal = localStorage.getItem("contacts")
    if (contactsLocal) {
        contactsToSave = JSON.parse(contactsLocal)
    }

    const labelsLocal = localStorage.getItem("labels")
    if (labelsLocal) {
        labelsToSave = JSON.parse(labelsLocal)
    }

    if (window.location.pathname === "/") {
        allContactsElement.classList.add("bg-indigo-200")
    } else {
        allContactsElement.classList.remove("bg-indigo-200")
    }

    saveContact(contactsToSave)
    saveLabel(labelsToSave)
    renderContacts()
    renderLabels()
})
