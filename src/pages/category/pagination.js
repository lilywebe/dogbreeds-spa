/*
Name: Piper Varney
Date: 06/20/22
File: pagination.js
Description: paginate,, limit, and sort data.
 */
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {settings} from "../../config/config";


const Pagination = ({categories, setUrl}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pages, setPages] = useState({});
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState("categoryName:asc");

    useEffect(() => {
        if(categories) {

            let pages = {};
            setLimit(categories.limit);
            setOffset(categories.offset);
            setTotalPages(Math.ceil(categories.totalCount/limit));
            setCurrentPage(categories.offset/categories.limit + 1);

            //Extract offset from each link and store it in pages
            categories.links.map((link) => {
                pages[link.rel] = link.href;
            });

            if(!pages.hasOwnProperty('prev')) {
                pages.prev = pages.self;
            }

            if(!pages.hasOwnProperty('next')) {
                pages.next = pages.self;
            }
            setPages(pages);
        }
    },[categories]);

    const handlePageClick = (e) => {
        setUrl(e.target.id + "&sort=" + sort);
    }

    const setItemsPerPage = (e) => {
        setLimit(e.target.value);
        setOffset(0);
        setUrl(`${settings.baseApiUrl}/categories?limit=${e.target.value}&offset=0&sort=${sort}`);
    }

    const sortcategories = (e) => {
        setSort(e.target.value);
        setUrl(`${settings.baseApiUrl}/categories?limit=${limit}&offset=${offset}&sort=${e.target.value}`);
    }


    return (
        <>
            {categories && <div className="breed-pagination-container">
                <div className="breed-pagination">
                    Showing page {currentPage} of {totalPages}&nbsp;
                    <Link to="#" title="First page" id={pages.first} onClick={handlePageClick}> &lt;&lt; </Link>
                    <Link to="#" title="Previous page" id={pages.prev} onClick={handlePageClick}> &lt; </Link>
                    <Link to="#" title="Next page" id={pages.next} onClick={handlePageClick}> &gt; </Link>
                    <Link to="#" title="Last page" id={pages.last} onClick={handlePageClick}> &gt;&gt; </Link>
                    Items per page &nbsp;
                    <select onChange={setItemsPerPage} defaultValue="5">
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className="breed-sorting"> Sort by:&nbsp;
                    <select onChange={sortcategories}>
                        <option value="categoryName:asc">Name A-Z</option>
                        <option value="categoryName:desc">Name Z-A</option>
                    </select>
                </div>
            </div>
            }
        </>
    );
};

export default Pagination;