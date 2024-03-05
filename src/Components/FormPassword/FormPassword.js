/* eslint-disable react-hooks/exhaustive-deps */
import "./FormPassword.css";
import { HeroSlider } from "./styled";
import { useState, useEffect } from "react";
import StrengthBar from "../StrengthBar/StrengthBar";

const FormPassword = ({ setGeneratedPassword }) => {
  const [charLength, setCharLength] = useState(0);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({});

  const checkPasswordStrength = () => {
    let passwordStrengthValidator = 0;
    if (includeUppercase) {
      passwordStrengthValidator++;
    }
    if (includeLowercase) {
      passwordStrengthValidator++;
    }
    if (includeNumbers) {
      passwordStrengthValidator++;
    }
    if (includeSymbols) {
      passwordStrengthValidator++;
    }
    if (charLength > 8) {
      passwordStrengthValidator++;
    }
    let aux = passwordStrengthValidator;
    let powerArray = [];
    while (aux && powerArray.length < 4) {
      powerArray.push(1);
      aux--;
    }
    while (powerArray.length < 4) {
      powerArray.push(0);
    }
    if (passwordStrengthValidator < 3) {
      setPasswordStrength({
        power: "Weak",
        color: "danger",
        bars: powerArray,
      });
    } else if (passwordStrengthValidator < 4) {
      setPasswordStrength({
        power: "Medium",
        color: "warning",
        bars: powerArray,
      });
    } else {
      setPasswordStrength({
        power: "Strong",
        color: "success",
        bars: powerArray,
      });
    }
  }

  const generatePassword = () => {
    if (
      charLength > 0 &&
      (includeLowercase || includeNumbers || includeSymbols || includeUppercase)
    ) {
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./";

      let charPool = "";
      if (includeUppercase) charPool += uppercaseChars;
      if (includeLowercase) charPool += lowercaseChars;
      if (includeNumbers) charPool += numberChars;
      if (includeSymbols) charPool += symbolChars;

      let password = "";
      for (let i = 0; i < charLength; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool.charAt(randomIndex);
      }

      if (
        (includeUppercase && !/[A-Z]/.test(password)) ||
        (includeLowercase && !/[a-z]/.test(password)) ||
        (includeNumbers && !/\d/.test(password)) ||
        (includeSymbols &&
          !/[!@#$%^&*()_+{}|:"<>?=\-[\]\\';,./]/.test(password))
      ) {
        return generatePassword();
      }

      setGeneratedPassword(password);
    }
  };

  useEffect(() => {
    checkPasswordStrength();
  }, [
    charLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  return (
    <div className="pg-container-item form-password p-4 d-flex flex-column">
      <div className="char-length w-100">
        <div className="text mb-3 d-flex justify-content-between align-items-center w-100">
          <span className="desc">Character Length</span>
          <span className="length">{charLength}</span>
        </div>
        <HeroSlider
          aria-label="Volume"
          value={charLength}
          min={0}
          max={25}
          onChange={(e) => setCharLength(e.target.value)}
        />
      </div>
      <div className="checkbox-group mt-3">
        <div className="mb-3">
          <input
            onClick={() => setIncludeUppercase(!includeUppercase)}
            value={includeUppercase}
            className="me-4"
            type="checkbox"
          />
          <span>Include Uppercase Letters</span>
        </div>
        <div className="mb-3">
          <input
            onClick={() => setIncludeLowercase(!includeLowercase)}
            value={includeLowercase}
            className="me-4"
            type="checkbox"
          />
          <span>Include Lowercase Letters</span>
        </div>
        <div className="mb-3">
          <input
            onClick={() => setIncludeNumbers(!includeNumbers)}
            value={includeNumbers}
            className="me-4"
            type="checkbox"
          />
          <span>Include Numbers</span>
        </div>
        <div>
          <input
            onClick={() => setIncludeSymbols(!includeSymbols)}
            value={includeSymbols}
            className="me-4"
            type="checkbox"
          />
          <span>Include Symbols</span>
        </div>
      </div>

      <div className="password-strength-container d-flex justify-content-between align-items-center mt-3 px-4 py-4">
        <span className="password-strength-title">Strength</span>
        <div className="d-flex align-items-center">
          <span className="me-2 password-strength-text">
            {passwordStrength.power}
          </span>
          <div className="d-flex justify-content-center align-items-center">
            {passwordStrength.bars &&
              passwordStrength.bars.map((el, index) => (
                <StrengthBar
                  key={index}
                  barCompleted={el}
                  color={passwordStrength.color}
                />
              ))}
          </div>
        </div>
      </div>

      <button
        onClick={generatePassword}
        className={
          charLength > 0 &&
          (includeLowercase ||
            includeNumbers ||
            includeSymbols ||
            includeUppercase)
            ? "generate-btn mt-5 mb-3"
            : "generate-btn mt-5 mb-3 disabled"
        }
      >
        Generate
      </button>
    </div>
  );
};

export default FormPassword;
