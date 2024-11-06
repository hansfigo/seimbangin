import { check } from "express-validator";

const validate = {
    register: [
        check("full_name").isString(),
        check("username").isString(),
        check("email").isEmail(),
        check("age").isNumeric(),
        check("password").isLength({ min: 3 }),
    ],
    login: [
        check("email").isEmail(),
        check("password").isLength({ min: 3 }),
    ],
    transaction: [
        check("type").isNumeric(),
        check("category").isString(),
        check("amount").isNumeric(),
        check("description").isString(),
    ],
}

export default validate;
