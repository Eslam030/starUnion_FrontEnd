import { useEffect } from 'react'
import './Preloader.css'
import { preLoaderAnim } from '../../animations'

const PreLoader = () => {

  useEffect(()=> {
    preLoaderAnim()
  },[])

  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Data </span>
        <span>Coming </span>
        <span>From </span>
        <span className='star'>Star💫 </span>
      </div>
    </div>
  )
}

export default PreLoader