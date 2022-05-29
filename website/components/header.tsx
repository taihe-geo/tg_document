import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	return (
		<nav
			className="navbar is-transparent"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<Link href="/home">
					<a className="navbar-item" href="">
						<img
							src="https://img2.baidu.com/it/u=570072581,900763034&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
							width="112"
							height="28"
						/>
					</a>
				</Link>

				<a
					role="button"
					className="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-start">
					<Link href="/home">
						<a className="navbar-item">首页</a>
					</Link>
					<Link href="/about">
						<a className="navbar-item">关于</a>
					</Link>
				</div>

				<div className="navbar-end">
					<div className="navbar-item">
						<Link
							href="https://github.com/taihe-geo/tg_document"
							target="_blank"
						>
							<span className="icon">
								<i className="fa-brands fa-github"></i>
							</span>
						</Link>
						{/* <a className="button is-primary">
								<strong>登录</strong>
							</a>
							<a className="button is-light">注册</a> */}
					</div>
				</div>
			</div>
		</nav>
	);
}
