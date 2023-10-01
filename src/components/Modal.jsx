const Modal = () => {
	return (
		<div className="modal">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="white"
				className="modal-close"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
			<h2 className="modal-heading">Fire Info:</h2>
			<div className="modal-body">
				<p>
					<span>Loctation:</span> Houston, Texas
				</p>
				<p>
					<span>Since:</span> September 26
				</p>
				<p>
					<span>Coordinates:</span> (29.883697, -95.009037)
				</p>
				<p>
					<span>Distance:</span> 5 KM
				</p>
			</div>
		</div>
	);
};

export default Modal;
