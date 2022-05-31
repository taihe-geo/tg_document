import dynamic from "next/dynamic";
import { useState } from "react";
import MyLayout from "../../components/layout";
import Style from "./index.module.scss";
const DynamicRichTextEditor = dynamic(
	() => import("../../components/RichTextEditor"),
	{
		ssr: false,
	}
);
export default function () {
	const onChange = (html) => {
		console.log(html);
	};
	const [title, setTitle] = useState("标题一");
	const renderDoc = () => {
		return (
			<>
				<input
					className={`input ${Style.myEdit}`}
					type="text"
					onInput={(evt) => setTitle(evt.target.value)}
				></input>
				<DynamicRichTextEditor onChange={onChange}></DynamicRichTextEditor>
			</>
		);
	};
	return (
		<MyLayout>
			<section className="section is-large">
				<div className="title">选择一个编辑的类型</div>
				<div className="buttons">
					<button className={`button ${Style.mySelectButton}`}>文档</button>
					<button className={`button ${Style.mySelectButton}`}>链接</button>
					<button className={`button ${Style.mySelectButton}`}>翻译</button>
				</div>
			</section>
		</MyLayout>
	);
}
