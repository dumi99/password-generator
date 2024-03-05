import "./DisplayPassword.css";
import Tooltip from "@mui/material/Tooltip";

const DisplayPassword = ({ generatedPassword }) => {
  return (
    <div className="pg-container-item p-4 d-flex justify-content-between align-items-center">
      <span className="password-generated">{generatedPassword}</span>
      <Tooltip title="Copy to clipboard">
        <span
          onClick={() => navigator.clipboard.writeText(generatedPassword)}
          className="material-symbols-outlined"
        >
          content_copy
        </span>
      </Tooltip>
    </div>
  );
};

export default DisplayPassword;
