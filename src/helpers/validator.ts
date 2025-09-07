const validateContactForm = (body: {name: string, email: string, message: string}) => {
    const { name, email, message } = body;
  
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return { valid: false, error: 'Name is required and should be a empty.' };
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return { valid: false, error: 'A valid email address is required.' };
    }
  
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return { valid: false, error: 'Message is required and should be a empty.' };
    }
  
    return { valid: true };
};

export { validateContactForm }