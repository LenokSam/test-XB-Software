const addTagBtn = document.getElementById('add-task__btn')
const addTagInput = document.getElementById('add-task__input')
const tagsList = document.getElementById('tags-list')
const readOnlyCheckbox = document.getElementById('inp-read')

function Tag(text) {
    this.text = text
}

let tags = localStorage.tags ? JSON.parse(localStorage.getItem('tags')) : []


const setToLocal = () => {
    localStorage.setItem('tags', JSON.stringify(tags))
}
const setToLocalDisabled = () => {
    let isChecked = readOnlyCheckbox.checked
    localStorage.setItem('disabled', JSON.stringify(isChecked))
}

const createItem = (text, i) => {
    return `
    <div class="tag-item">
          <div class="tag-text">${text}</div>
        <button  onclick='deleteTag(${i})' class="delete-btn">x</button>
    </div>
    `
}

const deleteTag = (i) => {
    tags.splice(i, 1)
    setToLocal()
    setTagToList()
}

const setTagToList = () => {
    tagsList.innerHTML = ''
    if (tags.length > 0) {
        tagsList.classList.add('tags-list')
        tags.forEach((tag, i) => {
            tagsList.innerHTML += createItem(tag.text, i)
        })
    } else {
        tagsList.classList.remove('tags-list')
    }
}

addTagBtn.addEventListener('click', () => {
    addTagInput.value && tags.push(new Tag(addTagInput.value))
    setToLocal(tags)
    setTagToList()
    addTagInput.value = ''
})

readOnlyCheckbox.addEventListener('change', () => {
    setToLocalDisabled()
    let isDisabled = JSON.parse(localStorage.getItem('disabled'))
    addTagInput.readOnly = isDisabled
    document.querySelectorAll('.delete-btn').forEach(e => e.disabled = isDisabled)
})
