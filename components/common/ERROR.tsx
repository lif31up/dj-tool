export default ERROR;

interface ErrorProps {
  ERROR: string;
} // ErrorProps

function ERROR({ ERROR }: ErrorProps) {
  if (ERROR === "ERROR_NONE") return <></>;
  return <div></div>;
} // ErrorProps
