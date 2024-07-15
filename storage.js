const labels = [
    { id: 1, name: "Family" },
    { id: 2, name: "Friend" },
]

const contacts = [
    {
        id: 1,
        label: 1,
        fullName: "Iqbal Chaidir",
        email: "iqbal@gmail.com",
        phone: "087811111111",
    },
    {
        id: 2,
        label: 2,
        fullName: "Alex Darwis",
        email: "Alex@gmail.com",
        phone: "087811111111",
    },
]

const saveContact = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
}

const loadContact = () => {
    const contacts = localStorage.getItem("contacts")
    if (!contacts) {
        saveContact([])
    }

    try {
        return JSON.parse(contacts)
    } catch (error) {
        console.error("failed load contacts", error)
    }
}

const loadContactById = (id) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => {
        return contact.id === id
    })

    return contact
}

const saveLabel = (labels) => {
    localStorage.setItem("labels", JSON.stringify(labels))
}

const loadLabels = () => {
    const labels = localStorage.getItem("labels")
    if (!labels) {
        saveLabel([])
    }

    try {
        return JSON.parse(labels)
    } catch (error) {
        console.error("failed load labels", error)
    }
}

const loadLabelById = (id) => {
    const labels = loadLabels()
    const label = labels.find((label) => {
        return label.id === id
    })

    return label
}
