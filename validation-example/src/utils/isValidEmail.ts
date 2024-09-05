import { OperationHandlerInputValidationConditionConfiguration } from "@trayio/cdk-dsl/connector/operation/OperationHandlerValidation";

type hasEmail = {
    email: string;
};

/**
 * A custom validation function to validate the email format.
 * This function can be reused across multiple operations.
 * We use the generic type T because the type of input can vary between operations.
 * All we care about is that the input has an email property, so we enforce this by extending the hasEmail type.
 */
export function isValidEmail<T extends hasEmail>(validation: OperationHandlerInputValidationConditionConfiguration<any, T>) {
    return validation
        .condition((ctx, input) => {
            if (!input.email) return false;
            // Define the regex for email validation
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

            // Check if the email is defined and not too long
            if (!input.email || input.email.length > 254) return false;

            // Use a single regex check for the standard email parts
            if (!emailRegex.test(input.email)) return false;

            // Split once and perform length checks on the parts
            const parts = input.email.split("@");
            if (parts[0].length > 64) return false;

            // Perform length checks on domain parts
            const domainParts = parts[1].split(".");
            if (domainParts.some(part => part.length > 63)) return false;

            // If all checks pass, the email is valid
            return true;
        })
        .errorMessage((ctx, input) => 'Email is not valid is not in a valid format');
}
