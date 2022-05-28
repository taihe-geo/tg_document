import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Home: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace(`/home`);
	});
	return null;
};

export default Home;
