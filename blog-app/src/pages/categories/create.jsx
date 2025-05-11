import { useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/auth";
import axios from "axios";

export const CreateCategoryPage = () => {
	const [form, setForm] = useState({});
	const [validationError, setValidationError] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = "http://localhost:8000/api/categories";

		const formData = new FormData();

		form.name && formData.append("name", form.name);

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
							className="block bg-white text-black px-3 w-full rounded-lg py-1 mt-1 focus:outline-0"
							placeholder="Ketik Kategori Yang Anda Inginkan . . ."
							onKeyUp={(e) => {
								setForm((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								});
							}}
						/>
						{validationError.name && (
							<span className="text-red-600">{validationError.name}</span>
						)}

						<button className="bg-pink-600 rounded-lg hover:bg-pink-700 duration-300 cursor-pointer text-white w-full mt-5 py-3 font-bold text-2xl">
							Submit
						</button>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};
