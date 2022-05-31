import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	return (
		<nav
			className="navbar is-transparent my-navbar"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<Link href="/home">
					<a className="navbar-item" href="">
						<img className="my-logo" src={require("../public/logo2.svg")} />
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
					<Link href="/edit">
						<a className="navbar-item">编辑</a>
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
							<span className="icon my-icon">
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
