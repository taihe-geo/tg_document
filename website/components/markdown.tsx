import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export function MdRender(props: { rawMd: string }) {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm]}>{props.rawMd}</ReactMarkdown>
	);
}
