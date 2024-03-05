import "./StrengthBar.css";

const StrengthBar = ({ barCompleted, color }) => {
  return (
    <div
      className={
        barCompleted ? "mx-1 strength-bar " + color : "mx-1 strength-bar"
      }
    ></div>
  );
};

export default StrengthBar;
