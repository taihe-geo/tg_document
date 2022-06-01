import MyLayout from "../../../components/layout";
import dynamic from "next/dynamic";
import { useState } from "react";
import Style from "../index.module.scss";
const DynamicRichTextEditor = dynamic(
	() => import("../../../components/RichTextEditor"),
	{
		ssr: false,
	}
);
export default function () {
	const [title, setTitle] = useState("标题一");
	const onChange = (evt)=>{

	}
	return (
		<MyLayout>
			<input
				className={`input ${Style.myEdit}`}
				type="text"
				onInput={(evt) => setTitle(evt.target.value)}
			></input>
			<DynamicRichTextEditor onChange={onChange}></DynamicRichTextEditor>
		</MyLayout>
	);
}
