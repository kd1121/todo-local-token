import CircularProgress from "@mui/material/CircularProgress";
import "../LoadingSpinner/LoadingSpinner.css"

function LoadingSpinner() {

  return (
    <div className="overlay">
      <CircularProgress />
    </div>
  );
}


export default LoadingSpinner;
