const renderContacts = () => {
    const contacts = loadContact()
    const labels = loadLabels()

    contacts.forEach((contact) => {
        const label = labels.find((label) => label.id === contact.label)
        const contactLabel = label ? label.name : ""
        console.log(
            `Id:${contact.id} Name: ${contact.fullName}, Email: ${contact.email}, Phone: ${contact.phone}, Label: ${contactLabel}`
        )
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

    saveContact(contactsToSave)
    saveLabel(labelsToSave)
    renderContacts()
})
