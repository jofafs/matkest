import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost/MathQuest/backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully!',
          showConfirmButton: false,
          timer: 2000
        });
        setMessage('Registration successful! You can now login.');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: data.message || 'Something went wrong.'
        });
        setMessage(data.message);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'Server error. Please try again later.'
      });
      setMessage('Registration failed. Server error.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          required
          onChange={e => setFirstName(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          required
          onChange={e => setLastName(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: 10 }}>Register</button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default Register;
