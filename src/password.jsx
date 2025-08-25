import React, { useState, useEffect, useCallback } from "react";

const PasswordGeneratorMain = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    width: "0%",
    color: "#9CA3AF",
    label: "Select options",
  });
  const [copied, setCopied] = useState(false);

  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}|:<>?-=[];,./";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";

  const generatePassword = useCallback(() => {
    let characters = "";
    let newPassword = "";

    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    if (includeUppercase) characters += uppercase; 
    if (includeLowercase) characters += lowercase;

    if (characters.length === 0) {
      setStrength({
        width: "0%",
        color: "#9CA3AF",
        label: "Select options",
      });
      return "";
    }

    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    updateStrengthIndicator(newPassword);
    return newPassword;
  }, [length, includeNumbers, includeSymbols, includeUppercase, includeLowercase]);

  const updateStrengthIndicator = (pw) => {
    let score = 0;

    if (/[0-9]/.test(pw)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[a-z]/.test(pw)) score += 1;

    if (pw.length >= 16) score += 2;
    else if (pw.length >= 12) score += 1;

    const width = (score / 6) * 100;
    let color = "#9CA3AF";
    let label = "";

    if (width < 40) {
      color = "#EF4444";
      label = "Weak";
    } else if (width < 70) {
      color = "#F59E0B";
      label = "Medium";
    } else {
      color = "#10B981";
      label = "Strong";
    }

    setStrength({
      width: `${width}%`,
      color,
      label: `Strength: ${label}`,
    });
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    setPassword(generatePassword());
  }, [generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Secure Password Generator1234</h1>
          <p className="text-gray-400">Create strong, random passwords instantly</p>
        </div>

        {/* Password display */}
        <div className="mb-6">
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              className="w-full bg-transparent px-4 py-3 text-white font-mono outline-none"
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-colors duration-200"
            >
              Copy
            </button>
          </div>
          <div className="h-4 mt-2">
            {copied && <p className="text-sm text-green-500 text-right">Copied to clipboard!</p>}
          </div>
        </div>

        {/* Length slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">Length: {length}</span>
            <span className="text-sm font-medium" style={{ color: strength.color }}>
              {strength.label}
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
         <label className="flex items-center justify-between bg-gray-700 rounded-lg p-3 cursor-pointer">
  <span className="text-gray-300">Numbers</span>
  <div className="relative">
    <input
      type="checkbox"
      checked={includeNumbers}
      onChange={() => setIncludeNumbers(!includeNumbers)}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-full"></div>
  </div>
</label>


          <label className="flex items-center justify-between bg-gray-700 rounded-lg p-3 cursor-pointer">
            <span className="text-gray-300">Symbols</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
            </div>
          </label>

          <label className="flex items-center justify-between bg-gray-700 rounded-lg p-3 cursor-pointer">
            <span className="text-gray-300">Uppercase</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
            </div>
          </label>

          <label className="flex items-center justify-between bg-gray-700 rounded-lg p-3 cursor-pointer">
            <span className="text-gray-300">Lowercase</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorMain;































