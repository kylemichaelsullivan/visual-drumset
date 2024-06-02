function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className='Footer flex flex-nowrap justify-center gap-1 border-t border-b border-black font-bold w-full p-4'>
			<span>&copy;</span>
			<span>{year}</span>
			<a href='/' title='Visual Drumset'>
				Visual Drumset
			</a>
		</footer>
	);
}

export default Footer;
