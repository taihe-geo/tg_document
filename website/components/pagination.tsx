import ReactPaginate from "react-paginate";

export default function (props) {
	return (
		<ReactPaginate
			className="pagination"
			pageLinkClassName="pagination-link"
			activeLinkClassName="pagination-link is-current"
			previousLinkClassName="pagination-previous"
			nextLinkClassName="pagination-next"
			breakLabel="&hellip;"
			nextLabel="下一页"
			onPageChange={props.onPageChange}
			pageCount={props.pageCount}
			previousLabel="上一页"
		></ReactPaginate>
	);
}
