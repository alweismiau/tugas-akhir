const Validation = (user) => {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    // Validasi Nama
    if (!user.name.trim()) {
      errors.name = "Full name is required";
    } else if (user.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
  
    // Validasi Email
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!email_pattern.test(user.email)) {
      errors.email = "Invalid email format";
    }
  
    // Validasi Password
    if (!user.password.trim()) {
      errors.password = "Password is required";
    } else if (!password_pattern.test(user.password)) {
      errors.password = "Password must contain at least 8 characters, including one letter and one number";
    }
  
    return errors;
  };
  
  export default Validation;
  