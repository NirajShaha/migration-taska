package com.automotive.validator;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

/**
 * Validates field formats from COBOL screen HA003U
 */
public class FieldValidator {

    private static final Pattern HEX_PATTERN = Pattern.compile("^[A-Fa-f0-9]+$");
    private static final Pattern NUMERIC_PATTERN = Pattern.compile("^\\d+$");
    private static final Pattern NNNN_PATTERN = Pattern.compile("^\\d{4}$");
    private static final Pattern NTN_PATTERN = Pattern.compile("^\\d[A-Z0-9]\\d$");
    private static final Pattern NCN_PATTERN = Pattern.compile("^[A-Z0-9]\\d[A-Z0-9]$");
    private static final Pattern NSESX_PATTERN = Pattern.compile("^[0-9SNE][SE0-9][S0-9]*$");

    private static final LocalDate DATE_2004_03_01 = LocalDate.of(2004, 3, 1);

    public static boolean validatePosition(String value) {
        // Position: no commas, max 21 chars
        if (value == null || value.isEmpty()) {
            return true;
        }
        if (value.contains(",")) {
            return false;
        }
        return value.length() <= 21;
    }

    public static boolean validateInterconnection(String value) {
        // Interconnection: no commas, max 40 chars
        if (value == null || value.isEmpty()) {
            return true;
        }
        if (value.contains(",")) {
            return false;
        }
        return value.length() <= 40;
    }

    public static boolean validateWheelbase(String value) {
        // Wheelbase: H format or NNNN
        if (value == null || value.isEmpty()) {
            return true;
        }
        if (value.equalsIgnoreCase("H")) {
            return true;
        }
        return NNNN_PATTERN.matcher(value).matches();
    }

    public static boolean validateAxleWheel(String value) {
        // Axle Wheel: NTN format
        if (value == null || value.isEmpty()) {
            return true;
        }
        return NTN_PATTERN.matcher(value).matches();
    }

    public static boolean validatePosWheelOrSteerAxle(String value) {
        // Position Wheel / Steer Axle: C or NCN format
        if (value == null || value.isEmpty()) {
            return true;
        }
        if (value.equalsIgnoreCase("C")) {
            return true;
        }
        return NCN_PATTERN.matcher(value).matches();
    }

    public static boolean validateSmallSeriesTypApp(String value) {
        // Small Series Typ App: /Y or /N
        if (value == null || value.isEmpty()) {
            return true;
        }
        return value.equalsIgnoreCase("/Y") || value.equalsIgnoreCase("/N");
    }

    public static boolean validateUbDoors(String value) {
        // UB Doors (Landrover/Japan): NSESX format
        if (value == null || value.isEmpty()) {
            return true;
        }
        return NSESX_PATTERN.matcher(value).matches();
    }

    public static boolean validateClass(String value) {
        // Class: I, II, III, A, B
        if (value == null || value.isEmpty()) {
            return true;
        }
        String normalized = value.trim().toUpperCase();
        return normalized.equals("I") || normalized.equals("II") || normalized.equals("III") 
            || normalized.equals("A") || normalized.equals("B");
    }

    public static boolean validateTrack(String value, LocalDate startDate) {
        // Complex track validation with date-based rules
        if (value == null || value.isEmpty()) {
            return true;
        }

        // Try multiple formats
        if (NNNN_PATTERN.matcher(value).matches()) {
            return true;
        }
        if (validatePattern(value, "NNNNHNNNN") || 
            validatePattern(value, "NNNNTNNNN") ||
            validatePattern(value, "NNNNHSTSNNNNHNNNN") ||
            validatePattern(value, "NNNNSSSSSSTSNNNNHNNNN")) {
            return true;
        }

        // Pre-2004-03-01 specific patterns
        if (startDate != null && startDate.isBefore(DATE_2004_03_01)) {
            if (validatePattern(value, "NNNNHNNNN") || 
                validatePattern(value, "NNNNSSSSSSTSNNNN") ||
                validatePattern(value, "NNNNHNNNN")) {
                return true;
            }
        }

        // Post-2004-03-01 patterns
        if (startDate != null && startDate.isAfter(DATE_2004_03_01.minusDays(1))) {
            if (validatePattern(value, "NNNNTSNNNN") || 
                validatePattern(value, "NNNNTNNNNTNNNN")) {
                return true;
            }
        }

        return false;
    }

    public static boolean validateHeight(String value, LocalDate startDate) {
        // Height: date-based validation
        if (value == null || value.isEmpty()) {
            return true;
        }

        if (NNNN_PATTERN.matcher(value).matches()) {
            return true;
        }
        if (validatePattern(value, "NNNNHNNNN")) {
            return true;
        }

        // Pre-2004-03-01
        if (startDate != null && startDate.isBefore(DATE_2004_03_01)) {
            if (validatePattern(value, "NNNNTNNNN")) {
                return true;
            }
        }

        return false;
    }

    public static boolean validateLength(String value) {
        // Length: NNNN or NNNNHNNNN
        if (value == null || value.isEmpty()) {
            return true;
        }

        if (NNNN_PATTERN.matcher(value).matches()) {
            return true;
        }
        return validatePattern(value, "NNNNHNNNN");
    }

    public static boolean validateWidth(String value) {
        // Width: NNNN or NNNNHNNNN
        if (value == null || value.isEmpty()) {
            return true;
        }

        if (NNNN_PATTERN.matcher(value).matches()) {
            return true;
        }
        return validatePattern(value, "NNNNHNNNN");
    }

    public static boolean validateOverhang(String value, String manufCode) {
        // Overhang: Multiple formats (some Landrover-specific)
        if (value == null || value.isEmpty()) {
            return true;
        }

        if (NNNN_PATTERN.matcher(value).matches() ||
            validatePattern(value, "NN") ||
            validatePattern(value, "NNN") ||
            validatePattern(value, "SNNN") ||
            validatePattern(value, "SSNN") ||
            validatePattern(value, "SSSN") ||
            validatePattern(value, "NNNNHNNNN") ||
            validatePattern(value, "NNNNTNNNN")) {
            return true;
        }

        // Landrover-specific format
        if (manufCode != null && manufCode.equals("L")) {
            if (validatePattern(value, "NNNHNNNN")) {
                return true;
            }
        }

        return false;
    }

    public static boolean validateLengthWithTowbar(String value) {
        // Length with towbar: N, NN, NNN, NNNN, NNNNHNNNN, NNNNTNNNN
        if (value == null || value.isEmpty()) {
            return true;
        }

        if (value.matches("^\\d{1,4}$") ||
            validatePattern(value, "NNNNHNNNN") ||
            validatePattern(value, "NNNNTNNNN")) {
            return true;
        }

        return false;
    }

    /**
     * Helper to validate pattern where:
     * N = digit, H/T/S = separators
     */
    private static boolean validatePattern(String value, String pattern) {
        if (value.length() != pattern.length()) {
            return false;
        }

        for (int i = 0; i < pattern.length(); i++) {
            char p = pattern.charAt(i);
            char v = value.charAt(i);

            if (p == 'N') {
                if (!Character.isDigit(v)) {
                    return false;
                }
            } else if (p == 'S') {
                if (!Character.isLetter(v) && !Character.isDigit(v)) {
                    return false;
                }
            } else {
                // H, T, -, / etc are separators
                if (v != p) {
                    return false;
                }
            }
        }
        return true;
    }
}
