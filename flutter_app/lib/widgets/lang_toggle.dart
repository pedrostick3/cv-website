import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../services/l10n_service.dart';

/// PT / EN language toggle matching .lang-toggle from the CSS.
class LangToggle extends StatelessWidget {
  final L10nService l10n;

  const LangToggle({super.key, required this.l10n});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: l10n,
      builder: (context, _) {
        return Container(
          decoration: BoxDecoration(
            color: AppColors.bgSurface,
            border: Border.all(color: AppColors.borderDefault),
            borderRadius: BorderRadius.circular(9999),
          ),
          padding: const EdgeInsets.all(4),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _LangButton(
                label: 'PT',
                isActive: l10n.currentLang == 'pt',
                onTap: () => l10n.setLanguage('pt'),
              ),
              _LangButton(
                label: 'EN',
                isActive: l10n.currentLang == 'en',
                onTap: () => l10n.setLanguage('en'),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _LangButton extends StatelessWidget {
  final String label;
  final bool isActive;
  final VoidCallback onTap;

  const _LangButton({
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        decoration: BoxDecoration(
          color: isActive ? AppColors.textPrimary : Colors.transparent,
          borderRadius: BorderRadius.circular(9999),
        ),
        child: Text(
          label,
          style: AppTypography.mono.copyWith(
            fontSize: 12,
            color: isActive ? AppColors.bgPrimary : AppColors.textSecondary,
            letterSpacing: 0.8,
          ),
        ),
      ),
    );
  }
}
