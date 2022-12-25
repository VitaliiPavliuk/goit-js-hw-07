import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const markup = galleryItems
	.map(
		item =>
			`<div class="gallery__item">
                <a class="gallery__link" href="${item.original}">
                    <img
                        class="gallery__image"
                        src="${item.preview}"
                        data-source="${item.original}"
                        alt="${item.description}"
                    />
                </a>
            </div>`,
	)
	.join("");

gallery.insertAdjacentHTML("beforeend", markup);

const onClickGalleryItem = event => {
	event.preventDefault();

	if (event.target.nodeName !== "IMG") {
		return;
	}

	const instance = basicLightbox.create(
		`
    <img src="${event.target.dataset.source}" width="800" height="600">
    `,
		{
			onClose: () => {
				document.removeEventListener("keydown", onEscape);
			},
		},
	);
	instance.show();

	const onEscape = event => {
		if (event.code === "Escape") {
			instance.close();
		}
	};

	document.addEventListener("keydown", onEscape);
};

gallery.addEventListener("click", onClickGalleryItem);
