import { useState } from "react";

export default function (props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [previousShow, setPreviousShow] = useState(true);
	const [nextShow, setNextShow] = useState(false);
	let pageBtnNum = 7;
	const [pageNoList,setPageNoList] = useState(new Array(pageBtnNum));
	const setPage = (page) => {
		setCurrentPage(page);
		if (page === 1) {
			setPreviousShow(false);
			setNextShow(true);
		} else if (page === props.total) {
			setPreviousShow(true);
			setNextShow(false);
		}
		if (props.total <= pageBtnNum) {
			for (let i = 1; i <= pageBtnNum; i++) {
				pageNoList.push(i);
			}
		} else {
			
		}
	};
	const onPageBtnClick = (event) => {
		console.log(event);
	};
	const renderBtn = (pageNo, isCurrent) => {
		if (isCurrent) {
			return (
				<li onClick={onPageBtnClick} key={pageNo}>
					<a
						className="pagination-link is-current"
						aria-label={"Page " + pageNo}
						aria-current="page"
					>
						{pageNo}
					</a>
				</li>
			);
		} else {
			return (
				<li key={pageNo}>
					<a className="pagination-link" aria-label={"Goto page " + pageNo}>
						{pageNo}
					</a>
				</li>
			);
		}
	};
	const renderPageBtn = () => {
		let pageNoList: any[] = [];
		if (props.total <= pageBtnNum) {
			for (let i = 1; i <= pageBtnNum; i++) {
				pageNoList.push(i);
			}
		} else {
		}
		return pageNoList.map((i) => {
			if (typeof i === "number") {
				return renderBtn(i, i === currentPage);
			} else {
				return (
					<li key={Math.random()}>
						<span className="pagination-ellipsis">&hellip;</span>
					</li>
				);
			}
		});
	};
	return (
		<nav
			className="pagination is-centered"
			role="navigation"
			aria-label="pagination"
		>
			{previousShow ? <a className="pagination-previous">上一页</a> : null}
			{nextShow ? <a className="pagination-next">下一页</a> : null}

			<ul className="pagination-list">{renderPageBtn()}</ul>
		</nav>
	);
}
