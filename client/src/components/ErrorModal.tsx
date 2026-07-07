interface Props {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const ErrorModal = ({ error, setError }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl">
        <h3 className="mb-3 text-xl font-semibold text-red-400">Error</h3>

        <p className="text-slate-300">{error}</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setError("")}
            className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
