export default function (props) {
	const onSearch = (text) => {
		props.onSearch(text);
	};
	return (
		<section className="section">
			<div className="my-search">
				<div className="my-input">
					<div className="control">
						<input
							className="input is-primary"
							type="text"
							placeholder="关键词"
						/>
					</div>
					<div className="select is-primary">
						<select>
							<option>全部</option>
							<option>教程</option>
							<option>标准</option>
							<option>链接</option>
						</select>
					</div>
				</div>
				<button className="button is-primary is-outlined" onClick={onSearch}>
					搜索
				</button>
			</div>
		</section>
	);
}
