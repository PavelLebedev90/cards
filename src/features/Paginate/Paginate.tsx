import ReactPaginate from 'react-paginate';
import stylesPaginate from './Paginate.module.css'
import arrowLeft from './../../logo/arrows/arrowLeft.svg'
import arrowRight from './../../logo/arrows/arrowRight.svg'
import React from 'react';

type PaginateType = {
    initialPage: number
    pageCount: number
    marginPagesDisplayed?: number
    pageRangeDisplayed?: number
    onChange: ({selected}: { selected: number }) => void
    isFetching:boolean
}
export const Paginate = (props: PaginateType) => {
    const wrapper = props.isFetching? stylesPaginate.wrapperLoad : ""
    return (

        <div className={stylesPaginate.wrapper}>
            <div className={wrapper}>
                <ReactPaginate initialPage={props.initialPage-1}
                               pageCount={props.pageCount}
                               disableInitialCallback={props.isFetching}
                               disabledLinkClassName={stylesPaginate.disabled}
                               marginPagesDisplayed={props.marginPagesDisplayed}
                               pageRangeDisplayed={props.pageRangeDisplayed}
                               onPageChange={props.onChange}
                               containerClassName={stylesPaginate.paginate}
                               activeClassName={stylesPaginate.paginateActive}
                               pageLinkClassName={stylesPaginate.paginatePageLink}
                               breakLinkClassName={stylesPaginate.paginateBreakLink}
                               nextLinkClassName={stylesPaginate.paginateNextLink}
                               previousLinkClassName={stylesPaginate.paginatePreviousLink}
                               pageClassName={stylesPaginate.paginatePage}
                               breakClassName={stylesPaginate.paginateBreak}
                               nextClassName={stylesPaginate.paginateNext}
                               previousClassName={stylesPaginate.paginatePrevious}
                               previousLabel={<img src={arrowLeft} alt="arrow Left"/>}
                               nextLabel={<img src={arrowRight} alt="arrow Right"/>}
                />
            </div>
        </div>
    )
}
