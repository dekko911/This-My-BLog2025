import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { useParams } from "react-router";
import { GuestLayout } from "../../layouts/guest";

export const BlogDetail = () => {
	const params = useParams();
	const [blog, setBlog] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://localhost:8000/api/blogs/slug/${params.slug}`;
			const res = await axios.get(url);

			setBlog(res.data.blog);
		};

		fetchData();
	}, [params.slug]);

	return (
		<GuestLayout>
			<article className="grid gap-y-3 mx-auto text-center w-250 p-3 motion-preset-focus">
				<div className="flex justify-center gap-x-12 mt-7">
					<p className="flex items-center gap-x-2 text-sm">
						<FaCalendarAlt className="mb-0.5" /> {blog.release}
					</p>
					<p className="flex items-center gap-x-2 text-sm">
						<FaNoteSticky />
						{blog?.category?.name}
					</p>
				</div>
				<h1 className="text-5xl/normal font-bold mt-3 mb-3 text-shadow-sm/15">
					{blog.title}
				</h1>
				<img
					src={`http://localhost:8000/storage/blogs/photo/${blog.photo}`}
					alt="Photo"
					className="mx-auto w-120 shadow-md/10 cursor-pointer"
					onClick={() => {
						window.open(
							`http://localhost:8000/storage/blogs/photo/${blog.photo}`,
							"_blank"
						);
					}}
				/>
				<p className="text-justify text-base/relaxed font-lora mt-4 mb-3 text-shadow-md/5 whitespace-pre-wrap">
					{blog.description}
				</p>
			</article>
		</GuestLayout>
	);
};
