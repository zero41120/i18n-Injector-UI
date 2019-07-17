class UploadPreview {
	constructor(elem, index = 0) {
		this.elem = elem;
		this.lineHeight = 9;
		this.previewIndex = index;
	}
	get previewText() {
		return this.text;
	}

	set previewText(text) {
		this.text = text;
		this.elem.classList.add('js-preview-inject');
		this.makeSmallPic(text);
	}

	makeSmallPic(text) {
		let c = this.elem.getElementsByClassName('text-preview')[this.previewIndex];
		let width = this.elem.clientWidth;
		let height = this.elem.clientHeight;
		c.setAttribute('width', width);
		c.setAttribute('height', height);
		var ctx = c.getContext("2d");
		const lh = this.lineHeight;
		ctx.font = `${lh}px Arial`;
		const lines = ~~(height / lh);
		text
			.split('\n')
			.slice(0, lines)
			.forEach((e, i) =>
				ctx.fillText(e, 3, (i + 1) * lh)
			);
	}
}

UploadPreview.queue = [];

function upload1(event) {
	UploadPreview.queue = [];
	UploadPreview.queue.push(new UploadPreview(event.currentTarget));
	event.currentTarget.getElementsByTagName('input')[0].click();
}

function upload2(event) {
	UploadPreview.queue = [];
	UploadPreview.queue.push(new UploadPreview(event.currentTarget, 0));
	UploadPreview.queue.push(new UploadPreview(event.currentTarget, 1));
	UploadPreview.queue.push(new UploadPreview(event.currentTarget, 2));
	console.log(UploadPreview.queue);
	event.currentTarget.getElementsByTagName('input')[0].click();
}

function handleFiles(files){
	Array.from(files).forEach(file => {
		var reader = new FileReader();
		reader.onload = (myFile) => {
			if (UploadPreview.queue.length > 0)
				UploadPreview.queue.shift().previewText = myFile.currentTarget.result;
			console.log(UploadPreview.queue);
		};
		reader.readAsText(file);
	});
}