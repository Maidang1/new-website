interface YearProps {
	text: string;
	className?: string;
}
export const Text = (props: YearProps) => {
	const { text, className } = props;

	return (
		<span
			className={`text-[8em] font-bold font-mono -top-0.2em -left-0.3em color-transparent text-stroke-2 text-stroke-hex-aaa absolute ${className}`}
		>
			{text}
		</span>
	);
};
