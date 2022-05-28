import { useEffect, useState } from "react";
import MyPagination from './pagination'
export default function (props) {
	const [showChild, setShowChild] = useState(false);
	useEffect(() => {
		setShowChild(true);
	}, []);
	if (!showChild) {
		return null;
	}
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
					{props.data.map((x, xi) => {
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
			<MyPagination total={100}></MyPagination>
		</>
	);
}
