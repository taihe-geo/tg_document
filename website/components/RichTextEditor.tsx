import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import Style from "../styles/index.module.scss";
console.log("Style",Style)
export default function RichTextEditor(props) {
	const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
	const [html, setHtml] = useState("输入内容"); // 编辑器内容
	
	// 模拟 ajax 请求，异步设置 html
	useEffect(() => {
		setTimeout(() => {}, 1500);
	}, []);

	const toolbarConfig = {};
	const editorConfig: Partial<IEditorConfig> = {
		placeholder: "请输入内容...",
	};

	// 及时销毁 editor ，重要！
	useEffect(() => {
		return () => {
			if (editor == null) return;
			editor.destroy();
			setEditor(null);
		};
	}, [editor]);
	const onChange = (editor) => {
		const html = editor.getHtml();
		setHtml(html);
		props.onChange(html);
	};
	return (
		<>
			<div
				className={Style.myCssScope}
				style={{ border: "1px solid #ccc", zIndex: 100 }}
			>
				<Toolbar
					editor={editor}
					defaultConfig={toolbarConfig}
					mode="default"
					style={{ borderBottom: "1px solid #ccc" }}
				/>
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={onChange}
					mode="default"
					style={{ height: "500px", "overflow-y": "hidden" }}
				/>
			</div>
		</>
	);
}
