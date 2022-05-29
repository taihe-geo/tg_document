import MyHeader from "./header";
export default function (props) {
	return (
		<>
			<div className="app">
				<MyHeader></MyHeader>
				{props.children}
			</div>
		</>
	);
}
