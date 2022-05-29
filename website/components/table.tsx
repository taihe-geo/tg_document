import { useEffect, useState } from "react";
import MyPagination from "./pagination";
// https://github.com/AdeleD/react-paginate
export default function (props) {
	const [showChild, setShowChild] = useState(false);
	let defaultPageSize = 10;

	if (!showChild) {
		return null;
	}
	if (props.pageSize) {
		defaultPageSize = props.pageSize;
	}
	let _dataWithPage: any[] = [];
	const handlePageClick = (val) => {
		let currentPage = val.selected + 1;
		_dataWithPage = props.data.slice(
			currentPage * defaultPageSize,
			(currentPage + 1) * defaultPageSize
		);
		console.log(_dataWithPage)
	};
	useEffect(() => {
		setShowChild(true);
	}, []);
	return (
		<>
			<table className="table my-table">
				<thead>
					<tr>
						{props.columns.map((x, xi) => {
							return <th key={xi}>{x.label}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{_dataWithPage.map((x, xi) => {
						return (
							<tr key={xi}>
								{props.columns.map((j, ji) => {
									if (props.slots) {
										let slot = props.slots[j["label"]];
										if (slot) {
											return slot(x);
										} else {
											return <td key={ji}>{x[j.prop]}</td>;
										}
									} else {
										return <td key={ji}>{x[j.prop]}</td>;
									}
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<MyPagination
				pageCount={Math.ceil(props.data.length / 10)}
				onPageChange={handlePageClick}
			></MyPagination>
		</>
	);
}
