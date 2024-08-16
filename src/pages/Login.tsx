import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useStore } from '../stores/login';
import Loader from '../components/Loader';

// Validación de credenciales
const validateCredentials = (username: string, password: string) => {
  const usernamePattern = /^[a-z]+$/;
  const expectedPassword = `123${username}`;

  if (!usernamePattern.test(username)) {
    return 'El nombre de usuario debe estar en minúsculas y no contener números ni caracteres especiales.';
  }

  if (password !== expectedPassword) {
    return 'La contraseña debe tener el formato "123<Usuario>".';
  }

  return null;
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername: setStoreUsername } = useStore(); // Usar Zustand para obtener y actualizar el estado

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Validación de credenciales
    const validationError = validateCredentials(username, password);
    if (validationError) {
      if (validationError.includes('usuario')) {
        setUsernameError(validationError);
        setPasswordError(null);
      } else {
        setPasswordError(validationError);
        setUsernameError(null);
      }
      setLoading(false);
      return;
    }

    // Actualiza el estado de autenticación y almacena en localStorage
    setIsLoggedIn(true);
    setStoreUsername(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    navigate('/home');
    setLoading(false);
  };

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
          {usernameError && (
            <div className="text-red-600 text-sm mb-2">{usernameError}</div>
          )}
          {passwordError && (
            <div className="text-red-600 text-sm mb-4">{passwordError}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-800"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
