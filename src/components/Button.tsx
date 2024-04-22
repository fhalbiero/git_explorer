type ButtonProps = {
    text: React.ReactNode;
    onClick: (() => void) | ((e: any) => Promise<void>);
};

export function Button({ text, onClick }: ButtonProps) {
  return (
    <button
        className="text-bold text-sky-400 border-2 border-sky-400 rounded-md px-8 py-2 text-center hover:bg-sky-400 hover:text-zinc-800"
        onClick={onClick}
    >
        {text}
    </button>
  );
}