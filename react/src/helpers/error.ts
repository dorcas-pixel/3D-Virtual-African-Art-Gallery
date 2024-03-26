import { getElementById, get1ByClass } from "./dom"

export const showError = (id: string, err: string) => {
  const parent = getElementById(`${id}-error`);

  if (!parent) return;

  let con = get1ByClass('error-msg', parent)

  if (con) con.innerHTML = err
  
  parent.classList.remove('hide')
}

export const hideError = (parent: string) => {
  getElementById(`${parent}-error`)?.classList.add('hide')
}