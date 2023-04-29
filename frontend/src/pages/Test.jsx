import React, { useEffect, useState } from 'react'

export default function Test() {
  const [inp, setInp] = useState('')
  const fetchResult = () => console.log("api call ")
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResult()
    }, 2000)
    return e => clearTimeout(timer)
  }, [inp])

  return <>
    <input type="text" onChange={e => setInp(e.target.value)} />
  </>
}
