import MyHeader from "./header";
export default function (props) {
	return (
		<>
			<div className="app">
				<div className="container is-max-widescreen is-primary">
					<MyHeader></MyHeader>
					{props.children}
				</div>
			</div>
		</>
	);
}
