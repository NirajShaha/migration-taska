package com.automotive.validator;

import lombok.extern.slf4j.Slf4j;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

/**
 * Comprehensive field validation for WVTA HA003U screen
 * All validation rules extracted from COBOL source HA003U.txt
 */
@Slf4j
public class CoCFieldValidator {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final int POSITION_MAX_LENGTH = 21;
    private static final int INTERCONNECTION_MAX_LENGTH = 40;
    private static final String CHIP_DATA_DISABLED_FLAG = "Y";
    private static final LocalDate DATE_THRESHOLD = LocalDate.parse("2004-03-01");

    /**
     * Validates Position field (max 21 chars, no commas)
     * @param position Position field value
     * @param chipData CHIP data flag (Y/N)
     * @return ValidationResult
     */
    public static ValidationResult validatePosition(String position, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (position == null || position.isBlank()) {
            return ValidationResult.valid();
        }

        if (position.length() > POSITION_MAX_LENGTH) {
            return ValidationResult.invalid("Position must not exceed " + POSITION_MAX_LENGTH + " characters");
        }

        if (position.contains(",")) {
            return ValidationResult.invalid("Position field must not contain commas");
        }

        return ValidationResult.valid();
    }

    /**
     * Validates Interconnection field (max 40 chars, no commas)
     * @param interconnection Interconnection field value
     * @param chipData CHIP data flag
     * @return ValidationResult
     */
    public static ValidationResult validateInterconnection(String interconnection, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (interconnection == null || interconnection.isBlank()) {
            return ValidationResult.valid();
        }

        if (interconnection.length() > INTERCONNECTION_MAX_LENGTH) {
            return ValidationResult.invalid("Interconnection must not exceed " + INTERCONNECTION_MAX_LENGTH + " characters");
        }

        if (interconnection.contains(",")) {
            return ValidationResult.invalid("Interconnection field must not contain commas");
        }

        return ValidationResult.valid();
    }

    /**
     * Validates Wheelbase field
     * Format: 'H' (Hexadecimal) or 'NNNN' (4 digits)
     * @param wheelbase Wheelbase value
     * @param chipData CHIP data flag
     * @return ValidationResult
     */
    public static ValidationResult validateWheelbase(String wheelbase, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (wheelbase == null || wheelbase.isBlank()) {
            return ValidationResult.valid();
        }

        // Try Hex format first (H)
        if (wheelbase.length() == 1 && isHexadecimal(wheelbase)) {
            return ValidationResult.valid();
        }

        // Try 4-digit numeric format (NNNN)
        if (wheelbase.length() == 4 && isNumeric(wheelbase)) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Wheelbase must be either a hex character or 4 digits");
    }

    /**
     * Validates Axle/Wheel configuration
     * Format: 'H' (Hex) or 'NTN' (digit-letter-digit)
     * @param axleWheel Axle/wheel value
     * @param chipData CHIP data flag
     * @return ValidationResult
     */
    public static ValidationResult validateAxleWheel(String axleWheel, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (axleWheel == null || axleWheel.isBlank()) {
            return ValidationResult.valid();
        }

        // Try Hex format (H)
        if (axleWheel.length() == 1 && isHexadecimal(axleWheel)) {
            return ValidationResult.valid();
        }

        // Try NTN format (digit, letter/digit, digit)
        if (axleWheel.matches("^[0-9][A-Z0-9][0-9]$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Axle/Wheel must be hex character or NTN format (e.g., 2A1)");
    }

    /**
     * Validates Position Wheel (steering configuration)
     * Format: 'C' (single char) or 'NCN' (digit-char-digit)
     * @param posWheel Position wheel value
     * @param chipData CHIP data flag
     * @return ValidationResult
     */
    public static ValidationResult validatePosWheelOrSteerAxle(String posWheel, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (posWheel == null || posWheel.isBlank()) {
            return ValidationResult.valid();
        }

        // Try single Character format
        if (posWheel.length() == 1 && Character.isLetter(posWheel.charAt(0))) {
            return ValidationResult.valid();
        }

        // Try NCN format (digit-char-digit)
        if (posWheel.matches("^[0-9][A-Z][0-9]$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Steering Axle must be single character or NCN format");
    }

    /**
     * Validates Track field with date-based rules
     * Different patterns based on vehicle start date
     * @param track Track value
     * @param chipData CHIP data flag
     * @param startDate Vehicle start date (yyyy-MM-dd format)
     * @return ValidationResult
     */
    public static ValidationResult validateTrack(String track, String chipData, String startDate) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (track == null || track.isBlank()) {
            return ValidationResult.valid();
        }

        try {
            LocalDate sdate = LocalDate.parse(startDate, DATE_FORMATTER);

            if (sdate.isBefore(DATE_THRESHOLD)) {
                // Date < 2004-03-01: older format rules
                return validateTrackPre2004(track);
            } else {
                // Date >= 2004-03-01: newer format rules
                return validateTrackPost2004(track);
            }
        } catch (Exception e) {
            return ValidationResult.invalid("Invalid start date format: " + startDate);
        }
    }

    /**
     * Track format for dates before 2004-03-01
     * Patterns: NNNN | NNNNHNNNNSTSNNNN | NNNNTNNNN
     */
    private static ValidationResult validateTrackPre2004(String track) {
        if (track.length() == 4 && isNumeric(track)) {
            return ValidationResult.valid();
        }
        if (track.matches("^\\d{4}[A-F]\\d{4}[S-T]\\d{4}[A-F]\\d{4}$")) {
            return ValidationResult.valid();
        }
        if (track.matches("^\\d{4}[A-F]\\d{4}$")) {
            return ValidationResult.valid();
        }
        return ValidationResult.invalid("Track format invalid for pre-2004 vehicles");
    }

    /**
     * Track format for dates on or after 2004-03-01
     * Patterns: NNNN | NNNNTSNNNN | NNNNTNNNNTNNNN
     */
    private static ValidationResult validateTrackPost2004(String track) {
        if (track.length() == 4 && isNumeric(track)) {
            return ValidationResult.valid();
        }
        if (track.matches("^\\d{4}[T]\\d{4}$")) {
            return ValidationResult.valid();
        }
        if (track.matches("^\\d{4}[T]\\d{4}[T]\\d{4}$")) {
            return ValidationResult.valid();
        }
        return ValidationResult.invalid("Track format invalid for post-2004 vehicles");
    }

    /**
     * Validates Height field with date-based rules
     * @param height Height value
     * @param chipData CHIP data flag
     * @param startDate Vehicle start date
     * @return ValidationResult
     */
    public static ValidationResult validateHeight(String height, String chipData, String startDate) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (height == null || height.isBlank()) {
            return ValidationResult.valid();
        }

        try {
            LocalDate sdate = LocalDate.parse(startDate, DATE_FORMATTER);

            if (sdate.isBefore(DATE_THRESHOLD)) {
                // Patterns: NNNN | NNNNHNNNN | NNNNTNNNN
                if (height.length() == 4 && isNumeric(height)) {
                    return ValidationResult.valid();
                }
                if (height.matches("^\\d{4}[A-F]\\d{4}$")) {
                    return ValidationResult.valid();
                }
                if (height.matches("^\\d{4}[T]\\d{4}$")) {
                    return ValidationResult.valid();
                }
            } else {
                // Post-2004: simpler patterns
                if (height.length() == 4 && isNumeric(height)) {
                    return ValidationResult.valid();
                }
                if (height.matches("^\\d{4}[A-F]\\d{4}$")) {
                    return ValidationResult.valid();
                }
            }
        } catch (Exception e) {
            return ValidationResult.invalid("Invalid start date: " + startDate);
        }

        return ValidationResult.invalid("Height field format is invalid");
    }

    /**
     * Validates Length field
     * Patterns: NNNN | NNNNHNNNN
     */
    public static ValidationResult validateLength(String length, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (length == null || length.isBlank()) {
            return ValidationResult.valid();
        }

        if (length.length() == 4 && isNumeric(length)) {
            return ValidationResult.valid();
        }
        if (length.matches("^\\d{4}[A-F]\\d{4}$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Length must be 4 digits or NNNNHNNNN format");
    }

    /**
     * Validates Width field
     * Patterns: NNNN | NNNNHNNNN
     */
    public static ValidationResult validateWidth(String width, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (width == null || width.isBlank()) {
            return ValidationResult.valid();
        }

        if (width.length() == 4 && isNumeric(width)) {
            return ValidationResult.valid();
        }
        if (width.matches("^\\d{4}[A-F]\\d{4}$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Width must be 4 digits or NNNNHNNNN format");
    }

    /**
     * Validates Overhang field with manufacturer-specific rules
     * Multiple patterns, special rule for Landrover (L)
     */
    public static ValidationResult validateOverhang(String overhang, String chipData, String manufacturer) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (overhang == null || overhang.isBlank()) {
            return ValidationResult.valid();
        }

        // Try single hex
        if (overhang.length() == 1 && isHexadecimal(overhang)) {
            return ValidationResult.valid();
        }

        // Try various numeric patterns
        if (overhang.matches("^\\d{2}$")) return ValidationResult.valid(); // NN
        if (overhang.matches("^\\d{3}$")) return ValidationResult.valid(); // NNN
        if (overhang.matches("^\\d{4}$")) return ValidationResult.valid(); // NNNN
        if (overhang.matches("^[S-T]\\d{3}$")) return ValidationResult.valid(); // SNNN
        if (overhang.matches("^[S-T]{2}\\d{2}$")) return ValidationResult.valid(); // SSNN
        if (overhang.matches("^[S-T]{3}\\d$")) return ValidationResult.valid(); // SSSN
        if (overhang.matches("^\\d{4}[A-F]\\d{4}$")) return ValidationResult.valid(); // NNNNHNNNN
        if (overhang.matches("^\\d{4}[T]\\d{4}$")) return ValidationResult.valid(); // NNNNTNNNN

        // Landrover special rule
        if ("L".equals(manufacturer) && overhang.matches("^\\d{3}[A-F]\\d{4}$")) {
            return ValidationResult.valid(); // NNNHNNNN
        }

        return ValidationResult.invalid("Overhang format is invalid");
    }

    /**
     * Validates Length with Towbar field
     */
    public static ValidationResult validateLengthWithTowbar(String lengthWt, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (lengthWt == null || lengthWt.isBlank()) {
            return ValidationResult.valid();
        }

        // Try single digit
        if (lengthWt.length() == 1 && isNumeric(lengthWt)) {
            return ValidationResult.valid();
        }
        if (lengthWt.matches("^\\d{2}$")) return ValidationResult.valid(); // NN
        if (lengthWt.matches("^\\d{3}$")) return ValidationResult.valid(); // NNN
        if (lengthWt.matches("^\\d{4}$")) return ValidationResult.valid(); // NNNN
        if (lengthWt.matches("^\\d{4}[A-F]\\d{4}$")) return ValidationResult.valid(); // NNNNHNNNN
        if (lengthWt.matches("^\\d{4}[T]\\d{4}$")) return ValidationResult.valid(); // NNNNTNNNN

        return ValidationResult.invalid("Length with towbar format is invalid");
    }

    /**
     * Validates Powered Axles field
     * Must be 'H' or 'N'
     */
    public static ValidationResult validatePoweredAxles(String poweredAxles, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (poweredAxles == null || poweredAxles.isBlank()) {
            return ValidationResult.valid();
        }

        if (poweredAxles.matches("^[HN]$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Powered Axles must be 'H' or 'N'");
    }

    /**
     * Validates Class of Vehicle
     * Valid: I, II, III, A, B
     */
    public static ValidationResult validateClass(String vehicleClass, String chipData) {
        if (isChipDataEnabled(chipData)) {
            return ValidationResult.valid();
        }

        if (vehicleClass == null || vehicleClass.isBlank()) {
            return ValidationResult.valid();
        }

        if (vehicleClass.matches("^(I|II|III|A|B)$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Class must be one of: I, II, III, A, B");
    }

    /**
     * Validates Small Series flag
     */
    public static ValidationResult validateSmallSeriesTypApp(String smallSeriesFlag) {
        if (smallSeriesFlag == null || smallSeriesFlag.isBlank()) {
            return ValidationResult.valid();
        }

        if (smallSeriesFlag.matches("^[YN/]$")) {
            return ValidationResult.valid();
        }

        return ValidationResult.invalid("Small Series must be Y, N, or /");
    }

    /**
     * Validates Approval Number field
     */
    public static ValidationResult validateApprovalNo(String approvalNo) {
        if (approvalNo == null || approvalNo.isBlank()) {
            return ValidationResult.valid();
        }

        if (approvalNo.length() > 25) {
            return ValidationResult.invalid("Approval number must not exceed 25 characters");
        }

        return ValidationResult.valid();
    }

    /**
     * Validates Approval Date
     */
    public static ValidationResult validateApprovalDate(String day, String month, String year) {
        try {
            if ((day == null || day.isBlank()) && (month == null || month.isBlank()) && (year == null || year.isBlank())) {
                return ValidationResult.valid(); // All optional together
            }

            int dayInt = day != null && !day.isBlank() ? Integer.parseInt(day) : 0;
            int monthInt = month != null && !month.isBlank() ? Integer.parseInt(month) : 0;
            int yearInt = year != null && !year.isBlank() ? Integer.parseInt(year) : 0;

            if (dayInt < 1 || dayInt > 31) {
                return ValidationResult.invalid("Day must be between 01 and 31");
            }
            if (monthInt < 1 || monthInt > 12) {
                return ValidationResult.invalid("Month must be between 01 and 12");
            }
            if (yearInt < 1 || yearInt > 9999) {
                return ValidationResult.invalid("Year must be between 0001 and 9999");
            }

            return ValidationResult.valid();
        } catch (NumberFormatException e) {
            return ValidationResult.invalid("Approval date components must be numeric");
        }
    }

    // =============== Helper Methods ===============

    private static boolean isChipDataEnabled(String chipData) {
        return CHIP_DATA_DISABLED_FLAG.equals(chipData);
    }

    private static boolean isNumeric(String str) {
        return str != null && str.matches("^\\d+$");
    }

    private static boolean isHexadecimal(String str) {
        return str != null && str.matches("^[0-9A-Fa-f]$");
    }

    /**
     * Validation result wrapper class
     */
    public static class ValidationResult {
        public final boolean valid;
        public final String message;

        private ValidationResult(boolean valid, String message) {
            this.valid = valid;
            this.message = message;
        }

        public static ValidationResult valid() {
            return new ValidationResult(true, null);
        }

        public static ValidationResult invalid(String message) {
            return new ValidationResult(false, message);
        }

        public boolean isValid() {
            return valid;
        }

        public String getErrorMessage() {
            return message;
        }
    }
}
