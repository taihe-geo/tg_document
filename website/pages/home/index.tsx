import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyLayout from "../../components/layout";
import MySearch from "../../components/search";
import * as Api from '../api'
import { MyDoc } from "../api";
export default function () {
	const [docList, setDocList] = useState<MyDoc[]>([]);
	useEffect(()=>{
		Api.queryList(10,1).then(res=>{
			setDocList(res.data)
		})
	},[])
	const onSearch = (text) => {
		let list: any[] = [];
		for (let i = 0; i < 10; i++) {
			list.push({
				docType: "标准",
				name: "GeoJSON标准 rfc7649",
				date: dayjs().format("YYYY-MM-DD"),
				author: "other people",
				translator: "qiu",
				link:"/standards/rfc/rfc7946"
			});
		}
		setDocList(list);
	};
	return (
		<MyLayout>
			<MySearch onSearch={onSearch}></MySearch>
			<div className="contianer my-card-container">
				{docList.map((item) => {
					return (
						<Link href={item.link}>
							<div className="card is-small my-card">
								<div className="card-content">
									<div className="content columns">
										<span className="column">{item.docType}</span>
										<span className="column">{item.cnName}</span>
										<span className="column">{item.create_time}</span>
										<span className="column">{item.author}</span>
										<span className="column">{item.translator}</span>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</MyLayout>
	);
}
