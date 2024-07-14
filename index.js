const allContactsElement = document.getElementById("allContacts")
const addContactFormElement = document.getElementById("add-contact-form")

const renderContacts = () => {
    const contacts = loadContact()
    const labels = loadLabels()

    const tbody = document.getElementById("contact-container")

    contacts.forEach((contact) => {
        const label = labels.find((label) => label.id === contact.label)
        const contactLabel = label ? label.name : ""

        const tr = document.createElement("tr")
        tr.classList.add("hover:bg-indigo-200")

        tr.innerHTML = `
          <td class="py-2 px-4"> <a href="/contact/?id=${contact.id}">${contact.fullName}</a> </td>
          <td class="py-2 px-4">${contact.email}</td>
          <td class="py-2 px-4">${contact.phone}</td>
          <td class="py-2 px-4">${contactLabel}</td>
          <td class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil hover:scale-150">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                  </svg>
          </td>
          <td class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash hover:scale-150">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
          </td>
      `

        tbody.appendChild(tr)
    })
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

    labels.forEach((label) => {
        console.log(`Id:${label.id} Name:${label.name}`)
    })
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
})
