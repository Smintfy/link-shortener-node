const validationError = (error) => {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });

    return errors;
};

export default validationError;
