interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading = ({
  message = "Loading...",
  fullScreen = true,
}: LoadingProps) => {
  return (
    <div
      className={
        fullScreen
          ? "flex min-h-[220px] w-full items-center justify-center bg-slate-950/95"
          : "flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-10"
      }
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex flex-row gap-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:.2s]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:.4s]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:.6s]"></div>
        </div>
        <p className="text-sm font-medium text-slate-300">{message}</p>
      </div>
    </div>
  );
};
