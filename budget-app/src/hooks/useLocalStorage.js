import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    //If there is a value in the local storage we return it
    if (typeof defaultValue === 'function') {
      //We check if it is a function because inside the state we can pass a function or value
      return defaultValue()
    } else {
      return defaultValue
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  //Everytime a value changes we are to update it in the local storage
  return [value, setValue]
}