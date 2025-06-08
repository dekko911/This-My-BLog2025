import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../../layouts/auth";
import { swalToast } from "../../lib/sweet-alert";

export const CreateBlogsPage = () => {
	const hasToken = Cookies.get("token");
	const hasId = Cookies.get("id");
	const hasName = Cookies.get("name");

	const navigate = useNavigate();

	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);
	// const [userSelect, setUserSelect] = useState([]);
	const [categorySelect, setCategorySelect] = useState([]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			const url = "http://localhost:8000/api/blogs";

			const formData = new FormData();

			form.user_id && formData.append("user_id", form.user_id);
			form.category_id && formData.append("category_id", form.category_id);
			form.title && formData.append("title", form.title);
			form.slug && formData.append("slug", form.slug);
			form.description && formData.append("description", form.description);
			form.release && formData.append("release", form.release);
			form.photo && formData.append("photo", form.photo);

			try {
				const res = await axios.post(url, formData, {
					headers: { Authorization: `Bearer ${hasToken}` },
				});

				if (res.data) {
					swalToast("success", `${res.data.message}`, 360);
					navigate("/blogs");
				}
			} catch (error) {
				if (error.response.data.line === 817) {
					swalToast("error", "Duplicate Data Blog !", 320);
				}

				if (error.status === 422) {
					setValidationError(error.response.data.errors);
				}
			}
		},
		[
			form.category_id,
			form.description,
			form.photo,
			form.release,
			form.slug,
			form.title,
			form.user_id,
			hasToken,
			navigate,
		]
	);

	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		const url = "http://localhost:8000/api/user";
	// 		const res = await axios.get(url, {
	// 			headers: { Authorization: `Bearer ${hasToken}` },
	// 		});

	// 		const results = [];
	// 		res.data.users.forEach((data) => {
	// 			results.push({
	// 				key: data.name,
	// 				value: data.id,
	// 			});
	// 		});

	// 		setUserSelect(
	// 			[{ key: "Select a User", value: "" }, ...results].filter(
	// 				(user) => user.value !== 1 //skip id no 1 || show only id no 1 if operator === like this
	// 			)
	// 		);
	// 	};

	// 	fetchUsers();
	// }, [hasToken]);

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

	return (
		<AuthLayout>
			<div className="grid justify-center">
				<h1 className="font-bold text-6xl mt-10 mb-7 text-center">
					Create Blog
				</h1>

				<div className="motion-preset-blur-up-md">
					<form
						onSubmit={handleSubmit}
						className="bg-white/20 p-5 backdrop-blur-lg rounded-lg w-full mb-9"
					>
						<label htmlFor="">Author :</label>
						<select
							className="block w-130 rounded-md my-2 p-2 focus:outline-0 text-zinc-800 bg-white/50"
							name="user_id"
							defaultValue={hasId}
							onChange={(e) => {
								const userValue = e.target.value;

								setForm((prev) => {
									return { ...prev, [e.target.name]: userValue };
								});
							}}
							disabled
						>
							<option key={hasId} value={hasId}>
								{hasName}
							</option>
						</select>

						<label htmlFor="">Category :</label>
						<select
							className="bg-white block w-130 rounded-md my-2 p-2 focus:outline-0 text-zinc-800"
							name="category_id"
							onChange={(e) => {
								const categoryValue = e.target.value;

								setForm((prev) => {
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
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							placeholder="Judul . . ."
							onKeyUp={(e) => {
								setForm((prev) => {
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
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							placeholder="singkat-judul-padat"
							onKeyUp={(e) => {
								setForm((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>
						{validationError.slug && (
							<span className="text-red-600 block">{validationError.slug}</span>
						)}

						<label htmlFor="">Description :</label>
						<textarea
							name="description"
							contentEditable="true"
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							placeholder="Silahkan Ceritakan Keluh-Kesah Hidupmu Di Kolom Ini . . ."
							onKeyUp={(e) => {
								setForm((prev) => {
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
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
							onChange={(e) => {
								const dateValue = e.target.value;

								setForm((prev) => {
									return { ...prev, [e.target.name]: dateValue };
								});
							}}
						/>
						{validationError.release && (
							<span className="text-red-600 block">
								{validationError.release}
							</span>
						)}

						<label htmlFor="">Photo :</label>
						<input
							type="file"
							name="photo"
							onChange={(e) => {
								const file = e.target.files[0];

								setForm((prev) => {
									return { ...prev, [e.target.name]: file };
								});
							}}
							className="w-130 cursor-pointer bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
						/>
						{validationError.photo && (
							<span className="text-red-600 block">
								{validationError.photo}
							</span>
						)}

						<button className="w-full mt-5 text-2xl uppercase bg-pink-600 p-2 rounded-lg text-white font-bold cursor-pointer font-montserrat tracking-wide shadow-md/15 hover:bg-pink-700">
							Submit
						</button>
						<button
							className="bg-zinc-600 rounded-lg w-full hover:bg-zinc-700 shadow-md/15 cursor-pointer text-white mt-3.5 p-2 font-bold text-2xl uppercase font-montserrat"
							type="reset"
						>
							Reset
						</button>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};
