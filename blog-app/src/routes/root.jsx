import { BrowserRouter, Route, Routes } from "react-router";

import { AboutPage } from "../pages/about";

import { BlogDetail } from "../pages/[slug]/detail";
import { BlogPage } from "../pages/blog";
import { BlogsPage } from "../pages/blogs";
import { BlogDetails } from "../pages/blogs/[slug]/detail";
import { CreateBlogsPage } from "../pages/blogs/create";
import { EditBlogPage } from "../pages/blogs/edit";

import { CategoryPage } from "../pages/categories";
import { CreateCategoryPage } from "../pages/categories/create";

import { HomePage } from "../pages/home";

import { LoginPage } from "../pages/login";

import { Profile } from "../pages/profile";

import { UsersPage } from "../pages/users";
import { CreateUserPage } from "../pages/users/create";
import { EditUserPage } from "../pages/users/edit";

export const RootRoute = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />

				<Route path="/blog" element={<BlogPage />} />
				<Route path="/blogs" element={<BlogsPage />} />
				<Route path="/blogs/create" element={<CreateBlogsPage />} />
				<Route path="/detail/:slug" element={<BlogDetail />} />
				<Route path="/details/:slug" element={<BlogDetails />} />
				<Route path="/blogs/:id" element={<EditBlogPage />} />

				<Route path="/categories" element={<CategoryPage />} />
				<Route path="/categories/create" element={<CreateCategoryPage />} />

				<Route path="/login" element={<LoginPage />} />

				<Route path="/profile" element={<Profile />} />

				<Route path="/users" element={<UsersPage />} />
				<Route path="/users/create" element={<CreateUserPage />} />
				<Route path="/users/:id" element={<EditUserPage />} />
			</Routes>
		</BrowserRouter>
	);
};
