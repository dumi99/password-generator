import DisplayPassword from "../DisplayPassword/DisplayPassword";
import FormPassword from "../FormPassword/FormPassword";
import "./PasswordGenerator.css";
import { useState } from "react";

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState(
    "Hahaha sunt pe redux"
  );
  return (
    <div className="pg-container">
      <h1>Password generator</h1>
      <DisplayPassword generatedPassword={generatedPassword} />
      <FormPassword setGeneratedPassword={setGeneratedPassword} />
    </div>
  );
};

export default PasswordGenerator;
