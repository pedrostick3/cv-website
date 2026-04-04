import 'package:flutter/material.dart';
import '../config/theme.dart';

/// Full-screen loading overlay with progress bar.
/// Matches the original #loading-screen.
class LoadingScreen extends StatelessWidget {
  final double progress; // 0.0 – 1.0
  final bool visible;

  const LoadingScreen({
    super.key,
    required this.progress,
    required this.visible,
  });

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      ignoring: !visible,
      child: AnimatedOpacity(
        opacity: visible ? 1.0 : 0.0,
        duration: const Duration(milliseconds: 600),
        curve: Curves.easeOut,
        child: Container(
          color: AppColors.bgPrimary,
          alignment: Alignment.center,
          child: SizedBox(
            width: 320,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Pedro Dionísio',
                  style: AppTypography.display.copyWith(fontSize: 28),
                ),
                const SizedBox(height: 8),
                Text(
                  'AI Engineer & Full-Stack Developer',
                  style: AppTypography.mono.copyWith(
                    fontSize: 12,
                    color: AppColors.textTertiary,
                    letterSpacing: 0.8,
                  ),
                ),
                const SizedBox(height: 24),
                // Progress bar
                ClipRRect(
                  borderRadius: BorderRadius.circular(9999),
                  child: LinearProgressIndicator(
                    value: progress,
                    minHeight: 2,
                    backgroundColor: AppColors.borderSubtle,
                    valueColor: const AlwaysStoppedAnimation(AppColors.purple),
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  '${(progress * 100).round()}%',
                  style: AppTypography.mono.copyWith(
                    fontSize: 12,
                    color: AppColors.textTertiary,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
