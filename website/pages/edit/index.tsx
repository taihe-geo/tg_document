import { useRouter } from "next/router";
import MyLayout from "../../components/layout";
import Style from "./index.module.scss";

export default function () {
	const router = useRouter();
	return (
		<MyLayout>
			<section className="section is-large">
				<div className="title">选择一个编辑的类型</div>
				<div className="buttons">
					<button
						className={`button ${Style.mySelectButton}`}
						onClick={() => router.push("/edit/doc")}
					>
						文档
					</button>
					<button
						className={`button ${Style.mySelectButton}`}
						onClick={() => router.push("/edit/link")}
					>
						链接
					</button>
					<button
						className={`button ${Style.mySelectButton}`}
						onClick={() => router.push("/edit/translate")}
					>
						翻译
					</button>
				</div>
			</section>
		</MyLayout>
	);
}
