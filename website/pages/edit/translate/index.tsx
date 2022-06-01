import MyLayout from "../../../components/layout";

export default function () {
	return (
		<MyLayout>
			<section className="section is-large">
				<div className="field">
					<label className="label">链接</label>
					<div className="control">
						<input className="input" type="text" placeholder="Text input" />
					</div>
				</div>

				<div className="field">
					<label className="label">名称</label>
					<div className="control has-icons-left has-icons-right">
						<input
							className="input is-success"
							type="text"
							placeholder="Text input"
							value="bulma"
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-user"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fas fa-check"></i>
						</span>
					</div>
					<p className="help is-success">This username is available</p>
				</div>
			</section>
		</MyLayout>
	);
}
