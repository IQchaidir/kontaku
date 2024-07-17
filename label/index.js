const allContactsElement = document.getElementById("allContacts")
const contactContainer = document.getElementById("contact-container")
const formContactModal = document.getElementById("formContactModal")
const addContactFormElement = document.getElementById("addContactForm")
const editContactFormElement = document.getElementById("editContactForm")
const labelsContainer = document.getElementById("label-container")
const labelFormModal = document.getElementById("labelFormModalContent")
const deleteModalLabel = document.getElementById("deleteLabelModal")
const toggleDeskButton = document.getElementById("toggleDesk")
const deskComponent = document.getElementById("deskComponent")
const deleteModalContact = document.getElementById("deleteModalContact")
let currentContactId = null

function getCurrentLabelId() {
    const params = new URLSearchParams(window.location.search)
    const id = Number(params.get("id"))

    return id
}

const renderContactFilterLabel = () => {
    const labelId = getCurrentLabelId()
    const contacts = filterContactByLabel(labelId)
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get("search")

    const contactsToRender = keyword ? searchContact(contacts, keyword) : contacts

    const contactContainer = document.getElementById("contact-container")

    const contactItems = contactsToRender.map((contact) => {
        const label = labels.find((label) => label.id === contact.label)
        const contactLabel = label ? label.name : ""

        return `
      <div class="contact-item grid grid-cols-6 p-2 hover:bg-indigo-200 rounded-md gap-5 cursor-pointer">
          <div>${contact.fullName}</div>
          <div>${contact.email}</div>
          <div>${contact.phone}</div>
          <div>${contactLabel}</div>
          <div></div>
          <div class="flex space-x-5 justify-end">
          <div class="cursor-pointer edit-contact" onclick="showEditContactModal(event,${contact.id})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil hover:scale-150">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                  </svg>
              </div>
              <div class="cursor-pointer delete-contact" onclick="showModalDeleteContact(event,${contact.id})">
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
      </div>
  `
    })

    contactContainer.innerHTML = contactItems.join("")

    document.querySelectorAll(".contact-item").forEach((contactItem, index) => {
        contactItem.addEventListener("click", () => {
            openDesk(contacts[index])
        })
    })
}

const showAddContactModal = () => {
    formContactModal.innerHTML = `
    <div class="bg-white p-6 rounded-lg w-1/2">
      <div class="text-2xl font-bold mb-7 flex justify-between">
        <span>Add New Contact</span>
        <span class="cursor-pointer" onclick="toggleModal('formContactModal')">X</span>
      </div>
      <form id="addContactForm" class="space-y-5" method="post">
        <div class="flex gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
            <input
              id="full-name"
              name="fullName"
              type="text"
              placeholder="Full Name"
              class="border border-black px-1 w-full rounded-md"
              required
            />
            </div>
              <div class="flex gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 64 64"
                  id="email"
                  >
                  <path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path>
                  <path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path>
                  <path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path>
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  class="border border-black px-1 w-full rounded-md"
                  required
                  />
                  </div>
                  <div class="flex gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      id="phone"
                      >
                        <path
                          d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z"
                          ></path>
                    </svg>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        class="border border-black px-1 w-full rounded-md"
                        required
                        />
                    </div>
                    <div class="flex gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 3591.149 3075.098"
                        id="building"
                        >
                          <path
                            fill="#282d35"
                            d="M282.768 1138.14h212.076v205.007H282.768zM622.089 1138.14h205.007v205.007H622.089zM282.768 1463.323h205.007v212.076H282.768zM622.089 1463.323h212.076v212.076H622.089zM282.768 1802.644h205.007v205.007H282.768zM622.089 1802.644h212.076v205.007H622.089zM282.768 2120.757h205.007v212.076H282.768zM622.089 2120.757h212.076v212.076H622.089zM282.768 2460.079h205.007v205.007H282.768zM622.089 2460.079h212.076v205.007H622.089z"
                            ></path>
                          <path
                            fill="#282d35"
                            d="M3591.149 812.957h-982.617V0H982.618v812.957H0v2262.141h3591.149V812.957zM982.618 2947.853H120.176V940.203h862.441v2007.65zm1067.447 7.069h-508.982v-742.265h508.982v742.265zm-629.158-869.511v869.51h-311.044V120.176h1371.423l-7.069 2834.746h-296.906v-869.51h-756.404zm2042.997 862.442h-855.372V940.203h855.372v2007.65z"
                            ></path>
                          <path
                            fill="#282d35"
                            d="M2764.054 1138.14h205.007v205.007h-205.007zM3096.306 1138.14h212.076v205.007h-212.076zM2756.984 1463.323h212.076v212.076h-212.076zM3103.375 1463.323h205.007v212.076h-205.007zM2756.984 1802.644h212.076v205.007h-212.076zM3103.375 1802.644h205.007v205.007h-205.007zM2756.984 2120.757h212.076v212.076h-212.076zM3103.375 2120.757h205.007v212.076h-205.007zM2756.984 2460.079h212.076v205.007h-212.076zM3103.375 2460.079h205.007v205.007h-205.007zM1272.454 996.756h212.076v205.007h-212.076zM2092.48 996.756h212.076v205.007H2092.48zM1272.454 1321.939h212.076v212.076h-212.076zM2099.55 1321.939h205.007v212.076H2099.55zM1272.454 1661.26h212.076v205.007h-212.076zM2099.55 1661.26h205.007v205.007H2099.55zM1682.467 989.687h212.076v212.076h-212.076zM1272.454 664.504h212.076v205.007h-212.076zM2092.48 664.504h212.076v205.007H2092.48zM1682.467 664.504h212.076v205.007h-212.076zM1272.454 332.252h212.076v205.007h-212.076zM2092.48 332.252h212.076v205.007H2092.48zM1682.467 332.252h212.076v205.007h-212.076zM1682.467 1321.939h212.076v205.007h-212.076zM1682.467 1654.191h212.076v212.076h-212.076z"
                          ></path>
                        </svg>
                        <div class="w-full space-y-5">
                          <input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Company"
                            class="border border-black px-1 w-full rounded-md h-10"
                            required
                            />
                          <input
                            id="jobTitle"
                            name="jobTitle"
                            type="text"
                            placeholder="Job Title"
                            class="border border-black px-1 w-full rounded-md h-10"
                            required
                            />
                    </div>
                  </div>
                <div class="flex gap-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 50 50"
                    id="logoLabel"
                    >
                  <path
                    d="M24.896 9.463a.997.997 0 0 0-.707-.293l-12.957-.001a1 1 0 0 0-1 .996l-.046 13.005a.998.998 0 0 0 .293.711l16.995 16.995a.997.997 0 0 0 1.414 0l13.004-13.004a.999.999 0 0 0 0-1.414L24.896 9.463zm3.285 29.292L12.188 22.761l.041-11.592 11.547.001 15.995 15.995-11.59 11.59z"
                  ></path>
                  <circle cx="20.362" cy="19.346" r="2.61"></circle>
                </svg>
                <select
                  id="label"
                  name="label"
                  placeholder="Select Label"
                  class="border border-black px-1 w-full rounded-md"
                  ></select>
              </div>
            <div class="pl-14">
            <button
                type="submit"
                class="w-full bg-indigo-500 rounded-md py-2 text-white font-bold"
                >
              Add Contact
            </button>
          </div>
        </form>
      </div>`

    toggleModal("formContactModal")
    renderOptionLabels()

    const addContactFormElement = document.getElementById("addContactForm")
    addContactFormElement.addEventListener("submit", addContact)
}

const showEditContactModal = (event, contactId) => {
    event.stopPropagation()

    currentContactId = contactId
    const contacts = loadContacts()

    const contact = contacts.find((contact) => contact.id === contactId)
    if (!contact) {
        console.error("Contact not found with ID:", contactId)
        return
    }

    formContactModal.innerHTML = `
    <div class="bg-white p-6 rounded-lg w-1/2">
      <div class="text-2xl font-bold mb-7 flex justify-between">
        <span>Edit Contact</span>
        <span class="cursor-pointer" onclick="toggleModal('formContactModal')">X</span>
      </div>
      <form id="editContactForm" class="space-y-5" method="post">
        <div class="flex gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
            <input
              id="full-name"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value='${contact.fullName}'
              class="border border-black px-1 w-full rounded-md"
              required
            />
            </div>
              <div class="flex gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 64 64"
                  id="email"
                  >
                  <path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path>
                  <path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path>
                  <path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path>
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value=${contact.email}
                  class="border border-black px-1 w-full rounded-md"
                  required
                  />
                  </div>
                  <div class="flex gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      id="phone"
                      >
                        <path
                          d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z"
                          ></path>
                    </svg>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        value=${contact.phone}
                        class="border border-black px-1 w-full rounded-md"
                        required
                        />
                    </div>
                    <div class="flex gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 3591.149 3075.098"
                        id="building"
                        >
                          <path
                            fill="#282d35"
                            d="M282.768 1138.14h212.076v205.007H282.768zM622.089 1138.14h205.007v205.007H622.089zM282.768 1463.323h205.007v212.076H282.768zM622.089 1463.323h212.076v212.076H622.089zM282.768 1802.644h205.007v205.007H282.768zM622.089 1802.644h212.076v205.007H622.089zM282.768 2120.757h205.007v212.076H282.768zM622.089 2120.757h212.076v212.076H622.089zM282.768 2460.079h205.007v205.007H282.768zM622.089 2460.079h212.076v205.007H622.089z"
                            ></path>
                          <path
                            fill="#282d35"
                            d="M3591.149 812.957h-982.617V0H982.618v812.957H0v2262.141h3591.149V812.957zM982.618 2947.853H120.176V940.203h862.441v2007.65zm1067.447 7.069h-508.982v-742.265h508.982v742.265zm-629.158-869.511v869.51h-311.044V120.176h1371.423l-7.069 2834.746h-296.906v-869.51h-756.404zm2042.997 862.442h-855.372V940.203h855.372v2007.65z"
                            ></path>
                          <path
                            fill="#282d35"
                            d="M2764.054 1138.14h205.007v205.007h-205.007zM3096.306 1138.14h212.076v205.007h-212.076zM2756.984 1463.323h212.076v212.076h-212.076zM3103.375 1463.323h205.007v212.076h-205.007zM2756.984 1802.644h212.076v205.007h-212.076zM3103.375 1802.644h205.007v205.007h-205.007zM2756.984 2120.757h212.076v212.076h-212.076zM3103.375 2120.757h205.007v212.076h-205.007zM2756.984 2460.079h212.076v205.007h-212.076zM3103.375 2460.079h205.007v205.007h-205.007zM1272.454 996.756h212.076v205.007h-212.076zM2092.48 996.756h212.076v205.007H2092.48zM1272.454 1321.939h212.076v212.076h-212.076zM2099.55 1321.939h205.007v212.076H2099.55zM1272.454 1661.26h212.076v205.007h-212.076zM2099.55 1661.26h205.007v205.007H2099.55zM1682.467 989.687h212.076v212.076h-212.076zM1272.454 664.504h212.076v205.007h-212.076zM2092.48 664.504h212.076v205.007H2092.48zM1682.467 664.504h212.076v205.007h-212.076zM1272.454 332.252h212.076v205.007h-212.076zM2092.48 332.252h212.076v205.007H2092.48zM1682.467 332.252h212.076v205.007h-212.076zM1682.467 1321.939h212.076v205.007h-212.076zM1682.467 1654.191h212.076v212.076h-212.076z"
                          ></path>
                        </svg>
                        <div class="w-full space-y-5">
                          <input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Company"
                            class="border border-black px-1 w-full rounded-md h-10"
                            required
                            />
                          <input
                            id="jobTitle"
                            name="jobTitle"
                            type="text"
                            placeholder="Job Title"
                            class="border border-black px-1 w-full rounded-md h-10"
                            required
                            />
                    </div>
                  </div>
                <div class="flex gap-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 50 50"
                    id="logoLabel"
                    >
                  <path
                    d="M24.896 9.463a.997.997 0 0 0-.707-.293l-12.957-.001a1 1 0 0 0-1 .996l-.046 13.005a.998.998 0 0 0 .293.711l16.995 16.995a.997.997 0 0 0 1.414 0l13.004-13.004a.999.999 0 0 0 0-1.414L24.896 9.463zm3.285 29.292L12.188 22.761l.041-11.592 11.547.001 15.995 15.995-11.59 11.59z"
                  ></path>
                  <circle cx="20.362" cy="19.346" r="2.61"></circle>
                </svg>
                <select
                  id="label"
                  name="label"
                  placeholder="Select Label"
                  class="border border-black px-1 w-full rounded-md"
                  ></select>
              </div>
            <div class="pl-14">
            <button
                type="submit"
                class="w-full bg-indigo-500 rounded-md py-2 text-white font-bold"
                >
              Update Contact
            </button>
          </div>
        </form>
      </div>`

    toggleModal("formContactModal")
    renderOptionLabels(contact.label)

    const editContactFormElement = document.getElementById("editContactForm")
    editContactFormElement.addEventListener("submit", (event) => editContact(event))
}

const showModalDeleteContact = (event, contactId) => {
    event.stopPropagation()
    deleteModalContact.innerHTML = `
    <div class="bg-white p-6 rounded shadow-lg text-center">
      <p class="mb-4">Are you sure you want to delete this contact?</p>
      <div class="flex justify-end">
        <button
          id="confirmDelete"
          class="bg-indigo-500 text-white px-4 py-2 rounded mr-2"
          onclick="confirmDeleteContact(true,'${contactId}')"
          >
          Yes
        </button>
        <button
          id="cancelDelete"
          onclick="confirmDeleteContact()"
          class="bg-gray-300 text-black px-4 py-2 rounded"
          >
          No
        </button>
      </div>
    </div>`

    toggleModal("deleteModalContact")
}

const confirmDeleteContact = (x, contactId) => {
    if (x) {
        deleteContact(contactId)
        return toggleModal("deleteModalContact")
    }
    toggleModal("deleteModalContact")
}

const deleteContact = (contactId) => {
    const contacts = loadContacts()
    const updatedContacts = contacts.filter((contact) => {
        return contact.id != contactId
    })

    saveContact(updatedContacts)
    renderContacts()
    closeDesk()
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

function addContact(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const contacts = loadContacts()

    const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1

    const newContact = {
        id: newId,
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phoneNumber"),
        label: Number(formData.get("label")),
    }

    const updatedContacts = [...contacts, newContact]
    saveContact(updatedContacts)

    toggleModal("formContactModal")
    renderContacts()
}

const editContact = (event) => {
    event.preventDefault()
    const contacts = loadContacts()
    const contactFormData = new FormData(event.target)
    console.lo

    const newContact = {
        id: currentContactId,
        fullName: contactFormData.get("fullName"),
        email: contactFormData.get("email"),
        phone: contactFormData.get("phoneNumber"),
        label: Number(contactFormData.get("label")),
    }

    const updatedContacts = contacts.map((contact) => {
        if (contact.id === newContact.id) {
            return newContact
        } else {
            return contact
        }
    })

    saveContact(updatedContacts)
    toggleModal("formContactModal")
    return renderContacts()
}

const searchContact = (contacts, keyword) => {
    const filteredContacts = contacts.filter((contact) => {
        return contact.fullName.toLowerCase().includes(keyword.toLowerCase())
    })

    return filteredContacts
}

const renderLabels = () => {
    const labels = loadLabels()

    const labelItemsElements = labels.map((label) => {
        return `
        <li class="w-full rounded-md hover:bg-indigo-200 py-2 px-4 flex justify-between">
          <a href="/label/?id=${label.id}" class="cursor-pointer"><span>${label.name}</span></a>
          <div class="flex space-x-5 justify-end">
            <div class="cursor-pointer edit-contact" onclick="showEditLabelModal(${label.id},'${label.name}')">
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

const renderOptionLabels = (selectedLabelId) => {
    const labels = loadLabels()
    const labelSelect = document.getElementById("label")
    labelSelect.innerHTML = `
      <option value="">No Label</option>
      ${labels
          .map(
              (label) => `
          <option value="${label.id}" ${label.id === selectedLabelId ? "selected" : ""}>${label.name}</option>
      `
          )
          .join("")}
  `
}

const showCreateLabelModal = () => {
    labelFormModal.innerHTML = `
  <form id="createLabelForm" class="space-y-4" method="post">
    <h2 class="text-xl font-semibold mb-4">Create New Label</h2>
    <div>
        <label for="labelName">Label Name</label>
        <input
            type="text"
            id="labelName"
            name="labelName"
            required
            class="w-full border-2 border-black rounded-md p-2"
        />
    </div>
    <div class="flex justify-end">
        <button
            type="button"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
            onclick="showCreateLabelModal()"
        >
            Cancel
        </button>
        <button
            type="submit"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
            Create Label
        </button>
    </div>
  </form>`

    const createLabelFormElement = document.getElementById("createLabelForm")
    createLabelFormElement.addEventListener("submit", addLabels)

    toggleModal("labelFormModal")
}

const showEditLabelModal = (labelId, labelName) => {
    labelFormModal.innerHTML = `
  <form id="editLabelForm" class="space-y-4" method="post">
    <h2 class="text-xl font-semibold mb-4">Edit Label</h2>
    <div>
        <label for="labelName">Label Name</label>
        <input
            type="text"
            id="labelName"
            name="labelName"
            value="${labelName}"
            required
            class="w-full border-2 border-black rounded-md p-2"
        />
    </div>
    <div class="flex justify-end">
        <button
            type="button"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
            onclick="toggleModal('labelFormModal')"
        >
            Cancel
        </button>
        <button
            type="submit"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
            Save Changes
        </button>
    </div>
  </form>`

    const editLabelFormElement = document.getElementById("editLabelForm")
    editLabelFormElement.addEventListener("submit", (event) => editLabel(event, labelId))

    toggleModal("labelFormModal")
}

const addLabels = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const labelName = formData.get("labelName").trim()

    const labels = loadLabels()
    const existingLabel = labels.find((label) => label.name.toLowerCase() === labelName.toLowerCase())

    if (existingLabel) {
        showToast("Label was already created!")
        return
    }

    const newId = labels.length ? labels[labels.length - 1].id + 1 : 1

    const newLabel = {
        id: newId,
        name: labelName,
    }

    const updatedLabels = [...labels, newLabel]
    saveLabel(updatedLabels)
    toggleModal("labelFormModal")
    renderContacts()
    renderLabels()
    showToast("Success Create Label!")
}

const editLabel = (event, labelId) => {
    event.preventDefault()
    const labels = loadLabels()

    const formData = new FormData(event.target)
    const labelName = formData.get("labelName").trim()

    const editLabel = {
        id: labelId,
        name: labelName,
    }

    const updateLabels = labels.map((label) => {
        if (label.id === labelId) {
            return editLabel
        } else return label
    })

    saveLabel(updateLabels)
    renderContacts()
    renderLabels()
    toggleModal("labelFormModal")
}

const showModalDeleteLabel = (labelId) => {
    deleteModalLabel.innerHTML = `
  <div class="bg-white p-6 rounded shadow-lg text-center">
    <p class="mb-4">Are you sure you want to delete this label?</p>
    <div class="flex justify-end">
      <button
          id="confirmDelete"
          class="bg-indigo-500 text-white px-4 py-2 rounded mr-2"
          onclick="confirmDeleteLabel(true,${labelId})"
      >
          Yes
      </button>
      <button
          id="cancelDelete"
          onclick="confirmDeleteLabel()"
          class="bg-gray-300 text-black px-4 py-2 rounded"
      >
          No
      </button>
    </div>
  </div>`

    toggleModal("deleteLabelModal")
}

const confirmDeleteLabel = (x, labelId) => {
    if (x) {
        deleteLabel(labelId)
        return showModalDeleteLabel()
    }
    toggleModal("deleteLabelModal")
}

const deleteLabel = (id) => {
    const labels = loadLabels()
    const contacts = loadContacts()

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

const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId)
    modal.classList.toggle("hidden")
    modal.classList.toggle("flex")
}

const showToast = (message) => {
    const toast = document.createElement("div")
    toast.textContent = message
    toast.classList.add(
        "fixed",
        "bottom-10",
        "right-10",
        "bg-indigo-500",
        "text-white",
        "text-xl",
        "p-5",
        "rounded-md",
        "shadow-lg",
        "z-50",
        "opacity-100",
        "transition-opacity",
        "duration-300"
    )

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.classList.toggle("opacity-100")
        toast.classList.toggle("opacity-0")
    }, 2000)
}

const filterContactByLabel = (id) => {
    const contacts = loadContacts()
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
    renderContactFilterLabel()
    renderLabels()
})
