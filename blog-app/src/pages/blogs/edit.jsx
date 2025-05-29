import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";

export const EditBlogPage = () => {
	const hasToken = Cookies.get("token");

	const params = useParams();
	const navigate = useNavigate();

	const [blog, setBlog] = useState({});
	const [categorySelect, setCategorySelect] = useState([]);
	const [validationError, setValidationError] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const url = "http://localhost:8000/api/category";
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			const results = [];
			res.data.categories.forEach((data) => {
				results.push({
					key: data.slug,
					value: data.id,
				});
			});

			setCategorySelect([{ key: "Select a Category", value: "" }, ...results]);
		};

		fetchCategories();
	}, [hasToken]);

	useEffect(() => {
		const fetchData = async () => {
			const url = `http://localhost:8000/api/blogs/${params.id}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			setBlog(res.data.blog);
		};

		fetchData();
	}, [params.id, hasToken]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = `http://localhost:8000/api/blogs/${params.id}`;

		try {
			const res = await axios.patch(url, blog, {
				headers: { Authorization: `Bearer ${hasToken}` },
			});

			if (res.data) {
				swalToast("success", `${res.data.message}`, 358);
				navigate(-1, { flushSync: true });
			}
		} catch (error) {
			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}
		}
	};

	return (
		<AuthLayout>
			<div className="grid justify-center">
				<h1 className="font-bold text-6xl mt-10 mb-7 text-center">Edit Blog</h1>

				<div className="motion-preset-blur-up-md">
					<form
						onSubmit={handleSubmit}
						className="bg-white/20 p-5 backdrop-blur-lg rounded-lg w-full mb-9"
					>
						<label htmlFor="">Author :</label>
						<select
							className="block w-130 rounded-md my-2 p-2 focus:outline-0 text-zinc-800 bg-white/50"
							name="user_id"
							defaultValue={blog.user_id}
							onChange={(e) => {
								const userValue = e.target.value;

								setBlog((prev) => {
									return { ...prev, [e.target.name]: userValue };
								});
							}}
							disabled
						>
							<option key={blog.user_id} defaultValue={blog.user_id}>
								{blog?.user?.name}
							</option>
						</select>

						<label htmlFor="">Category :</label>
						<select
							className="bg-white block w-130 rounded-md my-2 p-2 focus:outline-0 text-zinc-800"
							name="category_id"
							defaultValue={blog.category_id}
							onChange={(e) => {
								const categoryValue = e.target.value;

								setBlog((prev) => {
									return { ...prev, [e.target.name]: categoryValue };
								});
							}}
						>
							{categorySelect.map((category) => {
								return (
									<option key={category.value} value={category.value}>
										{category.key}
									</option>
								);
							})}
						</select>
						{validationError.category_id && (
							<span className="text-red-600 block">
								{validationError.category_id}
							</span>
						)}

						<label htmlFor="">Title :</label>
						<input
							type="text"
							name="title"
							defaultValue={blog.title}
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							placeholder="Judul . . ."
							onKeyUp={(e) => {
								setBlog((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>
						{validationError.title && (
							<span className="text-red-600 block">
								{validationError.title}
							</span>
						)}

						<label htmlFor="">Slug :</label>
						<input
							type="text"
							name="slug"
							defaultValue={blog.slug}
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							placeholder="singkat judul . . ."
							onKeyUp={(e) => {
								setBlog((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>

						<label htmlFor="">Description :</label>
						<textarea
							name="description"
							defaultValue={blog.description}
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							placeholder="Silahkan Ceritakan Keluh-Kesah Hidupmu Di Kolom Ini . . ."
							onKeyUp={(e) => {
								setBlog((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						></textarea>
						{validationError.description && (
							<span className="text-red-600 block">
								{validationError.description}
							</span>
						)}

						<label htmlFor="">Release Date :</label>
						<input
							type="date"
							name="release"
							defaultValue={blog.release}
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							onChange={(e) => {
								const dateValue = e.target.value;

								setBlog((prev) => {
									return { ...prev, [e.target.name]: dateValue };
								});
							}}
						/>
						{validationError.release && (
							<span className="text-red-600 block">
								{validationError.release}
							</span>
						)}

						<button className="mx-auto w-full mt-5 text-2xl uppercase bg-pink-600 p-2 rounded-lg text-white font-bold font-montserrat tracking-wide shadow-md/15 hover:bg-pink-700">
							Submit
						</button>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};
