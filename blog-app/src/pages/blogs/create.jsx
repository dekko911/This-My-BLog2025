import axios from "axios";
import { useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/auth";

export const CreateBlogsPage = () => {
	const [form, setForm] = useState({});
	const [userSelect, setUserSelect] = useState([]);
	const [categorySelect, setCategorySelect] = useState([]);
	const [validationError, setValidationError] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = "http://localhost:8000/api/blogs";

		const formData = new FormData();

		form.user_id && formData.append("user_id", form.user_id);
		form.category_id && formData.append("category_id", form.category_id);
		form.title && formData.append("title", form.title);
		form.description && formData.append("description", form.description);
		form.release && formData.append("release", form.release);
		form.photo && formData.append("photo", form.photo);

		try {
			const res = await axios.post(url, formData);

			console.log(res.data);
		} catch (error) {
			//console.error(error);

			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}
		}
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const urlUsers = "http://localhost:8000/api/users";
			const res = await axios.get(urlUsers);

			const results = [];
			res.data.users.forEach((data) => {
				results.push({
					key: data.name,
					value: data.id,
				});
			});

			setUserSelect([{ key: "Select a User", value: "" }, ...results]);
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			const urlCategories = "http://localhost:8000/api/categories";
			const res = await axios.get(urlCategories);

			const results = [];
			res.data.categories.forEach((data) => {
				results.push({
					key: data.name,
					value: data.id,
				});
			});

			setCategorySelect([{ key: "Select a Category", value: "" }, ...results]);
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		console.log(form);
	}, [form]);

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
						<label htmlFor="">Edited By :</label>
						<select
							className="block w-130 rounded-md my-2 p-2 focus:outline-0 text-zinc-800 bg-white"
							name="user_id"
							onChange={(e) => {
								const userValue = e.target.value;

								setForm((prev) => {
									return { ...prev, [e.target.name]: userValue };
								});
							}}
						>
							{userSelect.map((user) => {
								return (
									<option key={user.value} value={user.value}>
										{user.key}
									</option>
								);
							})}
						</select>
						{validationError.user_id && (
							<span className="text-red-600 block">
								{validationError.user_id}
							</span>
						)}

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

						<label htmlFor="">Description :</label>
						<textarea
							name="description"
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
							className="w-130 bg-white rounded-md my-2 p-2 focus:outline-0 block text-zinc-800"
						/>
						{validationError.photo && (
							<span className="text-red-600 block">
								{validationError.photo}
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
