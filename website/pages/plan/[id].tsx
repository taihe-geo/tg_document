import { useRouter } from "next/router";
import { MdRender } from "../../components/markdown";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Standard() {
	const router = useRouter();
	const id = router.query.id as string;
	const [rawMd, setRawMd] = useState("");
	useEffect(() => {
		if (id) {
			console.log("rfc", id);
			// axios.get("/standards/rfc/rfc7946/geojson.md").then((res: any) => {
			// 	if (res.data) {
			// 		setRawMd(res.data);
			// 	}
			// });
		}
	}, [router.query.id]);
	return <MdRender rawMd={`# ${router.query.id}`}></MdRender>;
}
