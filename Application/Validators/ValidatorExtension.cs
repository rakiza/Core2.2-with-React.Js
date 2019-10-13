using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<T, string> PasswordValidator<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                            .NotEmpty()
                            .MinimumLength(6).WithMessage("Password must be at least 6 caracters!")
                            .Matches("[A-Z]").WithMessage("Password must contain one uppercase caracter!")
                            .Matches("[a-z]").WithMessage("Password must contain one lowercase caracter!")
                            .Matches("[0-9]").WithMessage("Password must contain a number!")
                            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non alphanumeric!");

            return options;
        }
    }
}