import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Design tokens matching the original CSS variables.css
class AppColors {
  // Scene colors
  static const purple = Color(0xFF7F77DD);
  static const purpleLight = Color(0xFFAFA9EC);
  static final purpleGlow = const Color(0xFF7F77DD).withValues(alpha: 0.3);

  static const teal = Color(0xFF1D9E75);
  static const tealLight = Color(0xFF5DCAA5);
  static final tealGlow = const Color(0xFF1D9E75).withValues(alpha: 0.3);

  static const coral = Color(0xFFD85A30);
  static const coralLight = Color(0xFFF0997B);
  static final coralGlow = const Color(0xFFD85A30).withValues(alpha: 0.3);

  static const blue = Color(0xFF378ADD);
  static const blueLight = Color(0xFF85B7EB);
  static final blueGlow = const Color(0xFF378ADD).withValues(alpha: 0.3);

  static const pink = Color(0xFFD4537E);
  static const pinkLight = Color(0xFFED93B1);
  static final pinkGlow = const Color(0xFFD4537E).withValues(alpha: 0.3);

  static const gray = Color(0xFF888780);
  static const grayLight = Color(0xFFB4B2A9);

  // Backgrounds
  static const bgPrimary = Color(0xFF0D0D12);
  static const bgSurface = Color(0xFF16161D);
  static const bgElevated = Color(0xFF1E1E28);
  static final bgOverlay = const Color(0xFF0D0D12).withValues(alpha: 0.85);

  // Text
  static const textPrimary = Color(0xFFF0EDE6);
  static const textSecondary = Color(0xFF9A9890);
  static const textTertiary = Color(0xFF5F5E5A);

  // Borders
  static final borderSubtle = const Color(0xFFF0EDE6).withValues(alpha: 0.06);
  static final borderDefault = const Color(0xFFF0EDE6).withValues(alpha: 0.1);
  static final borderHover = const Color(0xFFF0EDE6).withValues(alpha: 0.18);

  AppColors._();
}

/// Typography styles matching the CSS font system
class AppTypography {
  static TextStyle get display => GoogleFonts.spaceGrotesk(
        fontWeight: FontWeight.w700,
        color: AppColors.textPrimary,
        height: 0.95,
        letterSpacing: -0.03,
      );

  static TextStyle get body => GoogleFonts.dmSans(
        color: AppColors.textPrimary,
        height: 1.6,
      );

  static TextStyle get mono => GoogleFonts.jetBrainsMono(
        color: AppColors.textSecondary,
      );

  static TextStyle get heroName => display.copyWith(fontSize: 64);

  static TextStyle get sceneTitle => display.copyWith(fontSize: 32);

  static TextStyle get greeting => mono.copyWith(
        fontSize: 13,
        color: AppColors.purpleLight,
        letterSpacing: 2.0,
      );

  static TextStyle get subtitle => body.copyWith(
        fontSize: 18,
        fontWeight: FontWeight.w400,
        color: AppColors.textSecondary,
      );

  static TextStyle get tag => mono.copyWith(fontSize: 12);

  static TextStyle get small => mono.copyWith(fontSize: 13);

  AppTypography._();
}

/// App-level ThemeData
ThemeData buildAppTheme() {
  return ThemeData.dark().copyWith(
    scaffoldBackgroundColor: AppColors.bgPrimary,
    colorScheme: const ColorScheme.dark(
      primary: AppColors.purple,
      secondary: AppColors.pink,
      surface: AppColors.bgSurface,
    ),
  );
}
