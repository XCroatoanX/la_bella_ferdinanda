package com.example.backend.services;

import java.util.Arrays;
import java.util.regex.Pattern;

import org.passay.DefaultPasswordValidator;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.ValidationResult;
import org.passay.data.EnglishCharacterData;
import org.passay.rule.CharacterRule;
import org.passay.rule.LengthRule;
import org.passay.rule.WhitespaceRule;
import org.springframework.stereotype.Service;

@Service
public class CredentialValidator {
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[A-Za-z0-9._-]{8,30}$");
    private static final PasswordValidator PASSWORD_VALIDATOR = new DefaultPasswordValidator(Arrays.asList(
            new LengthRule(8, 30),
            new CharacterRule(EnglishCharacterData.Digit, 1),
            new CharacterRule(EnglishCharacterData.LowerCase, 1),
            new CharacterRule(EnglishCharacterData.UpperCase, 1),
            new CharacterRule(EnglishCharacterData.Special, 1),
            new WhitespaceRule()));

    public boolean isValidPassword(String password) {
        ValidationResult result = PASSWORD_VALIDATOR.validate(new PasswordData(password));
        return result.isValid();
    }

    public boolean isValidUsername(String username) {
        return username != null && USERNAME_PATTERN.matcher(username).matches();
    }
}
