export default function () {
    const onSearch = (text)=>{
        console.log(text)
    }
	return (
		<div className="my-search">
			<div className="columns is-mobile">
				<div className="column is-three-fifths is-offset-one-fifth">
					<div className="control is-small">
						<input className="input" type="text" placeholder="关键词"/>
					</div>
				</div>
				<div className="column is-one-fifths is-offset-three-fifth">
					<button className="button is-primary is-outlined" onClick={onSearch}>搜索</button>
				</div>
			</div>
		</div>
	);
}
