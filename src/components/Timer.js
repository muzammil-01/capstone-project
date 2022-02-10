import React from 'react'
import {useState, useRef, useEffect} from 'react'

export default function Timer() {
  const intervalRef = useRef(null);
  const [timer, setTimer] = useState('00:00:00')

  function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60);
    const minutes = Math.floor( (total/1000/60) % 60);
    const hours = Math.floor( (total/(1000*60*60)) % 24);
    const days = Math.floor (total/(1000*60*60*24))
    return {
      total, days, hours, minutes, seconds
    }
  }
  function startTimer(deadline){
    let {total, days, hours, minutes, seconds} = getTimeRemaining(deadline)
    if(total>=0)
    {
      setTimer(
        (hours > 9 ? hours: '0'+hours)+ ':' +
        (minutes > 9 ? hours: '0'+minutes)+ ':' +
        (seconds > 9 ? hours: '0'+seconds)

      )
    }
    else{
      clearInterval(intervalRef.current)
    }
  }
  function clearTimer(endtime){
    setTimer('00:00:00')
    if(intervalRef.current) clearInterval(intervalRef.current)
    const id = setInterval(()=>{
      startTimer(endtime);
    }, 1000)
    intervalRef.current = id;
  }
  function getDeadlineTime(){
    let deadline = new Date()
    deadline.setHours(deadline.getHours()+2);
    return deadline
  }
  useEffect(()=>{
    clearTimer(getDeadlineTime());
    return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
  },[])

  return (
    <div>{timer}</div>
  )
}
