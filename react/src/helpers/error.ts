import { getElementById, getElementsByClass } from "./dom"

export const showError = (id: string, err: string) => {
  const parent = getElementById(`${id}-error`);

  if (!parent) return;

  getElementsByClass('error-msg', parent)[0].innerHTML = err
  
  parent.classList.remove('hide')
}

export const hideError = (parent: string) => {
  getElementById(`${parent}-error`)?.classList.add('hide')
}