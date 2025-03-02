const Validation = (user) => {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!email_pattern.test(user.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!user.password.trim()) {
      errors.password = "Password is required";
    } else if (!password_pattern.test(user.password)) {
      errors.password = "Password must contain at least 8 characters, including one letter and one number";
    }
  
    return errors;
  };
  
  export default Validation;
  