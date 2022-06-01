import { useRouter } from "next/router";
import { useState } from "react";
import MyLayout from "../../../components/layout";
import Style from "../index.module.scss";

export default function () {
	const [form, setForm] = useState<{
		cnName: string;
		enName: string;
		type: string;
		description: string;
		author: string;
		link: string;
		pageNo: number;
		language: string;
	}>({
		cnName: "",
		enName: "",
		description: "",
		author: "",
		link: "",
		language: "中文",
		type: "文章",
		pageNo: -1,
	});
	const router = useRouter();
	const onSubmit = () => {
		console.log(form);
	};
	const onCancel = () => {
		console.log(form);
		router.push("/edit");
	};
	return (
		<MyLayout>
			<div className={Style.myLinkContianer}>
				<div className="field">
					<label className="label">链接</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="请输入..."
							onInput={(evt) => setForm({ ...form, link: evt.target.value })}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">中文名称</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="请输入..."
							onInput={(evt) => setForm({ ...form, cnName: evt.target.value })}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">英文名称</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="请输入..."
							onInput={(evt) => setForm({ ...form, enName: evt.target.value })}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">作者</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="请输入..."
							onInput={(evt) => setForm({ ...form, author: evt.target.value })}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">类型</label>
					<div className="control">
						<div className="select">
							<select
								onChange={(evt) => setForm({ ...form, type: evt.target.value })}
							>
								<option>文章</option>
								<option>代码</option>
								<option>论文</option>
								<option>标准</option>
								<option>书</option>
							</select>
						</div>
					</div>
				</div>
				<div className="field">
					<label className="label">页码</label>
					<div className="control">
						<input
							className="input"
							type="number"
							placeholder="请输入..."
							value={-1}
							onInput={(evt) => setForm({ ...form, pageNo: evt.target.value })}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">语言</label>
					<div className="control">
						<div className="select">
							<select
								onChange={(evt) =>
									setForm({ ...form, language: evt.target.value })
								}
							>
								<option>中文</option>
								<option>英文</option>
							</select>
						</div>
					</div>
				</div>

				<div className="field">
					<label className="label">描述</label>
					<div className="control">
						<textarea
							className="textarea"
							placeholder="请输入..."
							onInput={(evt) =>
								setForm({ ...form, description: evt.target.value })
							}
						></textarea>
					</div>
				</div>
				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link" onClick={onSubmit}>
							提交
						</button>
					</div>
					<div className="control">
						<button className="button is-link is-light" onClick={onCancel}>
							取消
						</button>
					</div>
				</div>
			</div>
		</MyLayout>
	);
}
