import Swal from "sweetalert2";

export const swalToast = (icon = "", title = "", width = 410) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
		width,
	});
	Toast.fire({
		icon,
		title,
	});
};

export const swalDialogConfirm = (title = "", text = "", icon = "") => {
	return Swal.fire({
		title,
		text,
		icon,
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes",
	});
};
