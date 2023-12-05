const changeThemeBtn = document.querySelector('.change-theme-nav')
const themeLink = document.querySelector('link#theme-link')

const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

let theme
let icon

changeThemeBtn.addEventListener('click', () => {
  if (getCookie('theme') === 'dark') {
    theme = 'light'
    icon =
    `
    <span class="material-symbols-outlined">
      dark_mode
    </span>
    `
  } else {
    theme = 'dark'
    icon =
    `
    <span class="material-symbols-outlined">
      light_mode
    </span>
    `
  }

  document.querySelectorAll('body *').forEach(element => {
    element.classList.add('transition-500')
  })

  themeLink.href = `/resources/css/themes/${theme}.css`
  document.cookie = `theme=${theme}`
  changeThemeBtn.innerHTML = icon

  setTimeout(() => {
    document.querySelectorAll('body *').forEach(element => {
      element.classList.remove('transition-500')
    })
  }, 1000)
})
