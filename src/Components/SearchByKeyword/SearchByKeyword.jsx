import React,{useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import style from "./SearchByKeyword.module.css"
import { NavLink, useParams } from 'react-router-dom';
import { getCinemaSearchSelector, getIsFetchingSearchSelector, getTotalPageSearchSelector } from '../../redux/cinemaBySearch-selector';
import { getSearchCinemaAPI } from '../../redux/searchByKeyword-reducer';
import  ReactPaginate  from 'react-paginate';
import Preloader from '../../Preloader/Preloader';


const SearchByKeyword = () => {
   const { value } = useParams()
   const dispatch = useDispatch()
   const cinema = useSelector(getCinemaSearchSelector)
   const totalPage = useSelector(getTotalPageSearchSelector)
   const isFetching = useSelector(getIsFetchingSearchSelector)
   useEffect(() => {
      dispatch(getSearchCinemaAPI(value,1))
   }, [dispatch])
   const handleClicked = (data) => {
      let currentPage = data.selected + 1
      dispatch(getSearchCinemaAPI(value,currentPage))
   }
   return <>
      {isFetching ? <Preloader /> : 
      <div  className={style.cinema}>
         <div className="container">
               <div className="row">
               <div className={style.number__container + ' ' + "col-md-12"}>
               <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={totalPage > 20 ? 20 : totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handleClicked}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                  />
               </div>
               {cinema.map(item =>  
               <div className={style.cinema__container + ' ' + "col-md-6" + ' ' + "col-xl-3" + ' ' + "col-lg-4"}>
                  <div className={style.cinema__info} >
                     <div className={style.cinema__info_container}>
                     <p className={item.rating >=8.5 ? style.rating__color_8_10 : style.rating__color_0_8}>{item.rating}</p>
                     <div className = {style.cinema__name}>
                        {item.nameRu}
                     </div>
                     <div className = {style.cinema__year}>
                        Год : {item.year}
                     </div>
                     <div className={style.cinema__length}>
                        Продолжительность : {item.filmLength}
                     </div>
                     </div>
                  <NavLink to={"/cinemainfo/" + item.filmId}><img  className = {style.cinema__imgage}src={item.posterUrl}/></NavLink>
                  </div>
                  <h2>{item.nameRu}</h2>
         </div>)}
         </div>
         </div>
      </div>
}
   </>
}
export default SearchByKeyword;