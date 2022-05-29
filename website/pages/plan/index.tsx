import MyLayout from "../../components/layout";
import MyTable from "../../components/table";
import Link from "next/link";

import dayjs from "dayjs";
export default function () {
	const columns = [
		{
			prop: "name",
			label: "名称",
		},
		{
			prop: "date",
			label: "日期",
		},
		{
			prop: "progress",
			label: "进度",
		},
	];
	const data:any[] = [];
	for (let i = 0; i < 100; i++) {
		data.push({
			name: "计划一",
			date: dayjs().format("YYYY-MM-DD"),
			progress: 15,
		});
	}
	return (
		<MyLayout>
			<div className="layout-children-center">
				<MyTable
					columns={columns}
					data={data}
					slots={{
						名称: (item) => {
							return <Link href={`/plan/${item.name}`}>{item.name}</Link>;
						},
						进度: (item) => (
							<progress
								className="progress is-primary"
								value={item.progress + ""}
								max="100"
							>
								{item.progress + ""}
							</progress>
						),
					}}
				></MyTable>
			</div>
		</MyLayout>
	);
}
