const renderLabels = () => {
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

// Event listener untuk menunggu DOM selesai dimuat
window.addEventListener("DOMContentLoaded", () => {
    let labelsToSave = [] // Inisialisasi labelsToSave, jika perlu
    const labelsLocal = localStorage.getItem("labels")

    if (labelsLocal) {
        labelsToSave = JSON.parse(labelsLocal)
    }

    // Simpan label ke localStorage
    saveLabel(labelsToSave)

    // Panggil fungsi renderLabels untuk merender opsi label
    renderLabels()
})
