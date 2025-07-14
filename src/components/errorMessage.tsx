interface ErrorMessageProps {
  error: string | undefined;
}

export default function ErrorMessage({ error = "" }: ErrorMessageProps) {
  return (
    <div>{error && <span className="text-red-500 text-sm">{error}</span>}</div>
  );
}
