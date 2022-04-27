import React , {useEffect} from 'react'
import style from './CinemaById.module.css'
import { getFilmByIdSelector , getURL , getFrames} from '../../redux/cinemaById-selector';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setFilmById, setVideoFilm , setFrames} from '../../redux/CinemaById-reducer'
import  Carousel  from 'react-bootstrap/Carousel';


const CinemaById = () => {
   const film = useSelector(getFilmByIdSelector)
   const url = useSelector(getURL)
   const frames = useSelector(getFrames)
   const dispatch = useDispatch()
   const { id } = useParams()
   useEffect(() => {
      dispatch(setFilmById(id))
      dispatch(setVideoFilm(id))
      dispatch(setFrames(id))
   },[])
   console.log(film);
   return <>
      <div className={style.cinemaID}>
         <div className="container">
            <div className="row">
               <div className = {style.cinemabyid__img + ' ' + "col-md-5"}>
                  <img src={film.posterUrlPreview}/>
               </div>
               <div className={style.cinemabyid__text + ' ' + "col-md-7 d-flex flex-column"}>
                  <div>{film.nameRu}</div>
                 {film.shortDescription  ? <div>{`"` + film.shortDescription + `"`}</div> : <div></div>}
                  <div>{film.description}</div>
               </div>
               <div className={style.cinemaID__carousel}>
                  <Carousel>
                  {frames.map(item => {
                     return (
                     <Carousel.Item>
                         <img className={style.carousel__img}src={item.preview}/>
                     </Carousel.Item>)
                  })}
                  </Carousel>
                  </div>
            </div>
         </div>
      </div>
      
   </>
}


export default CinemaById;