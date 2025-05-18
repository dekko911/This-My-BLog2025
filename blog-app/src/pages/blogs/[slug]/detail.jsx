import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthLayout } from "../../../layouts/auth";

export const BlogDetails = () => {
	const hasToken = Cookies.get("token");

	const params = useParams();
	const [blog, setBlog] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://localhost:8000/api/blogs/slug/${params.slug}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			setBlog(res.data.blog);
		};

		fetchData();
	}, [params.slug, hasToken]);

	return (
		<AuthLayout>
			<article className="grid gap-y-[4vh] w-250 text-center mx-auto motion-preset-focus p-5">
				<div className="flex justify-center gap-x-20">
					<p>Publish : {blog.release}</p>
					<p>Category : {blog?.category?.name}</p>
				</div>
				<h1 className="font-bold text-3xl">Title : {blog.title}</h1>
				<img
					src={`http://localhost:8000/storage/blogs/photo/${blog.photo}`}
					alt="photo"
					className="w-120 mx-auto cursor-pointer"
					onClick={() => {
						window.open(
							`http://localhost:8000/storage/blogs/photo/${blog.photo}`,
							"_blank"
						);
					}}
				/>
				<p className="text-justify whitespace-pre-wrap font-lora">
					<span className="font-semibold">Description : </span>
					{blog.description}
				</p>
			</article>
		</AuthLayout>
	);
};
