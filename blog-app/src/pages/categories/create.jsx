import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthLayout } from "../../layouts/auth";

export const CreateCategoryPage = () => {
	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = "http://localhost:8000/api/categories";

		const formData = new FormData();

		form.name && formData.append("name", form.name);
		form.slug && formData.append("slug", form.slug);

		try {
			const res = await axios.post(url, formData);

			//console.log(res.data);

			if (res.data) {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.onmouseenter = Swal.stopTimer;
						toast.onmouseleave = Swal.resumeTimer;
					},
					width: 390,
				});
				Toast.fire({
					icon: "success",
					title: `${res.data.message}`,
				});
			}
		} catch (error) {
			//console.error(error);

			if (error.response.data.line === 817) {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.onmouseenter = Swal.stopTimer;
						toast.onmouseleave = Swal.resumeTimer;
					},
				});
				Toast.fire({
					icon: "error",
					title: "Duplicate Data Blog !",
				});
			}

			if (error.status === 422) {
				setValidationError(error.response.data.errors);
			}
		}
	};

	useEffect(() => {
		console.log(form);
	}, [form]);

	return (
		<AuthLayout>
			<div className="grid gap-y-4 justify-center">
				<h1 className="text-center text-6xl font-extrabold text-shadow-md/10 mt-10">
					Create Category
				</h1>
				<div className="motion-preset-blur-up-md shadow-md/20 bg-white/20 backdrop-blur-lg mt-6 w-130 p-5 rounded-lg mb-5">
					<form onSubmit={handleSubmit}>
						<label htmlFor="" className="font-bold">
							Name :
						</label>
						<input
							type="text"
							name="name"
							className="block bg-white text-black px-3 w-full rounded-lg py-3 mt-1 focus:outline-0 mb-3"
							placeholder="Ketik Kategori Yang Anda Inginkan . . ."
							onKeyUp={(e) => {
								setForm((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>
						{validationError.name && (
							<span className="text-red-600 block">{validationError.name}</span>
						)}
						<label htmlFor="" className="font-bold">
							Slug :
						</label>
						<input
							type="text"
							name="slug"
							className="block bg-white text-black px-3 w-full rounded-lg py-3 mt-1 focus:outline-0"
							placeholder="Singkat & Padat . . ."
							onKeyUp={(e) => {
								setForm((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>
						{validationError.slug && (
							<span className="text-red-600">{validationError.slug}</span>
						)}

						<button className="bg-pink-600 rounded-lg hover:bg-pink-700 cursor-pointer text-white mt-5 py-3 font-bold text-2xl w-full shadow-sm/20">
							Submit
						</button>
						<button
							className="bg-zinc-600 rounded-lg w-full hover:bg-zinc-700 cursor-pointer text-white mt-3 py-3 font-bold text-2xl shadow-sm/20"
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
